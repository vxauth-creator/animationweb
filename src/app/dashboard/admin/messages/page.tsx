import { Badge } from "@/components/ui/badge";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { DataTable, type DataTableColumn } from "@/components/data/data-table";
import { MessageActions } from "@/features/dashboard/messages/message-actions";
import { MessagesRealtime } from "@/features/dashboard/messages/messages-realtime";
import {
  adminCountUnhandledMessages,
  adminListMessages,
} from "@/services/supabase/queries/admin/messages";
import { capabilities } from "@/lib/utils/env";
import { requireRole } from "@/services/supabase/auth";

import type { MessageRow } from "@/services/supabase/types";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" });

export default async function AdminMessagesPage() {
  if (capabilities.hasSupabasePublic) await requireRole(["admin"]);
  const [rows, unhandled] = await Promise.all([
    adminListMessages(),
    adminCountUnhandledMessages(),
  ]);

  const columns: ReadonlyArray<DataTableColumn<MessageRow>> = [
    {
      key: "from",
      header: "From",
      cell: (row) => (
        <div>
          <p className="font-medium text-(--foreground)">{row.name}</p>
          <p className="font-mono text-xs text-(--foreground-muted)">{row.email}</p>
        </div>
      ),
    },
    {
      key: "preview",
      header: "Preview",
      cell: (row) => (
        <p className="line-clamp-2 max-w-md text-(--foreground-muted)">{row.message}</p>
      ),
    },
    {
      key: "budget",
      header: "Budget",
      cell: (row) =>
        row.budget ? (
          <Badge variant="muted" size="sm" className="font-mono">
            {row.budget}
          </Badge>
        ) : (
          <span className="text-xs text-(--foreground-muted)">—</span>
        ),
    },
    {
      key: "received",
      header: "Received",
      cell: (row) => (
        <span className="font-mono text-xs text-(--foreground-muted)">
          {formatDate(row.created_at)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) =>
        row.handled ? (
          <Badge variant="muted" size="sm">
            Handled
          </Badge>
        ) : (
          <Badge variant="accent" size="sm">
            New
          </Badge>
        ),
    },
  ];

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Studio · Inbox"
        title="Messages"
        description="Submissions from the public contact form. New messages appear instantly via Supabase Realtime."
        meta={
          capabilities.hasSupabasePublic ? (
            <MessagesRealtime initialUnhandled={unhandled} />
          ) : null
        }
      />

      {!capabilities.hasSupabasePublic ? (
        <p className="rounded-2xl border border-(--color-warning)/30 bg-(--color-warning)/10 p-6 text-sm text-(--color-warning)">
          Supabase isn&apos;t configured. Form submissions log to the server console only.
        </p>
      ) : null}

      <DataTable
        data={rows}
        columns={columns}
        getRowKey={(row) => row.id}
        rowHref={(row) => `/dashboard/admin/messages/${row.id}`}
        emptyState={<p>No messages yet — the inbox will fill up as the contact form is used.</p>}
        actions={(row) => <MessageActions id={row.id} handled={row.handled} />}
      />
    </div>
  );
}
