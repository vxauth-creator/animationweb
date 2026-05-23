"use client";

import type { ReactNode } from "react";

import { LenisProvider } from "./lenis-provider";
import { MotionProvider } from "./motion-provider";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

/**
 * Root <Providers> tree.
 *
 * Order matters:
 *   1. ThemeProvider   — design system surface (cheapest, outermost).
 *   2. QueryProvider   — TanStack Query client lifecycle.
 *   3. MotionProvider  — Motion/Framer config (reduced-motion gating).
 *   4. LenisProvider   — smooth scroll (must be inside Motion so any in-flight
 *                        animations and reduced-motion hook resolve correctly).
 *
 * Add Supabase / Auth providers in Phase 4 between Query and Motion so that
 * data flows are observable but motion config still wraps app content.
 */
export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <QueryProvider>
        <MotionProvider>
          <LenisProvider>{children}</LenisProvider>
        </MotionProvider>
      </QueryProvider>
    </ThemeProvider>
  );
};
