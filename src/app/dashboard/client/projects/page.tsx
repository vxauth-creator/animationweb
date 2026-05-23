import { GlassCard } from "@/components/ui/glass-card";

export default function ClientProjectsPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Your projects</h1>
      <p className="mt-2 text-sm text-(--foreground-muted)">
        Track milestones, review deliverables, and approve releases. Realtime status via
        Supabase channels.
      </p>
      <GlassCard variant="strong" className="mt-6 p-6 text-sm text-(--foreground-muted)">
        Empty state · Phase 5
      </GlassCard>
    </div>
  );
}
