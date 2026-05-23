import { cn } from "@/lib/utils/cn";

import type { ComponentPropsWithoutRef } from "react";

interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: "default" | "outline" | "accent" | "muted";
  size?: "sm" | "md";
}

const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "border border-(--border-strong) bg-(--surface-1)/60 text-(--foreground)/90",
  outline:
    "border border-(--border-subtle) bg-transparent text-(--foreground-muted)",
  accent:
    "border border-(--color-accent-cyan)/30 bg-(--color-accent-cyan)/10 text-(--color-accent-cyan)",
  muted: "border border-(--border-subtle) bg-(--surface-1)/30 text-(--color-paper-300)",
};

const sizes: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "h-6 px-2.5 text-[11px]",
  md: "h-7 px-3 text-xs",
};

/**
 * `<Badge>` — small pill label, used for tech-stack chips and category tags.
 * Lightweight, no JS, no client-side dependencies.
 */
export const Badge = ({
  variant = "default",
  size = "sm",
  className,
  ...rest
}: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full font-medium tracking-tight whitespace-nowrap",
      variants[variant],
      sizes[size],
      className,
    )}
    {...rest}
  />
);
