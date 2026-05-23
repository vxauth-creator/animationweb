import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

/**
 * `<Footer>` — premium animated footer.
 *
 * Includes nav columns, social links, contact email, and a subtle gradient
 * separator. Server-rendered (no client JS) — animations layer on at the
 * section level via motion primitives if the page wants them.
 */
export const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-(--border-subtle) bg-(--surface-1)/40 py-20">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-(--color-accent-violet)/60 to-transparent"
      />

      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <span
                aria-hidden
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg [background:linear-gradient(135deg,var(--color-accent-cyan),var(--color-accent-violet))]"
              >
                <span className="text-xs font-bold text-(--color-ink-50)">
                  {siteConfig.shortName}
                </span>
              </span>
              <span className="font-display text-lg font-medium">{siteConfig.name}</span>
            </Link>
            <p className="mt-5 max-w-md text-(--foreground-muted)">
              {siteConfig.description}
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-6 inline-block font-mono text-sm text-(--foreground) transition-colors hover:text-(--color-accent-cyan)"
            >
              {siteConfig.contactEmail}
            </a>
          </div>

          {siteConfig.footerNav.map((group) => (
            <div key={group.title} className="md:col-span-2">
              <p className="mb-4 text-xs font-medium tracking-[0.2em] text-(--color-paper-300) uppercase">
                {group.title}
              </p>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-(--foreground-muted) transition-colors hover:text-(--foreground)"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <p className="mb-4 text-xs font-medium tracking-[0.2em] text-(--color-paper-300) uppercase">
              Follow
            </p>
            <ul className="space-y-2.5">
              {siteConfig.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-(--foreground-muted) transition-colors hover:text-(--foreground)"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-(--border-subtle) pt-8 text-xs text-(--color-paper-300) md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="font-mono tracking-tight">{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
};
