"use client";

import { Component } from "react";

import type { ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  /** Optional custom fallback. Receives the error and a reset callback. */
  fallback?: (error: Error, reset: () => void) => ReactNode;
  /** Called once when the boundary catches an error. */
  onError?: (error: Error, info: ErrorInfo) => void;
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * `<ErrorBoundary>` — generic React error boundary.
 *
 * The Next.js App Router provides route-level `error.tsx`, but feature-scoped
 * boundaries are still useful for isolating heavy 3D scenes / experiments so
 * a single failure can't crash the whole page.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info);
  }

  reset = (): void => {
    this.setState({ error: null });
  };

  override render(): ReactNode {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback(this.state.error, this.reset);
      return (
        <div
          role="alert"
          className="surface-glass mx-auto my-12 max-w-xl rounded-2xl p-6 text-center"
        >
          <p className="text-sm tracking-[0.2em] text-(--color-danger) uppercase">
            Something went wrong
          </p>
          <p className="mt-2 text-(--foreground-muted)">
            This part of the page failed to render. The rest of the site is still working.
          </p>
          <button
            type="button"
            onClick={this.reset}
            className="mt-5 inline-flex h-10 items-center rounded-full border border-(--border-strong) px-4 text-sm transition-colors hover:border-(--color-accent-blue)/40"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
