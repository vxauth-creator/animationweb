"use client";

import * as m from "motion/react-m";

import { fadeUp } from "@/animations/presets";
import { cn } from "@/lib/utils/cn";

import type { ComponentPropsWithoutRef } from "react";

interface FadeInProps extends ComponentPropsWithoutRef<typeof m.div> {
  /** Delay before the animation starts (seconds). */
  delay?: number;
  /** Disable the IntersectionObserver and animate immediately on mount. */
  immediate?: boolean;
  /** Margin used for the in-view trigger; default biases slightly above viewport. */
  margin?: string;
}

/**
 * `<FadeIn>` — declarative scroll-triggered fade + lift.
 *
 * Animates once when entering the viewport (`whileInView`). Composes the
 * `fadeUp` preset, so the visual contract is centralized.
 *
 * Reduced-motion is honored automatically via the root `<MotionProvider>`.
 */
export const FadeIn = ({
  delay = 0,
  immediate = false,
  margin = "0px 0px -10% 0px",
  className,
  children,
  ...rest
}: FadeInProps) => {
  const animationProps = immediate
    ? { initial: "hidden", animate: "visible" as const }
    : {
        initial: "hidden",
        whileInView: "visible" as const,
        viewport: { once: true, margin },
      };

  return (
    <m.div
      variants={fadeUp}
      transition={{ delay }}
      className={cn(className)}
      {...animationProps}
      {...rest}
    >
      {children}
    </m.div>
  );
};
