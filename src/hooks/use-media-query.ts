"use client";

import { useEffect, useState } from "react";

/**
 * `useMediaQuery` — reactive media-query matcher.
 *
 * SSR-safe (returns `false` until mounted) and unsubscribes cleanly.
 * Use semantic helpers from `@/lib/design/tokens` rather than literal pixel
 * thresholds where possible.
 *
 * @example
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent | MediaQueryList) => {
      setMatches(event.matches);
    };
    handler(mql);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
};

export const useIsDesktop = (): boolean => useMediaQuery("(min-width: 1024px)");
export const useIsTablet = (): boolean =>
  useMediaQuery("(min-width: 640px) and (max-width: 1023.98px)");
export const useIsMobile = (): boolean => useMediaQuery("(max-width: 639.98px)");
