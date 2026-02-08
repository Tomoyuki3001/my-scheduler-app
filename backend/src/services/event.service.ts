import { Request, Response } from "express";
import Event from "../models/event.model";
import { InterfaceEventInput } from "../types/event";
import { createEventSchema } from "../../../shared/schemas/event.schema";

export const eventService = {
  async getEvent(_req: Request, _res: Response) {
    const events = await Event.find({ start: { $gte: new Date() } }).sort({
      start: 1,
    });
    return events;
  },

  async createEvent(req: Request, _res: Response) {
    const { title, category, description, start, end, location, image } =
      req.body as InterfaceEventInput;

    const userId = req.userId;

    const validatedData = createEventSchema.safeParse({
      title,
      category,
      description,
      start,
      end,
      location,
      image,
    });

    if (!validatedData.success) {
      throw new Error("Validation failed");
    }

    const createdEvent = await Event.create({
      userId,
      ...validatedData.data,
    });

    return createdEvent;
  },

  async updateEvent(req: Request, _res: Response) {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
      ...req.body,
      new: true,
    });
    if (!updatedEvent) {
      throw new Error("Event not found");
    }
    return updatedEvent;
  },

  async deleteEvent(req: Request, _res: Response) {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      throw new Error("Event not found");
    }
    return deletedEvent;
  },

  async getEventDetails(_req: Request, _res: Response) {
    const event = await Event.findById(_req.params.id);
    if (!event) {
      throw new Error("Event not found");
    }
    return event;
  },

  async getCreatedEvent(req: Request, _res: Response) {
    const events = await Event.find({
      userId: req.userId,
      start: { $gte: new Date() },
    }).sort({ start: 1 });
    return events;
  },
};
