"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createBlogPost, updateBlogPost } from "@/app/actions/blog-posts";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { blogPostSchema, type BlogPostInput } from "@/validations/blog-post";

import type { BlogPostRow } from "@/services/supabase/types";

interface PostFormProps {
  post?: BlogPostRow;
}

const toForm = (p: BlogPostRow | undefined): BlogPostInput => ({
  slug: p?.slug ?? "",
  title: p?.title ?? "",
  excerpt: p?.excerpt ?? "",
  content: p?.content ?? "",
  cover_url: p?.cover_url ?? "",
  category_slug: p?.category_slug ?? "",
  tags: p?.tags.join(", ") ?? "",
  reading_minutes: p?.reading_minutes ?? undefined,
  published: p?.published ?? false,
});

/**
 * `<PostForm>` — MDX-aware blog post editor.
 *
 * The body is a plain textarea — markdown/MDX is authored inline. Phase 6
 * could swap this for a richer editor (CodeMirror, Lexical) without changing
 * the data contract.
 */
export const PostForm = ({ post }: PostFormProps) => {
  const isEdit = Boolean(post);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<BlogPostInput>({
    resolver: zodResolver(blogPostSchema),
    mode: "onTouched",
    defaultValues: toForm(post),
  });

  const onSubmit = (data: BlogPostInput) => {
    startTransition(async () => {
      const result = isEdit
        ? await updateBlogPost(post!.id, data)
        : await createBlogPost(data);
      if (!result?.ok) {
        if (result?.errors) {
          for (const [key, messages] of Object.entries(result.errors)) {
            if (messages?.[0]) {
              setError(key as keyof BlogPostInput, { message: messages[0] });
            }
          }
        }
        toast.error(result?.message ?? "Couldn't save the post.");
        return;
      }
      toast.success(result.message);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6">
      <GlassCard variant="strong" className="grid gap-5 p-6 md:p-7">
        <div className="grid gap-5 md:grid-cols-2">
          <Field id="b-slug" label="Slug" error={errors.slug?.message}>
            <Input id="b-slug" placeholder="design-tokens-tailwind-v4" invalid={Boolean(errors.slug)} {...register("slug")} />
          </Field>
          <Field id="b-title" label="Title" error={errors.title?.message}>
            <Input id="b-title" invalid={Boolean(errors.title)} {...register("title")} />
          </Field>
        </div>

        <Field
          id="b-excerpt"
          label="Excerpt"
          hint="Used for cards, OG, and the meta description."
          error={errors.excerpt?.message}
        >
          <Textarea id="b-excerpt" rows={3} invalid={Boolean(errors.excerpt)} {...register("excerpt")} />
        </Field>

        <Field
          id="b-content"
          label="Body (MDX)"
          hint="Markdown + JSX. Use ```ts for syntax-highlighted code blocks."
          error={errors.content?.message}
        >
          <Textarea
            id="b-content"
            rows={18}
            placeholder="## Section heading…"
            invalid={Boolean(errors.content)}
            {...register("content")}
            className="font-mono text-[13px] leading-relaxed"
          />
        </Field>

        <div className="grid gap-5 md:grid-cols-3">
          <Field id="b-cover" label="Cover URL" error={errors.cover_url?.message}>
            <Input id="b-cover" placeholder="https://…" invalid={Boolean(errors.cover_url)} {...register("cover_url")} />
          </Field>
          <Field id="b-category" label="Category slug" error={errors.category_slug?.message}>
            <Input id="b-category" placeholder="engineering" invalid={Boolean(errors.category_slug)} {...register("category_slug")} />
          </Field>
          <Field
            id="b-tags"
            label="Tags"
            hint="Comma-separated"
            error={errors.tags?.message}
          >
            <Input id="b-tags" placeholder="r3f, performance" invalid={Boolean(errors.tags)} {...register("tags")} />
          </Field>
        </div>

        <Field
          id="b-reading"
          label="Reading minutes"
          hint="Auto-estimated if blank."
          error={errors.reading_minutes?.message}
        >
          <Input
            id="b-reading"
            type="number"
            inputMode="numeric"
            invalid={Boolean(errors.reading_minutes)}
            {...register("reading_minutes")}
          />
        </Field>
      </GlassCard>

      <GlassCard variant="strong" className="grid gap-4 p-6 md:p-7">
        <Checkbox
          id="b-published"
          label="Published (visible at /blog and in the sitemap)"
          {...register("published")}
        />
      </GlassCard>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isPending} size="md">
          {isPending ? "Saving…" : isEdit ? "Save post" : "Create post"}
        </Button>
        <Button type="button" href="/dashboard/admin/blogs" variant="ghost" size="md">
          Cancel
        </Button>
      </div>
    </form>
  );
};
