import "server-only";

import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";

import type { DbRole, Profile } from "./types";
import { getSupabaseServerClient } from "./server";

/**
 * Server-side auth helpers.
 *
 * Both helpers tolerate the "Supabase not configured" case (Phase 1 contract):
 * they return `null` instead of throwing so calling code can render a
 * graceful UI fallback.
 *
 * Always use `getCurrentUser()` (which triggers a token refresh inside the
 * Supabase SSR client) — never trust `auth.getSession()` alone in server code.
 */
export const getCurrentUser = async (): Promise<User | null> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
};

/**
 * Returns the authenticated user *and* their profile (including `role`).
 * Profile is fetched via the RLS-protected `profiles` table — RLS allows
 * self-read so this works for any authenticated user.
 */
export interface AuthContext {
  user: User;
  profile: Profile;
}

export const getAuthContext = async (): Promise<AuthContext | null> => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  // The auth trigger should have created a profile, but if it didn't (or
  // hasn't replicated yet), return null rather than partial state.
  if (error || !profile) return null;

  return { user, profile };
};

/** Convenience: returns just the role, defaulting to `null` when unauthed. */
export const getCurrentRole = async (): Promise<Profile["role"] | null> => {
  const ctx = await getAuthContext();
  return ctx?.profile.role ?? null;
};

/**
 * `requireRole` — page-level RBAC guard.
 *
 * Use at the top of any Server Component / Server Action that requires a
 * specific role. Behavior:
 *   - Unauthed:     redirect to `/login?next=...`
 *   - Wrong role:   redirect to `/dashboard?error=forbidden`
 *   - Authorized:   returns the typed `AuthContext`
 *
 * Designed to compose: in a server action you can call this first to
 * short-circuit the rest of the function if the caller isn't allowed.
 */
export const requireRole = async (
  allowed: ReadonlyArray<DbRole>,
  options?: { next?: string },
): Promise<AuthContext> => {
  const ctx = await getAuthContext();
  if (!ctx) {
    const nextParam = options?.next ? `?next=${encodeURIComponent(options.next)}` : "";
    redirect(`/login${nextParam}`);
  }
  if (!allowed.includes(ctx.profile.role)) {
    redirect("/dashboard?error=forbidden");
  }
  return ctx;
};
