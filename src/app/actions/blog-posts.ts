"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getSupabaseServerClient } from "@/services/supabase/server";
import { requireRole } from "@/services/supabase/auth";
import { blogPostSchema, type BlogPostInput } from "@/validations/blog-post";
import { estimateReadingMinutes } from "@/lib/blog/types";

import type { ActionResult } from "./projects";

const splitTags = (raw: string): string[] =>
  raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const buildPayload = (data: BlogPostInput) => ({
  slug: data.slug,
  title: data.title,
  excerpt: data.excerpt,
  content: data.content,
  cover_url: data.cover_url || null,
  category_slug: data.category_slug || null,
  tags: splitTags(data.tags ?? ""),
  reading_minutes: data.reading_minutes ?? estimateReadingMinutes(data.content),
  published: data.published,
  published_at: data.published ? new Date().toISOString() : null,
});

const revalidateAll = (slug?: string) => {
  revalidatePath("/dashboard/admin/blogs");
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
};

export const createBlogPost = async (payload: BlogPostInput): Promise<ActionResult> => {
  await requireRole(["admin", "editor"]);
  const parsed = blogPostSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "Supabase isn't configured for this environment." };
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert(buildPayload(parsed.data))
    .select("id, slug")
    .single();

  if (error) return { ok: false, message: error.message };
  revalidateAll(data.slug);
  redirect(`/dashboard/admin/blogs/${data.id}`);
};

export const updateBlogPost = async (
  id: string,
  payload: BlogPostInput,
): Promise<ActionResult> => {
  await requireRole(["admin", "editor"]);
  const parsed = blogPostSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "Supabase isn't configured for this environment." };
  }

  const { error } = await supabase.from("blog_posts").update(buildPayload(parsed.data)).eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidateAll(parsed.data.slug);
  revalidatePath(`/dashboard/admin/blogs/${id}`);
  return { ok: true, message: "Post saved.", id };
};

export const deleteBlogPost = async (id: string): Promise<ActionResult> => {
  await requireRole(["admin", "editor"]);
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "Supabase isn't configured for this environment." };
  }
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidateAll();
  return { ok: true, message: "Post deleted." };
};

export const togglePublishBlogPost = async (
  id: string,
  published: boolean,
): Promise<ActionResult> => {
  await requireRole(["admin", "editor"]);
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "Supabase isn't configured for this environment." };
  }
  const { error } = await supabase
    .from("blog_posts")
    .update({
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidateAll();
  return { ok: true, message: published ? "Post published." : "Post unpublished." };
};
