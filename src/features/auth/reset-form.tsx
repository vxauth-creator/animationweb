"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as m from "motion/react-m";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { requestPasswordReset } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Magnetic } from "@/components/ui/magnetic";
import { durations, easeSmooth } from "@/animations/easings";
import { resetSchema, type ResetInput } from "@/validations/auth";

/**
 * `<ResetForm>` — request a password recovery email.
 *
 * The server action *always* returns ok=true to prevent email enumeration:
 * we never reveal whether an account exists for a given address. The UI
 * presents a generic success message either way.
 */
export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetInput>({
    resolver: zodResolver(resetSchema),
    mode: "onTouched",
    defaultValues: { email: "" },
  });

  const onSubmit = (data: ResetInput) => {
    setServerMessage(null);
    startTransition(async () => {
      const result = await requestPasswordReset(data);
      setServerMessage(result.message);
      if (result.ok) setDone(true);
    });
  };

  if (done) {
    return (
      <m.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: durations.slow, ease: easeSmooth }}
        className="rounded-2xl border border-(--color-accent-cyan)/30 bg-(--color-accent-cyan)/8 p-5 text-sm"
      >
        <p className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase">
          Sent
        </p>
        <p className="mt-3 text-(--foreground-muted)">{serverMessage}</p>
      </m.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Reset password"
      className="grid gap-5"
    >
      <Field id="reset-email" label="Email" error={errors.email?.message}>
        <Input
          id="reset-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@studio.com"
          invalid={Boolean(errors.email)}
          {...register("email")}
        />
      </Field>

      {serverMessage && !done ? (
        <m.p
          role="alert"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.fast, ease: easeSmooth }}
          className="rounded-xl border border-(--color-danger)/40 bg-(--color-danger)/10 px-4 py-3 text-sm text-(--color-danger)"
        >
          {serverMessage}
        </m.p>
      ) : null}

      <Magnetic strength={10}>
        <Button type="submit" size="md" disabled={isPending} className="w-full">
          {isPending ? "Sending…" : "Send recovery link"}
        </Button>
      </Magnetic>
    </form>
  );
};
