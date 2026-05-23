import { GlassCard } from "@/components/ui/glass-card";

export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Users</h1>
      <p className="mt-2 text-sm text-(--foreground-muted)">
        User + role management (admin · editor · client). RBAC enforced via Supabase RLS.
      </p>
      <GlassCard variant="strong" className="mt-6 p-6 text-sm text-(--foreground-muted)">
        Empty state · Phase 5
      </GlassCard>
    </div>
  );
}
