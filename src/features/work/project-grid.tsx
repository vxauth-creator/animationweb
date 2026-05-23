import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { projects } from "@/lib/data/projects";

import { ProjectCard } from "./project-card";

interface ProjectGridProps {
  /** Render at most this many cards (used for the home preview). */
  limit?: number;
  /** Override the default project source (kept for testing / future filters). */
  items?: typeof projects;
}

/**
 * `<ProjectGrid>` — masonry-feel two-column grid driven by the `featured`
 * flag on each project (featured cards span 2 columns on desktop). Each card
 * has its own scroll-triggered motion via `<ProjectCard>`.
 */
export const ProjectGrid = ({ limit, items }: ProjectGridProps) => {
  const source = items ?? projects;
  const list = limit ? source.slice(0, limit) : source;

  return (
    <Section size="full">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {list.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
