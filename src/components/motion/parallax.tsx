"use client";

import * as m from "motion/react-m";
import { useScroll, useTransform } from "motion/react";

import { cn } from "@/lib/utils/cn";

import type { ComponentPropsWithoutRef } from "react";
import { useRef } from "react";

interface ParallaxProps extends ComponentPropsWithoutRef<typeof m.div> {
  /** Translation amount in px at the extremes of the scroll range. */
  offset?: number;
  /** Whether the element parallaxes vertically (`y`) or horizontally (`x`). */
  axis?: "x" | "y";
}

/**
 * `<Parallax>` — element-relative scroll parallax.
 *
 * Translates the wrapped content by ±`offset` as it scrolls through the viewport.
 * Uses `useScroll` with `offset: ["start end", "end start"]` so the effect is
 * normalized to the element's own viewport intersection — not a global scrollY.
 *
 * Lightweight: pure transform updates via Motion's value pipeline (GPU only).
 */
export const Parallax = ({
  offset = 60,
  axis = "y",
  className,
  children,
  style,
  ...rest
}: ParallaxProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <m.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{ ...style, [axis]: range }}
      {...rest}
    >
      {children}
    </m.div>
  );
};
