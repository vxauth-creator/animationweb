"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils/cn";

import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

/**
 * `<Textarea>` — multi-line counterpart to `<Input>`. Same visual contract.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className, id, rows = 5, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      id={id}
      rows={rows}
      aria-invalid={invalid || undefined}
      aria-describedby={id ? `${id}-help` : undefined}
      className={cn(
        "block w-full resize-y rounded-xl border bg-(--surface-1)/40 px-4 py-3 text-sm",
        "placeholder:text-(--color-paper-400)/70",
        "transition-[border-color,box-shadow,background-color] duration-200 ease-(--ease-smooth)",
        "focus:bg-(--surface-1)/60 focus:outline-none",
        invalid
          ? "border-(--color-danger)/50 focus:border-(--color-danger) focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-danger)_25%,transparent)]"
          : "border-(--border-strong) focus:border-(--color-accent-blue)/50 focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-accent-blue)_22%,transparent)]",
        className,
      )}
      {...rest}
    />
  );
});
