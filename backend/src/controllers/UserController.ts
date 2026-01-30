import { Request, Response } from "express";
import { User } from "../models/User";
import jwt, { SignOptions } from "jsonwebtoken";
import { InterfaceUserInput } from "../types/user";
import crypto from "crypto";

const bcrypt = require("bcrypt");

export class UserController {
  static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, password }: InterfaceUserInput =
        req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({
          status: "error",
          message: "User already exists",
        });
        return;
      }

      const verificationToken = crypto.randomBytes(32).toString("hex");
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        email: email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
        verificationToken,
        verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      const options: SignOptions = {
        expiresIn: "1h",
      };

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        options
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600000,
      });

      res.status(200).json({
        status: "success",
        message: "User created successfully",
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({
          status: "error",
          message: "User not found",
        });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({
          status: "error",
          message: "Invalid credentials",
        });
        return;
      }

      const options: SignOptions = {
        expiresIn: "1h",
      };

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        options
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600000,
      });

      res.status(200).json({
        status: "success",
        message: "Login successful",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async status(req: Request, res: Response): Promise<void> {
    try {
      const token = req.cookies?.token;

      if (!token) {
        res.status(200).json({ isLoggedIn: false });
        return;
      }

      try {
        jwt.verify(token, process.env.JWT_SECRET as string);
        res.status(200).json({ isLoggedIn: true });
      } catch {
        res.status(200).json({ isLoggedIn: false });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      res.status(200).json({
        status: "success",
        message: "Logout successful",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const token = req.cookies?.token;

      if (!token) {
        res.status(401).json({
          status: "error",
          message: "Authentication required",
        });
        return;
      }

      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as { userId?: string };

        if (!decoded.userId) {
          res.status(401).json({
            status: "error",
            message: "Invalid token",
          });
          return;
        }

        const user = await User.findById(decoded.userId).select(
          "-password -verificationToken -verificationTokenExpires"
        );

        if (!user) {
          res.status(404).json({
            status: "error",
            message: "User not found",
          });
          return;
        }

        res.status(200).json({
          status: "success",
          data: {
            id: user._id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            isVerified: user.isVerified,
          },
        });
      } catch (error) {
        res.status(401).json({
          status: "error",
          message: "Invalid token",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}
