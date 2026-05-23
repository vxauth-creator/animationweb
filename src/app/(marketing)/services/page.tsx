import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Premium engineering across business websites, SaaS, dashboards, AI integrations, and performance.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <PagePlaceholder
      eyebrow="Services"
      title={
        <>
          Software-grade craft, <span className="text-gradient">end to end</span>
        </>
      }
      description="From product strategy to deployed pixels, every layer is engineered for performance, accessibility, and scale."
      outline={[
        {
          title: "Business websites",
          copy: "Brand-defining marketing sites with motion-rich storytelling.",
        },
        { title: "SaaS development", copy: "Type-safe, multi-tenant product surfaces." },
        { title: "Admin dashboards", copy: "Operational consoles with realtime data + RBAC." },
        { title: "AI integrations", copy: "LLM features that ship to production." },
        { title: "E-commerce", copy: "High-conversion storefronts and headless commerce." },
        { title: "Performance audits", copy: "Lighthouse / Core Web Vitals deep dives." },
        { title: "UI/UX systems", copy: "Token-driven design systems and component libraries." },
        { title: "Web applications", copy: "Domain-specific tools with first-class motion." },
      ]}
      phase="Phase 3 · Marketing sections"
    />
  );
}
