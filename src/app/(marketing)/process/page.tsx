import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Process",
  description: "How we move from a kickoff conversation to a deployed product.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <PagePlaceholder
      eyebrow="Process"
      title={
        <>
          Six steps from <span className="text-gradient">kickoff to launch</span>
        </>
      }
      description="Discovery, planning, design, development, optimization, and deployment — each step with clear owners, deliverables, and motion-driven storytelling."
      outline={[
        { title: "1 · Discovery", copy: "Audience, goals, constraints, success metrics." },
        { title: "2 · Planning", copy: "Architecture, scope, and milestones." },
        { title: "3 · Design", copy: "System-driven design with motion specs." },
        { title: "4 · Development", copy: "Type-safe, accessible, performant builds." },
        { title: "5 · Optimization", copy: "Lighthouse, a11y, SEO, and motion polish." },
        { title: "6 · Deployment", copy: "CI/CD with safety nets and observability." },
      ]}
      phase="Phase 3 · Process"
    />
  );
}
