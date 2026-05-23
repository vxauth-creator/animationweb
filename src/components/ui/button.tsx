"use client";

import Link from "next/link";

import { cn } from "@/lib/utils/cn";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  /** Optional leading / trailing slot for icons. */
  leading?: ReactNode;
  trailing?: ReactNode;
  /** Suppresses default magnetic-like hover lift (use inside `<Magnetic>`). */
  flat?: boolean;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-[transform,box-shadow,background-color,border-color,color] ease-(--ease-smooth) duration-300 select-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: cn(
    "text-(--color-ink-50) shadow-[0_10px_30px_-10px_rgba(59,130,255,0.55)]",
    "[background:linear-gradient(120deg,var(--color-accent-cyan)_0%,var(--color-accent-blue)_50%,var(--color-accent-violet)_100%)]",
    "hover:shadow-[0_18px_50px_-12px_rgba(124,92,255,0.55)]",
  ),
  secondary: cn(
    "border border-(--border-strong) bg-(--surface-1)/60 text-(--foreground) backdrop-blur-md",
    "hover:border-(--color-accent-blue)/40 hover:bg-(--surface-2)/70",
  ),
  ghost: cn(
    "text-(--foreground)/90 hover:text-(--foreground) hover:bg-(--surface-1)/40",
  ),
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

const liftHover =
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";

/**
 * `<Button>` — premium dual-mode button (button or `<Link>`-rendered anchor).
 *
 * - `primary` is the cinematic gradient CTA.
 * - `secondary` is the glass outline used alongside the primary CTA.
 * - `ghost` is for low-emphasis affordances in dense UI.
 *
 * When given an `href`, renders a Next.js `<Link>` for client-side navigation.
 */
export const Button = ({
  variant = "primary",
  size = "md",
  leading,
  trailing,
  flat = false,
  className,
  children,
  ...rest
}: ButtonProps) => {
  const cls = cn(base, variants[variant], sizes[size], !flat && liftHover, className);

  const inner = (
    <>
      {leading ? <span className="-ml-0.5 flex shrink-0">{leading}</span> : null}
      <span>{children}</span>
      {trailing ? <span className="-mr-0.5 flex shrink-0">{trailing}</span> : null}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest;
    return (
      <Link href={href} className={cls} {...anchorRest}>
        {inner}
      </Link>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cls} {...buttonRest}>
      {inner}
    </button>
  );
};
