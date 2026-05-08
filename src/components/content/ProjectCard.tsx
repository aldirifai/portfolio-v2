import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/project";

type ProjectCardVariant = "featured" | "grid";

type ProjectCardProps = {
  project: Project;
  variant?: ProjectCardVariant;
  className?: string;
};

export function ProjectCard({
  project,
  variant = "featured",
  className,
}: ProjectCardProps) {
  if (variant === "grid") {
    return (
      <article className={cn("group", className)}>
        <Link
          href={`/projects/${project.slug}`}
          className="block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-base font-semibold text-primary transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <span className="shrink-0 font-mono text-xs text-muted">{project.year}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-secondary">{project.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </Link>
      </article>
    );
  }

  return (
    <Card
      as="article"
      className={cn(
        "group p-0 transition-colors hover:border-accent/40",
        className,
      )}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block rounded-lg p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-lg font-semibold text-primary transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <span className="shrink-0 font-mono text-xs text-muted">{project.year}</span>
          </div>
          <p className="text-sm leading-relaxed text-secondary">{project.tagline}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </div>
      </Link>
    </Card>
  );
}
