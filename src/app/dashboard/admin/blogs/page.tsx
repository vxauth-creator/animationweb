import { GlassCard } from "@/components/ui/glass-card";

export default function AdminBlogsPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Blog</h1>
      <p className="mt-2 text-sm text-(--foreground-muted)">
        Author, schedule, and publish posts. Markdown editor with categories, tags, and
        OpenGraph tooling activates in Phase 4.
      </p>
      <GlassCard variant="strong" className="mt-6 p-6 text-sm text-(--foreground-muted)">
        Empty state · Phase 4
      </GlassCard>
    </div>
  );
}
