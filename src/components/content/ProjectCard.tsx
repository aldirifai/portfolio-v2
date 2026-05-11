import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/project";

type ProjectCardSize = "large" | "default" | "compact";

type ProjectCardProps = {
  project: Project;
  size?: ProjectCardSize;
  className?: string;
};

const STATUS_LABEL: Record<NonNullable<Project["status"]>, string> = {
  "in-progress": "In progress",
  shipped: "Shipped",
  live: "Live",
  "architecture-phase": "Architecture",
  archived: "Archived",
};

const STATUS_DOT_CLASS: Record<NonNullable<Project["status"]>, string> = {
  "in-progress": "bg-amber-400",
  shipped: "bg-emerald-400",
  live: "bg-emerald-400",
  "architecture-phase": "bg-sky-400",
  archived: "bg-zinc-400",
};

export function ProjectCard({
  project,
  size = "default",
  className,
}: ProjectCardProps) {
  const isLarge = size === "large";
  const isCompact = size === "compact";
  const statusKey = project.status;

  return (
    <article
      className={cn(
        "group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated/50 backdrop-blur-md transition-all duration-300",
        "hover:border-border-strong hover:bg-bg-elevated/70 hover:-translate-y-0.5",
        "hover:shadow-[0_24px_48px_-24px_var(--accent-glow)]",
        isLarge ? "p-7 sm:p-8" : isCompact ? "p-5" : "p-6",
        className,
      )}
    >
      {/* gradient accent overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(80% 80% at 100% 0%, var(--accent-soft) 0%, transparent 50%)",
        }}
      />

      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        aria-label={`View case study: ${project.title}`}
      />

      <div className="relative z-[5] flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            {statusKey && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2 py-0.5 backdrop-blur-md">
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    STATUS_DOT_CLASS[statusKey],
                  )}
                />
                <span className="font-mono text-[10px] uppercase tracking-wider text-secondary">
                  {STATUS_LABEL[statusKey]}
                </span>
              </span>
            )}
          </div>
          <span className="font-mono text-[11px] tracking-tight text-muted">
            {project.year}
          </span>
        </div>

        <h3
          className={cn(
            "mt-4 font-semibold tracking-tight text-primary transition-colors group-hover:text-accent",
            isLarge
              ? "text-3xl sm:text-4xl"
              : isCompact
                ? "text-base"
                : "text-xl",
          )}
        >
          {project.title}
        </h3>

        <p
          className={cn(
            "mt-2 leading-relaxed text-secondary",
            isLarge ? "text-base sm:text-lg" : isCompact ? "text-xs" : "text-sm",
          )}
        >
          {isCompact && project.tagline.length > 90
            ? `${project.tagline.slice(0, 90)}…`
            : project.tagline}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap gap-1.5">
            {project.stack
              .slice(0, isLarge ? 8 : isCompact ? 3 : 5)
              .map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            {project.stack.length > (isLarge ? 8 : isCompact ? 3 : 5) && (
              <Badge variant="outline">
                +{project.stack.length - (isLarge ? 8 : isCompact ? 3 : 5)}
              </Badge>
            )}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors group-hover:text-accent">
              Read case study
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            <div className="relative z-20 flex items-center gap-1">
              {project.links?.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-primary"
                  aria-label={`${project.title} repo`}
                >
                  <Github className="size-3.5" />
                </a>
              )}
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-primary"
                  aria-label={`${project.title} demo`}
                >
                  <ExternalLink className="size-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
