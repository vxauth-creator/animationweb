/**
 * About-page content — studio narrative + journey.
 *
 * Kept structured so the marketing page can swap presentation without
 * rewriting copy.
 */

export interface PhilosophyPrinciple {
  readonly title: string;
  readonly copy: string;
}

export interface JourneyEntry {
  readonly year: string;
  readonly title: string;
  readonly copy: string;
}

export interface StudioStat {
  /** Numeric component for the animated counter (use `null` for non-numeric). */
  readonly value: number | null;
  /** Display string when `value` is `null` (e.g. "0→1"). */
  readonly display?: string;
  readonly label: string;
  /** Optional suffix appended after the count-up animation (e.g. "+", "%"). */
  readonly suffix?: string;
}

export const philosophy: ReadonlyArray<PhilosophyPrinciple> = [
  {
    title: "Engineering, not decoration",
    copy: "Motion, 3D, and visual polish exist to communicate — never to perform. Every effect carries weight.",
  },
  {
    title: "Type-safe, top to bottom",
    copy: "TypeScript, Zod, and tested boundaries from form validation to database schemas. Failure modes are designed.",
  },
  {
    title: "Accessibility as a default",
    copy: "Reduced-motion, keyboard navigation, semantic markup, and color contrast are part of the design system, not retrofits.",
  },
  {
    title: "Performance is non-negotiable",
    copy: "Adaptive rendering, dynamic imports, and CWV budgets ship from day one. Premium feel, mobile reality.",
  },
  {
    title: "Built to be handed off",
    copy: "Clear architecture, tokens, and Storybook so the next team accelerates instead of starting over.",
  },
  {
    title: "Quiet over loud",
    copy: "Minimalist by default — the work should feel intelligent and expensive, not flashy.",
  },
];

export const journey: ReadonlyArray<JourneyEntry> = [
  {
    year: "2026",
    title: "NishantWebLab",
    copy: "Studio model — engineering premium digital experiences for product, brand, and ops teams.",
  },
  {
    year: "2024",
    title: "Specialist engagements",
    copy: "Cinematic marketing sites, SaaS dashboards, AI features — shipped end-to-end.",
  },
  {
    year: "2022",
    title: "Senior product engineer",
    copy: "Multi-tenant platforms with realtime ops, payments, and growth instrumentation.",
  },
  {
    year: "2020",
    title: "Frontend systems",
    copy: "Design-systems-first frontend at scale — tokens, motion specs, component libraries.",
  },
];

export const studioStats: ReadonlyArray<StudioStat> = [
  { value: 60, label: "Projects shipped", suffix: "+" },
  { value: 98, label: "Average Lighthouse" },
  { value: 12, label: "Industries served" },
  { value: null, display: "0→1", label: "From zero to launch" },
];
