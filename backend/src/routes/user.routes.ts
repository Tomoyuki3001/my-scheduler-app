import express from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.post("/signup", UserController.signup);
router.get("/status", UserController.status);

router.use(authenticate);

router.get("/me", UserController.getProfile);
router.put("/:id", UserController.editProfile);
router.delete("/:id", UserController.deleteProfile);

export default router;
