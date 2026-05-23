"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as m from "motion/react-m";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { signUp } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Magnetic } from "@/components/ui/magnetic";
import { durations, easeSmooth } from "@/animations/easings";
import { signupSchema, type SignupInput } from "@/validations/auth";

/**
 * `<SignupForm>` — email + password account creation.
 *
 * Successful signups don't redirect — they show an inline "check your email"
 * confirmation. The auth trigger (`0003_auth_triggers.sql`) creates the
 * profile row server-side; the user lands signed in after clicking the
 * confirmation link, which routes through `/auth/callback`.
 */
export const SignupForm = () => {
  const [isPending, startTransition] = useTransition();
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (data: SignupInput) => {
    setServerMessage(null);
    startTransition(async () => {
      const result = await signUp(data);
      if (!result.ok) {
        if (result.errors) {
          for (const [key, messages] of Object.entries(result.errors)) {
            if (messages?.[0]) {
              setError(key as keyof SignupInput, { message: messages[0] });
            }
          }
        }
        setServerMessage(result.message);
        return;
      }
      setSuccess(true);
      setServerMessage(result.message);
    });
  };

  if (success) {
    return (
      <m.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: durations.slow, ease: easeSmooth }}
        className="rounded-2xl border border-(--color-accent-cyan)/30 bg-(--color-accent-cyan)/8 p-5 text-sm"
      >
        <p className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase">
          Check your inbox
        </p>
        <p className="mt-3 text-(--foreground-muted)">{serverMessage}</p>
      </m.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Create account" className="grid gap-5">
      <Field id="signup-name" label="Full name" error={errors.fullName?.message}>
        <Input
          id="signup-name"
          type="text"
          autoComplete="name"
          placeholder="Maya Patel"
          invalid={Boolean(errors.fullName)}
          {...register("fullName")}
        />
      </Field>

      <Field id="signup-email" label="Email" error={errors.email?.message}>
        <Input
          id="signup-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@studio.com"
          invalid={Boolean(errors.email)}
          {...register("email")}
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field id="signup-password" label="Password" error={errors.password?.message}>
          <Input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            invalid={Boolean(errors.password)}
            {...register("password")}
          />
        </Field>
        <Field
          id="signup-confirm"
          label="Confirm"
          error={errors.confirmPassword?.message}
        >
          <Input
            id="signup-confirm"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat password"
            invalid={Boolean(errors.confirmPassword)}
            {...register("confirmPassword")}
          />
        </Field>
      </div>

      {serverMessage ? (
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
          {isPending ? "Creating account…" : "Create account"}
        </Button>
      </Magnetic>
    </form>
  );
};
