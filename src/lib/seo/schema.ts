/**
 * schema.org structured data builders.
 *
 * Render the JSON via `<script type="application/ld+json">` in the page that
 * needs it (typically the root layout for `Organization` + `WebSite`, and per-
 * post for `Article`).
 */

import { siteConfig } from "@/lib/site-config";
import { publicEnv } from "@/lib/utils/env";

const SITE_URL = publicEnv.NEXT_PUBLIC_SITE_URL;

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: siteConfig.description,
  sameAs: siteConfig.social.map((s) => s.href),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: siteConfig.contactEmail,
    availableLanguage: ["en"],
  },
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

interface ArticleSchemaInput {
  title: string;
  description: string;
  path: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  image?: string;
}

export const articleSchema = ({
  title,
  description,
  path,
  publishedTime,
  modifiedTime,
  author = siteConfig.name,
  image = siteConfig.ogImage,
}: ArticleSchemaInput) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
  url: `${SITE_URL}${path}`,
  datePublished: publishedTime,
  dateModified: modifiedTime ?? publishedTime,
  author: { "@type": "Person", name: author },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
});
