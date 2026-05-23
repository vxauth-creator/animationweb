/**
 * Auth form validation schemas.
 *
 * Shared between the client (RHF + zodResolver) and the server actions, so
 * client and server enforce identical rules.
 */

import { z } from "zod";

const emailField = z
  .string({ required_error: "Email is required." })
  .trim()
  .toLowerCase()
  .email("That email address looks off.");

const passwordField = z
  .string({ required_error: "Password is required." })
  .min(8, "Use at least 8 characters.")
  .max(72, "Password is too long.");

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
});

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Tell us your name.")
      .max(80, "Name is too long."),
    email: emailField,
    password: passwordField,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export const resetSchema = z.object({
  email: emailField,
});

export const updatePasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ResetInput = z.infer<typeof resetSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
