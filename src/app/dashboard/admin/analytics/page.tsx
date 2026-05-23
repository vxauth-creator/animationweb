import { GlassCard } from "@/components/ui/glass-card";

export default function AdminAnalyticsPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Analytics</h1>
      <p className="mt-2 text-sm text-(--foreground-muted)">
        Traffic, conversion, and Core Web Vitals — pulled from Plausible + the studio
        warehouse.
      </p>
      <GlassCard variant="strong" className="mt-6 p-6 text-sm text-(--foreground-muted)">
        Empty state · Phase 6
      </GlassCard>
    </div>
  );
}
