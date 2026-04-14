import { z } from "zod";

export const loginSchema = z.object({
  role: z.enum(["patient", "admin"]),
  email: z.string().email("Enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters.")
});

export const signupSchema = z.object({
  fullName: z.string().min(2, "Enter your name."),
  email: z.string().email("Enter a valid email."),
  phone: z.string().min(10, "Enter a valid phone number."),
  dueDate: z.string().min(1, "Select your due date."),
  password: z.string().min(8, "Password must be at least 8 characters.")
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
