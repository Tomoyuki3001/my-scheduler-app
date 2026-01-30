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

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(15, "Password must be less than 15 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
  );

export const authUserSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type AuthUserInfo = z.infer<typeof authUserSchema>;
