import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

import { HeroSceneMount } from "./hero-scene-mount";

/**
 * `<HeroSection>` — the cinematic landing surface.
 *
 * Composition (back-to-front):
 *   1. **R3F scene (`<HeroSceneMount>`)** — dynamically imported, client-only,
 *      tier-gated. Falls back to a static gradient inside its own boundary.
 *   2. **Foreground content** — copy, CTAs, stat row. HTML/CSS only.
 *
 * Stays a server component (no client deps in this file) so it streams as
 * fast as possible and the hero copy is in the initial HTML.
 */
export const HeroSection = () => {
  return (
    <section
      aria-label="Intro"
      className="relative isolate flex min-h-[88vh] items-center overflow-hidden"
    >
      {/* Background layer — gradient + (optional) cinematic 3D scene. */}
      <div data-hero-scene aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <HeroSceneMount />
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

      {/* Scroll cue — subtle, accessibility-safe (suppressed via reduced-motion). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex w-max flex-col items-center gap-1.5 text-(--color-paper-300) md:bottom-8"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <span
          className="block h-8 w-px animate-(--animate-scan)"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-accent-cyan), transparent)",
          }}
        />
      </div>
    </section>
  );
};
