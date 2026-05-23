import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";
import { publicEnv } from "@/lib/utils/env";

const SITE_URL = publicEnv.NEXT_PUBLIC_SITE_URL;

/**
 * Static sitemap — auto-extends to dynamic blog/project routes in Phase 4 once
 * the Supabase content layer is live (read posts/projects + map to URLs).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...siteConfig.primaryNav.map((item) => ({
      url: `${SITE_URL}${item.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
  return staticRoutes;
}
