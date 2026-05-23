import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";

import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { buildMetadata } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils/cn";
import { Providers } from "@/providers";

import type { ReactNode } from "react";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

export const metadata = buildMetadata();

export const viewport = {
  themeColor: "#05060a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  // Allow up to 5x zoom for accessibility — never disable user scale.
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      // `--font-display` and `--font-body` resolve via the variables we set on <html>.
      className={cn(
        "dark scroll-smooth antialiased",
        spaceGrotesk.variable,
        GeistSans.variable,
        GeistMono.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-(--surface-0) text-(--foreground)">
        {/* Skip-link for keyboard users. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-(--surface-1) focus:px-4 focus:py-2 focus:text-sm focus:shadow-[0_0_0_1px_var(--color-accent-cyan)]"
        >
          Skip to main content
        </a>

        <Providers>
          <Nav />
          <main id="main" className="relative isolate pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
        </Providers>

        {/* schema.org — Organization + WebSite. */}
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
      </body>
    </html>
  );
}
