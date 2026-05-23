import { cn } from "@/lib/utils/cn";

import type { ComponentPropsWithoutRef } from "react";

interface GradientBgProps extends ComponentPropsWithoutRef<"div"> {
  /** Visual variant: `aurora` is the cinematic hero variant; `mesh` is calmer. */
  variant?: "aurora" | "mesh" | "grid";
}

/**
 * `<GradientBg>` — fixed/absolute decorative background layer.
 *
 * Static (no JS) by design — animation is layered separately via R3F or motion
 * primitives so this stays cheap and SSR-renderable. Pointer events are off.
 */
export const GradientBg = ({ variant = "aurora", className, ...rest }: GradientBgProps) => {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        variant === "aurora" &&
          "[background:radial-gradient(60%_50%_at_20%_10%,color-mix(in_oklab,var(--color-accent-violet)_22%,transparent),transparent_60%),radial-gradient(50%_50%_at_85%_30%,color-mix(in_oklab,var(--color-accent-blue)_18%,transparent),transparent_60%),radial-gradient(40%_30%_at_50%_100%,color-mix(in_oklab,var(--color-accent-cyan)_14%,transparent),transparent_60%)]",
        variant === "mesh" &&
          "[background:radial-gradient(40%_40%_at_30%_20%,color-mix(in_oklab,var(--color-accent-blue)_14%,transparent),transparent_60%),radial-gradient(35%_35%_at_70%_70%,color-mix(in_oklab,var(--color-accent-violet)_12%,transparent),transparent_60%)]",
        variant === "grid" &&
          "[background-image:linear-gradient(to_right,color-mix(in_oklab,var(--color-paper-200)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--color-paper-200)_5%,transparent)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,#000_40%,transparent_80%)]",
        className,
      )}
      {...rest}
    />
  );
};
