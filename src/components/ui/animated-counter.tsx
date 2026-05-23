"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils/cn";

interface AnimatedCounterProps {
  /** Final numeric value to count up to. */
  to: number;
  /** Animation duration in ms. */
  duration?: number;
  /** Optional suffix (e.g. "+", "%"). */
  suffix?: string;
  /** Optional prefix (e.g. "$"). */
  prefix?: string;
  /** Decimal places. Default: 0. */
  decimals?: number;
  className?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * `<AnimatedCounter>` — counts a value up the first time it scrolls into view.
 *
 * Uses `IntersectionObserver` to defer animation until visible (cheap on
 * pages with many counters). Honors reduced-motion (renders the final value
 * statically). Animation runs in `requestAnimationFrame` — no React state
 * updates per frame.
 */
export const AnimatedCounter = ({
  to,
  duration = 1400,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState<string>(reduced ? to.toFixed(decimals) : "0");
  const started = useRef(false);

  useEffect(() => {
    if (reduced) {
      setDisplay(to.toFixed(decimals));
      return;
    }
    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = easeOutCubic(t);
              setDisplay((to * eased).toFixed(decimals));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [to, duration, decimals, reduced]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};
