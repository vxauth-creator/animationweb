import Link from "next/link";

import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Dashboard",
  description: "Studio operations dashboard.",
  path: "/dashboard",
  noIndex: true,
});

const adminLinks = [
  { label: "Overview", href: "/dashboard" },
  { label: "Projects", href: "/dashboard/admin/projects" },
  { label: "Blog", href: "/dashboard/admin/blogs" },
  { label: "Services", href: "/dashboard/admin/services" },
  { label: "Users", href: "/dashboard/admin/users" },
  { label: "Messages", href: "/dashboard/admin/messages" },
  { label: "Media", href: "/dashboard/admin/media" },
  { label: "Analytics", href: "/dashboard/admin/analytics" },
] as const;

const clientLinks = [
  { label: "My projects", href: "/dashboard/client/projects" },
  { label: "Files", href: "/dashboard/client/files" },
  { label: "Invoices", href: "/dashboard/client/invoices" },
] as const;

/**
 * Dashboard route group layout.
 *
 * Provides the two-column shell (sidebar + main) for both admin and client
 * portals. Phase 4 plugs Supabase auth into `middleware.ts` and decides which
 * sidebar group renders based on `Profile.role`.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Container size="wide" className="py-12">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside aria-label="Dashboard navigation">
          <GlassCard variant="strong" className="sticky top-24 p-5">
            <p className="text-xs font-medium tracking-[0.2em] text-(--color-paper-300) uppercase">
              Admin
            </p>
            <nav className="mt-3">
              <ul className="grid gap-1">
                {adminLinks.map((link) => (
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

            <p className="mt-8 text-xs font-medium tracking-[0.2em] text-(--color-paper-300) uppercase">
              Client portal
            </p>
            <nav className="mt-3">
              <ul className="grid gap-1">
                {clientLinks.map((link) => (
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
          </GlassCard>
        </aside>

        <section>{children}</section>
      </div>
    </Container>
  );
}
