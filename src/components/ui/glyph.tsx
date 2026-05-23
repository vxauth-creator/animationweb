import { cn } from "@/lib/utils/cn";

import type { GlyphKey } from "@/lib/data/services";

interface GlyphProps {
  /** Glyph key — see `GlyphKey` in service data. */
  name: GlyphKey;
  className?: string;
}

const PATHS: Record<GlyphKey, React.ReactNode> = {
  browser: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
      <circle cx="6" cy="7" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  stack: (
    <>
      <path d="M12 4l9 4-9 4-9-4 9-4z" />
      <path d="M3 12l9 4 9-4" />
      <path d="M3 16l9 4 9-4" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v6" />
      <path d="M12 15v6" />
      <path d="M3 12h6" />
      <path d="M15 12h6" />
      <path d="M5.6 5.6l4.2 4.2" />
      <path d="M14.2 14.2l4.2 4.2" />
      <path d="M18.4 5.6l-4.2 4.2" />
      <path d="M9.8 14.2l-4.2 4.2" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2.4 11a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" />
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </>
  ),
  gauge: (
    <>
      <path d="M3 12a9 9 0 1 1 18 0" />
      <path d="M12 12l5-3" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  atoms: (
    <>
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
    </>
  ),
  node: (
    <>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="12" cy="18" r="2.4" />
      <path d="M7.6 7.6L10.6 16" />
      <path d="M16.4 7.6L13.4 16" />
      <path d="M8.4 6h7.2" />
    </>
  ),
};

/**
 * `<Glyph>` — token-driven service icon. Pure SVG, no external icon library.
 *
 * Reuses the design palette by inheriting `currentColor` from the parent.
 */
export const Glyph = ({ name, className }: GlyphProps) => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-6 w-6", className)}
  >
    {PATHS[name]}
  </svg>
);
