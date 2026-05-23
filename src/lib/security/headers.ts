/**
 * Security headers for NishantWebLab.
 *
 * Applied globally via `next.config.ts`. The CSP is intentionally tight by
 * default and uses `'unsafe-inline'` only for styles (required by Next.js
 * inline critical CSS) and `'unsafe-eval'` is avoided in production.
 *
 * Extend `connectSrc` / `frameSrc` per-environment when adding integrations
 * (Supabase realtime, Plausible, Sentry, etc.).
 */

const isProd = process.env.NODE_ENV === "production";

const supabaseHost = (() => {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!url) return undefined;
    return new URL(url).host;
  } catch {
    return undefined;
  }
})();

const cspDirectives: Record<string, string[]> = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    ...(isProd ? [] : ["'unsafe-eval'"]),
  ],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", "blob:", "https:"],
  "font-src": ["'self'", "data:"],
  "connect-src": [
    "'self'",
    "https:",
    "wss:",
    ...(supabaseHost ? [`https://${supabaseHost}`, `wss://${supabaseHost}`] : []),
  ],
  "media-src": ["'self'", "blob:", "data:"],
  "worker-src": ["'self'", "blob:"],
  "frame-ancestors": ["'none'"],
  "form-action": ["'self'"],
  "base-uri": ["'self'"],
  "object-src": ["'none'"],
  "upgrade-insecure-requests": [],
};

const buildContentSecurityPolicy = (): string =>
  Object.entries(cspDirectives)
    .map(([key, values]) => (values.length === 0 ? key : `${key} ${values.join(" ")}`))
    .join("; ");

export const securityHeaders = (): Array<{ key: string; value: string }> => [
  { key: "Content-Security-Policy", value: buildContentSecurityPolicy() },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "interest-cohort=()",
      "payment=()",
      "usb=()",
    ].join(", "),
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];
