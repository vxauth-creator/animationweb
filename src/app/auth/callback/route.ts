import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseServerClient } from "@/services/supabase/server";

/**
 * `/auth/callback` — handles OAuth + email-link redirects.
 *
 * Supabase appends `?code=...` (PKCE flow) for confirmed signups, magic
 * links, OAuth, and password recovery. We exchange the code for a session
 * cookie, then redirect to the appropriate landing page.
 *
 * For password recovery we route to `/auth/update-password` instead of the
 * dashboard so the user can complete their flow. Detected via the `type`
 * query param Supabase forwards.
 */
export const GET = async (request: NextRequest) => {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const type = searchParams.get("type");

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.redirect(`${origin}/login?error=not_configured`);
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
  }

  const target =
    type === "recovery"
      ? `${origin}/auth/update-password`
      : `${origin}${safeNext(next)}`;

  return NextResponse.redirect(target);
};

const safeNext = (n: string): string => {
  if (!n.startsWith("/") || n.startsWith("//")) return "/dashboard";
  return n;
};
