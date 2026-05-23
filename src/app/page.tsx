import { HeroSection } from "@/features/hero/hero-section";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowBorder } from "@/components/ui/glow-border";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Stagger } from "@/components/motion/stagger";

const services = [
  {
    title: "Business websites",
    summary:
      "Brand-defining marketing sites with motion-rich storytelling, built to convert.",
  },
  {
    title: "SaaS platforms",
    summary:
      "Type-safe, multi-tenant product surfaces with auth, billing, and dashboards.",
  },
  {
    title: "Admin dashboards",
    summary:
      "Operational consoles with live data, RBAC, and the polish of consumer software.",
  },
  {
    title: "AI integrations",
    summary:
      "LLM-powered features that ship to production — agents, search, classification.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <Section
        size="full"
        eyebrow="What we build"
        heading={
          <>
            Software-grade craft applied to <span className="text-gradient">every surface</span>
          </>
        }
        description="From the first cursor interaction to the last query in your pipeline, every layer is engineered."
      >
        <Container>
          <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <GlowBorder key={service.title} accent="violet">
                <GlassCard interactive sheen className="h-full p-6 md:p-7">
                  <h3 className="font-display text-xl font-medium md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-(--foreground-muted)">{service.summary}</p>
                </GlassCard>
              </GlowBorder>
            ))}
          </Stagger>
        </Container>
      </Section>
    </>
  );
}
