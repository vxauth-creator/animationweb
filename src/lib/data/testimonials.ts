/**
 * Testimonials — static seed data.
 *
 * Phase 4 swaps to Supabase. Quote text deliberately avoids superlatives like
 * "the best" or "world-class" — premium voice = specific, calm, results-led.
 */

export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly author: string;
  readonly role: string;
  readonly company: string;
  /** Optional 1–2 word badge that summarizes the engagement. */
  readonly tag?: string;
}

export const testimonials: ReadonlyArray<Testimonial> = [
  {
    id: "tm-helix",
    quote:
      "We shipped six months ahead of schedule. The dashboard alone moved retention more than any product launch this year.",
    author: "Maya Patel",
    role: "CTO",
    company: "Helix Analytics",
    tag: "SaaS · Dashboards",
  },
  {
    id: "tm-aurora",
    quote:
      "They treated our motion language as engineering, not decoration. The result feels like premium software, not a portfolio piece.",
    author: "Jonas Reuter",
    role: "Head of Design",
    company: "Aurora Studio",
    tag: "AI · Brand",
  },
  {
    id: "tm-vault",
    quote:
      "Our enterprise clients ask which agency built the portal. That has never happened to us before.",
    author: "Priya Khanna",
    role: "Founder",
    company: "Vault Legal",
    tag: "Client portal",
  },
  {
    id: "tm-lumen",
    quote:
      "Conversion is up 38% on the redesign and Core Web Vitals are dark green. Best investment we made this year.",
    author: "Diego Alvarez",
    role: "VP Growth",
    company: "Lumen Goods",
    tag: "E-commerce",
  },
  {
    id: "tm-north",
    quote:
      "Cinematic without being heavy. We constantly hear our marketing site looks like Stripe or Linear — but with our voice.",
    author: "Sophie Tan",
    role: "Brand Lead",
    company: "North Capital",
    tag: "Marketing site",
  },
] as const;
