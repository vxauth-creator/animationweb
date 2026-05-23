import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { GradientBg } from "@/components/ui/gradient-bg";
import { Section } from "@/components/ui/section";
import { CallToAction } from "@/components/sections/call-to-action";
import { mdxComponents } from "@/lib/blog/mdx-components";
import { getPostBySlug, getPosts } from "@/lib/blog/posts";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";
import Script from "next/script";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

/**
 * Pre-generate every post path at build time so blog routes are static.
 * Falls back to on-demand if a future Supabase post isn't in the manifest.
 */
export const generateStaticParams = async () => {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
};

export const generateMetadata = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return buildMetadata({ title: "Post not found", path: `/blog/${slug}` });

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    image: post.cover ?? undefined,
  });
};

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <article className="relative">
        <header className="relative isolate overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16">
          <GradientBg variant="aurora" />
          <Container size="narrow" className="relative">
            <Link
              href="/blog"
              className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase hover:text-(--foreground)"
            >
              ← All posts
            </Link>

            <h1 className="mt-6 text-balance font-display text-4xl leading-[1.05] font-semibold md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-(--foreground-muted)">{post.excerpt}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-(--foreground-muted)">
              <span className="font-mono tracking-[0.18em] uppercase">
                {formatDate(post.publishedAt)}
              </span>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min read</span>
              {post.author ? (
                <>
                  <span aria-hidden>·</span>
                  <span>{post.author}</span>
                </>
              ) : null}
              <span className="grow" />
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="muted" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Container>
        </header>

        <Section size="regular">
          <Container size="narrow">
            <div className="prose-lg">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      [
                        rehypePrettyCode,
                        {
                          theme: "github-dark-default",
                          keepBackground: false,
                        },
                      ],
                    ],
                  },
                }}
              />
            </div>
          </Container>
        </Section>
      </article>

      <CallToAction
        eyebrow="Liked this post?"
        title={
          <>
            More <span className="text-gradient">field notes</span> on the blog
          </>
        }
        description={`Keep reading — we ship something new roughly every two weeks. Or, if this prompted ideas for your own product, ${siteConfig.contactEmail.split("@")[0]}@nishantweblab.com is the fastest path.`}
        primary={{ label: "All posts", href: "/blog" }}
        secondary={{ label: "Start project", href: "/contact" }}
      />

      <Script
        id="ld-article"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: post.title,
              description: post.excerpt,
              path: `/blog/${post.slug}`,
              publishedTime: post.publishedAt,
              modifiedTime: post.updatedAt ?? post.publishedAt,
              author: post.author ?? siteConfig.name,
              image: post.cover ?? siteConfig.ogImage,
            }),
          ),
        }}
      />
    </>
  );
}
