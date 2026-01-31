import { User } from "../models/user.model";
import { Request } from "express";

export const authService = {
  async getMe(req: Request) {
    if (!req.userId) {
      throw new Error("Unauthorized");
    }
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
};
