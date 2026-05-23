import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { capabilities, publicEnv } from "@/lib/utils/env";

import type { Database } from "./types";

/**
 * Middleware Supabase client + session refresh.
 *
 * Returns a `NextResponse` with refreshed auth cookies set on it. Always use
 * the returned response from middleware so the cookie writes propagate to the
 * browser — never construct a fresh `NextResponse.next()` afterwards or the
 * refreshed tokens will be dropped.
 *
 * If Supabase env keys are absent (Phase 1 / preview / staging without auth),
 * the function returns a plain pass-through response and a `null` user.
 */
export const updateSupabaseSession = async (request: NextRequest) => {
  let response = NextResponse.next({
    request: { headers: new Headers(request.headers) },
  });

  if (!capabilities.hasSupabasePublic) {
    return { response, user: null as null | { id: string } };
  }

  const supabase = createServerClient<Database>(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL as string,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (
          cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }>,
        ) => {
          for (const { name, value, options } of cookiesToSet) {
            request.cookies.set({ name, value, ...options });
          }
          response = NextResponse.next({
            request: { headers: new Headers(request.headers) },
          });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set({ name, value, ...options });
          }
        },
      },
    },
  );

  // `getUser()` triggers a token refresh if needed and writes refreshed
  // cookies via the `setAll` callback above.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
};
