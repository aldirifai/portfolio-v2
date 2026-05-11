import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/content/ProjectCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { getFeaturedProjects } from "@/lib/mdx";

export function FeaturedProjects() {
  const projects = getFeaturedProjects(3);
  const [hero, ...rest] = projects;

  return (
    <Container variant="wide" className="py-16 sm:py-24">
      <section>
        <FadeIn>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                / 01 — selected work
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Things I&apos;ve been{" "}
                <span className="text-gradient-accent">building</span>
              </h2>
            </div>
            <Link
              href="/projects"
              className="group hidden shrink-0 items-center gap-1.5 font-mono text-xs text-secondary transition-colors hover:text-accent sm:inline-flex"
            >
              All projects
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </FadeIn>

        {hero && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2 lg:[grid-auto-rows:1fr]">
            <FadeIn className="lg:col-span-2 lg:row-span-2" delay={0}>
              <ProjectCard project={hero} size="large" className="h-full min-h-[420px]" />
            </FadeIn>
            {rest.map((project, index) => (
              <FadeIn key={project.slug} delay={(index + 1) * 0.08}>
                <ProjectCard
                  project={project}
                  size="default"
                  className="h-full min-h-[200px]"
                />
              </FadeIn>
            ))}
          </div>
        )}

        <FadeIn>
          <Link
            href="/projects"
            className="group mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-secondary transition-colors hover:text-accent sm:hidden"
          >
            All projects
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </FadeIn>
      </section>
    </Container>
  );
}
