import Link from "next/link";

import { cn } from "@/lib/utils/cn";

import type { ComponentPropsWithoutRef } from "react";

/**
 * MDX components — typography + link defaults for blog posts.
 *
 * These are passed to `<MDXRemote components={...} />` so all post markup
 * inherits the studio's typography rhythm without per-post boilerplate.
 *
 * Headings get auto-generated anchors (id from text) for permalinks.
 */

const slugify = (s: string): string =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);

const headingFromChildren = (children: React.ReactNode): string => {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(String).join(" ");
  return "";
};

interface AnchoredHeadingProps extends ComponentPropsWithoutRef<"h2"> {
  level: 2 | 3 | 4;
}

const AnchoredHeading = ({ level, className, children, ...rest }: AnchoredHeadingProps) => {
  const Tag = `h${level}` as "h2" | "h3" | "h4";
  const id = headingFromChildren(children) ? slugify(headingFromChildren(children)) : undefined;
  return (
    <Tag
      id={id}
      className={cn(
        "scroll-mt-28 font-display tracking-tight text-(--foreground)",
        level === 2 && "mt-16 text-3xl font-semibold md:text-4xl",
        level === 3 && "mt-12 text-2xl font-medium md:text-3xl",
        level === 4 && "mt-10 text-xl font-medium md:text-2xl",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const Anchor = ({ href = "", className, children, ...rest }: ComponentPropsWithoutRef<"a">) => {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link
        href={href}
        className={cn("text-(--color-accent-cyan) underline-offset-4 hover:underline", className)}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("text-(--color-accent-cyan) underline-offset-4 hover:underline", className)}
      {...rest}
    >
      {children}
    </a>
  );
};

export const mdxComponents = {
  h1: ({ className, ...rest }: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className={cn("mt-0 mb-6 font-display text-4xl font-semibold md:text-5xl", className)}
      {...rest}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => <AnchoredHeading level={2} {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <AnchoredHeading level={3} {...props} />,
  h4: (props: ComponentPropsWithoutRef<"h4">) => <AnchoredHeading level={4} {...props} />,
  p: ({ className, ...rest }: ComponentPropsWithoutRef<"p">) => (
    <p
      className={cn(
        "mt-5 text-pretty leading-relaxed text-(--foreground)/90",
        className,
      )}
      {...rest}
    />
  ),
  ul: ({ className, ...rest }: ComponentPropsWithoutRef<"ul">) => (
    <ul className={cn("mt-5 ml-6 list-disc space-y-2 text-(--foreground)/90", className)} {...rest} />
  ),
  ol: ({ className, ...rest }: ComponentPropsWithoutRef<"ol">) => (
    <ol className={cn("mt-5 ml-6 list-decimal space-y-2 text-(--foreground)/90", className)} {...rest} />
  ),
  li: ({ className, ...rest }: ComponentPropsWithoutRef<"li">) => (
    <li className={cn("leading-relaxed", className)} {...rest} />
  ),
  blockquote: ({ className, ...rest }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={cn(
        "mt-8 border-l-2 border-(--color-accent-violet)/60 pl-5 text-(--foreground-muted) italic",
        className,
      )}
      {...rest}
    />
  ),
  hr: ({ className, ...rest }: ComponentPropsWithoutRef<"hr">) => (
    <hr className={cn("my-12 border-(--border-subtle)", className)} {...rest} />
  ),
  a: Anchor,
  code: ({ className, ...rest }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn(
        // Inline code only — block code is wrapped by rehype-pretty-code.
        "rounded-md border border-(--border-subtle) bg-(--surface-1)/60 px-1.5 py-0.5 font-mono text-[0.9em] text-(--color-accent-cyan)",
        // rehype-pretty-code adds `data-rehype-pretty-code-figure` on its
        // wrapper; we only want this style on _inline_ code (no parent figure).
        "[figure_&]:rounded-none [figure_&]:border-0 [figure_&]:bg-transparent [figure_&]:px-0 [figure_&]:py-0 [figure_&]:text-current",
        className,
      )}
      {...rest}
    />
  ),
  pre: ({ className, ...rest }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={cn(
        "mt-6 overflow-x-auto rounded-2xl border border-(--border-subtle) bg-(--surface-1)/70 p-5 text-sm leading-relaxed",
        "[&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit",
        className,
      )}
      {...rest}
    />
  ),
};
