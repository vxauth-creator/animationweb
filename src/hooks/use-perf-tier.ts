"use client";

import { useEffect, useState } from "react";

import type { PerfTier } from "@/types";

/**
 * `useDevicePerfTier` — heuristic device performance classifier.
 *
 * Drives adaptive rendering throughout the site:
 *   - `low`    => disable heavy 3D, drop particles, reduce blur radii.
 *   - `medium` => moderate scene complexity, capped DPR.
 *   - `high`   => full cinematic experience.
 *
 * Heuristic inputs (all best-effort, all SSR-safe):
 *   - `navigator.deviceMemory` (gated)
 *   - `navigator.hardwareConcurrency`
 *   - `connection.saveData` / `effectiveType`
 *   - reduced-motion preference (forces `low`)
 *   - viewport width (small viewports bias down)
 *
 * Returns the same tier across the app (idempotent calculation per-mount).
 */
type NavigatorWithExtras = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  };
};

const computeTier = (): PerfTier => {
  if (typeof window === "undefined") return "high";

  const nav = navigator as NavigatorWithExtras;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return "low";

  const memory = nav.deviceMemory ?? 8;
  const cores = nav.hardwareConcurrency ?? 8;
  const conn = nav.connection;
  const saveData = conn?.saveData ?? false;
  const slowConn = conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g";
  const isSmall = window.innerWidth < 640;

  let score = 0;
  score += memory >= 8 ? 2 : memory >= 4 ? 1 : 0;
  score += cores >= 8 ? 2 : cores >= 4 ? 1 : 0;
  score += saveData || slowConn ? -2 : 0;
  score += isSmall ? -1 : 0;

  if (score >= 4) return "high";
  if (score >= 2) return "medium";
  return "low";
};

export const useDevicePerfTier = (): PerfTier => {
  // Default to `medium` on SSR to avoid layout shift when downgrading to `low`
  // and to avoid over-allocating GPU work before the tier is computed.
  const [tier, setTier] = useState<PerfTier>("medium");

  useEffect(() => {
    setTier(computeTier());
  }, []);

  return tier;
};
