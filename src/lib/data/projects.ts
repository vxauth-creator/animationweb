/**
 * Portfolio projects — static seed data.
 *
 * Phase 4 will swap this for a Supabase query against the `projects` table.
 * Until then, components render this typed array. Sample entries are
 * intentionally generic + plausible — replace with real client work as it
 * becomes shareable.
 */

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly client: string;
  readonly summary: string;
  readonly category: "saas" | "marketing" | "dashboard" | "commerce" | "ai" | "experience";
  readonly year: number;
  readonly stack: ReadonlyArray<string>;
  readonly metrics?: ReadonlyArray<{ readonly value: string; readonly label: string }>;
  readonly liveUrl?: string;
  readonly repoUrl?: string;
  /** Accent for the card border treatment. */
  readonly accent: "blue" | "cyan" | "violet";
  /** Whether the card spans 2 columns on desktop — gives the grid rhythm. */
  readonly featured?: boolean;
}

export const projects: ReadonlyArray<Project> = [
  {
    slug: "helix-analytics",
    title: "Helix",
    client: "Helix Analytics",
    summary:
      "Realtime SaaS analytics platform with segmentation, funnels, and a first-class dashboard.",
    category: "saas",
    year: 2025,
    stack: ["Next.js", "TypeScript", "Postgres", "ClickHouse", "Stripe"],
    metrics: [
      { value: "180ms", label: "p95 query" },
      { value: "12M", label: "events/day" },
    ],
    accent: "blue",
    featured: true,
  },
  {
    slug: "aurora-design",
    title: "Aurora",
    client: "Aurora Studio",
    summary:
      "AI design assistant — generates token-driven brand systems from a single prompt.",
    category: "ai",
    year: 2025,
    stack: ["React", "Edge Functions", "OpenAI", "Vector DB", "R3F"],
    metrics: [{ value: "4.2s", label: "avg generate" }],
    accent: "violet",
    featured: true,
  },
  {
    slug: "vault-portal",
    title: "Vault",
    client: "Vault Legal",
    summary:
      "End-to-end encrypted client portal — case files, billing, and secure messaging.",
    category: "dashboard",
    year: 2024,
    stack: ["Next.js", "Supabase", "TanStack Query", "Stripe"],
    accent: "cyan",
  },
  {
    slug: "lumen-commerce",
    title: "Lumen",
    client: "Lumen Goods",
    summary:
      "Headless storefront with cinematic product reveals and an editor-friendly CMS.",
    category: "commerce",
    year: 2024,
    stack: ["Next.js", "Shopify", "Sanity", "Framer Motion"],
    metrics: [
      { value: "+38%", label: "conv. rate" },
      { value: "1.1s", label: "LCP" },
    ],
    accent: "blue",
  },
  {
    slug: "north-experience",
    title: "North",
    client: "North Capital",
    summary:
      "Brand-defining marketing site with a cinematic R3F intro and global localization.",
    category: "marketing",
    year: 2024,
    stack: ["Next.js", "R3F", "GSAP", "Lenis"],
    accent: "violet",
  },
  {
    slug: "gridline-ops",
    title: "Gridline",
    client: "Gridline Energy",
    summary:
      "Operations console for grid telemetry — realtime alarms, RBAC, and timeline replay.",
    category: "dashboard",
    year: 2023,
    stack: ["Next.js", "Postgres", "Realtime", "D3"],
    accent: "cyan",
  },
] as const;
