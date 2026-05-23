import { Container } from "@/components/ui/container";
import { GradientBg } from "@/components/ui/gradient-bg";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils/cn";

import type { ReactNode } from "react";

interface PageHeroProps {
  /** Eyebrow tag, all caps. */
  eyebrow: string;
  /** Page H1. Plain text or fragment with highlights. */
  title: ReactNode;
  /** One-paragraph supporting copy. */
  description: string;
  /** Optional metric/stat row aligned to the right edge on desktop. */
  meta?: ReadonlyArray<{ label: string; value: ReactNode }>;
  /** Optional decorative side slot — used by feature pages with a small visualization. */
  aside?: ReactNode;
  className?: string;
}

/**
 * `<PageHero>` — premium top-of-page hero used by every marketing route.
 *
 * Standardizes vertical rhythm, eyebrow + H1 + description + optional meta,
 * and a calm gradient backdrop. Heavier 3D scenes belong to the home hero —
 * this is the elegant version for content pages.
 */
export const PageHero = ({
  eyebrow,
  title,
  description,
  meta,
  aside,
  className,
}: PageHeroProps) => {
  return (
    <section
      aria-labelledby="page-hero-title"
      className={cn(
        "relative isolate flex items-end overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28",
        className,
      )}
    >
      <GradientBg variant="aurora" />
      <GradientBg variant="grid" />

      <Container className="relative">
        <div className={cn("grid gap-10", aside ? "md:grid-cols-[1.4fr_1fr]" : "")}>
          <div>
            <FadeIn immediate>
              <p className="font-mono text-xs tracking-[0.25em] text-(--color-accent-cyan) uppercase">
                {eyebrow}
              </p>
            </FadeIn>
            <h1
              id="page-hero-title"
              className="mt-5 text-balance text-5xl leading-[1.02] font-semibold md:text-6xl lg:text-7xl"
            >
              <Reveal as="span" delay={0.05}>
                {title}
              </Reveal>
            </h1>
            <FadeIn delay={0.3} immediate>
              <p className="mt-6 max-w-2xl text-lg text-(--foreground-muted) md:text-xl">
                {description}
              </p>
            </FadeIn>

            {meta && meta.length > 0 ? (
              <FadeIn delay={0.45} immediate className="mt-10">
                <ul className="grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-4">
                  {meta.map((m) => (
                    <li key={m.label}>
                      <p className="font-mono text-xs tracking-[0.18em] text-(--color-paper-300) uppercase">
                        {m.label}
                      </p>
                      <p className="mt-1 font-display text-2xl font-medium">{m.value}</p>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ) : null}
          </div>

          {aside ? <div className="relative">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
};
