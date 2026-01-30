import { Router } from "express";
import userRouter from "./user.routes";
import eventRouter from "./event.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/events", eventRouter);

export default router;
