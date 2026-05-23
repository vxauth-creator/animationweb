"use client";

import * as m from "motion/react-m";
import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowBorder } from "@/components/ui/glow-border";
import { durations, easeSmooth } from "@/animations/easings";
import { cn } from "@/lib/utils/cn";

import type { Project } from "@/lib/data/projects";

interface ProjectCardProps {
  project: Project;
}

/**
 * `<ProjectCard>` — floating portfolio tile.
 *
 * - Pointer-aware tilt: the card rotates ±5° toward the cursor on hover (CSS
 *   custom properties updated in a pointermove handler — no React state).
 * - Renders a procedural cinematic preview region (no images yet — Phase 4
 *   wires `cover_url` from Supabase Storage). The preview uses gradient mesh
 *   + subtle grid for a "rendered demo" feel without shipping photo assets.
 * - Tech stack chips, optional metrics row, and live/repo links.
 *
 * Reduced-motion users get a static card; the tilt CSS only resolves to a
 * transform when `--mx`/`--my` are set, which only happens on pointer move.
 */
export const ProjectCard = ({ project }: ProjectCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = (event.clientX - rect.left) / rect.width;
    const my = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--mx", mx.toString());
    el.style.setProperty("--my", my.toString());
    el.style.setProperty("--rx", `${(0.5 - my) * 6}deg`);
    el.style.setProperty("--ry", `${(mx - 0.5) * 6}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <m.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: durations.slow, ease: easeSmooth }}
      className={cn(
        "group relative h-full [transform-style:preserve-3d]",
        "[transform:perspective(1100px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]",
        "transition-transform duration-300 ease-(--ease-smooth)",
        project.featured && "lg:col-span-2",
      )}
    >
      <GlowBorder accent={project.accent} radius="2xl">
        <GlassCard variant="strong" sheen className="overflow-hidden p-0">
          {/* Cinematic procedural preview — replaces real cover image until Phase 4. */}
          <div
            aria-hidden
            className={cn(
              "relative aspect-[16/10] w-full overflow-hidden",
              "before:absolute before:inset-0 before:[background:radial-gradient(60%_80%_at_var(--mxp,30%)_var(--myp,30%),color-mix(in_oklab,var(--color-accent-violet)_45%,transparent),transparent_60%)]",
            )}
            style={{
              ["--mxp" as string]: "calc(var(--mx, 0.3) * 100%)",
              ["--myp" as string]: "calc(var(--my, 0.3) * 100%)",
            }}
          >
            <div className="absolute inset-0 [background:linear-gradient(135deg,color-mix(in_oklab,var(--color-accent-blue)_30%,transparent)_0%,color-mix(in_oklab,var(--color-accent-violet)_25%,transparent)_60%,transparent_100%)]" />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(to right, color-mix(in oklab, var(--color-paper-200) 7%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-paper-200) 7%, transparent) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                maskImage:
                  "radial-gradient(ellipse 70% 70% at 50% 30%, #000 50%, transparent 80%)",
              }}
            />
            <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between">
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-(--color-paper-300) uppercase">
                  {project.client}
                </p>
                <p className="font-display text-3xl leading-tight font-semibold text-(--foreground) md:text-4xl">
                  {project.title}
                </p>
              </div>
              <Badge variant="default" size="sm" className="font-mono">
                {project.year}
              </Badge>
            </div>
          </div>

          <div className="grid gap-4 p-6 md:p-7">
            <p className="text-sm text-(--foreground-muted)">{project.summary}</p>

            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="muted" size="sm">
                  {tech}
                </Badge>
              ))}
            </div>

            {project.metrics && project.metrics.length > 0 ? (
              <ul className="grid grid-cols-2 gap-3 border-t border-(--border-subtle) pt-4">
                {project.metrics.map((metric) => (
                  <li key={metric.label}>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-(--color-paper-300) uppercase">
                      {metric.label}
                    </p>
                    <p className="font-display text-xl font-medium">{metric.value}</p>
                  </li>
                ))}
              </ul>
            ) : null}

            {(project.liveUrl ?? project.repoUrl) ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-(--color-accent-cyan) transition-colors hover:text-(--foreground)"
                  >
                    Live ↗
                  </a>
                ) : null}
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-(--color-accent-cyan) transition-colors hover:text-(--foreground)"
                  >
                    Code ↗
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </GlassCard>
      </GlowBorder>
    </m.article>
  );
};
