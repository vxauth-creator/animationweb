-- =============================================================================
-- NishantWebLab — seed data
--
-- Mirrors the static arrays in src/lib/data/* so the dashboard and the
-- public site render identical content the moment Supabase is configured.
--
-- Run with:
--   supabase db reset           # local dev (drops + re-applies + seeds)
--   psql "<conn>" -f seed.sql   # any environment
-- =============================================================================

-- services -----------------------------------------------------------------
insert into public.services (slug, title, summary, capabilities, metric_value, metric_label, accent, glyph, order_index, published)
values
  ('websites',    'Business websites',  'Brand-defining marketing sites with motion-rich storytelling and tight conversion.',
    array['Design systems + content modeling','Lighthouse 95+ on mobile','OG / SEO / schema baked in'],
    '98+', 'Lighthouse', 'violet', 'browser', 1, true),
  ('saas',        'SaaS platforms',     'Multi-tenant product surfaces with auth, billing, and operations baked in.',
    array['Type-safe RPC + RLS','Stripe billing + entitlements','Audit + observability ready'],
    '0→1', 'Production', 'blue', 'stack', 2, true),
  ('dashboards',  'Admin dashboards',   'Operational consoles with realtime data and the polish of consumer software.',
    array['RBAC + permissions','Realtime + filters','Bulk-action ergonomics'],
    'RBAC', 'Day one', 'cyan', 'grid', 3, true),
  ('ai',          'AI integrations',    'LLM-powered features that ship to production — agents, search, classification.',
    array['Prompt + eval pipelines','Retrieval + tools','Graceful failure modes'],
    'LLM', 'Native', 'violet', 'spark', 4, true),
  ('commerce',    'E-commerce',         'High-conversion storefronts and headless commerce with cinematic product moments.',
    array['Shopify / Stripe / custom','PDP motion + AR','Edge-cached at scale'],
    null, null, 'blue', 'cart', 5, true),
  ('performance', 'Performance audits', 'Core Web Vitals deep-dives with a 10-day plan to measurable improvements.',
    array['Lighthouse + RUM','Bundle + render budgets','30-day verification'],
    '10d', 'Plan', 'cyan', 'gauge', 6, true),
  ('ux',          'UI/UX systems',      'Token-driven design systems and component libraries shipped as living code.',
    array['Tokens + theming','Accessibility-first','Cross-team adoption'],
    null, null, 'violet', 'atoms', 7, true),
  ('apps',        'Web applications',   'Domain-specific tools — CRMs, internal platforms, vertical SaaS — with first-class motion.',
    array['Custom workflows','Offline + collab patterns','Enterprise SSO ready'],
    null, null, 'blue', 'node', 8, true)
on conflict (slug) do nothing;

-- projects -----------------------------------------------------------------
insert into public.projects (slug, title, client, summary, category, year, stack, metrics, accent, featured, published, published_at)
values
  ('helix-analytics',  'Helix',    'Helix Analytics',
    'Realtime SaaS analytics platform with segmentation, funnels, and a first-class dashboard.',
    'saas',      2025, array['Next.js','TypeScript','Postgres','ClickHouse','Stripe'],
    '[{"value":"180ms","label":"p95 query"},{"value":"12M","label":"events/day"}]'::jsonb,
    'blue',   true,  true, '2025-06-01'::timestamptz),
  ('aurora-design',    'Aurora',   'Aurora Studio',
    'AI design assistant — generates token-driven brand systems from a single prompt.',
    'ai',        2025, array['React','Edge Functions','OpenAI','Vector DB','R3F'],
    '[{"value":"4.2s","label":"avg generate"}]'::jsonb,
    'violet', true,  true, '2025-04-15'::timestamptz),
  ('vault-portal',     'Vault',    'Vault Legal',
    'End-to-end encrypted client portal — case files, billing, and secure messaging.',
    'dashboard', 2024, array['Next.js','Supabase','TanStack Query','Stripe'],
    '[]'::jsonb, 'cyan',   false, true, '2024-11-20'::timestamptz),
  ('lumen-commerce',   'Lumen',    'Lumen Goods',
    'Headless storefront with cinematic product reveals and an editor-friendly CMS.',
    'commerce',  2024, array['Next.js','Shopify','Sanity','Framer Motion'],
    '[{"value":"+38%","label":"conv. rate"},{"value":"1.1s","label":"LCP"}]'::jsonb,
    'blue',   false, true, '2024-09-10'::timestamptz),
  ('north-experience', 'North',    'North Capital',
    'Brand-defining marketing site with a cinematic R3F intro and global localization.',
    'marketing', 2024, array['Next.js','R3F','GSAP','Lenis'],
    '[]'::jsonb, 'violet', false, true, '2024-06-05'::timestamptz),
  ('gridline-ops',     'Gridline', 'Gridline Energy',
    'Operations console for grid telemetry — realtime alarms, RBAC, and timeline replay.',
    'dashboard', 2023, array['Next.js','Postgres','Realtime','D3'],
    '[]'::jsonb, 'cyan',   false, true, '2023-11-01'::timestamptz)
on conflict (slug) do nothing;

-- testimonials -------------------------------------------------------------
insert into public.testimonials (quote, author, author_role, company, tag, order_index, published)
values
  ('We shipped six months ahead of schedule. The dashboard alone moved retention more than any product launch this year.',
    'Maya Patel',     'CTO',            'Helix Analytics', 'SaaS · Dashboards', 1, true),
  ('They treated our motion language as engineering, not decoration. The result feels like premium software, not a portfolio piece.',
    'Jonas Reuter',   'Head of Design', 'Aurora Studio',   'AI · Brand',         2, true),
  ('Our enterprise clients ask which agency built the portal. That has never happened to us before.',
    'Priya Khanna',   'Founder',        'Vault Legal',     'Client portal',     3, true),
  ('Conversion is up 38% on the redesign and Core Web Vitals are dark green. Best investment we made this year.',
    'Diego Alvarez',  'VP Growth',      'Lumen Goods',     'E-commerce',        4, true),
  ('Cinematic without being heavy. We constantly hear our marketing site looks like Stripe or Linear — but with our voice.',
    'Sophie Tan',     'Brand Lead',     'North Capital',   'Marketing site',    5, true);

-- =============================================================================
-- IMPORTANT: do not seed `blog_posts` here.
-- The site reads MDX from `content/posts/*.mdx` until an admin opts in to
-- DB-backed posts via the dashboard (Phase 5).
-- =============================================================================
