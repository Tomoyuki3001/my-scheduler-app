import express from "express";
import { AuthController } from "../controllers/auth.controller";

const router = express.Router();
router.get("/me", AuthController.getMe);

export default router;
