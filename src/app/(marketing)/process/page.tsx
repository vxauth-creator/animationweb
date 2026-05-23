import { CallToAction } from "@/components/sections/call-to-action";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessTimeline } from "@/features/process/process-timeline";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Process",
  description: "How we move from a kickoff conversation to a deployed product.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title={
          <>
            Six steps from <span className="text-gradient">kickoff to launch</span>
          </>
        }
        description="Discovery, planning, design, development, optimization, deployment. Each step has clear owners, deliverables, and a written definition of done."
        meta={[
          { label: "Cadence", value: "Weekly demos" },
          { label: "Reviews", value: "Async + sync" },
          { label: "Owners", value: "Studio + you" },
          { label: "Risk reg.", value: "Day 1" },
        ]}
      />

      <ProcessTimeline />

      <CallToAction
        eyebrow="Like the way we work?"
        title={
          <>
            Let&apos;s find your <span className="text-gradient">first milestone</span>.
          </>
        }
        description="The first 60 minutes are free — we use them to scope the discovery sprint."
      />
    </>
  );
}
