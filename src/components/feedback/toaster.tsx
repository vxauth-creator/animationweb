"use client";

import { Toaster as SonnerToaster } from "sonner";

/**
 * `<Toaster>` — site-wide toast surface.
 *
 * Wraps Sonner with a styling preset that matches the studio's palette
 * (glass surface + accent ring per state). Mount once near the app root
 * inside the dashboard route group; toasts are fired imperatively via
 * `import { toast } from "sonner"`.
 */
export const Toaster = () => {
  return (
    <SonnerToaster
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "!bg-(--surface-1)/80 !backdrop-blur-xl !border !border-(--border-strong) !text-(--foreground) !rounded-2xl",
          title: "!font-display !font-medium",
          description: "!text-(--foreground-muted)",
          success: "!border-(--color-accent-cyan)/40",
          error: "!border-(--color-danger)/50",
          actionButton:
            "!bg-(--color-accent-blue)/20 !text-(--color-accent-cyan) !rounded-full",
        },
      }}
    />
  );
};
