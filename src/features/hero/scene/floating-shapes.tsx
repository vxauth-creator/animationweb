"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

import type { Group, Mesh } from "three";

import type { PerfTier } from "@/types";

interface FloatingShapesProps {
  tier: PerfTier;
}

/**
 * `<FloatingShapes>` — the cinematic geometric environment.
 *
 * Composition (right of foreground text, with depth markers):
 *  - Center-right: distorted icosahedron (the visual anchor).
 *  - Far back-left: emissive violet torus (glow accent).
 *  - Back-right:    wireframe octahedron (depth + texture contrast).
 *  - Deep back:     faint sphere (subliminal depth marker).
 *
 * Performance levers driven by `tier`:
 *  - icosahedron geometry detail: medium=24, high=64.
 *  - distortion speed: medium=0.8, high=1.2.
 *  - distortion amount: medium=0.22, high=0.32.
 *
 * `<Float>` (drei) is the official idiom for the breathing/bobbing motion;
 * each shape uses different speeds so the composition never feels rhythmic.
 */
export const FloatingShapes = ({ tier }: FloatingShapesProps) => {
  const isHigh = tier === "high";

  const heroRef = useRef<Mesh>(null);
  const torusGroup = useRef<Group>(null);

  // Ultra-subtle continuous rotation on the hero shape — keeps highlights moving.
  useFrame((_, delta) => {
    if (heroRef.current) {
      heroRef.current.rotation.y += delta * 0.08;
      heroRef.current.rotation.x += delta * 0.02;
    }
    if (torusGroup.current) {
      torusGroup.current.rotation.z += delta * 0.06;
    }
  });

  return (
    <>
      {/* Central distorted icosahedron — the "hero" shape. */}
      <Float
        speed={1.2}
        rotationIntensity={0.18}
        floatIntensity={0.9}
        floatingRange={[-0.18, 0.18]}
      >
        <mesh ref={heroRef} position={[1.85, 0.05, 0]}>
          <icosahedronGeometry args={[1.4, isHigh ? 64 : 24]} />
          <MeshDistortMaterial
            color="#3b82ff"
            distort={isHigh ? 0.32 : 0.22}
            speed={isHigh ? 1.2 : 0.8}
            metalness={0.7}
            roughness={0.18}
            envMapIntensity={1.1}
          />
        </mesh>
      </Float>

      {/* Top-left emissive torus accent. */}
      <Float speed={0.7} rotationIntensity={0.4} floatIntensity={1.4}>
        <group ref={torusGroup} position={[-2.6, 1.2, -1.2]}>
          <mesh rotation={[Math.PI / 4, 0.5, 0]}>
            <torusGeometry args={[0.55, 0.16, 18, 96]} />
            <meshStandardMaterial
              color="#7c5cff"
              emissive="#7c5cff"
              emissiveIntensity={isHigh ? 0.85 : 0.55}
              metalness={0.95}
              roughness={0.3}
            />
          </mesh>
        </group>
      </Float>

      {/* Bottom-right wireframe octahedron — adds a graphic, "engineered" note. */}
      <Float speed={0.9} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[3.6, -1.4, -1.6]} rotation={[0.4, 0.6, 0]}>
          <octahedronGeometry args={[0.78, 0]} />
          <meshBasicMaterial color="#22e6ff" wireframe transparent opacity={0.55} />
        </mesh>
      </Float>

      {/* Faint deep sphere — depth anchor; never the focal point. */}
      <mesh position={[0, -0.5, -5]}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial color="#7c5cff" transparent opacity={0.06} />
      </mesh>
    </>
  );
};
