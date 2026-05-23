/**
 * Contact form validation schema.
 *
 * Used on the client (RHF + zodResolver) and on the server (route handler /
 * server action) so the same rules apply at every boundary.
 */

import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string({ required_error: "Please share your name." })
    .trim()
    .min(2, "Name is too short.")
    .max(80, "Name is too long."),

  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .toLowerCase()
    .email("That email address looks off."),

  company: z.string().trim().max(120).optional().or(z.literal("")),

  budget: z
    .enum(["explore", "10-25k", "25-60k", "60k+", "retainer"])
    .optional(),

  message: z
    .string({ required_error: "Tell us a little about your project." })
    .trim()
    .min(20, "Add a bit more detail (20+ characters).")
    .max(4000, "Message is too long — keep it under 4000 characters."),

  /** Honeypot — must be empty. Bots fill it; humans don't see it. */
  website: z
    .string()
    .max(0, "Bot detected.")
    .optional()
    .or(z.literal("")),

  /** GDPR consent. */
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please accept the privacy notice." }),
  }),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormValues = z.output<typeof contactFormSchema>;
