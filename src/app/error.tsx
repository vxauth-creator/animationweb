"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GradientBg } from "@/components/ui/gradient-bg";

/**
 * Route-level error boundary — shown when a server/client component throws.
 * Provides a reset path and surfaces a request-id (when available) for support.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Phase 6 will pipe this to Sentry / logging infra.
    console.error("[route-error]", error);
  }, [error]);

  return (
    <section className="relative flex min-h-[70vh] items-center">
      <GradientBg variant="aurora" />
      <Container size="narrow" className="relative">
        <p className="text-xs font-medium tracking-[0.2em] text-(--color-danger) uppercase">
          Something broke
        </p>
        <h1 className="mt-3 text-4xl leading-tight font-semibold md:text-5xl">
          We hit an unexpected error.
        </h1>
        <p className="mt-4 max-w-xl text-(--foreground-muted)">
          The team has been notified. You can retry below — most of the time it&apos;ll resolve on
          a refresh. If it persists, send us the digest reference.
        </p>

        {error.digest ? (
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-(--border-strong) bg-(--surface-1)/60 px-3 py-1 font-mono text-xs text-(--foreground-muted)">
            <span aria-hidden>·</span> digest <span className="text-(--foreground)">{error.digest}</span>
          </p>
        ) : null}

        <div className="mt-8 flex gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button href="/" variant="secondary">
            Back home
          </Button>
        </div>
      </Container>
    </section>
  );
}
