"use client";

import * as m from "motion/react-m";
import { useCallback, useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowBorder } from "@/components/ui/glow-border";
import { Section } from "@/components/ui/section";
import { durations, easeExpo } from "@/animations/easings";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { testimonials } from "@/lib/data/testimonials";
import { cn } from "@/lib/utils/cn";

import type { Testimonial } from "@/lib/data/testimonials";

interface TestimonialsCarouselProps {
  /** Pin to a specific subset (e.g. for the home page). */
  items?: ReadonlyArray<Testimonial>;
  /** Auto-advance interval in ms. Set to 0 to disable. */
  autoPlayMs?: number;
  /** Hide the eyebrow + heading (used inside other sections). */
  bare?: boolean;
}

/**
 * `<TestimonialsCarousel>` — auto-advancing carousel with manual controls.
 *
 * Behavior:
 *  - Auto-advances every `autoPlayMs` (default 7s) but pauses on hover/focus
 *    and when reduced-motion is enabled.
 *  - Keyboard accessible: Tab into the dots; Enter/Space activates a slide.
 *  - The active slide cross-fades + slides in via Motion variants — single
 *    DOM swap, GPU transforms only.
 */
export const TestimonialsCarousel = ({
  items = testimonials,
  autoPlayMs = 7000,
  bare = false,
}: TestimonialsCarouselProps) => {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timer = useRef<number | null>(null);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (reduced || autoPlayMs === 0 || isPaused || items.length <= 1) return;
    timer.current = window.setTimeout(next, autoPlayMs);
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, [next, autoPlayMs, isPaused, reduced, items.length, index]);

  const active = items[index];
  if (!active) return null;

  const content = (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <GlowBorder accent="violet" radius="2xl">
        <GlassCard
          variant="strong"
          sheen
          className="relative min-h-[16rem] p-8 md:min-h-[18rem] md:p-12"
        >
          <span
            aria-hidden
            className="absolute top-6 right-7 font-display text-7xl leading-none text-(--color-accent-cyan)/20 md:text-8xl"
          >
            &ldquo;
          </span>

          <m.figure
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: durations.slow, ease: easeExpo }}
            className="relative"
          >
            <blockquote className="text-balance font-display text-xl leading-snug font-medium md:text-3xl">
              {active.quote}
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--border-strong) bg-(--surface-1)/60 font-mono text-xs text-(--color-accent-cyan)">
                {active.author
                  .split(" ")
                  .slice(0, 2)
                  .map((s) => s[0])
                  .join("")}
              </span>
              <div>
                <p className="font-display text-base font-medium">{active.author}</p>
                <p className="text-sm text-(--foreground-muted)">
                  {active.role} · {active.company}
                </p>
              </div>
              {active.tag ? (
                <Badge variant="muted" size="sm" className="ml-auto">
                  {active.tag}
                </Badge>
              ) : null}
            </figcaption>
          </m.figure>
        </GlassCard>
      </GlowBorder>

      {/* Dots */}
      {items.length > 1 ? (
        <div
          role="tablist"
          aria-label="Testimonials"
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          {items.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial from ${t.author}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-[width,background-color] duration-300 ease-(--ease-smooth)",
                i === index
                  ? "w-10 bg-(--color-accent-cyan)"
                  : "w-2 bg-(--border-strong) hover:bg-(--color-paper-300)",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );

  if (bare) return <Container>{content}</Container>;

  return (
    <Section
      size="full"
      eyebrow="Said about the work"
      heading={
        <>
          Quiet, <span className="text-gradient">measurable</span> outcomes
        </>
      }
      description="Five short notes from teams we've built with."
    >
      <Container>{content}</Container>
    </Section>
  );
};
