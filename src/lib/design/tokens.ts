/**
 * Design tokens — single source of truth for the JS/TS layer.
 *
 * Mirror of the values declared in `src/app/globals.css` `@theme` block.
 * The CSS layer is the source of truth for *rendering*; this file is the
 * source of truth for *animation logic, R3F materials, and runtime decisions*.
 *
 * Keep both files in sync. Do not introduce ad-hoc colors in components.
 */

export const palette = {
  // Backgrounds — black to graphite to navy gradient stops.
  ink: {
    0: "#000000",
    50: "#05060a",
    100: "#0a0c12",
    200: "#0f1218",
    300: "#151923",
    400: "#1c2230",
    500: "#252c3d",
    600: "#2f3850",
  },

  // Primary accents — electric blue / neon cyan / violet glow.
  accent: {
    blue: "#3b82ff",
    cyan: "#22e6ff",
    violet: "#7c5cff",
    glow: "#a78bff",
  },

  // Soft white highlights / typography.
  paper: {
    50: "#f5f7ff",
    100: "#e6eaf5",
    200: "#b8c0d6",
    300: "#8993ae",
    400: "#5a647e",
  },

  // Semantic.
  success: "#22e6a8",
  warning: "#ffc857",
  danger: "#ff5d73",
} as const;

export const radius = {
  xs: "0.375rem",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  "2xl": "2rem",
  full: "9999px",
} as const;

export const spacing = {
  // Vertical rhythm for sections — used by <Section> primitive.
  sectionY: "clamp(5rem, 10vw, 9rem)",
  sectionYsm: "clamp(3rem, 6vw, 5rem)",
  containerX: "clamp(1rem, 4vw, 2rem)",
  maxContent: "80rem",
} as const;

export const typography = {
  display: "var(--font-display)",
  body: "var(--font-body)",
  mono: "var(--font-mono)",
} as const;

/**
 * Motion tokens — durations, easings, and physics for spring-based motion.
 * Animations should compose these instead of inlining magic numbers.
 */
export const motion = {
  duration: {
    instant: 0.12,
    fast: 0.24,
    base: 0.36,
    slow: 0.6,
    cinematic: 1.1,
  },
  ease: {
    // Cinematic easing curves — quint / expo / smooth.
    smooth: [0.22, 1, 0.36, 1] as [number, number, number, number],
    expo: [0.16, 1, 0.3, 1] as [number, number, number, number],
    sharp: [0.83, 0, 0.17, 1] as [number, number, number, number],
    soft: [0.4, 0, 0.2, 1] as [number, number, number, number],
  },
  spring: {
    silky: { type: "spring" as const, stiffness: 120, damping: 22, mass: 1 },
    crisp: { type: "spring" as const, stiffness: 240, damping: 28, mass: 0.8 },
    bouncy: { type: "spring" as const, stiffness: 320, damping: 18, mass: 0.6 },
  },
} as const;

/**
 * Z-index scale — keep stacking explicit.
 */
export const z = {
  base: 0,
  scene: 10,
  content: 20,
  nav: 40,
  overlay: 60,
  modal: 80,
  toast: 90,
} as const;

export type Palette = typeof palette;
export type MotionTokens = typeof motion;
