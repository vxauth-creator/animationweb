import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GradientBg } from "@/components/ui/gradient-bg";
import { Magnetic } from "@/components/ui/magnetic";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

/**
 * `<HeroSection>` — Phase 1 hero placeholder.
 *
 * This is a *server component* shell with the cinematic copy, eyebrow, CTAs,
 * and decorative gradient layers in place. Phase 2 will replace the gradient
 * background with a dynamically imported R3F scene mounted into the same
 * `<div data-hero-scene>` slot, rendered behind the foreground content.
 *
 * Why a placeholder shipping today:
 *  - Locks in the layout, type ramp, and rhythm so Phase 2 doesn't churn it.
 *  - Lets Lighthouse / SEO / content reviews start now.
 *  - Provides the exact copy hooks the brief specified.
 */
export const HeroSection = () => {
  return (
    <section
      aria-label="Intro"
      className="relative isolate flex min-h-[88vh] items-center overflow-hidden"
    >
      {/* Phase-2 R3F scene mounts here. */}
      <div
        data-hero-scene
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <GradientBg variant="aurora" />
        <GradientBg variant="grid" />
      </div>

      <Container className="relative">
        <div className="max-w-4xl">
          <FadeIn immediate>
            <p className="font-mono text-xs tracking-[0.25em] text-(--color-accent-cyan) uppercase">
              Premium digital engineering studio
            </p>
          </FadeIn>

          <h1 className="mt-6 text-balance text-5xl leading-[0.98] font-semibold md:text-7xl lg:text-8xl">
            <Reveal as="span" delay={0.05}>
              Engineering Modern
            </Reveal>{" "}
            <Reveal as="span" delay={0.18}>
              <span className="text-gradient">Digital Experiences</span>
            </Reveal>
          </h1>

          <FadeIn delay={0.4} immediate>
            <p className="mt-7 max-w-2xl text-lg text-(--foreground-muted) md:text-xl">
              {siteConfig.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.55} immediate className="mt-10 flex flex-wrap gap-3">
            <Magnetic strength={14}>
              <Button href={siteConfig.cta.primary.href} size="lg">
                {siteConfig.cta.primary.label}
              </Button>
            </Magnetic>
            <Magnetic strength={10}>
              <Button href={siteConfig.cta.secondary.href} size="lg" variant="secondary">
                {siteConfig.cta.secondary.label}
              </Button>
            </Magnetic>
          </FadeIn>

          <FadeIn delay={0.75} immediate className="mt-16">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-4">
              {[
                { label: "Lighthouse", value: "98+" },
                { label: "Build target", value: "60 fps" },
                { label: "Stack", value: "Next · R3F" },
                { label: "Mode", value: "Cinematic" },
              ].map((stat) => (
                <li key={stat.label}>
                  <p className="font-mono text-xs tracking-[0.18em] text-(--color-paper-300) uppercase">
                    {stat.label}
                  </p>
                  <p className="mt-1 font-display text-2xl font-medium">{stat.value}</p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
};
