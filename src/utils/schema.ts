import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^\S+@\S+$/i, "Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Your password should be at least 6 characters.")
    .max(12, "Your password shouldn't be longer than 12 characters."),
});

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(1, "name is required")
    .min(4, "name shouldn't be less than 4 characters")
    .max(12, "name shouldn't be greater than 12 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^\S+@\S+$/i, "Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Your password should be at least 6 characters.")
    .max(12, "Your password shouldn't be longer than 12 characters."),
});

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^\S+@\S+$/i, "Invalid email address"),
});

export const newPassword = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Your password should be at least 6 characters.")
    .max(12, "Your password shouldn't be longer than 12 characters."),
});
