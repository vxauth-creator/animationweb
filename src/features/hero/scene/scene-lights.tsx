"use client";

/**
 * Cinematic lighting rig for the hero scene.
 *
 * Three lights, each with a deliberate role:
 *  - Ambient: deep ink fill so shadows never go fully black.
 *  - Key (upper-right):  warm violet — the dominant brand glow.
 *  - Rim (behind-left):  cool cyan — separates shapes from the background.
 *  - Subtle point near the central shape — emphasizes the hero geometry.
 *
 * Intensities are tuned so MeshDistortMaterial reads as glassy + metallic
 * without crushing values into bloom territory at the high tier.
 */
export const SceneLights = () => {
  return (
    <>
      <ambientLight intensity={0.45} color="#1c2230" />
      <directionalLight
        position={[4, 5, 3]}
        intensity={1.6}
        color="#7c5cff"
        castShadow={false}
      />
      <directionalLight position={[-5, -2, -3]} intensity={1.0} color="#22e6ff" />
      <pointLight position={[0, 1.5, 2.5]} intensity={1.4} color="#a78bff" distance={9} />
    </>
  );
};
