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
      res.status(200).json({
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

      res.status(200).json({
        status: "success",
        token,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}
