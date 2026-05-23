"use client";

import { createContext, useContext, useMemo } from "react";

import type { ReactNode } from "react";

/**
 * Theme provider — dark-first.
 *
 * The site is intentionally dark-first (see brand brief). This provider is a
 * forward-compatible seam: when light mode lands later, swap the resolution
 * logic here without touching consumers.
 */
type Theme = "dark";

interface ThemeContextValue {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: "dark" });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const value = useMemo<ThemeContextValue>(() => ({ theme: "dark" }), []);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => useContext(ThemeContext);
