"use server";

import { revalidatePath } from "next/cache";

import { getSupabaseServerClient } from "@/services/supabase/server";
import { requireRole } from "@/services/supabase/auth";
import { serviceSchema, type ServiceInput } from "@/validations/service";

import type { ActionResult } from "./projects";

const splitCapabilities = (raw: string): string[] =>
  raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

const buildPayload = (data: ServiceInput) => ({
  title: data.title,
  summary: data.summary,
  capabilities: splitCapabilities(data.capabilities),
  metric_value: data.metric_value || null,
  metric_label: data.metric_label || null,
  accent: data.accent,
  glyph: data.glyph,
  order_index: data.order_index,
  published: data.published,
});

export const updateService = async (
  id: string,
  payload: ServiceInput,
): Promise<ActionResult> => {
  await requireRole(["admin", "editor"]);
  const parsed = serviceSchema.safeParse(payload);
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

  const { error } = await supabase.from("services").update(buildPayload(parsed.data)).eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/dashboard/admin/services");
  revalidatePath(`/dashboard/admin/services/${id}`);
  revalidatePath("/services");
  revalidatePath("/");
  return { ok: true, message: "Service saved.", id };
};
