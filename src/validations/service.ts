import { z } from "zod";

export const GLYPH_OPTIONS = [
  "browser",
  "stack",
  "grid",
  "spark",
  "cart",
  "gauge",
  "atoms",
  "node",
] as const;

export const serviceSchema = z.object({
  title: z.string().trim().min(2).max(80),
  summary: z.string().trim().min(20).max(280),
  /** One capability per line. Splits server-side. */
  capabilities: z.string().trim().min(2).max(800),
  metric_value: z.string().trim().max(40).or(z.literal("")).optional(),
  metric_label: z.string().trim().max(40).or(z.literal("")).optional(),
  accent: z.enum(["blue", "cyan", "violet"]),
  glyph: z.enum(GLYPH_OPTIONS),
  order_index: z.coerce.number().int().min(0).max(200).default(0),
  published: z.boolean().default(true),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
