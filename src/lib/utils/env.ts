/**
 * Environment validation.
 *
 * All `process.env` access in app code MUST flow through this module.
 * Zod-validates at import time so misconfiguration fails loudly at build,
 * never silently at runtime.
 *
 * Server-only secrets are kept on `serverEnv` and are tree-shaken from the
 * client bundle (Next.js will throw if they're imported into a Client Component).
 */

import { z } from "zod";

// ---- Public (browser-safe) -------------------------------------------------

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("http://localhost:3000")
    .transform((v) => v.replace(/\/$/, "")),

  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional().or(z.literal("")),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional().or(z.literal("")),

  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional().or(z.literal("")),

  NEXT_PUBLIC_ENABLE_EXPERIMENTAL_3D: z
    .enum(["true", "false"])
    .default("true")
    .transform((v) => v === "true"),
});

const parsedPublic = publicSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  NEXT_PUBLIC_ENABLE_EXPERIMENTAL_3D: process.env.NEXT_PUBLIC_ENABLE_EXPERIMENTAL_3D,
});

if (!parsedPublic.success) {
  console.error("Invalid public env:", parsedPublic.error.flatten().fieldErrors);
  throw new Error("Invalid public environment configuration. See logs above.");
}

export const publicEnv = parsedPublic.data;

// ---- Server-only ----------------------------------------------------------
// Lazy-evaluated so it never runs during client bundling.

const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().or(z.literal("")),
  SENTRY_DSN: z.string().optional().or(z.literal("")),
});

let _serverEnv: z.infer<typeof serverSchema> | null = null;

export const serverEnv = (): z.infer<typeof serverSchema> => {
  if (typeof window !== "undefined") {
    throw new Error("serverEnv() must not be called in the browser.");
  }
  if (_serverEnv) return _serverEnv;

  const parsed = serverSchema.safeParse({
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,
  });
  if (!parsed.success) {
    console.error("Invalid server env:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid server environment configuration. See logs above.");
  }
  _serverEnv = parsed.data;
  return _serverEnv;
};

// ---- Capability flags -----------------------------------------------------
// Convenience booleans derived from env (used by feature gates).

export const capabilities = {
  hasSupabasePublic: Boolean(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL && publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  ),
  hasPlausible: Boolean(publicEnv.NEXT_PUBLIC_PLAUSIBLE_DOMAIN),
  experimental3D: publicEnv.NEXT_PUBLIC_ENABLE_EXPERIMENTAL_3D,
} as const;
