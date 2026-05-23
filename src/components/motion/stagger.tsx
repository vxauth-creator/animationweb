"use client";

import * as m from "motion/react-m";

import { fadeUp, stagger as staggerVariant } from "@/animations/presets";
import { cn } from "@/lib/utils/cn";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";

interface StaggerProps extends Omit<ComponentPropsWithoutRef<typeof m.div>, "children"> {
  /** Delay applied to the *first* child (seconds). */
  delayChildren?: number;
  /** Stagger between each child (seconds). */
  staggerChildren?: number;
  /** Children — each becomes its own variant-driven motion node. */
  children: ReactNode;
}

/**
 * `<Stagger>` — propagates a fadeUp variant to immediate children with staggered timing.
 *
 * Children that are valid React elements have `variants={fadeUp}` injected.
 * Strings/fragments/etc. are wrapped in `m.div`. The component itself is the
 * variant orchestrator.
 */
export const Stagger = ({
  delayChildren = 0,
  staggerChildren = 0.08,
  className,
  children,
  ...rest
}: StaggerProps) => {
  return (
    <m.div
      className={cn(className)}
      variants={staggerVariant(delayChildren, staggerChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      {...rest}
    >
      {Children.map(children, (child, i) => {
        if (isValidElement<{ variants?: unknown }>(child)) {
          // Inject the variant only if the child doesn't already declare one.
          if (!child.props.variants) {
            return cloneElement(child, { variants: fadeUp });
          }
          return child;
        }
        return (
          <m.div key={i} variants={fadeUp}>
            {child}
          </m.div>
        );
      })}
    </m.div>
  );
};
