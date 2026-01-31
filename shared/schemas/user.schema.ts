import { z } from "zod";

const firstNameSchema = z
  .string()
  .min(1, "First name is required")
  .max(15, "First name too long must be less than 15 characters")
  .regex(/^[a-zA-Z]+$/, "First name must contain only letters");

const lastNameSchema = z
  .string()
  .min(1, "Last name is required")
  .max(15, "Last name too long must be less than 15 characters")
  .regex(/^[a-zA-Z]+$/, "Last name must contain only letters");

const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(1, "Email is required")
  .max(50, "Email must be less than 50 characters")
  .regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Email must be a valid email address",
  );

export const editUserSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
});

export type EditUserInput = z.infer<typeof editUserSchema>;
