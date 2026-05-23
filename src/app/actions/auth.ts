"use server";

import { redirect } from "next/navigation";

import { getSupabaseServerClient } from "@/services/supabase/server";
import { capabilities, publicEnv } from "@/lib/utils/env";
import {
  loginSchema,
  resetSchema,
  signupSchema,
  updatePasswordSchema,
  type LoginInput,
  type ResetInput,
  type SignupInput,
  type UpdatePasswordInput,
} from "@/validations/auth";

/* ---------- Result shape ----------------------------------------------- */

export interface AuthActionResult {
  ok: boolean;
  message: string;
  /** Field-level errors when validation fails. */
  errors?: Record<string, string[]>;
}

/**
 * Returned when Supabase isn't configured. The auth UI surfaces this as a
 * banner so users understand why their action didn't take effect.
 */
const NOT_CONFIGURED: AuthActionResult = {
  ok: false,
  message:
    "Authentication isn't configured for this environment yet. See supabase/README.md.",
};

/* ---------- signIn ---------------------------------------------------- */

export const signIn = async (
  payload: LoginInput,
  next?: string,
): Promise<AuthActionResult> => {
  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  if (!capabilities.hasSupabasePublic) return NOT_CONFIGURED;

  const supabase = await getSupabaseServerClient();
  if (!supabase) return NOT_CONFIGURED;

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  // Server actions can throw a redirect; the form's own success path is
  // never reached. Default to /dashboard, honor `?next=` if it points at a
  // safe in-app path.
  redirect(safeNext(next) ?? "/dashboard");
};

/* ---------- signUp ---------------------------------------------------- */

export const signUp = async (payload: SignupInput): Promise<AuthActionResult> => {
  const parsed = signupSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  if (!capabilities.hasSupabasePublic) return NOT_CONFIGURED;

  const supabase = await getSupabaseServerClient();
  if (!supabase) return NOT_CONFIGURED;

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${publicEnv.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      data: { full_name: parsed.data.fullName },
    },
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  return {
    ok: true,
    message:
      "Check your email — we sent a confirmation link. Once you click it you'll be signed in.",
  };
};

/* ---------- requestPasswordReset -------------------------------------- */

export const requestPasswordReset = async (
  payload: ResetInput,
): Promise<AuthActionResult> => {
  const parsed = resetSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please enter a valid email.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  if (!capabilities.hasSupabasePublic) return NOT_CONFIGURED;

  const supabase = await getSupabaseServerClient();
  if (!supabase) return NOT_CONFIGURED;

  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${publicEnv.NEXT_PUBLIC_SITE_URL}/auth/callback?type=recovery`,
  });

  // Intentionally always return ok=true — never reveal whether an account
  // exists for the supplied email.
  return {
    ok: true,
    message:
      "If an account exists for that email, we've sent a recovery link. Check your inbox.",
  };
};

/* ---------- updatePassword (after recovery) ---------------------------- */

export const updatePassword = async (
  payload: UpdatePasswordInput,
): Promise<AuthActionResult> => {
  const parsed = updatePasswordSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  if (!capabilities.hasSupabasePublic) return NOT_CONFIGURED;

  const supabase = await getSupabaseServerClient();
  if (!supabase) return NOT_CONFIGURED;

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return { ok: false, message: error.message };

  redirect("/dashboard");
};

/* ---------- signOut --------------------------------------------------- */

export const signOut = async (): Promise<void> => {
  const supabase = await getSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/");
};

/* ---------- helpers --------------------------------------------------- */

/**
 * Validate `next` redirect targets — must be a same-origin in-app path.
 * Open-redirect prevention.
 */
const safeNext = (next: string | undefined): string | null => {
  if (!next) return null;
  if (!next.startsWith("/")) return null;
  if (next.startsWith("//")) return null;
  return next;
};
