/**
 * Process steps — kickoff to launch.
 *
 * Each step has a numeric index, a title, a one-line summary, and a list of
 * deliverables that are surfaced in the expanded view. The number drives the
 * cinematic counter element in the timeline.
 */

export interface ProcessStep {
  readonly index: number;
  readonly title: string;
  readonly summary: string;
  readonly deliverables: ReadonlyArray<string>;
  readonly duration: string;
}

export const processSteps: ReadonlyArray<ProcessStep> = [
  {
    index: 1,
    title: "Discovery",
    summary: "Audience, goals, constraints, success metrics — anchored in evidence.",
    deliverables: ["Stakeholder interviews", "Competitive teardown", "Success metrics doc"],
    duration: "1 week",
  },
  {
    index: 2,
    title: "Planning",
    summary: "Architecture, scope, milestones, and risk surfaces — written down.",
    deliverables: ["System architecture", "Milestone plan", "Risk register"],
    duration: "1 week",
  },
  {
    index: 3,
    title: "Design",
    summary: "System-driven UI with motion specs — built once, used everywhere.",
    deliverables: ["Token system", "Component library", "Motion specs"],
    duration: "2 weeks",
  },
  {
    index: 4,
    title: "Development",
    summary: "Type-safe, accessible, performant — every layer engineered.",
    deliverables: ["Production build", "Test coverage", "Storybook"],
    duration: "4–8 weeks",
  },
  {
    index: 5,
    title: "Optimization",
    summary: "Lighthouse, accessibility, SEO, and motion polish — measured, not asserted.",
    deliverables: ["CWV report", "A11y audit", "Performance budgets"],
    duration: "1 week",
  },
  {
    index: 6,
    title: "Deployment",
    summary: "CI/CD, observability, and a 30-day glide path post-launch.",
    deliverables: ["CI/CD pipeline", "Observability setup", "Runbook"],
    duration: "Ongoing",
  },
] as const;
