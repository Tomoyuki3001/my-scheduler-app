import { Request, Response } from "express";
import Event from "../models/event.model";
import {
  createEventSchema,
  updateEventSchema,
} from "../../../shared/schemas/event.schema";
import {
  CreateEventInput,
  UpdateEventInput,
} from "../../../shared/schemas/event.schema";

export class EventController {
  static async getEvent(req: Request, res: Response): Promise<void> {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, start, end, location }: CreateEventInput =
        req.body;
      const userId = (req as any).userId;

      const validatedData = createEventSchema.safeParse({
        userId,
        title,
        description,
        start,
        end,
        location,
      });
      if (!validatedData.success) {
        res.status(400).json({
          status: "error",
          message: "Validation failed",
          details: {
            fieldErrors: validatedData.error.flatten().fieldErrors,
            formErrors: validatedData.error.flatten().formErrors,
          },
        });
        return;
      }

      const newEvent = await Event.create({
        userId,
        title,
        description,
        start,
        end,
        location,
      });
      res.status(200).json(newEvent);
    } catch (err: any) {
      res.status(500).json({ error: err });
    }
  }

  static async updateEvent(req: Request, res: Response) {
    const { title, description, start, end, location }: UpdateEventInput =
      req.body;

    console.log("title", title);
    console.log("description", description);
    console.log("start", start);
    console.log("end", end);
    console.log("location", location);

    const validatedData = updateEventSchema.safeParse({
      title,
      description,
      start,
      end,
      location,
    });
    if (!validatedData.success) {
      res.status(400).json({
        status: "error",
        message: validatedData.error.message,
        details: {
          fieldErrors: validatedData.error.flatten().fieldErrors,
          formErrors: validatedData.error.flatten().formErrors,
        },
      });
      return;
    }
    console.log("validatedData", validatedData);
    try {
      const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        validatedData.data,
        { new: true }
      );
      if (!updatedEvent) {
        res.status(404).json({
          status: "error",
          message: "Event not found",
        });
        return;
      }
      res.status(200).json({
        status: "success",
        message: "Event updated successfully",
        data: updatedEvent,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "Exception",
        message: err.message ?? "Internal server error",
      });
    }
  }

  static async deleteEvent(req: Request, res: Response) {
    try {
      const deletedEvet = await Event.findByIdAndDelete(req.params.id);
      if (!deletedEvet) {
        return res.status(404).json({ error: "The event not found" });
      }
      res.status(200).json({ message: "The event deleted successfully!" });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to delete event" });
    }
  }

  static async getEventDetails(req: Request, res: Response) {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ error: "The event not found" });
      }
      res.status(200).json({
        status: "success",
        message: "Event fetched successfully",
        data: event,
      });
    } catch (err: any) {
      res.status(500).json({ status: "Exception", message: err.message });
    }
  }

  static async getCreatedEvent(req: Request, res: Response) {
    try {
      const events = await Event.find({
        userId: req.params.userId,
        start: { $gt: new Date() },
      }).sort({ start: 1 });

      res.status(200).json({
        status: "success",
        message: "Events fetched successfully",
        data: events,
      });
    } catch (err: any) {
      res.status(500).json({
        status: "Exception",
        message: err.message ?? "Internal server error",
      });
    }
  }
}
