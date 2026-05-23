/**
 * Cinematic easing curves used across Motion + GSAP.
 *
 * Each curve is a tuple compatible with Framer Motion's `ease` prop and with
 * GSAP via `CustomEase`. Prefer these named exports over inline magic numbers.
 */

import { motion as motionTokens } from "@/lib/design/tokens";

export const easeSmooth = motionTokens.ease.smooth;
export const easeExpo = motionTokens.ease.expo;
export const easeSharp = motionTokens.ease.sharp;
export const easeSoft = motionTokens.ease.soft;

export const durations = motionTokens.duration;
export const springs = motionTokens.spring;
