import "server-only";

import { getSupabaseServerClient } from "@/services/supabase/server";

import type { ProjectRow } from "@/services/supabase/types";

/**
 * Admin-side projects queries — return *all* rows including drafts.
 *
 * Reads via the user's Supabase server client, so RLS + the user's role
 * govern what's actually returned. Editor and admin roles see drafts;
 * anon/client roles see only published rows even if they hit this query.
 */

export const adminListProjects = async (): Promise<ReadonlyArray<ProjectRow>> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("year", { ascending: false })
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data;
};

export const adminGetProject = async (id: string): Promise<ProjectRow | null> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  return data;
};
