-- =============================================================================
-- NishantWebLab — initial schema
--
-- Tables:
--   profiles, services, projects, testimonials, blog_posts, messages
--
-- Conventions:
--   - All ids are uuid (gen_random_uuid()).
--   - All mutable rows have created_at + updated_at; updated_at is maintained
--     by a single shared trigger function `public.handle_updated_at`.
--   - Auth integration is via the `auth.users` -> `public.profiles` trigger
--     in 0003_auth_triggers.sql.
-- =============================================================================

-- Required extensions ------------------------------------------------------
create extension if not exists "pgcrypto"; -- gen_random_uuid

-- Shared trigger function --------------------------------------------------
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- profiles -----------------------------------------------------------------
-- One row per auth.users row. Created by the auth trigger in 0003.
create table public.profiles (
  id            uuid        primary key default gen_random_uuid(),
  user_id       uuid        not null unique references auth.users(id) on delete cascade,
  full_name     text,
  avatar_url    text,
  role          text        not null default 'client'
                  check (role in ('admin', 'editor', 'client')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index profiles_role_idx on public.profiles (role);

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- services ------------------------------------------------------------------
create table public.services (
  id            uuid        primary key default gen_random_uuid(),
  slug          text        not null unique,
  title         text        not null,
  summary       text        not null,
  capabilities  text[]      not null default '{}',
  metric_value  text,
  metric_label  text,
  accent        text        not null default 'violet'
                  check (accent in ('blue', 'cyan', 'violet')),
  glyph         text        not null default 'browser',
  order_index   int         not null default 0,
  published     boolean     not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index services_published_order_idx
  on public.services (published, order_index);

create trigger services_updated_at
  before update on public.services
  for each row execute function public.handle_updated_at();

-- projects ------------------------------------------------------------------
create table public.projects (
  id            uuid        primary key default gen_random_uuid(),
  slug          text        not null unique,
  title         text        not null,
  client        text        not null,
  summary       text        not null,
  category      text        not null
                  check (category in
                    ('saas', 'marketing', 'dashboard', 'commerce', 'ai', 'experience')),
  year          int         not null,
  stack         text[]      not null default '{}',
  metrics       jsonb       not null default '[]'::jsonb,
  cover_url     text,
  live_url      text,
  repo_url      text,
  accent        text        not null default 'violet'
                  check (accent in ('blue', 'cyan', 'violet')),
  featured      boolean     not null default false,
  published     boolean     not null default true,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index projects_published_year_idx
  on public.projects (published, year desc);
create index projects_category_idx on public.projects (category);

create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.handle_updated_at();

-- testimonials --------------------------------------------------------------
create table public.testimonials (
  id            uuid        primary key default gen_random_uuid(),
  quote         text        not null,
  author        text        not null,
  author_role   text        not null,
  company       text        not null,
  tag           text,
  order_index   int         not null default 0,
  published     boolean     not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index testimonials_published_order_idx
  on public.testimonials (published, order_index);

create trigger testimonials_updated_at
  before update on public.testimonials
  for each row execute function public.handle_updated_at();

-- blog_posts ----------------------------------------------------------------
create table public.blog_posts (
  id              uuid        primary key default gen_random_uuid(),
  slug            text        not null unique,
  title           text        not null,
  excerpt         text        not null,
  content         text        not null, -- MDX source
  cover_url       text,
  tags            text[]      not null default '{}',
  category_slug   text,
  author_id       uuid        references public.profiles(id) on delete set null,
  reading_minutes int,
  published       boolean     not null default false,
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index blog_posts_published_at_idx
  on public.blog_posts (published, published_at desc);
create index blog_posts_category_idx on public.blog_posts (category_slug);

create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.handle_updated_at();

-- messages (contact form submissions) --------------------------------------
create table public.messages (
  id            uuid        primary key default gen_random_uuid(),
  name          text        not null,
  email         text        not null,
  company       text,
  budget        text,
  message       text        not null,
  source        text        default 'contact_form',
  ip_hash       text,        -- optional: hashed IP for rate-limit auditing
  user_agent    text,
  handled       boolean     not null default false,
  handled_by    uuid        references public.profiles(id) on delete set null,
  handled_at    timestamptz,
  created_at    timestamptz not null default now()
);

create index messages_unhandled_idx
  on public.messages (handled, created_at desc)
  where handled = false;
create index messages_email_idx on public.messages (email);

-- =============================================================================
-- Comments — surface intent for anyone exploring the schema in the dashboard
-- =============================================================================
comment on table public.profiles      is 'Extended profile (1:1 with auth.users) — owns the role.';
comment on table public.services      is 'Marketing service catalog rendered on /services.';
comment on table public.projects      is 'Portfolio entries rendered on /work.';
comment on table public.testimonials  is 'Client testimonials rendered on the home + about.';
comment on table public.blog_posts    is 'MDX blog posts rendered under /blog. Drafts have published=false.';
comment on table public.messages      is 'Public contact-form submissions. Anon inserts allowed via RLS.';
