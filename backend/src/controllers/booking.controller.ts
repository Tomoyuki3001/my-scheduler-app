import { Request, Response } from "express";
import { bookingService } from "../services/booking.service";

/** Send a single response; use for error handling so we never double-send */
function sendError(res: Response, error: unknown) {
  const err = error as { statusCode?: number; message?: string; body?: object };
  const status = err.statusCode ?? 500;
  const body =
    err.body != null
      ? { status: "error", message: err.message, ...err.body }
      : {
          status: "Exception",
          message: err.message ?? "Internal server error",
        };
  res.status(status).json(body);
}

export class BookingController {
  static getBooking = async (req: Request, res: Response) => {
    try {
      const result = await bookingService.getBooking(req, res);
      res.status(200).json({
        status: "success",
        message: "Booking fetched successfully",
        data: result,
      });
    } catch (error) {
      sendError(res, error);
    }
  };

  static createBooking = async (req: Request, res: Response) => {
    try {
      const result = await bookingService.createBooking(req, res);
      res.status(200).json({
        status: "success",
        message: "Booking created successfully",
        data: result,
      });
    } catch (error) {
      sendError(res, error);
    }
  };

  static updateBooking = async (req: Request, res: Response) => {
    try {
      const result = await bookingService.updateBooking(req, res);
      if (!result) {
        res.status(404).json({ message: "Booking not found" });
        return;
      }
      res.status(200).json({
        status: "success",
        message: "Booking updated successfully",
        data: result,
      });
    } catch (error) {
      sendError(res, error);
    }
  };

  static deleteBooking = async (req: Request, res: Response) => {
    try {
      const result = await bookingService.deleteBooking(req, res);
      if (!result) {
        res.status(404).json({ message: "Booking not found" });
        return;
      }
      res.status(200).json({
        status: "success",
        message: "Booking deleted successfully",
      });
    } catch (error) {
      sendError(res, error);
    }
  };

  static getBookingDetails = async (req: Request, res: Response) => {
    try {
      const result = await bookingService.getBookingDetails(req, res);
      if (!result) {
        res.status(404).json({ message: "Booking not found" });
        return;
      }
      res.status(200).json({
        status: "success",
        message: "Booking details fetched successfully",
        data: result,
      });
    } catch (error) {
      sendError(res, error);
    }
  };

  static getUserBooking = async (req: Request, res: Response) => {
    try {
      const result = await bookingService.getUserBooking(req, res);
      res.status(200).json({
        status: "success",
        message: "Booking fetched successfully",
        data: result,
      });
    } catch (error) {
      sendError(res, error);
    }
  };
}
