import express from "express";
import { UserController } from "../controllers/UserController";
// import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post("/login", UserController.login);
router.post("/signup", UserController.signup);
router.get("/status", UserController.status);
router.get("/profile", UserController.getProfile);
router.post("/logout", UserController.logout);

export default router;
