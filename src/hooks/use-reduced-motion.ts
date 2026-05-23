"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * `useReducedMotion` — reactive `prefers-reduced-motion` matcher.
 *
 * Defaults to `false` during SSR (full motion) and updates after mount.
 * Subscribes to media-query changes so the value stays accurate if the user
 * toggles the OS setting at runtime.
 *
 * Every motion primitive in `src/components/motion/*` consumes this hook so
 * accessibility is enforced at the architectural level, not per-component.
 */
export const useReducedMotion = (): boolean => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(QUERY);
    const handler = (event: MediaQueryListEvent | MediaQueryList) => {
      setReduced(event.matches);
    };
    handler(mql);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return reduced;
};
