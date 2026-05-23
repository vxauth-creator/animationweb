/**
 * SEO metadata helpers.
 *
 * Single composable function that produces a Next.js `Metadata` object with
 * sensible defaults (title template, OpenGraph, Twitter card, canonical URL,
 * robots directives) so every page just declares what's unique about it.
 */

import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import { publicEnv } from "@/lib/utils/env";

interface BuildMetadataInput {
  /** Page-specific title. The site name is appended via the title template. */
  title?: string;
  /** Page-specific description. Falls back to the global description. */
  description?: string;
  /** Page path (e.g. "/work"). Used for canonical + OG URL. Defaults to "/". */
  path?: string;
  /** Override OG/Twitter image (relative to siteUrl). */
  image?: string;
  /** Mark this page as not indexable. */
  noIndex?: boolean;
  /** OpenGraph type — defaults to `website`. Use `article` for blog posts. */
  type?: "website" | "article";
  /** Article publish date (ISO 8601) — when type is `article`. */
  publishedTime?: string;
}

const SITE_URL = publicEnv.NEXT_PUBLIC_SITE_URL;

export const buildMetadata = ({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
  type = "website",
  publishedTime,
}: BuildMetadataInput = {}): Metadata => {
  const url = `${SITE_URL}${path}`;
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: title ?? { default: siteConfig.tagline, template: `%s — ${siteConfig.name}` },
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "technology",
    keywords: [
      "web development",
      "premium websites",
      "SaaS",
      "dashboards",
      "AI integration",
      "Next.js",
      "design engineering",
    ],
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title: title ?? siteConfig.tagline,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
      locale: "en_US",
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.tagline,
      description,
      images: [ogImage],
    },
    icons: {
      icon: [{ url: "/favicon.ico" }],
      apple: [{ url: "/apple-touch-icon.png" }],
    },
  };
};
