import { Request, Response } from "express";
import { bookingService } from "../services/booking.service";

export class BookingController {
  static getBooking = async (req: Request, res: Response) => {
    try {
      const result = await bookingService.getBooking(req, res);
      res.status(200).json({
        status: "success",
        message: "Booking fetched successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "Exception",
        message: error.message,
      });
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
    } catch (error: any) {
      res.status(500).json({
        status: "Exception",
        message: error.message,
      });
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
    } catch (error: any) {
      res.status(500).json({
        status: "Exception",
        message: error.message,
      });
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
    } catch (error: any) {
      res.status(500).json({
        status: "Exception",
        message: error.message,
      });
    }
  };

  static getBookingDetails = async (req: Request, res: Response) => {
    try {
      const result = await bookingService.getBookingDetails(req, res);
      res.status(200).json({
        status: "success",
        message: "Booking details fetched successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "Exception",
        message: error.message,
      });
    }
  };
}
