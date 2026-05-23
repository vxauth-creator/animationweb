"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * `MotionProvider` — root Motion configuration.
 *
 * `LazyMotion` defers loading of the animation feature bundle until first use,
 * trimming ~20kb from the initial JS payload. `domAnimation` covers DOM
 * animations (no layout/3d) which is enough for our motion primitives.
 *
 * `MotionConfig.reducedMotion` is wired to the OS preference so all `motion`
 * components automatically respect accessibility without per-component checks.
 */
export const MotionProvider = ({ children }: { children: ReactNode }) => {
  const reduced = useReducedMotion();
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion={reduced ? "always" : "user"}>{children}</MotionConfig>
    </LazyMotion>
  );
};
