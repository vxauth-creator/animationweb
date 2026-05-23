"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as m from "motion/react-m";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { submitContact } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowBorder } from "@/components/ui/glow-border";
import { Input } from "@/components/ui/input";
import { Magnetic } from "@/components/ui/magnetic";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { durations, easeExpo } from "@/animations/easings";
import { contactFormSchema, type ContactFormInput } from "@/validations/contact";

const BUDGET_OPTIONS: ReadonlyArray<{ value: ContactFormInput["budget"]; label: string }> = [
  { value: "explore", label: "Just exploring" },
  { value: "10-25k", label: "$10k – $25k" },
  { value: "25-60k", label: "$25k – $60k" },
  { value: "60k+", label: "$60k+" },
  { value: "retainer", label: "Ongoing retainer" },
];

/**
 * `<ContactForm>` — premium project-inquiry form.
 *
 * Architecture:
 *  - **Validation:** `contactFormSchema` (Zod) — same schema runs in the
 *    server action, so client and server enforce identical rules.
 *  - **Form state:** `react-hook-form` with `zodResolver`. Validation runs
 *    on touched fields (responsive but not noisy).
 *  - **Submission:** wraps the React 19 `useTransition` + Server Action so
 *    the UI stays responsive and we can show a sub-millisecond pending state.
 *  - **Anti-spam:** a visually-hidden honeypot (`website`) — bots populate
 *    every input; humans never see it.
 *  - **Success state:** the form unmounts and a confirmation card animates in.
 *
 * Reduced-motion: animations downgrade automatically via the global
 * `MotionProvider`.
 */
export const ContactForm = () => {
  const [isPending, startTransition] = useTransition();
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      budget: "explore",
      message: "",
      website: "",
      consent: false as unknown as true,
    },
  });

  const onSubmit = (data: ContactFormInput) => {
    setServerMessage(null);
    startTransition(async () => {
      const result = await submitContact(data);
      if (!result.ok) {
        if (result.errors) {
          for (const [key, messages] of Object.entries(result.errors)) {
            if (messages && messages[0]) {
              setError(key as keyof ContactFormInput, { message: messages[0] });
            }
          }
        }
        setServerMessage(result.message);
        return;
      }
      setSubmitted(true);
      setServerMessage(result.message);
    });
  };

  if (submitted) {
    return (
      <GlowBorder accent="cyan" radius="2xl">
        <GlassCard variant="strong" sheen className="p-8 md:p-10">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.slow, ease: easeExpo }}
          >
            <p className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase">
              Received
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-semibold md:text-4xl">
              Message in.{" "}
              <span className="text-gradient">We&apos;ll be in touch shortly.</span>
            </h2>
            <p className="mt-5 max-w-xl text-(--foreground-muted)">
              {serverMessage ??
                "We respond to every project inquiry within one business day, including weekends if it's urgent."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic strength={10}>
                <Button href="/work" variant="secondary">
                  See recent work
                </Button>
              </Magnetic>
              <Magnetic strength={10}>
                <Button href="/" variant="ghost">
                  Back home
                </Button>
              </Magnetic>
            </div>
          </m.div>
        </GlassCard>
      </GlowBorder>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Project inquiry"
      className="block"
    >
      <GlowBorder accent="violet" radius="2xl">
        <GlassCard variant="strong" sheen className="grid gap-5 p-7 md:p-9">
        <div className="grid gap-5 md:grid-cols-2">
          <Field id="contact-name" label="Name" error={errors.name?.message}>
            <Input
              id="contact-name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              invalid={Boolean(errors.name)}
              {...register("name")}
            />
          </Field>

          <Field id="contact-email" label="Email" error={errors.email?.message}>
            <Input
              id="contact-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@studio.com"
              invalid={Boolean(errors.email)}
              {...register("email")}
            />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field id="contact-company" label="Company (optional)" error={errors.company?.message}>
            <Input
              id="contact-company"
              type="text"
              autoComplete="organization"
              placeholder="Studio name"
              invalid={Boolean(errors.company)}
              {...register("company")}
            />
          </Field>

          <Field id="contact-budget" label="Budget" error={errors.budget?.message}>
            <Select id="contact-budget" {...register("budget")}>
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <Field
          id="contact-message"
          label="Project"
          hint="Stage, goals, timeline — whatever helps us understand what you're building."
          error={errors.message?.message}
        >
          <Textarea
            id="contact-message"
            rows={6}
            placeholder="We're rebuilding our marketing site and want it to feel more like premium software…"
            invalid={Boolean(errors.message)}
            {...register("message")}
          />
        </Field>

        {/* Honeypot — visually hidden, name gives bots a "natural" field to fill. */}
        <div aria-hidden className="sr-only">
          <label htmlFor="contact-website">Website (leave blank)</label>
          <input
            id="contact-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        <Checkbox
          id="contact-consent"
          label={
            <>
              I agree to the{" "}
              <a href="/privacy" className="text-(--color-accent-cyan) hover:underline">
                privacy notice
              </a>
              .
            </>
          }
          invalid={Boolean(errors.consent)}
          {...register("consent")}
        />
        {errors.consent ? (
          <p role="alert" className="-mt-2 text-xs text-(--color-danger)">
            {errors.consent.message}
          </p>
        ) : null}

        {serverMessage && !submitted ? (
          <p
            role="alert"
            className="rounded-xl border border-(--color-danger)/40 bg-(--color-danger)/10 px-4 py-3 text-sm text-(--color-danger)"
          >
            {serverMessage}
          </p>
        ) : null}

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Magnetic strength={12}>
            <Button type="submit" size="lg" disabled={isPending}>
              {isPending ? "Sending…" : "Send inquiry"}
            </Button>
          </Magnetic>
          <p className="text-xs text-(--foreground-muted)">
            {isValid ? "Looks good." : "We typically reply within 1 business day."}
          </p>
        </div>
        </GlassCard>
      </GlowBorder>
    </form>
  );
};
