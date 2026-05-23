"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface LenisContextValue {
  /** Smoothly scroll to a target. Falls back to native scroll under reduced-motion. */
  scrollTo: (target: string | number | HTMLElement, opts?: { offset?: number }) => void;
  /** Pause Lenis (e.g., while a modal is open). */
  stop: () => void;
  /** Resume Lenis. */
  start: () => void;
}

const LenisContext = createContext<LenisContextValue | null>(null);

/**
 * `LenisProvider` — buttery-smooth inertial scrolling.
 *
 * - Disabled entirely under `prefers-reduced-motion` (native scroll preserved).
 * - Driven by a single rAF loop at the root.
 * - Exposes `scrollTo / stop / start` via context for in-app navigation.
 *
 * The provider must be a **client** component and must wrap content rendered
 * inside the body so it can attach to the page wrapper.
 */
export const LenisProvider = ({ children }: { children: ReactNode }) => {
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const [api, setApi] = useState<LenisContextValue | null>(null);

  useEffect(() => {
    if (reduced) return; // native scroll under reduced-motion
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      lerp: 0.1,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    setApi({
      scrollTo: (target, opts) => {
        lenis.scrollTo(target, { offset: opts?.offset ?? 0 });
      },
      stop: () => lenis.stop(),
      start: () => lenis.start(),
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
      setApi(null);
    };
  }, [reduced]);

  return <LenisContext.Provider value={api}>{children}</LenisContext.Provider>;
};

/**
 * Access the Lenis instance for programmatic scroll control.
 * Returns `null` when reduced-motion is active or before mount.
 */
export const useLenis = (): LenisContextValue | null => useContext(LenisContext);
