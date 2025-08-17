import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { IUserInput } from "../types/user.types";

const bcrypt = require("bcrypt");

export class UserController {
  static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password }: IUserInput = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({
          status: "error",
          message: "User already exists",
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(
        password,
        config.bcrypt.saltRounds
      );

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      res.status(201).json({
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
          message: "Invalid credentials",
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

      const token = jwt.sign({ userId: user._id }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
      });

      res.json({
        status: "success",
        data: {
          token,
          user: {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}
