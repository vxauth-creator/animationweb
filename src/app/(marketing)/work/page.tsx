import { CallToAction } from "@/components/sections/call-to-action";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectGrid } from "@/features/work/project-grid";
import { buildMetadata } from "@/lib/seo/metadata";
import { projects } from "@/lib/data/projects";

export const metadata = buildMetadata({
  title: "Work",
  description:
    "Selected projects — engineered for the brands and products we partner with.",
  path: "/work",
});

export default function WorkPage() {
  const total = projects.length;
  const stackUnion = Array.from(new Set(projects.flatMap((p) => p.stack))).length;

  return (
    <>
      <PageHero
        eyebrow="Work"
        title={
          <>
            Selected <span className="text-gradient">work</span>
          </>
        }
        description="An immersive grid of recent engagements. Tech stack, architecture, and measurable outcomes — every card a real artifact, not a mood board."
        meta={[
          { label: "Projects", value: total.toString() },
          { label: "Stacks", value: stackUnion.toString() },
          { label: "Verticals", value: "SaaS · AI · Commerce" },
          { label: "Year", value: "2023–25" },
        ]}
      />

      <ProjectGrid />

      <CallToAction
        eyebrow="Want to see more?"
        title={
          <>
            We share <span className="text-gradient">teardowns</span> on request.
          </>
        }
        description="If a specific category interests you (SaaS, AI, dashboards, commerce), tell us — we'll send the most relevant teardown."
      />
    </>
  );
}
