import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/content/ProjectCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work across Laravel, FastAPI, Go, and Rust — fintech, agricultural systems, AI agents, and a zero-knowledge password manager. Production projects and ongoing personal builds.",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <Container variant="wide" className="py-12 sm:py-16">
      <FadeIn>
        <header className="mb-12 max-w-content">
          <p className="font-mono text-xs text-secondary">projects</p>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Things I&apos;ve built.
          </h1>
          <p className="mt-6 text-balance text-lg leading-relaxed text-secondary">
            A mix of client work, internal systems I&apos;ve shipped, and personal builds I
            keep iterating on. Stack ranges from Laravel and FastAPI to Go and Rust.
          </p>
        </header>
      </FadeIn>

      <section aria-labelledby="featured-heading" className="mb-16">
        <FadeIn>
          <h2 id="featured-heading" className="mb-6 text-2xl font-bold tracking-tight">
            Featured
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {featured.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 0.08}>
              <ProjectCard project={project} variant="featured" />
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="my-12 flex items-center gap-4">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">
          More projects
        </span>
        <hr className="flex-1 border-t border-border" />
      </div>

      <section aria-labelledby="more-heading">
        <h2 id="more-heading" className="sr-only">
          More projects
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
          {others.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 0.08}>
              <ProjectCard project={project} variant="grid" />
            </FadeIn>
          ))}
        </div>
      </section>
    </Container>
  );
}
