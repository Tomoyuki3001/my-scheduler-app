import { z } from "zod";

export const createBookingSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  userId: z.string().min(1, "User ID is required"),
  status: z.string().min(1, "Status is required"),
  bookedDate: z.string().min(1, "Booked date is required"),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
