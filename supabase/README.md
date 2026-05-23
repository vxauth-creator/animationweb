# Supabase

This directory contains the schema, RLS policies, seed data, and local-dev
config for NishantWebLab's Supabase backend.

The site **runs without Supabase** — every server-side query and the contact
form gracefully no-op when the env keys are unset (Phase 1 contract). Wiring
Supabase up unlocks: real auth, the admin dashboard, dynamic blog posts,
realtime, and message persistence.

## Setup (one-time)

### Option A — managed Supabase (recommended for production)

1. Create a project at [supabase.com](https://supabase.com).
2. Copy the values from **Project Settings → API** into `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...   # server-only — never expose
   ```
3. Apply the schema (paste each file in order via the SQL editor, or use the
   Supabase CLI as in Option B):
   ```text
   supabase/migrations/0001_init.sql
   supabase/migrations/0002_rls.sql
   supabase/migrations/0003_auth_triggers.sql
   supabase/seed.sql            # optional but recommended
   ```
4. Enable **Email auth** under Authentication → Providers (default).
5. Add `http://localhost:3000/auth/callback` and your production domain's
   `/auth/callback` to **Redirect URLs**.
6. (Optional) Create the Storage buckets: `project-covers`, `blog-covers`,
   `avatars`. Make them public-read; uploads remain restricted by RLS.

### Option B — local Supabase (great for development)

Requires the [Supabase CLI](https://supabase.com/docs/guides/local-development).

```bash
supabase start          # spins up Postgres, GoTrue, Storage, Realtime
supabase db reset       # applies migrations + seed in order
```

Then `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from `supabase status`>
SUPABASE_SERVICE_ROLE_KEY=<from `supabase status`>
```

## Schema overview

| Table          | Purpose                                                                |
| -------------- | ---------------------------------------------------------------------- |
| `profiles`     | 1:1 with `auth.users`. Owns the role (`admin` / `editor` / `client`).  |
| `services`     | `/services` content. Editor+ writes.                                   |
| `projects`     | `/work` portfolio. Editor+ writes.                                     |
| `testimonials` | Quotes shown on home + about. Editor+ writes.                          |
| `blog_posts`   | DB-backed blog (defaults to drafts). Editor+ writes.                   |
| `messages`     | Public contact form submissions. Anon insert; admin read/update.      |

## Row-level security

`0002_rls.sql` enforces:

- **Anon role**: read `published = true` rows on services / projects /
  testimonials / blog_posts; insert into `messages`. Nothing else.
- **Authenticated role**: the same as anon by default — RLS only opens up
  more access for users whose `profiles.role` is `editor` or `admin`.
- **Editor**: read everything in content tables, full write on
  services / projects / testimonials / blog_posts.
- **Admin**: editor permissions plus `messages` read / update / delete and
  `profiles` role management.

The role check uses `public.current_role()` which reads from `profiles` via
`auth.uid()`. Service-role calls bypass RLS — keep that key on the server.

## Auth flow

1. User signs up at `/signup` → Supabase sends confirmation email.
2. User clicks the link → lands on `/auth/callback?code=…`.
3. Our `app/auth/callback/route.ts` exchanges the code for a session and
   redirects to `/dashboard`.
4. The auth trigger (`0003_auth_triggers.sql`) provisioned a `profiles` row
   on signup; default role is `client`.
5. Promote a user with SQL:
   ```sql
   update public.profiles set role = 'admin' where user_id = '<uuid>';
   ```

## Storage buckets (planned)

Created manually in the dashboard or via the CLI:

```bash
supabase storage create project-covers --public
supabase storage create blog-covers    --public
supabase storage create avatars        --public
```

RLS on storage is intentionally permissive for read; admin-only for write.
Phase 5 wires the dashboard upload flow with signed URLs.

## Re-generating types

When the schema changes, regenerate the typed bindings:

```bash
supabase gen types typescript --linked > src/services/supabase/types.ts
```

Until then, `src/services/supabase/types.ts` is a hand-authored skeleton kept
in sync with the migrations in this directory.
