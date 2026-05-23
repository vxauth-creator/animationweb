import { GlassCard } from "@/components/ui/glass-card";

export default function AdminProjectsPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="mt-2 text-sm text-(--foreground-muted)">
        Create, edit, and publish portfolio projects. CRUD wires up in Phase 5 against the
        `projects` table behind RLS.
      </p>
      <GlassCard variant="strong" className="mt-6 p-6 text-sm text-(--foreground-muted)">
        Empty state · Phase 5
      </GlassCard>
    </div>
  );
}
