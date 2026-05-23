"use client";

import { cn } from "@/lib/utils/cn";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { useCallback, useRef } from "react";

interface GlowBorderProps extends ComponentPropsWithoutRef<"div"> {
  /** Glow intensity (0..1). Defaults to 0.6. */
  intensity?: number;
  /** Glow accent color — uses CSS custom property names from the @theme palette. */
  accent?: "blue" | "cyan" | "violet";
  /** Border radius matches the wrapped child; tweak if needed. */
  radius?: "md" | "lg" | "xl" | "2xl";
}

const accents: Record<NonNullable<GlowBorderProps["accent"]>, string> = {
  blue: "var(--color-accent-blue)",
  cyan: "var(--color-accent-cyan)",
  violet: "var(--color-accent-violet)",
};

const radii: Record<NonNullable<GlowBorderProps["radius"]>, string> = {
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-[1.75rem]",
  "2xl": "rounded-[2.25rem]",
};

/**
 * `<GlowBorder>` — pointer-tracking gradient border.
 *
 * Updates two CSS custom properties (`--mx`, `--my`) on pointer-move so the
 * border highlight follows the cursor. Pure CSS rendering after that — no
 * per-frame React state.
 */
export const GlowBorder = ({
  intensity = 0.6,
  accent = "violet",
  radius = "lg",
  className,
  style,
  children,
  ...rest
}: GlowBorderProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn("group relative isolate p-px", radii[radius], className)}
      style={
        {
          ...style,
          background: `radial-gradient(220px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, ${accents[accent]} ${Math.round(
            intensity * 100,
          )}%, transparent), transparent 60%)`,
        } as React.CSSProperties
      }
      {...rest}
    >
      <div className={cn("relative h-full w-full", radii[radius])}>{children}</div>
    </div>
  );
};
