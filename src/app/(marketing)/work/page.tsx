import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Work",
  description:
    "Selected projects — engineered for the brands and products we partner with.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <PagePlaceholder
      eyebrow="Work"
      title={
        <>
          Selected <span className="text-gradient">work</span>
        </>
      }
      description="An immersive grid of case studies — tech stack, architecture decisions, performance metrics, and live demos. Powered by Supabase content in Phase 4."
      outline={[
        { title: "Immersive grid", copy: "Floating cards with parallax and hover depth." },
        { title: "Case studies", copy: "Deep-dive pages with measurable outcomes." },
        { title: "Live demos", copy: "Direct links + GitHub references where applicable." },
        { title: "Tech badges", copy: "At-a-glance stack visibility per project." },
      ]}
      phase="Phase 3 · Portfolio"
    />
  );
}
