"use client";

import * as m from "motion/react-m";

import { GlassCard } from "@/components/ui/glass-card";
import { GlowBorder } from "@/components/ui/glow-border";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { durations, easeExpo, easeSmooth } from "@/animations/easings";
import { processSteps } from "@/lib/data/process";
import { cn } from "@/lib/utils/cn";

interface ProcessTimelineProps {
  /** Compact variant for previews (no eyebrow header, smaller paddings). */
  compact?: boolean;
  /** Render at most N steps (used for the home preview). */
  limit?: number;
}

/**
 * `<ProcessTimeline>` — vertical scroll-revealed timeline of the 6 process
 * steps. A glowing left rail connects the step nodes; each item animates in
 * as it enters the viewport.
 *
 * Layout:
 *   - Mobile/tablet: single column with the rail on the left.
 *   - Desktop: a two-column rhythm — odd steps on the left, even on the right.
 *     Always anchored to the central rail so the eye tracks one path.
 */
export const ProcessTimeline = ({ compact, limit }: ProcessTimelineProps) => {
  const steps = limit ? processSteps.slice(0, limit) : processSteps;

  return (
    <Section size={compact ? "regular" : "full"}>
      <Container>
        <ol className="relative mx-auto max-w-4xl">
          {/* Left rail (mobile + tablet) / centered rail (desktop) */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[19px] w-px bg-gradient-to-b from-(--color-accent-cyan)/0 via-(--color-accent-violet)/40 to-(--color-accent-cyan)/0 md:left-1/2 md:-translate-x-px"
          />

          {steps.map((step, i) => {
            const onRight = i % 2 === 1; // alternates on desktop
            return (
              <m.li
                key={step.index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: durations.slow, ease: easeExpo, delay: i * 0.04 }}
                className={cn(
                  "relative grid pl-12 md:grid-cols-2 md:gap-10 md:pl-0",
                  i !== 0 && "mt-10 md:mt-12",
                )}
              >
                {/* Node */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-1 left-2 inline-flex h-9 w-9 items-center justify-center rounded-full",
                    "border border-(--border-strong) bg-(--surface-1)/80 backdrop-blur-md",
                    "shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-accent-violet)_15%,transparent)]",
                    "md:left-1/2 md:-translate-x-1/2",
                  )}
                >
                  <span className="font-mono text-xs text-(--color-accent-cyan)">
                    {step.index.toString().padStart(2, "0")}
                  </span>
                </span>

                {/* Content card — column position alternates on desktop. */}
                <div
                  className={cn(
                    "md:col-span-1",
                    onRight ? "md:col-start-2" : "md:col-start-1",
                  )}
                >
                  <GlowBorder
                    accent={onRight ? "blue" : "violet"}
                    className={cn(onRight ? "md:ml-6" : "md:mr-6")}
                  >
                    <GlassCard variant="strong" className="p-5 md:p-6">
                      <header className="flex items-center justify-between gap-4">
                        <h3 className="font-display text-xl font-medium md:text-2xl">
                          {step.title}
                        </h3>
                        <span className="font-mono text-[11px] tracking-[0.18em] text-(--color-paper-300) uppercase">
                          {step.duration}
                        </span>
                      </header>
                      <p className="mt-2 text-sm text-(--foreground-muted)">
                        {step.summary}
                      </p>
                      <m.ul
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                        transition={{ duration: durations.base, ease: easeSmooth, delay: 0.15 }}
                        className="mt-4 grid gap-1.5 text-xs text-(--foreground-muted)"
                      >
                        {step.deliverables.map((d) => (
                          <li key={d} className="flex items-center gap-2">
                            <span
                              aria-hidden
                              className="inline-block h-1 w-1 shrink-0 rounded-full bg-(--color-accent-cyan)"
                            />
                            {d}
                          </li>
                        ))}
                      </m.ul>
                    </GlassCard>
                  </GlowBorder>
                </div>
              </m.li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
};
