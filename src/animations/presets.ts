/**
 * Reusable Motion presets.
 *
 * Compose these in components rather than inlining variants. Every preset
 * respects `prefers-reduced-motion` when consumed via the motion primitives
 * in `src/components/motion/*`.
 */

import type { Variants } from "motion/react";

import { durations, easeExpo, easeSmooth } from "@/animations/easings";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: durations.slow, ease: easeExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: durations.base, ease: easeSmooth } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.slow, ease: easeExpo },
  },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: { delayChildren, staggerChildren },
  },
});

export const heroCinematic: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: durations.cinematic, ease: easeExpo },
  },
};

export const lift = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.02,
    transition: { duration: durations.fast, ease: easeSmooth },
  },
} satisfies Variants;
