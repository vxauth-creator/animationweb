"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import type { ReactNode } from "react";

/**
 * TanStack Query provider.
 *
 * `QueryClient` is constructed via `useState` so it survives Fast Refresh in
 * dev and is created once per app lifecycle in production. Defaults are tuned
 * for a content-heavy site: long staleTime, no refetchOnWindowFocus by default,
 * and modest retry behavior.
 *
 * Devtools are intentionally NOT bundled here — they should be lazy-loaded
 * from a `__dev__` boundary in Phase 5 to keep prod bundles lean.
 */
export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            gcTime: 5 * 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
