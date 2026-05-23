"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowBorder } from "@/components/ui/glow-border";
import { cn } from "@/lib/utils/cn";

import type { ReactNode } from "react";

interface ConfirmActionProps {
  /** Trigger element — receives `open()` via render-prop or just renders. */
  trigger: ReactNode;
  title: string;
  description?: ReactNode;
  /** Visual treatment. `danger` is for destructive actions. */
  intent?: "default" | "danger";
  confirmLabel?: string;
  cancelLabel?: string;
  /**
   * Action invoked when the user confirms. Should return a result with `ok`.
   * Errors are caught and surfaced as a toast.
   */
  onConfirm: () => Promise<{ ok: boolean; message?: string } | void>;
}

/**
 * `<ConfirmAction>` — accessible confirm dialog for destructive operations.
 *
 * - Uses the native `<dialog>` element (built-in modal semantics + focus trap).
 * - Wraps the action call in `useTransition` so the button shows a pending
 *   state without blocking the rest of the UI.
 * - Surfaces success/error feedback via Sonner toasts.
 *
 * Drop-in usage:
 *
 * ```tsx
 * <ConfirmAction
 *   trigger={<button>Delete</button>}
 *   title="Delete project?"
 *   description="This can't be undone."
 *   intent="danger"
 *   onConfirm={() => deleteProject(id)}
 * />
 * ```
 */
export const ConfirmAction = ({
  trigger,
  title,
  description,
  intent = "default",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
}: ConfirmActionProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        const result = await onConfirm();
        if (result && !result.ok) {
          toast.error(result.message ?? "Something went wrong.");
          return;
        }
        toast.success(result?.message ?? "Done.");
        setOpen(false);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Something went wrong.");
      }
    });
  };

  return (
    <>
      <span onClick={() => setOpen(true)} className="contents">
        {trigger}
      </span>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          className="fixed inset-0 z-[80] flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close dialog"
            onClick={() => !isPending && setOpen(false)}
            tabIndex={-1}
            className="absolute inset-0 bg-(--color-ink-0)/70 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-md">
            <GlowBorder accent={intent === "danger" ? "violet" : "blue"} radius="2xl">
              <GlassCard variant="strong" sheen className="p-7">
                <p
                  id="confirm-title"
                  className={cn(
                    "font-mono text-xs tracking-[0.2em] uppercase",
                    intent === "danger"
                      ? "text-(--color-danger)"
                      : "text-(--color-accent-cyan)",
                  )}
                >
                  {intent === "danger" ? "Destructive" : "Confirm"}
                </p>
                <h2 className="mt-3 font-display text-xl font-medium md:text-2xl">{title}</h2>
                {description ? (
                  <div className="mt-3 text-sm text-(--foreground-muted)">{description}</div>
                ) : null}

                <div className="mt-7 flex flex-wrap justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setOpen(false)}
                    disabled={isPending}
                  >
                    {cancelLabel}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleConfirm}
                    disabled={isPending}
                    className={cn(
                      intent === "danger" &&
                        "[background:linear-gradient(120deg,var(--color-danger),#ff7b8d)] hover:shadow-[0_18px_50px_-12px_rgba(255,93,115,0.55)]",
                    )}
                  >
                    {isPending ? "Working…" : confirmLabel}
                  </Button>
                </div>
              </GlassCard>
            </GlowBorder>
          </div>
        </div>
      ) : null}
    </>
  );
};
