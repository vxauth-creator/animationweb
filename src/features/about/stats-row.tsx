import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { studioStats } from "@/lib/data/about";

/**
 * `<StatsRow>` — animated counter strip for the studio.
 *
 * Counters animate the first time they enter the viewport. Non-numeric
 * entries (e.g. "0→1") render verbatim from the `display` field.
 */
export const StatsRow = () => {
  return (
    <Section size="regular">
      <Container>
        <GlassCard variant="strong" sheen className="p-6 md:p-8">
          <ul className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
            {studioStats.map((stat) => (
              <li key={stat.label}>
                <p className="font-mono text-[11px] tracking-[0.2em] text-(--color-paper-300) uppercase">
                  {stat.label}
                </p>
                <p className="mt-2 font-display text-4xl font-semibold md:text-5xl">
                  {stat.value !== null ? (
                    <AnimatedCounter to={stat.value} suffix={stat.suffix ?? ""} />
                  ) : (
                    stat.display
                  )}
                </p>
              </li>
            ))}
          </ul>
        </GlassCard>
      </Container>
    </Section>
  );
};
