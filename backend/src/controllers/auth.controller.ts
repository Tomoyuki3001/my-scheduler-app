import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export class AuthController {
  static getMe = async (req: Request, res: Response) => {
    try {
      const result = await authService.getMe(req);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
