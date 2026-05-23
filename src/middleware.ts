import { NextResponse, type NextRequest } from "next/server";

/**
 * Edge middleware.
 *
 * For Phase 1 this is intentionally minimal — it sets a request-id header so
 * server logs can correlate a request across components, and it's the
 * structural seam where Phase 4 will plug in Supabase auth + RBAC for the
 * `/dashboard/*` and `/api/*` paths.
 *
 * The matcher excludes static assets / Next internals to keep the runtime cost
 * negligible.
 */
export const middleware = (request: NextRequest) => {
  const requestId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);

  const response = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  });

  response.headers.set("x-request-id", requestId);

  // Phase 4 hook: validate Supabase session for protected paths.
  // const protectedPaths = [/^\/dashboard(\/.*)?$/];
  // if (protectedPaths.some((re) => re.test(request.nextUrl.pathname))) {
  //   const supabase = createSupabaseMiddlewareClient(request, response);
  //   const { data: { user } } = await supabase.auth.getUser();
  //   if (!user) return NextResponse.redirect(new URL("/login", request.url));
  // }

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
