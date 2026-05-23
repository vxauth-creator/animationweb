import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/features/contact/contact-form";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Tell us about your project — we'll come back within one business day.",
  path: "/contact",
});

const SIGNALS: ReadonlyArray<{ label: string; copy: string }> = [
  {
    label: "Discovery sprint",
    copy: "We start with a paid 1–2 week discovery sprint that ends in a written plan.",
  },
  {
    label: "Engagements",
    copy: "Project (4–12 weeks), retainer (3–12 months), or staff augmentation.",
  },
  {
    label: "What helps",
    copy: "Existing brand, success metric, target audience, and a sense of timeline.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build <span className="text-gradient">something cinematic</span>.
          </>
        }
        description="Tell us where you are, what you're building, and what success looks like. We respond to every inquiry within one business day."
      />

      <Section size="full">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <ContactForm />

            <aside className="grid gap-5 self-start">
              <GlassCard className="p-6">
                <p className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase">
                  Direct
                </p>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="mt-3 block font-display text-2xl font-medium hover:text-(--color-accent-cyan)"
                >
                  {siteConfig.contactEmail}
                </a>
                <p className="mt-2 text-sm text-(--foreground-muted)">
                  Prefer email? It lands in the same inbox.
                </p>
              </GlassCard>

              {SIGNALS.map((signal) => (
                <GlassCard key={signal.label} className="p-6">
                  <p className="font-mono text-xs tracking-[0.2em] text-(--color-paper-300) uppercase">
                    {signal.label}
                  </p>
                  <p className="mt-3 text-sm text-(--foreground-muted)">{signal.copy}</p>
                </GlassCard>
              ))}
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
