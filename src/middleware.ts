import { NextResponse, type NextRequest } from "next/server";

import { updateSupabaseSession } from "@/services/supabase/middleware-client";

/**
 * Edge middleware.
 *
 * Two responsibilities:
 *
 *   1. **Session refresh** — calls `updateSupabaseSession` for every matched
 *      route. The Supabase SSR client refreshes tokens automatically when
 *      they're near expiry; the middleware is the place where the rotated
 *      cookies actually land on the response.
 *
 *   2. **Route protection** — `/dashboard/**` requires a signed-in user.
 *      Unauthed users are bounced to `/login` with `?next=` preserving the
 *      target so post-login redirects land in the right place.
 *
 * If Supabase isn't configured (env keys absent, Phase 1 default), the
 * middleware is a no-op pass-through. Dashboard routes still render — they
 * already render an empty/coming-soon state by design — but no auth is
 * enforced. The moment env keys are populated, protection turns on with
 * zero code changes.
 */
const PROTECTED_PREFIXES = ["/dashboard"];

export const middleware = async (request: NextRequest) => {
  const requestId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);

  const { response, user } = await updateSupabaseSession(request);
  response.headers.set("x-request-id", requestId);

  const path = request.nextUrl.pathname;
  const isProtected = PROTECTED_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  return response;
};

/**
 * Run middleware on all routes EXCEPT:
 *  - /_next/static, /_next/image, favicons, robots, sitemap (Next internals + SEO files)
 *  - public asset extensions
 */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2|ttf|otf|mp4|webm)).*)",
  ],
};
