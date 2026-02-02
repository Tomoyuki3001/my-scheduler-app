import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { BookingController } from "../controllers/booking.controller";

const router = express.Router();

router.use(authenticate);
router.get("/", BookingController.getBooking);
router.get("/:eventId", BookingController.getBookingDetails);
router.post("/:eventId", BookingController.createBooking);
router.put("/:bookingId", BookingController.updateBooking);
router.delete("/:bookingId", BookingController.deleteBooking);
router.get("/user/:userId", BookingController.getUserBooking);

export default router;
