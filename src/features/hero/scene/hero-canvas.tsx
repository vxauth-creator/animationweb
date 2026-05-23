"use client";

import {
  AdaptiveDpr,
  AdaptiveEvents,
  PerformanceMonitor,
  type PerformanceMonitorApi,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

import { CinematicRig } from "./cinematic-rig";
import { FloatingShapes } from "./floating-shapes";
import { HeroPostProcessing } from "./post-processing";
import { ParticleField } from "./particle-field";
import { SceneLights } from "./scene-lights";

import type { PerfTier } from "@/types";

interface HeroCanvasProps {
  tier: PerfTier;
}

/**
 * `<HeroCanvas>` — top-level R3F surface for the hero scene.
 *
 * Mounted lazily by `<HeroSceneMount>` only when the device tier permits a
 * Canvas at all. Inside, a `PerformanceMonitor` watches frame timing and
 * downgrades quality (DPR, post-fx) on sustained drops.
 *
 * Why a separate file: this entire module is dynamically imported with
 * `ssr: false`, so heavy R3F / drei / postprocessing chunks never enter the
 * server bundle and only ship after the hero is interactive.
 */
export const HeroCanvas = ({ tier }: HeroCanvasProps) => {
  // `bloomEnabled` follows the tier but downgrades at runtime if FPS drops.
  const [bloomEnabled, setBloomEnabled] = useState(tier === "high");

  // Cap pixel ratio per tier — never exceed device pixel ratio.
  const dpr: [number, number] = tier === "high" ? [1, 2] : [1, 1.5];

  const onPerfDecline = ({ fps }: PerformanceMonitorApi) => {
    if (fps < 45 && bloomEnabled) setBloomEnabled(false);
  };

  return (
    <Canvas
      // `gl` defaults to webgl2 which is fine for our materials.
      gl={{
        antialias: tier === "high",
        powerPreference: "high-performance",
        alpha: true,
        // Helps premium colors render without banding on dark backgrounds.
        toneMappingExposure: 1.05,
      }}
      dpr={dpr}
      camera={{ position: [0, 0, 5], fov: 38, near: 0.1, far: 24 }}
      // Transparent so the underlying CSS gradient shows through.
      style={{ background: "transparent" }}
      // Drop default events handler — the hero scene is non-interactive in 3D.
      eventSource={undefined}
      // Prevent context-loss on tab switch from killing the scene permanently.
      flat={false}
    >
      <PerformanceMonitor
        ms={250}
        iterations={5}
        threshold={0.6}
        onDecline={onPerfDecline}
      />
      <AdaptiveDpr pixelated={false} />
      <AdaptiveEvents />

      <Suspense fallback={null}>
        <SceneLights />
        <CinematicRig>
          <FloatingShapes tier={tier} />
          <ParticleField tier={tier} />
        </CinematicRig>
        {bloomEnabled ? <HeroPostProcessing /> : null}
      </Suspense>
    </Canvas>
  );
};
