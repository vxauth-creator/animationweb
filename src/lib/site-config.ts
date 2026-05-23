/**
 * Site configuration — single source of truth for navigation, copy, and links.
 *
 * Used by `<Nav>`, `<Footer>`, sitemap.ts, robots.ts, and SEO helpers so that
 * adding a route or social link updates every consumer in one place.
 */

export const siteConfig = {
  name: "NishantWebLab",
  shortName: "NWL",
  tagline: "Engineering Modern Digital Experiences",
  description:
    "We build premium websites, dashboards, SaaS platforms, and immersive digital products.",
  ogImage: "/og.png",
  contactEmail: "hello@nishantweblab.com",

  // Internal navigation.
  primaryNav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Blog", href: "/blog" },
  ] as const,

  cta: {
    primary: { label: "Start project", href: "/contact" },
    secondary: { label: "View work", href: "/work" },
  },

  // Footer column groups.
  footerNav: [
    {
      title: "Services",
      links: [
        { label: "Business websites", href: "/services#websites" },
        { label: "SaaS development", href: "/services#saas" },
        { label: "Admin dashboards", href: "/services#dashboards" },
        { label: "AI integrations", href: "/services#ai" },
        { label: "Performance audits", href: "/services#performance" },
      ],
    },
    {
      title: "Studio",
      links: [
        { label: "About", href: "/about" },
        { label: "Process", href: "/process" },
        { label: "Work", href: "/work" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Contact", href: "/contact" },
        { label: "Email", href: "mailto:hello@nishantweblab.com" },
      ],
    },
  ] as const,

  social: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "X", href: "https://x.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ] as const,
} as const;

export type SiteConfig = typeof siteConfig;
