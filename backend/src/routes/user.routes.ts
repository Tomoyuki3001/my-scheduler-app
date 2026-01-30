import express from "express";
import { UserController } from "../controllers/user.controller";
// import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.post("/signup", UserController.signup);
router.get("/status", UserController.status);
router.get("/profile", UserController.getProfile);
router.put("/profile/:id", UserController.editProfile);
router.delete("/profile/:id", UserController.deleteProfile);

export default router;
