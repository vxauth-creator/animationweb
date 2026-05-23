"use client";

import { Sparkles } from "@react-three/drei";

import type { PerfTier } from "@/types";

interface ParticleFieldProps {
  tier: PerfTier;
}

/**
 * `<ParticleField>` — subtle ambient particle layer.
 *
 * Uses Drei's `Sparkles` (instanced GPU points). Counts and scale are
 * intentionally restrained — the brief specifically calls out "no chaotic
 * particles everywhere". The result reads as ambient dust catching light
 * rather than a particle effect.
 *
 * Tier-tuned counts:
 *   medium = 70 · high = 140
 */
export const ParticleField = ({ tier }: ParticleFieldProps) => {
  const count = tier === "high" ? 140 : 70;
  return (
    <>
      <Sparkles
        count={count}
        scale={[12, 6, 6]}
        size={1.6}
        speed={0.18}
        opacity={0.55}
        color="#a78bff"
        position={[1, 0, -1]}
      />
      {tier === "high" ? (
        <Sparkles
          count={50}
          scale={[8, 4, 4]}
          size={0.9}
          speed={0.1}
          opacity={0.35}
          color="#22e6ff"
          position={[-1, 0.5, 1]}
        />
      ) : null}
    </>
  );
};
