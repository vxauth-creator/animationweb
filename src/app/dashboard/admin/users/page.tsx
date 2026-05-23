import { Badge } from "@/components/ui/badge";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { DataTable, type DataTableColumn } from "@/components/data/data-table";
import { RoleSelect } from "@/features/dashboard/users/role-select";
import { adminListUsers, type AdminUserRow } from "@/services/supabase/queries/admin/users";
import { capabilities } from "@/lib/utils/env";
import { requireRole } from "@/services/supabase/auth";

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" }) : "—";

export default async function AdminUsersPage() {
  let currentProfileId: string | null = null;
  if (capabilities.hasSupabasePublic) {
    const ctx = await requireRole(["admin"]);
    currentProfileId = ctx.profile.id;
  }
  const rows = await adminListUsers();

  const columns: ReadonlyArray<DataTableColumn<AdminUserRow>> = [
    {
      key: "name",
      header: "User",
      cell: (row) => (
        <div>
          <p className="font-medium text-(--foreground)">{row.full_name ?? "—"}</p>
          <p className="font-mono text-xs text-(--foreground-muted)">
            {row.email ?? row.user_id.slice(0, 8)}
          </p>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      cell: (row) => (
        <RoleSelect
          profileId={row.id}
          value={row.role}
          disabled={row.id === currentProfileId}
        />
      ),
    },
    {
      key: "lastSignIn",
      header: "Last sign-in",
      cell: (row) => (
        <span className="font-mono text-xs text-(--foreground-muted)">
          {formatDate(row.last_sign_in_at)}
        </span>
      ),
    },
    {
      key: "joined",
      header: "Joined",
      cell: (row) => (
        <span className="font-mono text-xs text-(--foreground-muted)">
          {formatDate(row.created_at)}
        </span>
      ),
    },
  ];

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Studio · Users"
        title="People"
        description="Promote users to editor or admin. Self-demotion is blocked — ask another admin if you need it."
        meta={
          <Badge variant="muted" size="md">
            {rows.length} total
          </Badge>
        }
      />

      {!capabilities.hasSupabasePublic ? (
        <p className="rounded-2xl border border-(--color-warning)/30 bg-(--color-warning)/10 p-6 text-sm text-(--color-warning)">
          Supabase isn&apos;t configured. Auth and user management are off.
        </p>
      ) : null}

      <DataTable
        data={rows}
        columns={columns}
        getRowKey={(row) => row.id}
        emptyState={<p>No users yet. The first signup creates the first profile.</p>}
      />
    </div>
  );
}
