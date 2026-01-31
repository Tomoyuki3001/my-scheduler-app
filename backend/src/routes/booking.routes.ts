import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { BookingController } from "../controllers/booking.controller";

const router = express.Router();

console.log("booking.routes");

router.use(authenticate);
router.get("/", BookingController.getBooking);
router.post("/", BookingController.createBooking);
router.put("/:id", BookingController.updateBooking);
router.delete("/:id", BookingController.deleteBooking);

export default router;
