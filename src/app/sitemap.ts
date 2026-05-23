import type { MetadataRoute } from "next";

import { getPosts } from "@/lib/blog/posts";
import { siteConfig } from "@/lib/site-config";
import { publicEnv } from "@/lib/utils/env";

const SITE_URL = publicEnv.NEXT_PUBLIC_SITE_URL;

/**
 * Sitemap — static marketing routes + every published blog post.
 *
 * `getPosts()` automatically draws from Supabase when configured and falls
 * back to the MDX filesystem otherwise — so the sitemap is always accurate
 * regardless of where content lives.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const posts = await getPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt
      ? new Date(post.updatedAt)
      : new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
