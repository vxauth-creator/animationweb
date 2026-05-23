/**
 * Project form validation.
 *
 * Same schema validates the dashboard form (RHF + zodResolver) and the
 * server action that writes to Supabase. The shape mirrors `projects` in
 * `supabase/migrations/0001_init.sql`.
 */

import { z } from "zod";

const slugRule = z
  .string()
  .trim()
  .min(2, "Slug is too short.")
  .max(64, "Slug is too long.")
  .regex(/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, "Use lowercase letters, numbers, and hyphens only.");

const optionalUrl = z.string().url("Must be a valid URL.").or(z.literal("")).optional();

const metricSchema = z.object({
  value: z.string().trim().min(1, "Required."),
  label: z.string().trim().min(1, "Required."),
});

export const projectSchema = z.object({
  slug: slugRule,
  title: z.string().trim().min(2, "Title is too short.").max(120),
  client: z.string().trim().min(2, "Client is required.").max(120),
  summary: z.string().trim().min(20, "Add a 20+ character summary.").max(400),
  category: z.enum(["saas", "marketing", "dashboard", "commerce", "ai", "experience"]),
  year: z.coerce.number().int().min(2000).max(new Date().getFullYear() + 1),
  /** Comma-separated tech stack — split server-side. */
  stack: z
    .string()
    .trim()
    .min(1, "List at least one technology.")
    .max(400),
  metrics: z.array(metricSchema).max(6).optional().default([]),
  cover_url: optionalUrl,
  live_url: optionalUrl,
  repo_url: optionalUrl,
  accent: z.enum(["blue", "cyan", "violet"]),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
});

export type ProjectInput = z.infer<typeof projectSchema>;
