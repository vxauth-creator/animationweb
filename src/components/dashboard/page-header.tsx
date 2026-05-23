import { Button } from "@/components/ui/button";

import type { ReactNode } from "react";

interface DashboardPageHeaderProps {
  /** Eyebrow tag, all caps. */
  eyebrow: string;
  /** Page title. */
  title: ReactNode;
  /** Optional supporting copy. */
  description?: ReactNode;
  /** Primary action — typically a "Create new" link. */
  primaryAction?: { label: string; href: string };
  /** Optional secondary slot — small actions / counts / filter pills. */
  meta?: ReactNode;
}

/**
 * `<DashboardPageHeader>` — consistent top-of-page chrome for /dashboard pages.
 *
 * Server-component only — no hooks, no JS. All admin/client portal pages
 * should use this so the dashboard's information density and rhythm stay
 * coherent across CRUD, list, and overview views.
 */
export const DashboardPageHeader = ({
  eyebrow,
  title,
  description,
  primaryAction,
  meta,
}: DashboardPageHeaderProps) => {
  return (
    <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-2 font-display text-3xl leading-tight font-semibold md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-(--foreground-muted)">{description}</p>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {meta}
        {primaryAction ? (
          <Button href={primaryAction.href} size="sm">
            {primaryAction.label}
          </Button>
        ) : null}
      </div>
    </header>
  );
};
