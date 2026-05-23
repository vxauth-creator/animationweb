import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "About",
  description: "The studio, the philosophy, and the engineering principles behind every build.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PagePlaceholder
      eyebrow="About"
      title={
        <>
          A <span className="text-gradient">studio</span>, not a freelancer template.
        </>
      }
      description="We engineer premium digital experiences with the rigor of a software team and the polish of a product studio."
      outline={[
        { title: "Journey", copy: "Animated timeline of the studio's milestones." },
        { title: "Philosophy", copy: "Principles that govern every engagement." },
        { title: "Stack", copy: "Why we choose what we choose." },
        { title: "Process", copy: "Discover · Plan · Design · Build · Optimize · Ship." },
      ]}
      phase="Phase 3 · About"
    />
  );
}
