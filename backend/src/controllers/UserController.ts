import { Request, Response } from "express";
import { User } from "../models/User";
import jwt, { SignOptions } from "jsonwebtoken";
import { InterfaceUserInput } from "../types/user";
import { config } from "../config/jwt";

const bcrypt = require("bcrypt");

export class UserController {
  static async signup(req: Request, res: Response): Promise<void> {
    console.log(req.body);
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

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        email: email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
      });
      res.status(200).json({
        status: "warning",
        message:
          "Account created but verification email could not be sent. Please contact support.",
        userId: user._id,
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

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}
