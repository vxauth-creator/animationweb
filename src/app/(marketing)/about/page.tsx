import { CallToAction } from "@/components/sections/call-to-action";
import { PageHero } from "@/components/sections/page-hero";
import { JourneyTimeline } from "@/features/about/journey-timeline";
import { PhilosophyGrid } from "@/features/about/philosophy-grid";
import { StatsRow } from "@/features/about/stats-row";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "About",
  description: "The studio, the philosophy, and the engineering principles behind every build.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            A <span className="text-gradient">studio</span>, not a freelancer template.
          </>
        }
        description="We engineer premium digital experiences with the rigor of a software team and the polish of a product studio. Quiet, deliberate, and obsessed with the details that compound."
      />

      <StatsRow />
      <PhilosophyGrid />
      <JourneyTimeline />

      <CallToAction
        eyebrow="Briefs we love"
        title={
          <>
            Ambitious teams that <span className="text-gradient">care about craft</span>.
          </>
        }
        description="If that's you, send us what you're working on."
      />
    </>
  );
}
