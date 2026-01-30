import { Router } from "express";
import userRouter from "./user.routes";
import eventRouter from "./event.routes";
import authRouter from "./auth.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/events", eventRouter);
router.use("/auth", authRouter);

export default router;
