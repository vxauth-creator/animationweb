import { cn } from "@/lib/utils/cn";

import type { ComponentPropsWithoutRef, ElementType } from "react";

interface GlassCardProps extends ComponentPropsWithoutRef<"div"> {
  as?: ElementType;
  variant?: "soft" | "strong";
  /** Adds a subtle accent ring/glow on hover. */
  interactive?: boolean;
  /** Adds the holographic top sheen. */
  sheen?: boolean;
}

const variants: Record<NonNullable<GlassCardProps["variant"]>, string> = {
  soft: "surface-glass",
  strong: "surface-glass-strong",
};

/**
 * `<GlassCard>` — premium glassmorphic surface.
 *
 * Compose with `<GlowBorder>` or `<Magnetic>` for interactive variants.
 * The optional `sheen` adds a subtle holographic gradient highlight along the top.
 */
export const GlassCard = ({
  as,
  variant = "soft",
  interactive = false,
  sheen = false,
  className,
  children,
  ...rest
}: GlassCardProps) => {
  // Cast to a permissive ElementType so React 19's stricter `JSX.IntrinsicAttributes`
  // doesn't collapse the children type to `never` on polymorphic usage.
  const Tag = (as ?? "div") as ElementType<ComponentPropsWithoutRef<"div">>;
  return (
    <Tag
      className={cn(
        "relative overflow-hidden rounded-2xl",
        variants[variant],
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-300 ease-(--ease-smooth) hover:border-(--color-accent-blue)/40 hover:shadow-[0_24px_60px_-20px_rgba(124,92,255,0.35)] hover:-translate-y-0.5",
        className,
      )}
      {...rest}
    >
      {sheen ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-(--color-accent-cyan)/60 to-transparent"
        />
      ) : null}
      {children}
    </Tag>
  );
};
