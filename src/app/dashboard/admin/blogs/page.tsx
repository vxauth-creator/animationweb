import { Badge } from "@/components/ui/badge";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { DataTable, type DataTableColumn } from "@/components/data/data-table";
import { PostRowActions } from "@/features/dashboard/blog/post-row-actions";
import { adminListBlogPosts } from "@/services/supabase/queries/admin/blog-posts";
import { capabilities } from "@/lib/utils/env";
import { requireRole } from "@/services/supabase/auth";

import type { BlogPostRow } from "@/services/supabase/types";

export default async function AdminBlogPage() {
  if (capabilities.hasSupabasePublic) await requireRole(["admin", "editor"]);
  const rows = await adminListBlogPosts();

  const columns: ReadonlyArray<DataTableColumn<BlogPostRow>> = [
    {
      key: "title",
      header: "Post",
      cell: (row) => (
        <div>
          <p className="font-medium text-(--foreground)">{row.title}</p>
          <p className="text-xs text-(--foreground-muted)">/{row.slug}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (row) =>
        row.category_slug ? (
          <Badge variant="muted" size="sm" className="font-mono">
            {row.category_slug}
          </Badge>
        ) : (
          <span className="text-xs text-(--foreground-muted)">—</span>
        ),
    },
    {
      key: "updated",
      header: "Updated",
      cell: (row) => (
        <span className="font-mono text-xs text-(--foreground-muted)">
          {new Date(row.updated_at).toLocaleDateString()}
        </span>
      ),
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
        eyebrow="Studio · Blog"
        title="Posts"
        description="DB-backed posts override the MDX filesystem source automatically when at least one is published."
        primaryAction={{ label: "New post", href: "/dashboard/admin/blogs/new" }}
        meta={
          <span className="font-mono text-xs text-(--foreground-muted)">
            {rows.length} {rows.length === 1 ? "row" : "rows"}
          </span>
        }
      />

      {!capabilities.hasSupabasePublic ? (
        <p className="rounded-2xl border border-(--color-warning)/30 bg-(--color-warning)/10 p-6 text-sm text-(--color-warning)">
          Supabase isn&apos;t configured. The blog is currently served from{" "}
          <code>content/posts/</code> (MDX).
        </p>
      ) : null}

      <DataTable
        data={rows}
        columns={columns}
        getRowKey={(row) => row.id}
        emptyState={
          <div>
            <p className="font-display text-lg font-medium text-(--foreground)">No posts yet</p>
            <p className="mt-2 text-sm text-(--foreground-muted)">
              Until you publish one here, /blog reads from <code>content/posts/</code>.
            </p>
          </div>
        }
        actions={(row) => <PostRowActions id={row.id} published={row.published} />}
      />
    </div>
  );
}
