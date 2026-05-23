import type { ReactNode } from "react";

import { GradientBg } from "@/components/ui/gradient-bg";

/**
 * Auth route group layout.
 *
 * Centers a card and lays a calm aurora background. Phase 4 will add Supabase
 * session checks (already-signed-in users redirect to /dashboard).
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-[calc(100dvh-5rem)] items-center justify-center py-16">
      <GradientBg variant="mesh" />
      <div className="relative w-full max-w-md container-x">{children}</div>
    </div>
  );
}
