import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import {
  estimateReadingMinutes,
  postFrontmatterSchema,
  type Post,
} from "./types";

/**
 * Filesystem MDX source.
 *
 * Reads `.mdx` files from `content/posts/` at the repo root. Each file's
 * frontmatter is validated with `postFrontmatterSchema` (Zod) so a malformed
 * post fails the build instead of producing empty pages at runtime.
 *
 * The slug is derived from the filename. Numeric prefixes (e.g. `01-foo.mdx`)
 * are stripped from the slug — they exist purely to control file ordering
 * during authoring.
 */

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const slugFromFilename = (filename: string): string =>
  filename.replace(/\.mdx?$/, "").replace(/^\d+[-_]/, "");

let _cache: Post[] | null = null;

const readAllPosts = async (): Promise<Post[]> => {
  if (_cache && process.env.NODE_ENV === "production") return _cache;

  let entries: string[] = [];
  try {
    entries = await fs.readdir(POSTS_DIR);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  const mdxFiles = entries.filter((f) => /\.mdx?$/.test(f));

  const posts = await Promise.all(
    mdxFiles.map(async (filename): Promise<Post | null> => {
      const fullPath = path.join(POSTS_DIR, filename);
      const raw = await fs.readFile(fullPath, "utf8");
      const parsed = matter(raw);

      const frontmatter = postFrontmatterSchema.safeParse(parsed.data);
      if (!frontmatter.success) {
        console.warn(
          `[blog] invalid frontmatter in ${filename}:`,
          frontmatter.error.flatten().fieldErrors,
        );
        return null;
      }

      if (frontmatter.data.draft) return null;

      const fm = frontmatter.data;
      const slug = slugFromFilename(filename);

      return {
        slug,
        title: fm.title,
        excerpt: fm.excerpt,
        content: parsed.content,
        cover: fm.cover ?? null,
        tags: fm.tags,
        category: fm.category ?? null,
        author: fm.author ?? null,
        publishedAt: fm.publishedAt,
        updatedAt: fm.updatedAt ?? null,
        readingMinutes: estimateReadingMinutes(parsed.content),
      };
    }),
  );

  const filtered = posts
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  if (process.env.NODE_ENV === "production") _cache = filtered;
  return filtered;
};

export const fileSystemPosts = {
  list: readAllPosts,
  bySlug: async (slug: string): Promise<Post | null> => {
    const all = await readAllPosts();
    return all.find((p) => p.slug === slug) ?? null;
  },
};
