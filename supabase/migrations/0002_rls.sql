-- =============================================================================
-- NishantWebLab — Row-Level Security policies
--
-- Principles:
--   - All public-facing tables: anon role can SELECT *only* published rows.
--   - Authenticated users can SELECT *all* rows in their visible tables
--     (admin sees drafts via the dashboard).
--   - Mutations (INSERT/UPDATE/DELETE) require role >= editor (or admin).
--   - Profiles are special — users read/update their own row; admins manage all.
--   - messages: anon can INSERT (the public contact form),
--               admin can SELECT/UPDATE/DELETE.
-- =============================================================================

-- Helper: current user's role (defaults to 'anon' if no profile).
create or replace function public.current_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select p.role from public.profiles p where p.user_id = auth.uid() limit 1),
    'anon'
  );
$$;

create or replace function public.is_editor_or_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_role() in ('editor', 'admin');
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_role() = 'admin';
$$;

-- =============================================================================
-- profiles
-- =============================================================================
alter table public.profiles enable row level security;

-- Self read.
create policy "profiles: self read"
  on public.profiles for select
  using (auth.uid() = user_id);

-- Self update (cannot change role — see admin policy below).
create policy "profiles: self update"
  on public.profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id and role = (select role from public.profiles where user_id = auth.uid()));

-- Admin reads all.
create policy "profiles: admin read"
  on public.profiles for select
  using (public.is_admin());

-- Admin updates all (including role changes).
create policy "profiles: admin update"
  on public.profiles for update
  using (public.is_admin())
  with check (public.is_admin());

-- =============================================================================
-- services
-- =============================================================================
alter table public.services enable row level security;

create policy "services: anon reads published"
  on public.services for select
  to anon, authenticated
  using (published = true);

create policy "services: editor+ reads all"
  on public.services for select
  to authenticated
  using (public.is_editor_or_admin());

create policy "services: editor+ writes"
  on public.services for all
  to authenticated
  using (public.is_editor_or_admin())
  with check (public.is_editor_or_admin());

-- =============================================================================
-- projects
-- =============================================================================
alter table public.projects enable row level security;

create policy "projects: anon reads published"
  on public.projects for select
  to anon, authenticated
  using (published = true);

create policy "projects: editor+ reads all"
  on public.projects for select
  to authenticated
  using (public.is_editor_or_admin());

create policy "projects: editor+ writes"
  on public.projects for all
  to authenticated
  using (public.is_editor_or_admin())
  with check (public.is_editor_or_admin());

-- =============================================================================
-- testimonials
-- =============================================================================
alter table public.testimonials enable row level security;

create policy "testimonials: anon reads published"
  on public.testimonials for select
  to anon, authenticated
  using (published = true);

create policy "testimonials: editor+ reads all"
  on public.testimonials for select
  to authenticated
  using (public.is_editor_or_admin());

create policy "testimonials: editor+ writes"
  on public.testimonials for all
  to authenticated
  using (public.is_editor_or_admin())
  with check (public.is_editor_or_admin());

-- =============================================================================
-- blog_posts
-- =============================================================================
alter table public.blog_posts enable row level security;

create policy "blog: anon reads published"
  on public.blog_posts for select
  to anon, authenticated
  using (published = true);

create policy "blog: editor+ reads all"
  on public.blog_posts for select
  to authenticated
  using (public.is_editor_or_admin());

create policy "blog: editor+ writes"
  on public.blog_posts for all
  to authenticated
  using (public.is_editor_or_admin())
  with check (public.is_editor_or_admin());

-- =============================================================================
-- messages
-- =============================================================================
alter table public.messages enable row level security;

-- Anyone (including anonymous visitors) can INSERT — that's the public contact form.
-- We don't enforce field shape here; the server action / Zod handles that.
create policy "messages: anon insert"
  on public.messages for insert
  to anon, authenticated
  with check (true);

-- Admins read every submission.
create policy "messages: admin read"
  on public.messages for select
  to authenticated
  using (public.is_admin());

-- Admins update (mark as handled) and delete.
create policy "messages: admin update"
  on public.messages for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "messages: admin delete"
  on public.messages for delete
  to authenticated
  using (public.is_admin());

-- =============================================================================
-- Realtime — enable replication for tables the dashboard subscribes to.
-- =============================================================================
-- Phase 5 will subscribe to messages + projects in the admin dashboard.
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.projects;
alter publication supabase_realtime add table public.blog_posts;
