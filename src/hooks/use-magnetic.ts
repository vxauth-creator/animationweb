"use client";

import { useCallback, useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MagneticOptions {
  /** Maximum displacement in pixels at the edge of the activation radius. */
  strength?: number;
  /** Activation radius in pixels (cursor distance). */
  radius?: number;
  /** Spring smoothing factor 0..1 (higher = snappier). */
  ease?: number;
}

/**
 * `useMagnetic` — pointer-magnetic interaction for premium CTAs.
 *
 * Attaches transform updates via rAF (no layout thrash) and decays back to
 * origin on pointer leave. Honors reduced-motion automatically (becomes a no-op).
 *
 * Returns a ref to attach to the target element.
 *
 * @example
 * const ref = useMagnetic({ strength: 14 });
 * return <button ref={ref}>Start project</button>;
 */
export const useMagnetic = <T extends HTMLElement>(
  options: MagneticOptions = {},
): React.RefObject<T | null> => {
  const { strength = 18, radius = 140, ease = 0.18 } = options;

  const ref = useRef<T | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  const reduced = useReducedMotion();

  const tick = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    current.current.x += (target.current.x - current.current.x) * ease;
    current.current.y += (target.current.y - current.current.y) * ease;
    el.style.transform = `translate3d(${current.current.x.toFixed(2)}px, ${current.current.y.toFixed(2)}px, 0)`;

    if (
      Math.abs(target.current.x - current.current.x) > 0.05 ||
      Math.abs(target.current.y - current.current.y) > 0.05
    ) {
      frame.current = requestAnimationFrame(tick);
    } else {
      frame.current = null;
    }
  }, [ease]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const distance = Math.hypot(dx, dy);

      if (distance > radius) {
        target.current.x = 0;
        target.current.y = 0;
      } else {
        const falloff = 1 - distance / radius;
        target.current.x = (dx / radius) * strength * falloff;
        target.current.y = (dy / radius) * strength * falloff;
      }

      if (frame.current === null) frame.current = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
      if (frame.current === null) frame.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      el.style.transform = "";
    };
  }, [ease, radius, reduced, strength, tick]);

  return ref;
};
