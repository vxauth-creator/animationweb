"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MouseTarget {
  /** Normalized cursor position in [-1, 1] across both axes. */
  readonly current: { x: number; y: number };
}

/**
 * `useMouseTarget` — shared, ref-based normalized mouse position.
 *
 * Returns a *ref* (not state) so consumers in animation loops (R3F `useFrame`,
 * rAF callbacks) can read the latest cursor position without re-rendering.
 *
 * Listens once per call site; multiple consumers can call this hook
 * independently. Honors reduced-motion (target stays at origin).
 *
 * Coordinates are normalized to the viewport: -1 (left/top) to +1 (right/bottom).
 */
export const useMouseTarget = (): MouseTarget => {
  const ref = useRef({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;

    const onMove = (event: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Map to [-1, 1]; clamp so off-window events don't push beyond.
      ref.current.x = Math.max(-1, Math.min(1, (event.clientX / w) * 2 - 1));
      ref.current.y = Math.max(-1, Math.min(1, (event.clientY / h) * 2 - 1));
    };

    const onLeave = () => {
      ref.current.x = 0;
      ref.current.y = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return ref;
};
