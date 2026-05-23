"use client";

import { cn } from "@/lib/utils/cn";
import { useMagnetic } from "@/hooks/use-magnetic";

import type { ComponentPropsWithoutRef } from "react";

interface MagneticProps extends ComponentPropsWithoutRef<"div"> {
  strength?: number;
  radius?: number;
  ease?: number;
}

/**
 * `<Magnetic>` — wraps any element to apply the pointer-magnetic effect.
 *
 * Uses `useMagnetic` under the hood. Honors reduced-motion automatically.
 *
 * ```tsx
 * <Magnetic strength={20}>
 *   <Button variant="primary">Start project</Button>
 * </Magnetic>
 * ```
 */
export const Magnetic = ({
  strength,
  radius,
  ease,
  className,
  children,
  ...rest
}: MagneticProps) => {
  const ref = useMagnetic<HTMLDivElement>({ strength, radius, ease });
  return (
    <div
      ref={ref}
      className={cn("inline-flex will-change-transform", className)}
      {...rest}
    >
      {children}
    </div>
  );
};
