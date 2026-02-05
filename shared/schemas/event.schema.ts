import { z } from "zod";

const locationSchema = z.object({
  street: z.string().min(1, "Street is required").max(200, "Street too long"),
  city: z.string().min(1, "City is required").max(100, "City too long"),
  state: z.string().min(1, "State is required").max(100, "State too long"),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .max(20, "Postal code too long"),
});

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
        "Start date cannot be in the past"
      ),
    end: z
      .string()
      .datetime()
      .refine(
        (date) => new Date(date) >= new Date(),
        "End date cannot be in the past"
      ),
    location: locationSchema,
    image: z.string().optional(),
  })
  .refine((data) => new Date(data.end) > new Date(data.start), {
    message: "End date/time should be after start date/time",
    path: ["end"],
  });

export type CreateEventInput = z.infer<typeof createEventSchema>;
