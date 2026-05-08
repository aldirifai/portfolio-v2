import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/content/ProjectCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { getFeaturedProjects } from "@/lib/data/projects";

export function FeaturedProjects() {
  const projects = getFeaturedProjects(3);

  return (
    <Container variant="content" className="py-12 sm:py-16">
      <section>
        <FadeIn>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Selected work</h2>
            <Link href="/projects" className="text-sm text-secondary transition-colors hover:text-primary">All projects →</Link>
          </div>
        </FadeIn>
        <div className="flex flex-col gap-4">
          {projects.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 0.08}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </section>
    </Container>
  );
}
