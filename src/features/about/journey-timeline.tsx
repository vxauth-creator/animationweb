"use client";

import * as m from "motion/react-m";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { durations, easeSmooth } from "@/animations/easings";
import { journey } from "@/lib/data/about";

/**
 * `<JourneyTimeline>` — compact horizontal/vertical timeline of studio
 * milestones. The studio history is intentionally short — depth over volume.
 */
export const JourneyTimeline = () => {
  return (
    <Section
      size="full"
      eyebrow="Trajectory"
      heading={
        <>
          A short history, <span className="text-gradient">deliberately</span>
        </>
      }
      description="We've kept the studio focused. The work compounds; the team does, too."
    >
      <Container>
        <ol className="relative mx-auto max-w-3xl border-l border-(--border-strong) pl-8 md:pl-10">
          {journey.map((entry, i) => (
            <m.li
              key={entry.year}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: durations.slow, ease: easeSmooth, delay: i * 0.06 }}
              className="relative pb-10 last:pb-0"
            >
              <span
                aria-hidden
                className="absolute -left-[42px] top-1.5 inline-flex h-3 w-3 items-center justify-center rounded-full bg-(--color-accent-cyan) shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-accent-cyan)_25%,transparent)] md:-left-[46px]"
              />
              <p className="font-mono text-xs tracking-[0.2em] text-(--color-paper-300) uppercase">
                {entry.year}
              </p>
              <h3 className="mt-1 font-display text-2xl font-medium md:text-3xl">
                {entry.title}
              </h3>
              <p className="mt-2 max-w-xl text-(--foreground-muted)">{entry.copy}</p>
            </m.li>
          ))}
        </ol>
      </Container>
    </Section>
  );
};
