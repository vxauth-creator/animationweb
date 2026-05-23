import "server-only";

import { capabilities } from "@/lib/utils/env";
import { getSupabaseServerClient } from "@/services/supabase/server";

import { fileSystemPosts } from "./source";
import { estimateReadingMinutes, type Post } from "./types";

import type { BlogPostRow } from "@/services/supabase/types";

/**
 * Unified blog source.
 *
 * - When Supabase is configured AND has at least one published post, reads
 *   from the `blog_posts` table (admin/editor authoring via the Phase 5
 *   dashboard).
 * - Otherwise, falls back to MDX in `content/posts/`.
 *
 * The two paths return the exact same `Post` shape so route components are
 * source-agnostic. This is the same pattern as `src/lib/data/*` — phase
 * upgrades are import-path swaps, not refactors.
 */

const fromRow = (row: BlogPostRow): Post => ({
  slug: row.slug,
  title: row.title,
  excerpt: row.excerpt,
  content: row.content,
  cover: row.cover_url,
  tags: row.tags,
  category: row.category_slug,
  author: null,
  publishedAt: row.published_at ?? row.created_at,
  updatedAt: row.updated_at,
  readingMinutes: row.reading_minutes ?? estimateReadingMinutes(row.content),
});

const tryFetchFromSupabase = async (): Promise<Post[] | null> => {
  if (!capabilities.hasSupabasePublic) return null;
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error || !data || data.length === 0) return null;
  return data.map(fromRow);
};

export const getPosts = async (): Promise<Post[]> => {
  const fromDb = await tryFetchFromSupabase();
  if (fromDb && fromDb.length > 0) return fromDb;
  return fileSystemPosts.list();
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  if (capabilities.hasSupabasePublic) {
    const supabase = await getSupabaseServerClient();
    if (supabase) {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (data) return fromRow(data);
    }
  }
  return fileSystemPosts.bySlug(slug);
};
