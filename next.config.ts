import type { NextConfig } from "next";

import { securityHeaders } from "./src/lib/security/headers";

/**
 * Next.js configuration for NishantWebLab.
 *
 * Performance and security defaults are intentionally strict:
 *  - React strict mode + compiler-friendly settings.
 *  - Image optimization + remote patterns whitelist (extend per project).
 *  - Hardened security headers (CSP, HSTS, frame-ancestors, etc.).
 *  - Server-only packages externalized so heavy 3D libs ship lean to the client.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Keep the bundle lean: tree-shake icon / utility packages aggressively.
  experimental: {
    optimizePackageImports: [
      "motion",
      "gsap",
      "lenis",
      "@react-three/drei",
      "@react-three/fiber",
      "three",
      "zustand",
    ],
  },

  // Production-grade image policy. Add CDN domains as the portfolio grows.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.nishantweblab.com" },
    ],
  },

  // Heavy server-only modules — never bundle into the client.
  serverExternalPackages: ["@supabase/ssr"],

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders(),
      },
    ];
  },
};

export default nextConfig;
