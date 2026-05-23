"use client";

import * as m from "motion/react-m";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowBorder } from "@/components/ui/glow-border";
import { Glyph } from "@/components/ui/glyph";
import { durations, easeExpo, easeSmooth } from "@/animations/easings";
import { cn } from "@/lib/utils/cn";

import type { Service } from "@/lib/data/services";

interface ServiceCardProps {
  service: Service;
  /** Optional anchor id (defaults to slug). */
  id?: string;
}

/**
 * `<ServiceCard>` — premium expandable service card.
 *
 * Closed state: glyph + title + summary + optional metric. Hover lifts subtly.
 * Open state: reveals capability bullets with a height-animated panel.
 *
 * Accessible: the toggle is a real `<button>`, `aria-expanded` is wired,
 * the panel uses `role="region"`, and reduced-motion users see no height
 * animation (Motion respects the global `MotionConfig.reducedMotion`).
 */
export const ServiceCard = ({ service, id }: ServiceCardProps) => {
  const [open, setOpen] = useState(false);
  const panelId = `${service.slug}-detail`;

  return (
    <GlowBorder accent={service.accent} className="h-full">
      <GlassCard
        as="article"
        id={id ?? service.slug}
        interactive
        sheen
        className="flex h-full flex-col p-6 md:p-7"
      >
        <header className="flex items-center justify-between gap-4">
          <span
            aria-hidden
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-(--border-strong) bg-(--surface-2)/60",
              service.accent === "blue" && "text-(--color-accent-blue)",
              service.accent === "cyan" && "text-(--color-accent-cyan)",
              service.accent === "violet" && "text-(--color-accent-violet)",
            )}
          >
            <Glyph name={service.glyph} />
          </span>
          {service.metric ? (
            <Badge variant="accent" size="md">
              <span className="font-mono">{service.metric.value}</span>
              <span className="ml-1 text-(--foreground-muted)">·</span>
              <span className="ml-1">{service.metric.label}</span>
            </Badge>
          ) : null}
        </header>

        <h3 className="mt-5 font-display text-2xl font-medium md:text-[1.625rem]">
          {service.title}
        </h3>
        <p className="mt-2.5 text-sm text-(--foreground-muted) md:text-[15px]">
          {service.summary}
        </p>

        <div className="mt-5 grow" />

        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "group/btn inline-flex items-center gap-2 self-start rounded-full",
            "border border-(--border-strong) bg-(--surface-2)/40 px-3 py-1.5",
            "text-xs font-medium tracking-tight text-(--foreground)/90",
            "transition-[border-color,background-color,color] duration-200 ease-(--ease-smooth)",
            "hover:border-(--color-accent-blue)/40 hover:text-(--foreground)",
          )}
        >
          {open ? "Less" : "Capabilities"}
          <span
            aria-hidden
            className={cn(
              "inline-block transition-transform duration-300 ease-(--ease-smooth)",
              open ? "rotate-45" : "rotate-0",
            )}
          >
            +
          </span>
        </button>

        <m.div
          id={panelId}
          role="region"
          aria-label={`${service.title} capabilities`}
          initial={false}
          animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0,
            marginTop: open ? 16 : 0,
          }}
          transition={{
            height: { duration: durations.slow, ease: easeExpo },
            opacity: { duration: durations.fast, ease: easeSmooth },
          }}
          className="overflow-hidden"
        >
          <ul className="grid gap-2 border-t border-(--border-subtle) pt-4 text-sm text-(--foreground-muted)">
            {service.capabilities.map((cap) => (
              <li key={cap} className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-(--color-accent-cyan)"
                />
                {cap}
              </li>
            ))}
          </ul>
        </m.div>
      </GlassCard>
    </GlowBorder>
  );
};
