import { GlassCard } from "@/components/ui/glass-card";

export default function ClientInvoicesPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Invoices</h1>
      <p className="mt-2 text-sm text-(--foreground-muted)">
        View, download, and pay outstanding invoices. Stripe integration lands with the
        billing module.
      </p>
      <GlassCard variant="strong" className="mt-6 p-6 text-sm text-(--foreground-muted)">
        Empty state · Phase 5
      </GlassCard>
    </div>
  );
}
