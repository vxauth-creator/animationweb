"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils/cn";

import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

/**
 * `<Select>` — native `<select>` styled to match the form palette.
 *
 * Native (not a custom popover) so keyboard, screen reader, and mobile UX are
 * correct by default. The inline SVG chevron is set as a background image so
 * we don't add a wrapper element.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { invalid, className, id, children, ...rest },
  ref,
) {
  return (
    <select
      ref={ref}
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={id ? `${id}-help` : undefined}
      className={cn(
        "h-11 w-full appearance-none rounded-xl border bg-(--surface-1)/40 pr-10 pl-4 text-sm",
        "transition-[border-color,box-shadow,background-color] duration-200 ease-(--ease-smooth)",
        "focus:bg-(--surface-1)/60 focus:outline-none",
        // Inline chevron, color-matched.
        "bg-[length:14px_14px] bg-no-repeat bg-[right_1rem_center]",
        "bg-[image:url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2014%2014%22%20fill=%22none%22%20stroke=%22%238993ae%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><polyline%20points=%223,5%207,9%2011,5%22/></svg>')]",
        invalid
          ? "border-(--color-danger)/50 focus:border-(--color-danger) focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-danger)_25%,transparent)]"
          : "border-(--border-strong) focus:border-(--color-accent-blue)/50 focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-accent-blue)_22%,transparent)]",
        className,
      )}
      {...rest}
    >
      {children}
    </select>
  );
});
