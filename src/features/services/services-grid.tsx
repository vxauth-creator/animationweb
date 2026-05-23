import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Stagger } from "@/components/motion/stagger";
import { services } from "@/lib/data/services";

import { ServiceCard } from "./service-card";

interface ServicesGridProps {
  /** Render fewer cards (used by the home page preview). */
  limit?: number;
}

/**
 * `<ServicesGrid>` — orchestrates the service catalog into a 1/2/4 column grid
 * with staggered entrance motion. Each card is a Client Component; the grid
 * itself is a Client Component as well (Stagger uses Motion under the hood).
 */
export const ServicesGrid = ({ limit }: ServicesGridProps) => {
  const items = limit ? services.slice(0, limit) : services;

  return (
    <Section size="full">
      <Container>
        <Stagger
          staggerChildren={0.06}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </Stagger>
      </Container>
    </Section>
  );
};
