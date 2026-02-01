import mongoose from "mongoose";
import Booking from "../models/booking.model";
import { InterfaceBookingInput } from "../types/booking";
import { Request, Response } from "express";
import { createBookingSchema } from "../../../shared/schemas/booking.schema";

/** Error with HTTP status for controller to send a single response */
class HttpError extends Error {
  statusCode: number;
  body?: object;
  constructor(message: string, statusCode: number, body?: object) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.body = body;
  }
}

export const bookingService = {
  async getBooking(req: Request, _res: Response) {
    if (!req.userId) {
      throw new HttpError("Unauthorized", 401);
    }
    const booking = await Booking.find({ userId: req.userId });
    return booking;
  },

  async createBooking(req: Request, _res: Response) {
    if (!req.userId) {
      throw new HttpError("Unauthorized", 401);
    }

    const validatedBookingData = createBookingSchema.safeParse({
      eventId: req.params.eventId,
      userId: req.userId,
      status: req.body.status,
      bookedDate: req.body.bookedDate,
    });

    if (!validatedBookingData.success) {
      throw new HttpError("Validation failed", 400, {
        fieldErrors: validatedBookingData.error.flatten().fieldErrors,
        formErrors: validatedBookingData.error.flatten().formErrors,
      });
    }

    return await Booking.create(
      validatedBookingData.data as InterfaceBookingInput
    );
  },

  async updateBooking(req: Request, _res: Response) {
    if (!req.userId) {
      throw new HttpError("Unauthorized", 401);
    }

    const { bookingId } = req.params;
    if (!bookingId) {
      return null;
    }
    return await Booking.findByIdAndUpdate(
      bookingId,
      { status: req.body.status },
      {
        new: true,
      }
    );
  },

  async deleteBooking(req: Request, _res: Response) {
    if (!req.userId) {
      throw new HttpError("Unauthorized", 401);
    }

    const { id } = req.params;
    if (!id) {
      return null;
    }
    return await Booking.findByIdAndDelete(id);
  },

  async getBookingDetails(req: Request, _res: Response) {
    if (!req.userId) {
      throw new HttpError("Unauthorized", 401);
    }

    const { eventId } = req.params;
    if (!eventId) {
      return null;
    }
    const booking = await Booking.findOne({
      eventId,
      userId: req.userId,
      status: "booked",
    }).sort({ createdAt: -1 });
    if (!booking) {
      return null;
    }
    return booking;
  },

  async getUserBooking(req: Request, _res: Response) {
    if (!req.userId) {
      throw new HttpError("Unauthorized", 401);
    }

    const now = new Date();
    const userId = req.params.userId;
    if (!userId) {
      return [];
    }

    const bookings = await Booking.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          status: "booked",
        },
      },
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "event",
        },
      },
      { $unwind: "$event" },
      {
        $match: {
          "event.start": { $gt: now },
        },
      },
      { $sort: { "event.start": 1 } },
      {
        $project: {
          event: {
            _id: "$event._id",
            title: "$event.title",
            description: "$event.description",
            start: "$event.start",
            end: "$event.end",
          },
        },
      },
    ]);

    return bookings;
  },

  async getCreatedBooking(req: Request, _res: Response) {
    if (!req.userId) {
      throw new HttpError("Unauthorized", 401);
    }

    const userId = req.params.userId;
    if (!userId) {
      return [];
    }
  },
};
