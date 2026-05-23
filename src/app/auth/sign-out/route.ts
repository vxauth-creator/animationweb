import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseServerClient } from "@/services/supabase/server";

/**
 * POST `/auth/sign-out` — token-safe sign-out.
 *
 * The dashboard sign-out button posts here instead of using a Server Action
 * so we can be explicit about the cookie clearing semantics and the redirect
 * URL. GET is unsupported (CSRF — sign-out should always be a POST).
 */
export const POST = async (request: NextRequest) => {
  const supabase = await getSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/", request.url), { status: 303 });
};
