import "server-only";

import { capabilities } from "@/lib/utils/env";
import { getSupabaseServerClient } from "@/services/supabase/server";
import { projects as localProjects } from "@/lib/data/projects";

import type { Project as LocalProject } from "@/lib/data/projects";
import type { ProjectRow } from "@/services/supabase/types";

/**
 * Projects query — Supabase first, local fallback.
 *
 * Component-side, render the same shape as `src/lib/data/projects.ts`. When
 * the dashboard publishes new projects (Phase 5), the public site picks
 * them up immediately without code changes.
 */

const fromRow = (row: ProjectRow): LocalProject => ({
  slug: row.slug,
  title: row.title,
  client: row.client,
  summary: row.summary,
  category: row.category,
  year: row.year,
  stack: row.stack,
  metrics: row.metrics,
  liveUrl: row.live_url ?? undefined,
  repoUrl: row.repo_url ?? undefined,
  accent: row.accent,
  featured: row.featured,
});

export const getProjects = async (): Promise<ReadonlyArray<LocalProject>> => {
  if (!capabilities.hasSupabasePublic) return localProjects;
  const supabase = await getSupabaseServerClient();
  if (!supabase) return localProjects;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error || !data || data.length === 0) return localProjects;
  return data.map(fromRow);
};

export const getProjectBySlug = async (slug: string): Promise<LocalProject | null> => {
  if (capabilities.hasSupabasePublic) {
    const supabase = await getSupabaseServerClient();
    if (supabase) {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (data) return fromRow(data);
    }
  }
  return localProjects.find((p) => p.slug === slug) ?? null;
};
