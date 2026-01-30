import { z } from "zod";

export const createEventSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title too short")
      .max(50, "Title too long must be less than 50 characters"),
    description: z
      .string()
      .max(500, "Description too long must be less than 500 characters"),
    start: z
      .string()
      .datetime()
      .refine(
        (date) => new Date(date) >= new Date(),
        "Start date cannot be in the past",
      ),
    end: z
      .string()
      .datetime()
      .refine(
        (date) => new Date(date) >= new Date(),
        "End date cannot be in the past",
      ),
  })
  .refine((data) => new Date(data.end) > new Date(data.start), {
    message: "End date/time should be after start date/time",
    path: ["end"],
  });

export type CreateEventInput = z.infer<typeof createEventSchema>;
