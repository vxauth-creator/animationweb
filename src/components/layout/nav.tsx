"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils/cn";

/**
 * `<Nav>` — premium glass top navigation.
 *
 * - Sticky, becomes more opaque + adds a hairline once scrolled past 24px.
 * - Active route gets a subtle accent indicator.
 * - CTA is wrapped in `<Magnetic>` for the signature pointer interaction.
 * - Mobile menu is a controlled disclosure (no portals — keeps focus simple).
 */
export const Nav = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-300 ease-(--ease-smooth)",
        scrolled
          ? "border-b border-(--border-subtle) bg-(--surface-0)/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-(--max-content) items-center justify-between container-x md:h-20">
        <Link
          href="/"
          aria-label={siteConfig.name}
          className="group inline-flex items-center gap-2"
        >
          <span
            aria-hidden
            className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg [background:linear-gradient(135deg,var(--color-accent-cyan),var(--color-accent-violet))] shadow-[0_8px_24px_-6px_rgba(124,92,255,0.6)]"
          >
            <span className="text-xs font-bold tracking-tight text-(--color-ink-50)">
              {siteConfig.shortName}
            </span>
          </span>
          <span className="font-display text-base font-medium tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {siteConfig.primaryNav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-9 items-center rounded-full px-4 text-sm transition-colors",
                      active
                        ? "text-(--foreground)"
                        : "text-(--foreground-muted) hover:text-(--foreground)",
                    )}
                  >
                    {item.label}
                    {active ? (
                      <span
                        aria-hidden
                        className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-(--color-accent-cyan) to-transparent"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Magnetic strength={10}>
            <Button href={siteConfig.cta.primary.href} size="sm">
              {siteConfig.cta.primary.label}
            </Button>
          </Magnetic>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--border-subtle) bg-(--surface-1)/50 backdrop-blur-md lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="relative block h-3 w-4">
            <span
              className={cn(
                "absolute left-0 block h-px w-4 bg-(--foreground) transition-transform duration-300 ease-(--ease-smooth)",
                open ? "top-1.5 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.5 block h-px w-4 bg-(--foreground) transition-opacity duration-300",
                open ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-px w-4 bg-(--foreground) transition-transform duration-300 ease-(--ease-smooth)",
                open ? "top-1.5 -rotate-45" : "top-3",
              )}
            />
          </span>
        </button>
      </div>

      {/* Mobile disclosure */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-b border-(--border-subtle) bg-(--surface-0)/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-(--ease-smooth) lg:hidden",
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav aria-label="Primary mobile" className="container-x py-6">
          <ul className="flex flex-col gap-1">
            {siteConfig.primaryNav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-base transition-colors",
                      active
                        ? "bg-(--surface-1)/60 text-(--foreground)"
                        : "text-(--foreground-muted) hover:bg-(--surface-1)/40 hover:text-(--foreground)",
                    )}
                  >
                    {item.label}
                    <span aria-hidden className="text-xs text-(--color-accent-cyan)">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-6">
            <Button href={siteConfig.cta.primary.href} size="md" className="w-full">
              {siteConfig.cta.primary.label}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
