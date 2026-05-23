import "server-only";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

import { capabilities, publicEnv, serverEnv } from "@/lib/utils/env";

import type { Database } from "./types";

/**
 * Inferred Supabase client types — track upstream generic changes without
 * forcing us to mirror them.
 */
type SupabaseServerClient = ReturnType<typeof createServerClient<Database>>;

/**
 * Server-side Supabase client (Server Components / Route Handlers).
 *
 * Reads/writes session cookies through Next.js' async `cookies()` API. Returns
 * `null` when Supabase env is unset (Phase 1) so server code can render a
 * safe fallback rather than crash.
 */
export const getSupabaseServerClient = async (): Promise<SupabaseServerClient | null> => {
  if (!capabilities.hasSupabasePublic) return null;

  const cookieStore = await cookies();

  return createServerClient<Database>(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL as string,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (
          cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }>,
        ) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // `set` throws when called from a Server Component render path —
            // safe to ignore there; refresh happens via Server Actions / route handlers.
          }
        },
      },
    },
  );
};

/**
 * Privileged service-role client (server-only, never expose to browser).
 *
 * Used for trusted operations that bypass RLS — admin-only mutations and
 * cron / queue / webhook handlers. Returns `null` when not configured.
 *
 * IMPORTANT: never call this from a Client Component. Constructed lazily so
 * the module is safe to import from shared code.
 */
export const getSupabaseServiceRoleClient = async () => {
  if (!capabilities.hasSupabasePublic) return null;
  const env = serverEnv();
  if (!env.SUPABASE_SERVICE_ROLE_KEY) return null;

  // Imported lazily to avoid pulling auth-helpers paths into every server bundle.
  const { createClient } = await import("@supabase/supabase-js");
  return createClient<Database>(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL as string,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
};
