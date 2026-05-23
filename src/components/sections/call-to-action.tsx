import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowBorder } from "@/components/ui/glow-border";
import { Magnetic } from "@/components/ui/magnetic";
import { Section } from "@/components/ui/section";

interface CallToActionProps {
  /** Eyebrow tag, all caps. */
  eyebrow?: string;
  /** Main headline. */
  title: React.ReactNode;
  /** Supporting copy under the headline. */
  description?: string;
  /** Primary CTA. */
  primary?: { label: string; href: string };
  /** Secondary CTA. */
  secondary?: { label: string; href: string };
}

/**
 * `<CallToAction>` — closing CTA section.
 *
 * Used at the bottom of marketing pages and the home page. Wraps a
 * `<GlassCard>` in a `<GlowBorder>` so it reads as the page's final beat
 * without competing with the hero earlier on the page.
 */
export const CallToAction = ({
  eyebrow = "Ready when you are",
  title,
  description,
  primary = { label: "Start project", href: "/contact" },
  secondary = { label: "View work", href: "/work" },
}: CallToActionProps) => {
  return (
    <Section size="full">
      <Container>
        <GlowBorder accent="violet" radius="2xl">
          <GlassCard variant="strong" sheen className="p-10 md:p-14">
            <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase">
                  {eyebrow}
                </p>
                <h2 className="mt-4 max-w-2xl text-balance text-4xl leading-[1.05] font-semibold md:text-5xl">
                  {title}
                </h2>
                {description ? (
                  <p className="mt-5 max-w-xl text-(--foreground-muted)">{description}</p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-3">
                <Magnetic strength={14}>
                  <Button href={primary.href} size="lg">
                    {primary.label}
                  </Button>
                </Magnetic>
                <Magnetic strength={10}>
                  <Button href={secondary.href} size="lg" variant="secondary">
                    {secondary.label}
                  </Button>
                </Magnetic>
              </div>
            </div>
          </GlassCard>
        </GlowBorder>
      </Container>
    </Section>
  );
};
