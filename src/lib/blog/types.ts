/**
 * Blog post — unified shape rendered by the blog routes.
 *
 * Two sources can populate this shape:
 *   1. Filesystem MDX (`content/posts/*.mdx`) — default, ships today.
 *   2. Supabase `blog_posts` table — when configured (Phase 5 dashboard CRUD).
 *
 * Components consume the unified shape and don't care about the source.
 */

import { z } from "zod";

export const postFrontmatterSchema = z.object({
  title: z.string().min(2),
  excerpt: z.string().min(20),
  publishedAt: z.string(), // ISO 8601
  updatedAt: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  cover: z.string().url().or(z.string().startsWith("/")).optional(),
  author: z.string().optional(),
  draft: z.boolean().default(false),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

export interface Post {
  /** URL-safe identifier — derived from filename or DB slug. */
  slug: string;
  title: string;
  excerpt: string;
  content: string;        // raw MDX body
  cover?: string | null;
  tags: string[];
  category: string | null;
  author: string | null;
  publishedAt: string;
  updatedAt: string | null;
  /** Estimated reading time in minutes (rounded up). */
  readingMinutes: number;
}

/** Loose 200wpm estimate — fine-grained for short posts, generous for long. */
export const estimateReadingMinutes = (content: string): number =>
  Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));
