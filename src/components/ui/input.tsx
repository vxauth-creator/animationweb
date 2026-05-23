"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils/cn";

import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Render a soft error ring/border. Pair with `<Field error="...">`. */
  invalid?: boolean;
}

/**
 * `<Input>` — premium glass-styled text input.
 *
 * Forwards the ref so React Hook Form can register controls directly. When
 * `invalid` is `true` the border + ring shift to the danger accent. The
 * `aria-invalid` attribute is set automatically.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, className, id, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={id ? `${id}-help` : undefined}
      className={cn(
        "h-11 w-full rounded-xl border bg-(--surface-1)/40 px-4 text-sm",
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
