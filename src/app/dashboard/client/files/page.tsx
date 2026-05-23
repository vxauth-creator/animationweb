import { GlassCard } from "@/components/ui/glass-card";

export default function ClientFilesPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Files</h1>
      <p className="mt-2 text-sm text-(--foreground-muted)">
        Upload, share, and review project assets. Signed URLs + per-project access policies.
      </p>
      <GlassCard variant="strong" className="mt-6 p-6 text-sm text-(--foreground-muted)">
        Empty state · Phase 5
      </GlassCard>
    </div>
  );
}
