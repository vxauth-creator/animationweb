"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getSupabaseServerClient } from "@/services/supabase/server";
import { requireRole } from "@/services/supabase/auth";
import { projectSchema, type ProjectInput } from "@/validations/project";

export interface ActionResult {
  ok: boolean;
  message: string;
  errors?: Record<string, string[]>;
  /** Echo the row id back when relevant. */
  id?: string;
}

const splitStack = (raw: string): string[] =>
  raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const buildPayload = (data: ProjectInput) => ({
  slug: data.slug,
  title: data.title,
  client: data.client,
  summary: data.summary,
  category: data.category,
  year: data.year,
  stack: splitStack(data.stack),
  metrics: data.metrics ?? [],
  cover_url: data.cover_url || null,
  live_url: data.live_url || null,
  repo_url: data.repo_url || null,
  accent: data.accent,
  featured: data.featured,
  published: data.published,
  published_at: data.published ? new Date().toISOString() : null,
});

const revalidateAll = () => {
  revalidatePath("/dashboard/admin/projects");
  revalidatePath("/work");
  revalidatePath("/");
};

export const createProject = async (payload: ProjectInput): Promise<ActionResult> => {
  await requireRole(["admin", "editor"]);
  const parsed = projectSchema.safeParse(payload);
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
    .from("projects")
    .insert(buildPayload(parsed.data))
    .select("id")
    .single();

  if (error) return { ok: false, message: error.message };

  revalidateAll();
  redirect(`/dashboard/admin/projects/${data.id}`);
};

export const updateProject = async (
  id: string,
  payload: ProjectInput,
): Promise<ActionResult> => {
  await requireRole(["admin", "editor"]);
  const parsed = projectSchema.safeParse(payload);
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

  const { error } = await supabase.from("projects").update(buildPayload(parsed.data)).eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidateAll();
  revalidatePath(`/dashboard/admin/projects/${id}`);
  return { ok: true, message: "Project saved.", id };
};

export const deleteProject = async (id: string): Promise<ActionResult> => {
  await requireRole(["admin", "editor"]);

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "Supabase isn't configured for this environment." };
  }

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidateAll();
  return { ok: true, message: "Project deleted." };
};

export const togglePublishProject = async (
  id: string,
  published: boolean,
): Promise<ActionResult> => {
  await requireRole(["admin", "editor"]);
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "Supabase isn't configured for this environment." };
  }
  const { error } = await supabase
    .from("projects")
    .update({
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidateAll();
  return { ok: true, message: published ? "Project published." : "Project unpublished." };
};
