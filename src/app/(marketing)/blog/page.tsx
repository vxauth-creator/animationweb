import Link from "next/link";

import { CallToAction } from "@/components/sections/call-to-action";
import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowBorder } from "@/components/ui/glow-border";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/sections/page-hero";
import { Stagger } from "@/components/motion/stagger";
import { getPosts } from "@/lib/blog/posts";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Notes on engineering, design, and shipping premium digital experiences.",
  path: "/blog",
});

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Field notes from the <span className="text-gradient">engineering bench</span>
          </>
        }
        description="Long-form writing on shaders, design systems, performance, and AI-augmented frontend. Categorized, tagged, SEO-tuned."
        meta={[
          { label: "Posts", value: posts.length.toString() },
          { label: "Updated", value: posts[0] ? formatDate(posts[0].publishedAt) : "—" },
          { label: "Source", value: "MDX · Supabase" },
          { label: "RSS", value: "Soon" },
        ]}
      />

      <Section size="full">
        <Container>
          {posts.length === 0 ? (
            <p className="rounded-2xl border border-(--border-subtle) bg-(--surface-1)/40 p-8 text-center text-(--foreground-muted)">
              No posts yet — drop an MDX file in <code>content/posts/</code> or publish from the
              dashboard.
            </p>
          ) : (
            <Stagger
              staggerChildren={0.06}
              className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {posts.map((post, i) => (
                <GlowBorder
                  key={post.slug}
                  accent={i % 3 === 0 ? "violet" : i % 3 === 1 ? "blue" : "cyan"}
                  className="h-full"
                >
                  <GlassCard interactive sheen className="flex h-full flex-col p-6 md:p-7">
                    <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                      <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-(--color-paper-300) uppercase">
                        <span>{formatDate(post.publishedAt)}</span>
                        <span aria-hidden>·</span>
                        <span>{post.readingMinutes} min read</span>
                      </div>
                      <h2 className="mt-4 font-display text-2xl leading-tight font-medium md:text-[1.625rem]">
                        {post.title}
                      </h2>
                      <p className="mt-3 line-clamp-3 text-sm text-(--foreground-muted)">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto pt-5">
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="muted" size="sm">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </GlassCard>
                </GlowBorder>
              ))}
            </Stagger>
          )}
        </Container>
      </Section>

      <CallToAction
        eyebrow="Subscribe"
        title={
          <>
            Want new posts in <span className="text-gradient">your inbox</span>?
          </>
        }
        description="No marketing fluff — only the writing. We'll add the form on the next iteration; until then, drop us a line."
      />
    </>
  );
}
