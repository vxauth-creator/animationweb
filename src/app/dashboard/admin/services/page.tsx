import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { DataTable, type DataTableColumn } from "@/components/data/data-table";
import { adminListServices } from "@/services/supabase/queries/admin/services";
import { capabilities } from "@/lib/utils/env";
import { requireRole } from "@/services/supabase/auth";

import type { ServiceRow } from "@/services/supabase/types";

export default async function AdminServicesPage() {
  if (capabilities.hasSupabasePublic) await requireRole(["admin", "editor"]);
  const rows = await adminListServices();

  const columns: ReadonlyArray<DataTableColumn<ServiceRow>> = [
    {
      key: "title",
      header: "Service",
      cell: (row) => (
        <div>
          <p className="font-medium text-(--foreground)">{row.title}</p>
          <p className="line-clamp-1 text-xs text-(--foreground-muted)">{row.summary}</p>
        </div>
      ),
    },
    {
      key: "metric",
      header: "Metric",
      cell: (row) =>
        row.metric_value ? (
          <Badge variant="accent" size="sm" className="font-mono">
            {row.metric_value} · {row.metric_label}
          </Badge>
        ) : (
          <span className="text-xs text-(--foreground-muted)">—</span>
        ),
    },
    {
      key: "order",
      header: "Order",
      align: "right",
      cell: (row) => <span className="font-mono">{row.order_index}</span>,
    },
    {
      key: "published",
      header: "Status",
      cell: (row) =>
        row.published ? (
          <Badge variant="accent" size="sm">
            Published
          </Badge>
        ) : (
          <Badge variant="muted" size="sm">
            Draft
          </Badge>
        ),
    },
  ];

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Studio · Services"
        title="Service catalog"
        description="Edit the entries shown on /services. Adding new services is a SQL operation today; the form supports edit + reorder only."
        meta={
          <span className="font-mono text-xs text-(--foreground-muted)">
            {rows.length} {rows.length === 1 ? "service" : "services"}
          </span>
        }
      />

      {!capabilities.hasSupabasePublic ? (
        <p className="rounded-2xl border border-(--color-warning)/30 bg-(--color-warning)/10 p-6 text-sm text-(--color-warning)">
          Supabase isn&apos;t configured. /services renders the static catalog from{" "}
          <code>src/lib/data/services.ts</code>.
        </p>
      ) : null}

      <DataTable
        data={rows}
        columns={columns}
        getRowKey={(row) => row.id}
        emptyState={<p>Run the seed migration to populate the catalog.</p>}
        actions={(row) => (
          <Button href={`/dashboard/admin/services/${row.id}`} size="sm" variant="ghost" flat>
            Edit
          </Button>
        )}
      />
    </div>
  );
}
