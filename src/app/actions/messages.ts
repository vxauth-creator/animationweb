"use server";

import { revalidatePath } from "next/cache";

import { getSupabaseServerClient } from "@/services/supabase/server";
import { requireRole } from "@/services/supabase/auth";

import type { ActionResult } from "./projects";

const revalidate = () => {
  revalidatePath("/dashboard/admin/messages");
  revalidatePath("/dashboard");
};

export const setMessageHandled = async (
  id: string,
  handled: boolean,
): Promise<ActionResult> => {
  const ctx = await requireRole(["admin"]);
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "Supabase isn't configured for this environment." };
  }

  const { error } = await supabase
    .from("messages")
    .update({
      handled,
      handled_by: handled ? ctx.profile.id : null,
      handled_at: handled ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (error) return { ok: false, message: error.message };
  revalidate();
  revalidatePath(`/dashboard/admin/messages/${id}`);
  return { ok: true, message: handled ? "Marked handled." : "Reopened." };
};

export const deleteMessage = async (id: string): Promise<ActionResult> => {
  await requireRole(["admin"]);
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "Supabase isn't configured for this environment." };
  }
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidate();
  return { ok: true, message: "Message deleted." };
};
