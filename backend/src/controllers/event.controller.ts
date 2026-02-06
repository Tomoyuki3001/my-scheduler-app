import { Request, Response } from "express";
import { eventService } from "../services/event.service";

export class EventController {
  static async getEvent(req: Request, res: Response): Promise<void> {
    try {
      const events = await eventService.getEvent(req, res);
      res.status(200).json(events);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const events = await eventService.createEvent(req, res);
      res.status(200).json(events);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateEvent(req: Request, res: Response) {
    try {
      const events = await eventService.updateEvent(req, res);
      res.status(200).json(events);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteEvent(req: Request, res: Response) {
    try {
      const deletedEvet = await eventService.deleteEvent(req, res);
      res.status(200).json(deletedEvet);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getEventDetails(req: Request, res: Response) {
    try {
      const event = await eventService.getEventDetails(req, res);
      res.status(200).json(event);
    } catch (err: any) {
      res.status(500).json({ status: "Exception", message: err.message });
    }
  }

  static async getCreatedEvent(req: Request, res: Response) {
    try {
      const events = await eventService.getCreatedEvent(req, res);
      res.status(200).json({ status: "success", data: events });
    } catch (err: any) {
      res.status(500).json({ status: "Exception", message: err.message });
    }
  }
}
