"use client";

import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";

/**
 * `<HeroPostProcessing>` — soft bloom + vignette.
 *
 * Mounted only when the device perf tier is `high`. The brief calls for
 * "soft bloom/glow" — values are deliberately conservative:
 *   - `intensity` 0.45 keeps highlights tasteful.
 *   - `luminanceThreshold` 0.55 ignores midtones so the bloom rides on the
 *     emissive torus + specular highlights only, not on the whole image.
 *   - Default kernel + smoothing keep the cost predictable on mid GPUs.
 *
 * Vignette adds a subtle cinematic darkening of the corners — pulls the eye
 * to the center where the foreground hero copy lives.
 */
export const HeroPostProcessing = () => {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={0.45}
        luminanceThreshold={0.55}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.35} darkness={0.55} />
    </EffectComposer>
  );
};
