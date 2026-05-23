import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { Stagger } from "@/components/motion/stagger";
import { philosophy } from "@/lib/data/about";

/**
 * `<PhilosophyGrid>` — six principles that govern the studio's work.
 *
 * Quiet, evenly-weighted grid — each principle gets the same visual gravity
 * so no single line dominates. Stagger reveals row by row.
 */
export const PhilosophyGrid = () => {
  return (
    <Section
      size="full"
      eyebrow="How we work"
      heading={
        <>
          Six principles, <span className="text-gradient">applied consistently</span>
        </>
      }
      description="The patterns that show up in every engagement, regardless of vertical or surface."
    >
      <Container>
        <Stagger
          staggerChildren={0.06}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {philosophy.map((p, i) => (
            <GlassCard key={p.title} className="p-6 md:p-7">
              <p className="font-mono text-[11px] tracking-[0.2em] text-(--color-accent-cyan) uppercase">
                {(i + 1).toString().padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-xl font-medium md:text-2xl">{p.title}</h3>
              <p className="mt-3 text-sm text-(--foreground-muted)">{p.copy}</p>
            </GlassCard>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
};
