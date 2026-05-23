"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils/cn";

import type { InputHTMLAttributes, ReactNode } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Visible label rendered to the right of the box. */
  label: ReactNode;
  invalid?: boolean;
}

/**
 * `<Checkbox>` — accessible custom checkbox.
 *
 * The native `<input type="checkbox">` is preserved (visually hidden) so all
 * accessibility, keyboard, and form-state behavior is native. The visible
 * box is purely decorative and reflects state via sibling-selectors.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, id, invalid, ...rest },
  ref,
) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "group inline-flex cursor-pointer items-start gap-3 text-sm text-(--foreground-muted) select-none",
        className,
      )}
    >
      <span className="relative mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-invalid={invalid || undefined}
          aria-describedby={id ? `${id}-help` : undefined}
          className="peer absolute inset-0 cursor-pointer opacity-0"
          {...rest}
        />
        <span
          aria-hidden
          className={cn(
            "block h-5 w-5 rounded-md border bg-(--surface-1)/60",
            "transition-[border-color,background-color,box-shadow] duration-200 ease-(--ease-smooth)",
            "peer-focus-visible:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-accent-cyan)_25%,transparent)]",
            "peer-checked:[background:linear-gradient(135deg,var(--color-accent-cyan),var(--color-accent-violet))]",
            invalid
              ? "border-(--color-danger)/50"
              : "border-(--border-strong) peer-checked:border-(--color-accent-violet)/40",
          )}
        />
        <svg
          aria-hidden
          viewBox="0 0 12 10"
          className="pointer-events-none absolute h-2.5 w-3 scale-0 stroke-(--color-ink-50) opacity-0 transition-[transform,opacity] duration-200 ease-(--ease-smooth) peer-checked:scale-100 peer-checked:opacity-100"
        >
          <path d="M1 5l3.5 3.5L11 1" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="leading-snug">{label}</span>
    </label>
  );
});
