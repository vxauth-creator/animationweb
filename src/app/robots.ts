import type { MetadataRoute } from "next";

import { publicEnv } from "@/lib/utils/env";

const SITE_URL = publicEnv.NEXT_PUBLIC_SITE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep dashboard / auth / api off public indexes.
        disallow: ["/dashboard", "/login", "/signup", "/reset", "/api"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
