import { cn } from "@/lib/utils/cn";

import type { ComponentPropsWithoutRef } from "react";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  /** Tighter max-width for narrow text-heavy content. */
  size?: "default" | "narrow" | "wide";
}

const sizes: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-(--max-content)",
  narrow: "max-w-3xl",
  wide: "max-w-[88rem]",
};

/**
 * `<Container>` — horizontal rhythm primitive.
 *
 * Centers content with token-driven max-width and responsive horizontal padding
 * (`--container-x` from `globals.css`). Always wrap top-level section content
 * in a `<Container>` rather than ad-hoc `max-w-*` classes.
 */
export const Container = ({ size = "default", className, ...rest }: ContainerProps) => {
  return (
    <div className={cn("mx-auto w-full container-x", sizes[size], className)} {...rest} />
  );
};
