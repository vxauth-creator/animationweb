import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Notes on engineering, design, and shipping premium digital experiences.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <PagePlaceholder
      eyebrow="Blog"
      title={
        <>
          Field notes from the <span className="text-gradient">engineering bench</span>
        </>
      }
      description="Long-form writing on shaders, design systems, performance, and AI-augmented frontend. Categorized, tagged, and SEO-tuned."
      outline={[
        { title: "Markdown editor", copy: "Authoring + draft preview from the dashboard." },
        { title: "Categories + tags", copy: "Faceted browsing with semantic URLs." },
        { title: "Syntax highlighting", copy: "Per-language code blocks with copy + line refs." },
        { title: "OpenGraph", copy: "Per-post OG images and Article schema." },
      ]}
      phase="Phase 4 · CMS"
    />
  );
}
