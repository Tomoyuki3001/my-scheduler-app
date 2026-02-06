import { Router } from "express";
import userRouter from "./user.routes";
import eventRouter from "./event.routes";
import authRouter from "./auth.routes";
import bookingRouter from "./booking.routes";
import uploadRouter from "./upload.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/events", eventRouter);
router.use("/auth", authRouter);
router.use("/bookings", bookingRouter);
router.use("/upload", uploadRouter);

export default router;
