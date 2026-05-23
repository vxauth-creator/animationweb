import Link from "next/link";

import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { buildMetadata } from "@/lib/seo/metadata";
import { capabilities } from "@/lib/utils/env";
import { getAuthContext } from "@/services/supabase/auth";

import type { DbRole } from "@/services/supabase/types";

export const metadata = buildMetadata({
  title: "Dashboard",
  description: "Studio operations dashboard.",
  path: "/dashboard",
  noIndex: true,
});

interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly roles?: ReadonlyArray<DbRole>;
}

const ADMIN_LINKS: ReadonlyArray<NavItem> = [
  { label: "Overview", href: "/dashboard" },
  { label: "Projects", href: "/dashboard/admin/projects", roles: ["admin", "editor"] },
  { label: "Blog", href: "/dashboard/admin/blogs", roles: ["admin", "editor"] },
  { label: "Services", href: "/dashboard/admin/services", roles: ["admin", "editor"] },
  { label: "Users", href: "/dashboard/admin/users", roles: ["admin"] },
  { label: "Messages", href: "/dashboard/admin/messages", roles: ["admin"] },
  { label: "Media", href: "/dashboard/admin/media", roles: ["admin", "editor"] },
  { label: "Analytics", href: "/dashboard/admin/analytics", roles: ["admin"] },
];

const CLIENT_LINKS: ReadonlyArray<NavItem> = [
  { label: "My projects", href: "/dashboard/client/projects" },
  { label: "Files", href: "/dashboard/client/files" },
  { label: "Invoices", href: "/dashboard/client/invoices" },
];

const visibleFor = (links: ReadonlyArray<NavItem>, role: DbRole | null) =>
  links.filter((l) => !l.roles || (role && l.roles.includes(role)));

const initialsFrom = (name: string | null | undefined, email: string) =>
  (name ?? email).split(/\s+|@/).slice(0, 2).map((s) => s[0]?.toUpperCase() ?? "").join("");

/**
 * Dashboard route group layout.
 *
 * - Server-rendered shell — `getAuthContext` resolves the current user +
 *   profile (and therefore role) before children render.
 * - Sidebar admin items are filtered by role (`admin` / `editor` see what
 *   they can act on; `client` only sees the client portal).
 * - When Supabase isn't configured, the layout still renders so you can see
 *   the structure during local dev — but with a banner explaining auth is
 *   off and no role-gated items.
 *
 * Route protection itself lives in `src/middleware.ts`. This layout is the
 * place where role-aware UI happens.
 */
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const ctx = capabilities.hasSupabasePublic ? await getAuthContext() : null;
  const role = ctx?.profile.role ?? null;

  const adminVisible = visibleFor(ADMIN_LINKS, role);
  const clientVisible = role === "client" ? CLIENT_LINKS : visibleFor(CLIENT_LINKS, role);

  return (
    <Container size="wide" className="py-12">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside aria-label="Dashboard navigation">
          <GlassCard variant="strong" className="sticky top-24 p-5">
            {ctx ? (
              <div className="mb-5 flex items-center gap-3 border-b border-(--border-subtle) pb-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--border-strong) bg-(--surface-1)/60 font-mono text-xs text-(--color-accent-cyan)">
                  {initialsFrom(ctx.profile.full_name, ctx.user.email ?? "")}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {ctx.profile.full_name ?? ctx.user.email}
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-(--color-paper-300) uppercase">
                    {ctx.profile.role}
                  </p>
                </div>
              </div>
            ) : !capabilities.hasSupabasePublic ? (
              <p className="mb-5 rounded-xl border border-(--color-warning)/30 bg-(--color-warning)/10 p-3 text-xs text-(--color-warning)">
                Supabase env keys aren&apos;t set. Auth is off — see <code>supabase/README.md</code>.
              </p>
            ) : null}

            {adminVisible.length > 0 ? (
              <>
                <p className="text-xs font-medium tracking-[0.2em] text-(--color-paper-300) uppercase">
                  Studio
                </p>
                <nav className="mt-3">
                  <ul className="grid gap-1">
                    {adminVisible.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block rounded-lg px-3 py-2 text-sm text-(--foreground-muted) transition-colors hover:bg-(--surface-2)/50 hover:text-(--foreground)"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </>
            ) : null}

            {clientVisible.length > 0 ? (
              <>
                <p className="mt-7 text-xs font-medium tracking-[0.2em] text-(--color-paper-300) uppercase">
                  Client portal
                </p>
                <nav className="mt-3">
                  <ul className="grid gap-1">
                    {clientVisible.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block rounded-lg px-3 py-2 text-sm text-(--foreground-muted) transition-colors hover:bg-(--surface-2)/50 hover:text-(--foreground)"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </>
            ) : null}

            {ctx ? (
              <form action="/auth/sign-out" method="post" className="mt-7">
                <button
                  type="submit"
                  className="w-full rounded-lg border border-(--border-strong) bg-(--surface-2)/40 px-3 py-2 text-left text-sm text-(--foreground-muted) transition-colors hover:border-(--color-accent-blue)/40 hover:text-(--foreground)"
                >
                  Sign out
                </button>
              </form>
            ) : null}
          </GlassCard>
        </aside>

        <section>{children}</section>
      </div>
    </Container>
  );
}
