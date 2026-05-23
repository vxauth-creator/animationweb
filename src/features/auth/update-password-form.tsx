"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as m from "motion/react-m";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { updatePassword } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Magnetic } from "@/components/ui/magnetic";
import { durations, easeSmooth } from "@/animations/easings";
import { updatePasswordSchema, type UpdatePasswordInput } from "@/validations/auth";

/**
 * `<UpdatePasswordForm>` — landing form after clicking a recovery email.
 *
 * On success, the server action redirects the user to `/dashboard`, so this
 * component only renders the unsuccessful state.
 */
export const UpdatePasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    mode: "onTouched",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = (data: UpdatePasswordInput) => {
    setServerMessage(null);
    startTransition(async () => {
      const result = await updatePassword(data);
      // success path redirects; we only reach here on error
      setServerMessage(result?.message ?? "Couldn't update password.");
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Update password"
      className="grid gap-5"
    >
      <Field id="update-password" label="New password" error={errors.password?.message}>
        <Input
          id="update-password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          invalid={Boolean(errors.password)}
          {...register("password")}
        />
      </Field>

      <Field
        id="update-confirm"
        label="Confirm"
        error={errors.confirmPassword?.message}
      >
        <Input
          id="update-confirm"
          type="password"
          autoComplete="new-password"
          placeholder="Repeat password"
          invalid={Boolean(errors.confirmPassword)}
          {...register("confirmPassword")}
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
          {isPending ? "Updating…" : "Update password"}
        </Button>
      </Magnetic>
    </form>
  );
};
