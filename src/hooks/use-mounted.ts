"use client";

import { useEffect, useState } from "react";

/**
 * `useMounted` — true after the first client render.
 *
 * Useful for SSR-safe gating of code that depends on `window`, IntersectionObserver,
 * or the device perf tier without producing hydration mismatches.
 */
export const useMounted = (): boolean => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};
