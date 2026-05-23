import { cn } from "@/lib/utils/cn";

import type { ComponentPropsWithoutRef } from "react";

/**
 * `<Skeleton>` — shimmer placeholder for streaming/suspended UI.
 *
 * Uses the `--animate-shimmer` token. Compose with sized utility classes to
 * approximate the eventual content silhouette.
 */
export const Skeleton = ({
  className,
  ...rest
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-lg bg-(--surface-1)/60",
        "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r",
        "before:from-transparent before:via-(--color-paper-200)/10 before:to-transparent",
        "before:animate-(--animate-shimmer)",
        className,
      )}
      {...rest}
    />
  );
};
