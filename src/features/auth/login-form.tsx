"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as m from "motion/react-m";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { signIn } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Magnetic } from "@/components/ui/magnetic";
import { durations, easeSmooth } from "@/animations/easings";
import { loginSchema, type LoginInput } from "@/validations/auth";

interface LoginFormProps {
  /** Optional `?next=` path captured from the URL — preserved through sign-in. */
  next?: string;
}

/**
 * `<LoginForm>` — email + password sign-in.
 *
 * - Validation runs on touched fields via Zod.
 * - Submission goes through the `signIn` server action, which redirects to
 *   `next` (or `/dashboard`) on success — so success returns are unreachable
 *   in practice, only error paths render here.
 * - When Supabase isn't configured, the action returns a friendly banner
 *   message; the form stays usable.
 */
export const LoginForm = ({ next }: LoginFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginInput) => {
    setServerMessage(null);
    startTransition(async () => {
      const result = await signIn(data, next);
      // The server action redirects on success. We only land here on failure.
      if (!result?.ok) {
        if (result?.errors) {
          for (const [key, messages] of Object.entries(result.errors)) {
            if (messages?.[0]) {
              setError(key as keyof LoginInput, { message: messages[0] });
            }
          }
        }
        setServerMessage(result?.message ?? "Sign-in failed. Try again.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Sign in" className="grid gap-5">
      <Field id="login-email" label="Email" error={errors.email?.message}>
        <Input
          id="login-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@studio.com"
          invalid={Boolean(errors.email)}
          {...register("email")}
        />
      </Field>

      <Field id="login-password" label="Password" error={errors.password?.message}>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          invalid={Boolean(errors.password)}
          {...register("password")}
        />
      </Field>

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
          {isPending ? "Signing in…" : "Sign in"}
        </Button>
      </Magnetic>
    </form>
  );
};
