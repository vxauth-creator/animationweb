import { cn } from "@/lib/utils/cn";

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

interface SectionOwnProps {
  /** Render-as element. Defaults to `<section>`. */
  as?: ElementType;
  /** Vertical rhythm: full = hero/marquee sections, regular = content sections, sm = dense. */
  size?: "full" | "regular" | "sm" | "none";
  /** Optional eyebrow / kicker — small uppercase tracker above the heading. */
  eyebrow?: ReactNode;
  /** Optional cinematic heading. */
  heading?: ReactNode;
  /** Optional supporting copy directly below the heading. */
  description?: ReactNode;
  /** Adds a subtle top hairline + light gradient surface for separation. */
  bordered?: boolean;
}

type SectionProps = SectionOwnProps &
  Omit<ComponentPropsWithoutRef<"section">, keyof SectionOwnProps>;

const sizeClasses: Record<NonNullable<SectionProps["size"]>, string> = {
  full: "py-(--section-y)",
  regular: "py-(--section-y-sm)",
  sm: "py-16 md:py-20",
  none: "",
};

/**
 * `<Section>` — vertical rhythm + optional cinematic heading block.
 *
 * Standardizes how every page section spaces itself, presents an eyebrow /
 * heading / description, and optionally renders a top hairline. Polymorphic
 * via `as` for semantic markup (`article`, `aside`, ...).
 *
 * ```tsx
 * <Section
 *   eyebrow="Services"
 *   heading={<>Engineered for <span className="text-gradient">scale</span></>}
 *   description="From product surfaces to admin dashboards."
 * >
 *   ...
 * </Section>
 * ```
 */
export const Section = ({
  as: Tag = "section",
  size = "regular",
  eyebrow,
  heading,
  description,
  bordered = false,
  className,
  children,
  ...rest
}: SectionProps) => {
  const hasHeader = Boolean(eyebrow ?? heading ?? description);

  return (
    <Tag
      className={cn(
        "relative",
        sizeClasses[size],
        bordered &&
          "border-t border-(--border-subtle) bg-gradient-to-b from-(--surface-1)/40 to-transparent",
        className,
      )}
      {...rest}
    >
      {hasHeader ? (
        <div className="mx-auto w-full max-w-(--max-content) container-x">
          <header className="mb-12 max-w-3xl md:mb-16">
            {eyebrow ? (
              <p className="mb-4 text-xs font-medium tracking-[0.2em] uppercase text-(--color-accent-cyan)">
                {eyebrow}
              </p>
            ) : null}
            {heading ? (
              <h2 className="text-balance text-4xl leading-[1.05] font-semibold md:text-5xl lg:text-6xl">
                {heading}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-5 max-w-2xl text-lg text-(--foreground-muted) md:text-xl">
                {description}
              </p>
            ) : null}
          </header>
        </div>
      ) : null}
      {children}
    </Tag>
  );
};
