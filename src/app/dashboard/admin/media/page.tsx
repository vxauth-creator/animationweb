import { GlassCard } from "@/components/ui/glass-card";

export default function AdminMediaPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Media</h1>
      <p className="mt-2 text-sm text-(--foreground-muted)">
        Asset library backed by Supabase Storage with signed upload URLs and protected
        buckets.
      </p>
      <GlassCard variant="strong" className="mt-6 p-6 text-sm text-(--foreground-muted)">
        Empty state · Phase 5
      </GlassCard>
    </div>
  );
}
