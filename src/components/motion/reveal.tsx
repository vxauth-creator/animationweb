"use client";

import * as m from "motion/react-m";

import { durations, easeExpo } from "@/animations/easings";
import { cn } from "@/lib/utils/cn";

import type { ElementType, ReactNode } from "react";

interface RevealProps {
  /** Element to render — defaults to `<span>` for inline-safe text reveals. */
  as?: ElementType;
  /** Direction the masked content slides in from. */
  direction?: "up" | "down";
  /** Delay before the reveal begins (seconds). */
  delay?: number;
  /** Override the default duration. */
  duration?: number;
  className?: string;
  children: ReactNode;
}

/**
 * `<Reveal>` — masked text/element reveal.
 *
 * Wraps content in an `overflow-hidden` mask and slides the inner element in
 * from below/above. Cinematic, performant (GPU transforms only).
 */
export const Reveal = ({
  as,
  direction = "up",
  delay = 0,
  duration = durations.cinematic,
  className,
  children,
}: RevealProps) => {
  // Cast to a permissive ElementType so polymorphic JSX doesn't collapse
  // children to `never` under React 19's stricter intrinsic-attribute types.
  const Tag = (as ?? "span") as ElementType<{ className?: string; children?: ReactNode }>;
  const fromY = direction === "up" ? "100%" : "-100%";

  return (
    <Tag className={cn("inline-block overflow-hidden align-bottom", className)}>
      <m.span
        className="inline-block will-change-transform"
        initial={{ y: fromY, opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration, ease: easeExpo, delay }}
      >
        {children as ReactNode}
      </m.span>
    </Tag>
  );
};
