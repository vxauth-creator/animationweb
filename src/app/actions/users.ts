"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getSupabaseServerClient } from "@/services/supabase/server";
import { requireRole } from "@/services/supabase/auth";

import type { DbRole } from "@/services/supabase/types";
import type { ActionResult } from "./projects";

const roleSchema = z.enum(["admin", "editor", "client"]);

export const updateUserRole = async (
  profileId: string,
  role: DbRole,
): Promise<ActionResult> => {
  const ctx = await requireRole(["admin"]);
  const parsed = roleSchema.safeParse(role);
  if (!parsed.success) return { ok: false, message: "Invalid role." };

  // Self-protection: don't let an admin demote themselves accidentally.
  if (ctx.profile.id === profileId && parsed.data !== "admin") {
    return {
      ok: false,
      message: "You can't remove your own admin role. Ask another admin to make the change.",
    };
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return { ok: false, message: "Supabase isn't configured for this environment." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ role: parsed.data })
    .eq("id", profileId);

  if (error) return { ok: false, message: error.message };

  revalidatePath("/dashboard/admin/users");
  return { ok: true, message: `Role set to ${parsed.data}.` };
};
