import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { DataTable, type DataTableColumn } from "@/components/data/data-table";
import { ProjectRowActions } from "@/features/dashboard/projects/project-row-actions";
import { adminListProjects } from "@/services/supabase/queries/admin/projects";
import { capabilities } from "@/lib/utils/env";
import { requireRole } from "@/services/supabase/auth";

import type { ProjectRow } from "@/services/supabase/types";

export default async function AdminProjectsPage() {
  if (capabilities.hasSupabasePublic) await requireRole(["admin", "editor"]);
  const rows = await adminListProjects();

  const columns: ReadonlyArray<DataTableColumn<ProjectRow>> = [
    {
      key: "title",
      header: "Project",
      cell: (row) => (
        <div>
          <p className="font-medium text-(--foreground)">{row.title}</p>
          <p className="text-xs text-(--foreground-muted)">{row.client}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (row) => (
        <Badge variant="muted" size="sm" className="font-mono uppercase">
          {row.category}
        </Badge>
      ),
    },
    {
      key: "year",
      header: "Year",
      align: "right",
      cell: (row) => <span className="font-mono">{row.year}</span>,
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
        eyebrow="Studio · Projects"
        title="Portfolio"
        description="Create, edit, publish, and reorder portfolio entries. Saving updates /work and the home page automatically."
        primaryAction={{ label: "Create project", href: "/dashboard/admin/projects/new" }}
        meta={
          <span className="font-mono text-xs text-(--foreground-muted)">
            {rows.length} {rows.length === 1 ? "row" : "rows"}
          </span>
        }
      />

      {!capabilities.hasSupabasePublic ? (
        <p className="rounded-2xl border border-(--color-warning)/30 bg-(--color-warning)/10 p-6 text-sm text-(--color-warning)">
          Supabase isn&apos;t configured. The table is empty until env keys are set — see{" "}
          <Link href="/" className="underline">
            supabase/README.md
          </Link>
          .
        </p>
      ) : null}

      <DataTable
        data={rows}
        columns={columns}
        getRowKey={(row) => row.id}
        emptyState={
          <div>
            <p className="font-display text-lg font-medium text-(--foreground)">No projects yet</p>
            <p className="mt-2 text-sm text-(--foreground-muted)">
              Create your first portfolio entry to populate /work.
            </p>
          </div>
        }
        actions={(row) => <ProjectRowActions id={row.id} published={row.published} />}
      />
    </div>
  );
}
