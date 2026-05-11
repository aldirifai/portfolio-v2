import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/content/ProjectCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { Aurora } from "@/components/ui/Aurora";
import { getAllProjects } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work across Laravel, FastAPI, Next.js, and AI workflows — Indonesian-market SaaS, e-commerce, and personal AI agents.",
};

const ORDER: string[] = [
  "fintrack",
  "klipin",
  "tanyaai",
  "landingklinik-stack",
  "leadflow",
  "levenshop",
];

export default function ProjectsPage() {
  const all = getAllProjects();
  const sorted = [...all].sort(
    (a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug),
  );
  const [hero, ...rest] = sorted;

  return (
    <div className="relative">
      <Aurora className="opacity-60" />
      <Container variant="wide" className="relative z-10 py-16 sm:py-24">
        <FadeIn>
          <header className="mx-auto mb-12 max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
              / projects
            </p>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
              Things I&apos;ve <span className="text-gradient-accent">built.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-secondary">
              A mix of personal projects and client builds — Indonesian-market
              SaaS, e-commerce storefronts, AI agents, and the unglamorous infra
              that holds them together.
            </p>
          </header>
        </FadeIn>

        {hero && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Row 1-2: hero + 2 cards on right */}
            <FadeIn className="lg:col-span-2 lg:row-span-2" delay={0}>
              <ProjectCard
                project={hero}
                size="large"
                className="h-full min-h-[440px]"
              />
            </FadeIn>
            {rest.slice(0, 2).map((project, index) => (
              <FadeIn key={project.slug} delay={(index + 1) * 0.06}>
                <ProjectCard
                  project={project}
                  size="default"
                  className="h-full min-h-[210px]"
                />
              </FadeIn>
            ))}
            {/* Row 3: 3 cards full width */}
            {rest.slice(2).map((project, index) => (
              <FadeIn key={project.slug} delay={(index + 3) * 0.06}>
                <ProjectCard
                  project={project}
                  size="default"
                  className="h-full min-h-[210px]"
                />
              </FadeIn>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
