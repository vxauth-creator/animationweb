"use client";

import { createBrowserClient } from "@supabase/ssr";

import { capabilities, publicEnv } from "@/lib/utils/env";

import type { Database } from "./types";

/**
 * Browser-side Supabase client.
 *
 * Returns a memoized client typed to our schema, or `null` if Supabase env
 * keys are absent (Phase 1 — Supabase deferred). Callers must null-check.
 *
 * The return type is intentionally inferred so it tracks the underlying
 * `@supabase/ssr` factory across versions without forcing us to mirror its
 * generic signature.
 */
type SupabaseBrowserClient = ReturnType<typeof createBrowserClient<Database>>;

let _client: SupabaseBrowserClient | null = null;

export const getSupabaseBrowserClient = (): SupabaseBrowserClient | null => {
  if (!capabilities.hasSupabasePublic) return null;
  if (_client) return _client;

  _client = createBrowserClient<Database>(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL as string,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  );
  return _client;
};
