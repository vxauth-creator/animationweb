import Link from "next/link";

import { GlassCard } from "@/components/ui/glass-card";
import { GlowBorder } from "@/components/ui/glow-border";

import type { ReactNode } from "react";

interface AuthCardProps {
  /** Eyebrow tag, all caps. */
  eyebrow: string;
  /** Page title. */
  title: ReactNode;
  /** Supporting copy under the title. */
  description?: ReactNode;
  /** Card accent color. */
  accent?: "blue" | "cyan" | "violet";
  /** Bottom row links — one or two. */
  footer?: ReactNode;
  children: ReactNode;
}

/**
 * `<AuthCard>` — shared chrome for /login, /signup, /reset, /update-password.
 *
 * Server-component safe (no client hooks, no motion). The forms inside are
 * the client components that own state.
 */
export const AuthCard = ({
  eyebrow,
  title,
  description,
  accent = "violet",
  footer,
  children,
}: AuthCardProps) => {
  return (
    <GlowBorder accent={accent} radius="2xl">
      <GlassCard variant="strong" sheen className="p-7 md:p-9">
        <p className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight font-semibold md:text-[2rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 text-sm text-(--foreground-muted)">{description}</p>
        ) : null}

        <div className="mt-7">{children}</div>

        {footer ? (
          <p className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-xs text-(--foreground-muted)">
            {footer}
          </p>
        ) : null}
      </GlassCard>
    </GlowBorder>
  );
};

export const AuthLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link href={href} className="text-(--color-accent-cyan) hover:underline">
    {children}
  </Link>
);
