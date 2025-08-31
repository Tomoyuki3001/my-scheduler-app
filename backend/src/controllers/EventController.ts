import { Request, Response } from "express";
import Event from "../models/Event";

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
      const { title, description, start, end, userId } = req.body;
      const newEvent = await Event.create({
        title,
        description,
        start,
        end,
        userId,
      });
      res.status(200).json(newEvent);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateEvent(req: Request, res: Response) {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!updatedEvent) {
        return res.status(404).json({ error: "The event not found" });
      }
      res.status(200).json(updatedEvent);
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ error: err.message });
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
}
