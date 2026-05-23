"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

import type { Group } from "three";

import { useMouseTarget } from "@/hooks/use-mouse-parallax";

import type { ReactNode } from "react";

interface CinematicRigProps {
  /** Maximum parallax rotation (radians) on each axis. */
  parallaxStrength?: number;
  /** Maximum cinematic camera drift (radians). */
  driftStrength?: number;
  /** Smoothing factor for parallax lerp (0..1, higher = snappier). */
  smoothing?: number;
  children: ReactNode;
}

/**
 * `<CinematicRig>` — composes mouse parallax with a slow camera drift.
 *
 * Two layered motions on a single `<group>`:
 *   1. **Mouse parallax** — group rotates ±`parallaxStrength` based on the
 *      pointer's normalized position. Lerp-smoothed for premium feel.
 *   2. **Cinematic drift** — sin/cos breathing on the camera Y/X over a
 *      ~24-second period. Layered, not replaced, with the parallax.
 *
 * Reads the cursor via `useMouseTarget` (a ref-based hook) so it never
 * re-renders the scene tree. All animation runs inside `useFrame`.
 */
export const CinematicRig = ({
  parallaxStrength = 0.2,
  driftStrength = 0.08,
  smoothing = 0.06,
  children,
}: CinematicRigProps) => {
  const groupRef = useRef<Group>(null);
  const target = useMouseTarget();
  const camera = useThree((state) => state.camera);

  // Track a private accumulator so reduced-motion / pause states stay stable.
  const drift = useRef({ t: 0 });

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // --- Parallax ---------------------------------------------------------
    // Y-rotation follows X cursor; X-rotation inversely follows Y cursor.
    const targetRotY = target.current.x * parallaxStrength;
    const targetRotX = -target.current.y * parallaxStrength * 0.65;

    group.rotation.y += (targetRotY - group.rotation.y) * smoothing;
    group.rotation.x += (targetRotX - group.rotation.x) * smoothing;

    // --- Cinematic camera drift ------------------------------------------
    drift.current.t += delta;
    const t = drift.current.t;
    camera.position.x = Math.sin(t * 0.18) * driftStrength * 1.2;
    camera.position.y = Math.cos(t * 0.14) * driftStrength * 0.8;
    camera.lookAt(0, 0, 0);
  });

  return <group ref={groupRef}>{children}</group>;
};
