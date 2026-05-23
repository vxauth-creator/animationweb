"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";

import { createProject, updateProject } from "@/app/actions/projects";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { projectSchema, type ProjectInput } from "@/validations/project";

import type { ProjectRow } from "@/services/supabase/types";

interface ProjectFormProps {
  /** When provided, the form runs in update mode. */
  project?: ProjectRow;
}

const CATEGORIES: ReadonlyArray<{ value: ProjectInput["category"]; label: string }> = [
  { value: "saas", label: "SaaS" },
  { value: "marketing", label: "Marketing site" },
  { value: "dashboard", label: "Dashboard" },
  { value: "commerce", label: "E-commerce" },
  { value: "ai", label: "AI" },
  { value: "experience", label: "Experience" },
];

const ACCENTS: ReadonlyArray<{ value: ProjectInput["accent"]; label: string }> = [
  { value: "blue", label: "Blue" },
  { value: "cyan", label: "Cyan" },
  { value: "violet", label: "Violet" },
];

const toForm = (p: ProjectRow | undefined): Partial<ProjectInput> => ({
  slug: p?.slug ?? "",
  title: p?.title ?? "",
  client: p?.client ?? "",
  summary: p?.summary ?? "",
  category: p?.category ?? "saas",
  year: p?.year ?? new Date().getFullYear(),
  stack: p?.stack.join(", ") ?? "",
  metrics: p?.metrics ?? [],
  cover_url: p?.cover_url ?? "",
  live_url: p?.live_url ?? "",
  repo_url: p?.repo_url ?? "",
  accent: p?.accent ?? "violet",
  featured: p?.featured ?? false,
  published: p?.published ?? false,
});

/**
 * `<ProjectForm>` — create + update form for portfolio projects.
 *
 * Mode is determined by whether `project` is provided. Fields use the same
 * `<Field>/<Input>/...` primitives the contact + auth forms use, so visual
 * consistency comes for free.
 *
 * The metrics array is editable inline via `useFieldArray`. The stack field
 * is a comma-separated string for ergonomics — split server-side.
 */
export const ProjectForm = ({ project }: ProjectFormProps) => {
  const isEdit = Boolean(project);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    mode: "onTouched",
    defaultValues: toForm(project) as ProjectInput,
  });

  const metricsArray = useFieldArray({ control, name: "metrics" });

  const onSubmit = (data: ProjectInput) => {
    startTransition(async () => {
      const result = isEdit
        ? await updateProject(project!.id, data)
        : await createProject(data);
      if (!result?.ok) {
        if (result?.errors) {
          for (const [key, messages] of Object.entries(result.errors)) {
            if (messages?.[0]) {
              setError(key as keyof ProjectInput, { message: messages[0] });
            }
          }
        }
        toast.error(result?.message ?? "Couldn't save the project.");
        return;
      }
      toast.success(result.message);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6">
      <GlassCard variant="strong" className="grid gap-5 p-6 md:p-7">
        <div className="grid gap-5 md:grid-cols-2">
          <Field id="p-slug" label="Slug" hint="URL-safe id (e.g. helix-analytics)" error={errors.slug?.message}>
            <Input id="p-slug" invalid={Boolean(errors.slug)} {...register("slug")} />
          </Field>
          <Field id="p-title" label="Title" error={errors.title?.message}>
            <Input id="p-title" invalid={Boolean(errors.title)} {...register("title")} />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field id="p-client" label="Client" error={errors.client?.message}>
            <Input id="p-client" invalid={Boolean(errors.client)} {...register("client")} />
          </Field>
          <Field id="p-year" label="Year" error={errors.year?.message}>
            <Input
              id="p-year"
              type="number"
              inputMode="numeric"
              invalid={Boolean(errors.year)}
              {...register("year")}
            />
          </Field>
        </div>

        <Field id="p-summary" label="Summary" error={errors.summary?.message}>
          <Textarea id="p-summary" rows={3} invalid={Boolean(errors.summary)} {...register("summary")} />
        </Field>

        <div className="grid gap-5 md:grid-cols-3">
          <Field id="p-category" label="Category" error={errors.category?.message}>
            <Select id="p-category" {...register("category")}>
              {CATEGORIES.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field id="p-accent" label="Accent" error={errors.accent?.message}>
            <Select id="p-accent" {...register("accent")}>
              {ACCENTS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field
            id="p-stack"
            label="Stack"
            hint="Comma-separated"
            error={errors.stack?.message}
          >
            <Input id="p-stack" placeholder="Next.js, Postgres, Stripe" invalid={Boolean(errors.stack)} {...register("stack")} />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Field id="p-cover" label="Cover URL" error={errors.cover_url?.message}>
            <Input id="p-cover" placeholder="https://…" invalid={Boolean(errors.cover_url)} {...register("cover_url")} />
          </Field>
          <Field id="p-live" label="Live URL" error={errors.live_url?.message}>
            <Input id="p-live" placeholder="https://…" invalid={Boolean(errors.live_url)} {...register("live_url")} />
          </Field>
          <Field id="p-repo" label="Repo URL" error={errors.repo_url?.message}>
            <Input id="p-repo" placeholder="https://…" invalid={Boolean(errors.repo_url)} {...register("repo_url")} />
          </Field>
        </div>
      </GlassCard>

      {/* Metrics — editable repeater */}
      <GlassCard variant="strong" className="grid gap-5 p-6 md:p-7">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-base font-medium">Metrics</h2>
            <p className="mt-1 text-xs text-(--foreground-muted)">
              Up to 6 short results (e.g. <span className="font-mono">180ms · p95 query</span>).
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => metricsArray.append({ value: "", label: "" })}
            disabled={metricsArray.fields.length >= 6}
          >
            Add metric
          </Button>
        </div>

        {metricsArray.fields.length === 0 ? (
          <p className="rounded-xl border border-(--border-subtle) bg-(--surface-1)/40 p-4 text-center text-xs text-(--foreground-muted)">
            No metrics yet — optional.
          </p>
        ) : (
          <ul className="grid gap-3">
            {metricsArray.fields.map((field, i) => (
              <li key={field.id} className="grid gap-3 md:grid-cols-[1fr_2fr_auto]">
                <Input
                  placeholder="Value (e.g. 180ms)"
                  invalid={Boolean(errors.metrics?.[i]?.value)}
                  {...register(`metrics.${i}.value` as const)}
                />
                <Input
                  placeholder="Label (e.g. p95 query)"
                  invalid={Boolean(errors.metrics?.[i]?.label)}
                  {...register(`metrics.${i}.label` as const)}
                />
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => metricsArray.remove(i)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </GlassCard>

      <GlassCard variant="strong" className="grid gap-4 p-6 md:p-7">
        <Checkbox id="p-featured" label="Featured (spans two columns on desktop grid)" {...register("featured")} />
        <Checkbox id="p-published" label="Published (visible on /work and the home page)" {...register("published")} />
      </GlassCard>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isPending} size="md">
          {isPending ? "Saving…" : isEdit ? "Save project" : "Create project"}
        </Button>
        <Button type="button" href="/dashboard/admin/projects" variant="ghost" size="md">
          Cancel
        </Button>
      </div>
    </form>
  );
};
