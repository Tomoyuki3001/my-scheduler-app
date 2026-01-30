import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export class AuthController {
  static login = async (req: Request, res: Response) => {
    try {
      const result = await authService.loginUser(req.body);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  };
}
