import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { DataTable, type DataTableColumn } from "@/components/data/data-table";
import { capabilities } from "@/lib/utils/env";
import { getAuthContext } from "@/services/supabase/auth";
import { getProjects } from "@/services/supabase/queries/projects";

import type { Project as PortfolioProject } from "@/lib/data/projects";

/**
 * Client portal — "My projects".
 *
 * Phase 5 ships a read-only view of the portfolio. The schema doesn't yet
 * model client-to-project assignments, so for clients we render the public
 * portfolio with a note explaining how the studio assigns visibility. Phase 6
 * will introduce a `project_assignments` join table + RLS policy.
 */
export default async function ClientProjectsPage() {
  const ctx = capabilities.hasSupabasePublic ? await getAuthContext() : null;
  const projects = await getProjects();

  const columns: ReadonlyArray<DataTableColumn<PortfolioProject>> = [
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
  ];

  return (
    <div>
      <DashboardPageHeader
        eyebrow={ctx ? `Client portal · ${ctx.profile.full_name ?? ctx.user.email}` : "Client portal"}
        title="My projects"
        description="Currently a read-only mirror of /work. Per-client project assignments + file sharing land with the next phase."
        meta={<Badge variant="muted" size="md">{projects.length} total</Badge>}
      />

      <DataTable
        data={projects}
        columns={columns}
        getRowKey={(row) => row.slug}
        rowHref={(row) => `/work#${row.slug}`}
        emptyState={<p>No projects to display.</p>}
        actions={(row) =>
          row.liveUrl ? (
            <Button href={row.liveUrl} size="sm" variant="secondary" flat>
              Live ↗
            </Button>
          ) : (
            <span className="text-xs text-(--foreground-muted)">—</span>
          )
        }
      />
    </div>
  );
}
