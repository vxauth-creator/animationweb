import type { ReactNode } from "react";

/**
 * Marketing route group layout.
 *
 * Currently a passthrough — but defining it now lets us drop a marketing-only
 * subnav, breadcrumbs, or a CTA banner across services/work/about/process/
 * blog/contact in one place later without touching the routes.
 */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
