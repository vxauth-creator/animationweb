import { CallToAction } from "@/components/sections/call-to-action";
import { PageHero } from "@/components/sections/page-hero";
import { ServicesGrid } from "@/features/services/services-grid";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Premium engineering across business websites, SaaS, dashboards, AI integrations, and performance.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Software-grade craft, <span className="text-gradient">end to end</span>
          </>
        }
        description="From product strategy to deployed pixels, every layer is engineered for performance, accessibility, and scale."
        meta={[
          { label: "Engagements", value: "Project · Retainer" },
          { label: "Stack", value: "Next · R3F · Supabase" },
          { label: "A11y", value: "WCAG AA+" },
          { label: "Lighthouse", value: "98+" },
        ]}
      />

      <ServicesGrid />

      <CallToAction
        eyebrow="Pick a starting point"
        title={
          <>
            Have a brief? Send it. <span className="text-gradient">We&apos;ll engineer it.</span>
          </>
        }
        description="Every engagement starts with a clear, written success metric."
      />
    </>
  );
}
