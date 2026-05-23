import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GradientBg } from "@/components/ui/gradient-bg";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center">
      <GradientBg variant="mesh" />
      <Container size="narrow" className="relative">
        <p className="font-mono text-xs tracking-[0.2em] text-(--color-accent-cyan) uppercase">
          404 · Off the map
        </p>
        <h1 className="mt-3 text-balance text-5xl leading-[1.05] font-semibold md:text-7xl">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-5 max-w-xl text-(--foreground-muted)">
          It may have moved, been renamed, or never existed. Pick up a thread below — or jump
          back to the home page.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Back home</Button>
          <Button href="/work" variant="secondary">
            View work
          </Button>
          <Button href="/contact" variant="ghost">
            Start a project
          </Button>
        </div>
      </Container>
    </section>
  );
}
