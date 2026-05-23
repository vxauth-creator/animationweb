import { z } from "zod";

const slugRule = z
  .string()
  .trim()
  .min(2)
  .max(96)
  .regex(/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, "Use lowercase letters, numbers, and hyphens only.");

export const blogPostSchema = z.object({
  slug: slugRule,
  title: z.string().trim().min(4, "Title is too short.").max(160),
  excerpt: z.string().trim().min(20, "Excerpt should be at least 20 characters.").max(400),
  content: z.string().trim().min(50, "Body should be at least 50 characters."),
  cover_url: z.string().url("Must be a valid URL.").or(z.literal("")).optional(),
  category_slug: z
    .string()
    .trim()
    .max(64)
    .or(z.literal(""))
    .optional(),
  tags: z.string().trim().max(400).optional().default(""),
  reading_minutes: z.coerce.number().int().min(1).max(120).optional(),
  published: z.boolean().default(false),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
