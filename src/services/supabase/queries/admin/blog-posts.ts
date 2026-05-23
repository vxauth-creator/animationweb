import "server-only";

import { getSupabaseServerClient } from "@/services/supabase/server";

import type { BlogPostRow } from "@/services/supabase/types";

export const adminListBlogPosts = async (): Promise<ReadonlyArray<BlogPostRow>> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error || !data) return [];
  return data;
};

export const adminGetBlogPost = async (id: string): Promise<BlogPostRow | null> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
  return data;
};
