"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateService } from "@/app/actions/services";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { GLYPH_OPTIONS, serviceSchema, type ServiceInput } from "@/validations/service";

import type { ServiceRow } from "@/services/supabase/types";

interface ServiceFormProps {
  service: ServiceRow;
}

const ACCENTS = [
  { value: "blue", label: "Blue" },
  { value: "cyan", label: "Cyan" },
  { value: "violet", label: "Violet" },
] as const;

const toForm = (s: ServiceRow): ServiceInput => ({
  title: s.title,
  summary: s.summary,
  capabilities: s.capabilities.join("\n"),
  metric_value: s.metric_value ?? "",
  metric_label: s.metric_label ?? "",
  accent: s.accent,
  glyph: s.glyph as ServiceInput["glyph"],
  order_index: s.order_index,
  published: s.published,
});

export const ServiceForm = ({ service }: ServiceFormProps) => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ServiceInput>({
    resolver: zodResolver(serviceSchema),
    mode: "onTouched",
    defaultValues: toForm(service),
  });

  const onSubmit = (data: ServiceInput) => {
    startTransition(async () => {
      const result = await updateService(service.id, data);
      if (!result?.ok) {
        if (result?.errors) {
          for (const [key, messages] of Object.entries(result.errors)) {
            if (messages?.[0]) {
              setError(key as keyof ServiceInput, { message: messages[0] });
            }
          }
        }
        toast.error(result?.message ?? "Couldn't save the service.");
        return;
      }
      toast.success(result.message);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6">
      <GlassCard variant="strong" className="grid gap-5 p-6 md:p-7">
        <Field id="s-title" label="Title" error={errors.title?.message}>
          <Input id="s-title" invalid={Boolean(errors.title)} {...register("title")} />
        </Field>
        <Field id="s-summary" label="Summary" error={errors.summary?.message}>
          <Textarea id="s-summary" rows={2} invalid={Boolean(errors.summary)} {...register("summary")} />
        </Field>
        <Field
          id="s-capabilities"
          label="Capabilities"
          hint="One per line."
          error={errors.capabilities?.message}
        >
          <Textarea id="s-capabilities" rows={4} invalid={Boolean(errors.capabilities)} {...register("capabilities")} />
        </Field>

        <div className="grid gap-5 md:grid-cols-3">
          <Field id="s-metric-value" label="Metric value" error={errors.metric_value?.message}>
            <Input id="s-metric-value" placeholder="98+" invalid={Boolean(errors.metric_value)} {...register("metric_value")} />
          </Field>
          <Field id="s-metric-label" label="Metric label" error={errors.metric_label?.message}>
            <Input id="s-metric-label" placeholder="Lighthouse" invalid={Boolean(errors.metric_label)} {...register("metric_label")} />
          </Field>
          <Field id="s-order" label="Order index" error={errors.order_index?.message}>
            <Input id="s-order" type="number" inputMode="numeric" invalid={Boolean(errors.order_index)} {...register("order_index")} />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field id="s-accent" label="Accent" error={errors.accent?.message}>
            <Select id="s-accent" {...register("accent")}>
              {ACCENTS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field id="s-glyph" label="Glyph" error={errors.glyph?.message}>
            <Select id="s-glyph" {...register("glyph")}>
              {GLYPH_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </GlassCard>

      <GlassCard variant="strong" className="grid gap-4 p-6 md:p-7">
        <Checkbox id="s-published" label="Published (visible on /services)" {...register("published")} />
      </GlassCard>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isPending} size="md">
          {isPending ? "Saving…" : "Save service"}
        </Button>
        <Button type="button" href="/dashboard/admin/services" variant="ghost" size="md">
          Cancel
        </Button>
      </div>
    </form>
  );
};
