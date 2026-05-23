import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowBorder } from "@/components/ui/glow-border";
import { GradientBg } from "@/components/ui/gradient-bg";
import { Section } from "@/components/ui/section";

interface PagePlaceholderProps {
  /** Eyebrow label, all caps. */
  eyebrow: string;
  /** Page title — used as the H1. Strings, or React for highlights. */
  title: React.ReactNode;
  /** One-line summary under the title. */
  description: string;
  /** Future-content bullets shown in a glass card. */
  outline?: ReadonlyArray<{ title: string; copy: string }>;
  /** Phase tag for transparent communication while content is being built. */
  phase?: string;
}

/**
 * `<PagePlaceholder>` — premium "coming soon" surface used by Phase-1 route
 * scaffolds. Each route still ships its own metadata + a real H1, so SEO,
 * navigation, and a11y are correct from day one. Phase 3 will replace the
 * body of each route with its actual feature composition.
 */
export const PagePlaceholder = ({
  eyebrow,
  title,
  description,
  outline,
  phase,
}: PagePlaceholderProps) => {
  return (
    <Section size="full" className="relative">
      <GradientBg variant="aurora" />
      <Container size="narrow" className="relative">
        <p className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-balance text-5xl leading-[1.02] font-semibold md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-(--foreground-muted) md:text-xl">
          {description}
        </p>

        {outline && outline.length > 0 ? (
          <GlowBorder accent="violet" className="mt-12">
            <GlassCard variant="strong" sheen className="p-6 md:p-8">
              <p className="text-xs font-medium tracking-[0.2em] text-(--color-paper-300) uppercase">
                Section outline
              </p>
              <ul className="mt-5 grid gap-5 md:grid-cols-2">
                {outline.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-accent-cyan)"
                    />
                    <div>
                      <p className="font-display text-base font-medium">{item.title}</p>
                      <p className="mt-1 text-sm text-(--foreground-muted)">{item.copy}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </GlowBorder>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href="/contact">Start a project</Button>
          <Button href="/work" variant="secondary">
            View work
          </Button>
          {phase ? (
            <span className="ml-1 inline-flex items-center rounded-full border border-(--border-strong) bg-(--surface-1)/60 px-3 py-1 font-mono text-xs text-(--foreground-muted)">
              {phase}
            </span>
          ) : null}
        </div>
      </Container>
    </Section>
  );
};
