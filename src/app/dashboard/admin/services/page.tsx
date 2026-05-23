import { GlassCard } from "@/components/ui/glass-card";

export default function AdminServicesPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Services</h1>
      <p className="mt-2 text-sm text-(--foreground-muted)">
        Manage the marketing services list rendered on /services. Editing wires up in Phase 5.
      </p>
      <GlassCard variant="strong" className="mt-6 p-6 text-sm text-(--foreground-muted)">
        Empty state · Phase 5
      </GlassCard>
    </div>
  );
}
