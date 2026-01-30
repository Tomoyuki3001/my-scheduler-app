import express from "express";
import { AuthController } from "../controllers/auth.controller";

const router = express.Router();
router.get("/", AuthController.login);

export default router;
