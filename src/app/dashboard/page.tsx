import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowBorder } from "@/components/ui/glow-border";
import { adminCountUnhandledMessages } from "@/services/supabase/queries/admin/messages";
import { adminListBlogPosts } from "@/services/supabase/queries/admin/blog-posts";
import { adminListProjects } from "@/services/supabase/queries/admin/projects";
import { adminListUsers } from "@/services/supabase/queries/admin/users";
import { capabilities } from "@/lib/utils/env";
import { getAuthContext } from "@/services/supabase/auth";

const Tile = ({
  label,
  value,
  href,
  accent,
}: {
  label: string;
  value: string | number;
  href: string;
  accent: "blue" | "cyan" | "violet";
}) => (
  <GlowBorder accent={accent} radius="lg">
    <Link href={href} className="block">
      <GlassCard interactive className="p-5 md:p-6">
        <p className="font-mono text-[11px] tracking-[0.2em] text-(--color-paper-300) uppercase">
          {label}
        </p>
        <p className="mt-3 font-display text-3xl font-semibold md:text-4xl">{value}</p>
        <p className="mt-2 font-mono text-xs text-(--color-accent-cyan)">View →</p>
      </GlassCard>
    </Link>
  </GlowBorder>
);

interface DashboardOverviewProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function DashboardOverviewPage({ searchParams }: DashboardOverviewProps) {
  const params = await searchParams;
  const ctx = capabilities.hasSupabasePublic ? await getAuthContext() : null;

  const [projects, posts, users, unhandledMessages] = capabilities.hasSupabasePublic
    ? await Promise.all([
        adminListProjects(),
        adminListBlogPosts(),
        ctx?.profile.role === "admin" ? adminListUsers() : Promise.resolve([]),
        ctx?.profile.role === "admin" ? adminCountUnhandledMessages() : Promise.resolve(0),
      ])
    : [[], [], [], 0];

  const publishedProjects = projects.filter((p) => p.published).length;
  const publishedPosts = posts.filter((p) => p.published).length;

  const role = ctx?.profile.role ?? null;

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase">
            Overview
          </p>
          <h1 className="mt-2 font-display text-3xl leading-tight font-semibold md:text-4xl">
            {ctx ? `Welcome back, ${ctx.profile.full_name?.split(" ")[0] ?? "there"}` : "Studio dashboard"}
          </h1>
        </div>
        <Badge variant="muted" size="md" className="font-mono">
          {role ? `Signed in · ${role}` : "Auth off"}
        </Badge>
      </header>

      {params.error === "forbidden" ? (
        <p
          role="alert"
          className="mb-6 rounded-2xl border border-(--color-danger)/40 bg-(--color-danger)/10 p-4 text-sm text-(--color-danger)"
        >
          You don&apos;t have permission to view that page. The studio admin can adjust your role.
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Tile
          label="Projects"
          value={`${publishedProjects} / ${projects.length}`}
          href="/dashboard/admin/projects"
          accent="violet"
        />
        <Tile
          label="Posts"
          value={`${publishedPosts} / ${posts.length}`}
          href="/dashboard/admin/blogs"
          accent="cyan"
        />
        {role === "admin" ? (
          <>
            <Tile
              label="Unhandled messages"
              value={unhandledMessages}
              href="/dashboard/admin/messages"
              accent="blue"
            />
            <Tile
              label="Users"
              value={users.length}
              href="/dashboard/admin/users"
              accent="violet"
            />
          </>
        ) : null}
      </div>

      <GlassCard variant="strong" sheen className="mt-8 p-6 md:p-8">
        <p className="text-xs font-medium tracking-[0.2em] text-(--color-paper-300) uppercase">
          Quick links
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="/dashboard/admin/projects/new" size="sm">
            Create project
          </Button>
          <Button href="/dashboard/admin/blogs/new" size="sm" variant="secondary">
            New post
          </Button>
          <Button href="/dashboard/admin/services" size="sm" variant="ghost">
            Edit services
          </Button>
          {role === "admin" ? (
            <Button href="/dashboard/admin/messages" size="sm" variant="ghost">
              Inbox ({unhandledMessages})
            </Button>
          ) : null}
        </div>
      </GlassCard>
    </div>
  );
}
