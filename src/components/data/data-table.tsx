import { cn } from "@/lib/utils/cn";

import type { ReactNode } from "react";

export interface DataTableColumn<Row> {
  /** Stable column key — used for React keys, never displayed. */
  key: string;
  /** Visible header text. */
  header: string;
  /** Cell renderer — receives the row. Return any ReactNode. */
  cell: (row: Row) => ReactNode;
  /** Tailwind classes applied to every cell in this column. */
  className?: string;
  /** Header alignment hint (also drives cell alignment unless overridden). */
  align?: "left" | "right" | "center";
}

interface DataTableProps<Row> {
  data: ReadonlyArray<Row>;
  columns: ReadonlyArray<DataTableColumn<Row>>;
  /** Field used as the React key for each row. */
  getRowKey: (row: Row) => string;
  /** Empty state — rendered when `data` is empty. */
  emptyState?: ReactNode;
  /** Optional sticky-right cell with row-level actions. */
  actions?: (row: Row) => ReactNode;
  /** Optional whole-row click target (renders cells inside an anchor). */
  rowHref?: (row: Row) => string | undefined;
  className?: string;
}

const alignClass: Record<NonNullable<DataTableColumn<unknown>["align"]>, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

/**
 * `<DataTable>` — premium glass-styled, accessibility-correct table.
 *
 * Pure server-renderable: no hooks, no client interactivity beyond what the
 * cell renderers themselves bring. Sorting / filtering / pagination are
 * intentionally out of scope — those should be driven by query parameters
 * and re-rendered server-side, not by client-side table state.
 *
 * The optional `actions` slot is rendered in a sticky right-edge cell with
 * its own padding so action buttons never crowd content.
 */
export const DataTable = <Row,>({
  data,
  columns,
  getRowKey,
  emptyState,
  actions,
  rowHref,
  className,
}: DataTableProps<Row>) => {
  if (data.length === 0) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-(--border-subtle) bg-(--surface-1)/40 p-10 text-center text-sm text-(--foreground-muted)",
          className,
        )}
      >
        {emptyState ?? "Nothing here yet."}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-(--border-subtle) bg-(--surface-1)/40",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-(--border-subtle) bg-(--surface-2)/40 text-left">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 font-mono text-[11px] font-medium tracking-[0.18em] text-(--color-paper-300) uppercase",
                    col.align && alignClass[col.align],
                    col.className,
                  )}
                >
                  {col.header}
                </th>
              ))}
              {actions ? <th aria-label="Actions" className="px-4 py-3" /> : null}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const href = rowHref?.(row);
              return (
                <tr
                  key={getRowKey(row)}
                  className={cn(
                    "border-b border-(--border-subtle) transition-colors last:border-b-0",
                    href && "hover:bg-(--surface-2)/40",
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-4 py-4 align-middle text-(--foreground)/90",
                        col.align && alignClass[col.align],
                        col.className,
                      )}
                    >
                      {href ? (
                        <a href={href} className="block">
                          {col.cell(row)}
                        </a>
                      ) : (
                        col.cell(row)
                      )}
                    </td>
                  ))}
                  {actions ? (
                    <td className="px-4 py-4 text-right align-middle">{actions(row)}</td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
