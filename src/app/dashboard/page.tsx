import { GlassCard } from "@/components/ui/glass-card";

const tiles = [
  { label: "Active projects", value: "—" },
  { label: "Open messages", value: "—" },
  { label: "Posts published", value: "—" },
  { label: "Users", value: "—" },
] as const;

export default function DashboardOverviewPage() {
  return (
    <div>
      <header className="flex items-baseline justify-between">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase">
            Overview
          </p>
          <h1 className="mt-2 text-3xl leading-tight font-semibold md:text-4xl">
            Studio dashboard
          </h1>
        </div>
        <span className="rounded-full border border-(--border-strong) bg-(--surface-1)/60 px-3 py-1 font-mono text-xs text-(--foreground-muted)">
          Phase 5 · realtime data
        </span>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map((tile) => (
          <GlassCard key={tile.label} className="p-5">
            <p className="text-xs tracking-[0.18em] text-(--color-paper-300) uppercase">
              {tile.label}
            </p>
            <p className="mt-3 font-display text-3xl font-semibold">{tile.value}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard variant="strong" sheen className="mt-8 p-6 md:p-8">
        <p className="text-xs font-medium tracking-[0.2em] text-(--color-paper-300) uppercase">
          What ships next
        </p>
        <ul className="mt-4 grid gap-3 text-sm text-(--foreground-muted) md:grid-cols-2">
          <li>· Auth + role-based access (admin / editor / client)</li>
          <li>· Realtime activity feed (Supabase channels)</li>
          <li>· Media library with signed upload URLs</li>
          <li>· Blog CMS with draft / publish workflow</li>
          <li>· Client portal: projects, files, invoices</li>
          <li>· Notifications + audit log</li>
        </ul>
      </GlassCard>
    </div>
  );
}
