/**
 * Service catalog — static seed data.
 *
 * Phase 4 will read this from Supabase (`services` table). Components consume
 * the typed array below; swapping in a server fetch later is a one-line change.
 *
 * Each entry's `slug` is used both as a stable React key and as a deep-link
 * target (e.g. `/services#websites`).
 */

export interface Service {
  /** Stable, URL-safe identifier. */
  readonly slug: string;
  /** Headline. */
  readonly title: string;
  /** One-line summary (≤ 90 chars for card density). */
  readonly summary: string;
  /** 2–4 bullet capabilities for the expandable detail panel. */
  readonly capabilities: ReadonlyArray<string>;
  /** Headline result/metric — kept short, optional. */
  readonly metric?: { readonly value: string; readonly label: string };
  /** Accent color for the card glow. */
  readonly accent: "blue" | "cyan" | "violet";
  /** Compact glyph rendered as a CSS-only mark (keeps icons tree-light). */
  readonly glyph: GlyphKey;
}

export type GlyphKey =
  | "browser"
  | "stack"
  | "grid"
  | "spark"
  | "cart"
  | "gauge"
  | "atoms"
  | "node";

export const services: ReadonlyArray<Service> = [
  {
    slug: "websites",
    title: "Business websites",
    summary: "Brand-defining marketing sites with motion-rich storytelling and tight conversion.",
    capabilities: [
      "Design systems + content modeling",
      "Lighthouse 95+ on mobile",
      "OG / SEO / schema baked in",
    ],
    metric: { value: "98+", label: "Lighthouse" },
    accent: "violet",
    glyph: "browser",
  },
  {
    slug: "saas",
    title: "SaaS platforms",
    summary: "Multi-tenant product surfaces with auth, billing, and operations baked in.",
    capabilities: [
      "Type-safe RPC + RLS",
      "Stripe billing + entitlements",
      "Audit + observability ready",
    ],
    metric: { value: "0→1", label: "Production" },
    accent: "blue",
    glyph: "stack",
  },
  {
    slug: "dashboards",
    title: "Admin dashboards",
    summary: "Operational consoles with realtime data and the polish of consumer software.",
    capabilities: ["RBAC + permissions", "Realtime + filters", "Bulk-action ergonomics"],
    metric: { value: "RBAC", label: "Day one" },
    accent: "cyan",
    glyph: "grid",
  },
  {
    slug: "ai",
    title: "AI integrations",
    summary: "LLM-powered features that ship to production — agents, search, classification.",
    capabilities: ["Prompt + eval pipelines", "Retrieval + tools", "Graceful failure modes"],
    metric: { value: "LLM", label: "Native" },
    accent: "violet",
    glyph: "spark",
  },
  {
    slug: "commerce",
    title: "E-commerce",
    summary: "High-conversion storefronts and headless commerce with cinematic product moments.",
    capabilities: ["Shopify / Stripe / custom", "PDP motion + AR", "Edge-cached at scale"],
    accent: "blue",
    glyph: "cart",
  },
  {
    slug: "performance",
    title: "Performance audits",
    summary: "Core Web Vitals deep-dives with a 10-day plan to measurable improvements.",
    capabilities: ["Lighthouse + RUM", "Bundle + render budgets", "30-day verification"],
    metric: { value: "10d", label: "Plan" },
    accent: "cyan",
    glyph: "gauge",
  },
  {
    slug: "ux",
    title: "UI/UX systems",
    summary: "Token-driven design systems and component libraries shipped as living code.",
    capabilities: ["Tokens + theming", "Accessibility-first", "Cross-team adoption"],
    accent: "violet",
    glyph: "atoms",
  },
  {
    slug: "apps",
    title: "Web applications",
    summary: "Domain-specific tools — CRMs, internal platforms, vertical SaaS — with first-class motion.",
    capabilities: ["Custom workflows", "Offline + collab patterns", "Enterprise SSO ready"],
    accent: "blue",
    glyph: "node",
  },
] as const;
