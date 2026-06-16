"use client";

import dynamic from "next/dynamic";

import { ErrorBoundary } from "@/components/feedback/error-boundary";
import { useDevicePerfTier } from "@/hooks/use-perf-tier";
import { useMounted } from "@/hooks/use-mounted";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { capabilities } from "@/lib/utils/env";

import { HeroSceneFallback } from "./hero-scene-fallback";

/**
 * Dynamic-imported R3F canvas. SSR is intentionally disabled so the heavy
 * three.js / drei / postprocessing chunks never enter the server bundle and
 * never block first paint. Until the chunk arrives, the gradient fallback
 * (always rendered alongside) carries the visual.
 */
const HeroCanvas = dynamic(
  () => import("./scene/hero-canvas").then((mod) => mod.HeroCanvas),
  { ssr: false, loading: () => null },
);

/**
 * `<HeroSceneMount>` — gate that decides whether to upgrade the gradient hero
 * background to the cinematic R3F scene.
 *
 * The gate is intentionally conservative — the brief explicitly forbids "low
 * FPS scenes" and "GPU abuse". The decision tree:
 *
 *   ✗ not yet mounted (SSR / first paint) → gradient only
 *   ✗ user prefers reduced motion         → gradient only
 *   ✗ feature flag disabled               → gradient only (kill switch)
 *   ✗ device tier is `low`                → gradient only (mobile / weak GPU)
 *   ✓ otherwise mount canvas with tier-driven quality
 *
 * The `<ErrorBoundary>` ensures a WebGL crash falls back to the gradient
 * instead of breaking the whole page. The fallback is also always rendered
 * underneath so any Suspense pause inside the Canvas doesn't flash to black.
 */
export const HeroSceneMount = () => {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const tier = useDevicePerfTier();

  const showCanvas =
    mounted && !reduced && capabilities.experimental3D && tier !== "low";

  return (
    <>
      <HeroSceneFallback />
      {showCanvas ? (
        <ErrorBoundary fallback={() => null}>
          <HeroCanvas tier={tier} />
        </ErrorBoundary>
      ) : null}
    </>
  );
};
