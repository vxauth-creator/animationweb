# NishantWebLab

> Engineering premium digital experiences.

A premium modern web engineering studio site — business websites, SaaS, dashboards,
AI integrations, advanced frontend systems, and immersive digital experiences.

This repository is being built in **phases**. Each phase ships a complete, reviewable slice.

## Phase status

| Phase | Scope                                                                              | Status         |
| ----- | ---------------------------------------------------------------------------------- | -------------- |
| 1     | Foundation — design system, providers, scaffolding, SEO/security/a11y baselines    | ✅ in progress |
| 2     | Cinematic hero (R3F + shaders + adaptive rendering)                                | ⏳             |
| 3     | Marketing sections (services, portfolio, about, process, testimonials, contact)    | ⏳             |
| 4     | Supabase backend (schema + RLS + auth + blog CMS + contact persistence)            | ⏳             |
| 5     | Admin dashboard + client portal + realtime                                         | ⏳             |
| 6     | SEO / a11y / performance polish + deployment                                       | ⏳             |

## Tech stack

- **Next.js 15** (App Router, Turbopack dev) + **TypeScript strict**
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **Motion** (Framer Motion successor) + **GSAP** + **Lenis** smooth scroll
- **React Three Fiber** + **Drei** + **Three.js** for the cinematic 3D layer
- **Zustand** + **TanStack Query** for state
- **Zod** + **React Hook Form** for validation
- **Supabase** (Postgres + Auth + Storage + Realtime + Edge Functions) — deferred to Phase 4
- **Vercel** deployment target

## Project structure

```
src/
├── app/                  # App Router routes (marketing, auth, dashboard)
├── components/           # Reusable UI, motion, layout, feedback components
├── features/             # Feature-scoped composites (hero, portfolio, ...)
├── animations/           # Animation presets, easings, timeline helpers
├── hooks/                # Reusable React hooks (perf-tier, magnetic, ...)
├── lib/                  # Cross-cutting library code
│   ├── design/           # Centralized design tokens
│   ├── seo/              # Metadata + schema.org helpers
│   ├── security/         # Header policy, CSP
│   └── utils/            # cn(), env validation, etc.
├── providers/            # Theme, Motion, Query, Lenis (composed in <Providers>)
├── services/             # External integrations (Supabase, ...)
├── store/                # Zustand stores
├── types/                # Cross-cutting TS types
├── validations/          # Zod schemas
└── middleware.ts         # Edge middleware (auth-ready)
```

## Local development

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Then visit http://localhost:3000.

### Useful scripts

```bash
pnpm dev          # turbopack dev server
pnpm build        # production build
pnpm typecheck    # strict TS check
pnpm lint         # eslint
pnpm format       # prettier write
```

## Design system

All design decisions live in **two** sources of truth:

- `src/app/globals.css` — Tailwind v4 `@theme` block (color, spacing, typography, motion tokens).
- `src/lib/design/tokens.ts` — typed mirror of the same tokens for use in JS/TS animations.

Component primitives that consume the tokens:

- `<Container>`, `<Section>` — layout rhythm
- `<GlassCard>`, `<GlowBorder>`, `<GradientBg>` — surface treatments
- `<Button>`, `<Magnetic>` — interactive primitives
- `<FadeIn>`, `<Reveal>`, `<Stagger>`, `<Parallax>` — motion primitives

## Performance philosophy

- Adaptive rendering tier (`useDevicePerfTier`) drives 3D quality and motion intensity.
- All 3D / heavy visuals are dynamically imported and SSR-disabled.
- `prefers-reduced-motion` is honored across every motion primitive.
- Tailwind v4 + tree-shaken `optimizePackageImports` keep first paint fast.

## Security philosophy

- Strict CSP, HSTS, COOP/COEP, frame-ancestors, X-Content-Type-Options.
- All env access flows through a Zod-validated boundary (`src/lib/utils/env.ts`).
- Supabase RLS-first; service role key never crosses the client boundary.
- All forms validated with Zod (server + client) before persistence.

## License

© 2026 NishantWebLab. All rights reserved.
