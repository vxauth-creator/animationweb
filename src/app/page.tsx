import Link from "next/link";

import { CallToAction } from "@/components/sections/call-to-action";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { HeroSection } from "@/features/hero/hero-section";
import { ProjectGrid } from "@/features/work/project-grid";
import { ServicesGrid } from "@/features/services/services-grid";
import { TestimonialsCarousel } from "@/features/testimonials/testimonials-carousel";
import { processSteps } from "@/lib/data/process";
import { studioStats } from "@/lib/data/about";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Services preview — 4 cards. */}
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
          <p className="mb-8 -mt-2">
            <Link
              href="/services"
              className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase hover:text-(--foreground)"
            >
              All services →
            </Link>
          </p>
        </Container>
        <ServicesGrid limit={4} />
      </Section>

      {/* Work preview — 2 featured projects. */}
      <Section
        size="full"
        bordered
        eyebrow="Recent work"
        heading={
          <>
            Real artifacts, <span className="text-gradient">measurable outcomes</span>
          </>
        }
        description="A snapshot of what's been shipping — full case studies on the work page."
      >
        <Container>
          <p className="mb-8 -mt-2">
            <Link
              href="/work"
              className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase hover:text-(--foreground)"
            >
              All work →
            </Link>
          </p>
        </Container>
        <ProjectGrid limit={2} />
      </Section>

      {/* Process preview — full timeline (it's compact already). */}
      <Section
        size="full"
        bordered
        eyebrow="How we ship"
        heading={
          <>
            Six steps from <span className="text-gradient">kickoff to launch</span>
          </>
        }
        description="Each step has clear owners, deliverables, and a written definition of done."
      >
        <Container>
          <ol className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {processSteps.map((step) => (
              <li key={step.index} className="rounded-2xl border border-(--border-subtle) bg-(--surface-1)/40 p-5">
                <p className="font-mono text-[11px] tracking-[0.2em] text-(--color-accent-cyan) uppercase">
                  {step.index.toString().padStart(2, "0")}
                </p>
                <p className="mt-3 font-display text-lg font-medium">{step.title}</p>
                <p className="mt-2 text-xs text-(--foreground-muted)">{step.duration}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6">
            <Link
              href="/process"
              className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase hover:text-(--foreground)"
            >
              Process detail →
            </Link>
          </p>
        </Container>
      </Section>

      {/* Testimonials carousel. */}
      <TestimonialsCarousel />

      {/* About preview — stats only (full philosophy on /about). */}
      <Section
        size="regular"
        bordered
        eyebrow="The studio"
        heading={
          <>
            Quiet, deliberate, <span className="text-gradient">obsessed with craft</span>
          </>
        }
        description="A focused engineering studio — small team, high signal, deep typescript."
      >
        <Container>
          <ul className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
            {studioStats.map((stat) => (
              <li key={stat.label}>
                <p className="font-mono text-[11px] tracking-[0.2em] text-(--color-paper-300) uppercase">
                  {stat.label}
                </p>
                <p className="mt-2 font-display text-3xl font-semibold md:text-4xl">
                  {stat.value !== null ? `${stat.value}${stat.suffix ?? ""}` : stat.display}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link
              href="/about"
              className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase hover:text-(--foreground)"
            >
              About the studio →
            </Link>
          </p>
        </Container>
      </Section>

      {/* Final CTA. */}
      <CallToAction
        title={
          <>
            Have a brief? <span className="text-gradient">Let&apos;s engineer it.</span>
          </>
        }
        description="Premium websites, SaaS platforms, dashboards, AI integrations — start with a single conversation."
      />
    </>
  );
}
