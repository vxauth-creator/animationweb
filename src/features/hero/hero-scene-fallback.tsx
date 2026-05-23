import { GradientBg } from "@/components/ui/gradient-bg";

/**
 * Static, no-JS fallback for the hero background.
 *
 * Used in three places:
 *  - SSR / first paint (always)
 *  - Reduced-motion users (replaces the canvas entirely)
 *  - `low`-tier devices and feature-flag off (replaces the canvas entirely)
 *  - As an underlay while the Canvas chunk is being fetched
 *
 * Stays a server component (no hooks, no JS) so it adds zero hydration cost.
 */
export const HeroSceneFallback = () => {
  return (
    <>
      <GradientBg variant="aurora" />
      <GradientBg variant="grid" />
    </>
  );
};
