import Booking from "../models/booking.model";
import { InterfaceBookingInput } from "../types/booking";
import { Request, Response } from "express";
import { createBookingSchema } from "../../../shared/schemas/booking.schema";

export const bookingService = {
  async getBooking(req: Request, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const booking = await Booking.find({ userId: req.userId });
    return booking;
  },

  async createBooking(req: Request, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const validatedBookingData = createBookingSchema.safeParse({
      eventId: req.body.eventId,
      userId: req.userId,
      status: req.body.status,
      bookedDate: req.body.bookedDate,
    });

    if (!validatedBookingData.success) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        details: {
          fieldErrors: validatedBookingData.error.flatten().fieldErrors,
          formErrors: validatedBookingData.error.flatten().formErrors,
        },
      });
    }

    return await Booking.create(
      validatedBookingData.data as InterfaceBookingInput
    );
  },

  async updateBooking(req: Request, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    if (!id) {
      return null;
    }

    return await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    });
  },

  async deleteBooking(req: Request, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    if (!id) {
      return null;
    }
    return await Booking.findByIdAndDelete(id);
  },
};
