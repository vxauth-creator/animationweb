"use client";

import { cn } from "@/lib/utils/cn";

import type { ReactNode } from "react";

interface FieldProps {
  /** HTML `id` of the control — wires `htmlFor` and aria-describedby. */
  id: string;
  /** Visible label text. */
  label: ReactNode;
  /** Optional helper text under the control (used when there's no error). */
  hint?: ReactNode;
  /** Validation error text — replaces hint and applies error styling. */
  error?: string;
  /** Visually hide the label (still announced by screen readers). */
  srOnlyLabel?: boolean;
  /** Render the control(s). */
  children: ReactNode;
  className?: string;
}

/**
 * `<Field>` — semantic wrapper for a form control.
 *
 * Centralizes label + hint + error rendering with proper ARIA wiring. Pair
 * with `<Input>`, `<Textarea>`, etc., and forward the `id` to the control.
 * The hint or error is given a stable `${id}-help` id so consumers can
 * point `aria-describedby` at it (the inputs do this automatically).
 */
export const Field = ({
  id,
  label,
  hint,
  error,
  srOnlyLabel = false,
  children,
  className,
}: FieldProps) => {
  const helpId = `${id}-help`;
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label
        htmlFor={id}
        className={cn(
          "text-xs font-medium tracking-[0.18em] uppercase text-(--color-paper-300)",
          srOnlyLabel && "sr-only",
        )}
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={helpId} role="alert" className="text-xs text-(--color-danger)">
          {error}
        </p>
      ) : hint ? (
        <p id={helpId} className="text-xs text-(--foreground-muted)">
          {hint}
        </p>
      ) : null}
    </div>
  );
};
