import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Aurora } from "@/components/ui/Aurora";
import { MDXContent } from "@/components/content/MDXContent";
import {
  TableOfContents,
  type TocSection,
} from "@/components/content/TableOfContents";
import { ProjectSchema } from "@/components/seo/ProjectSchema";
import { extractToc, getAllProjects, getProjectBySlug } from "@/lib/mdx";
import type { ProjectStatus } from "@/types/project";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aldirifai.com";

const STATUS_DOT_CLASS: Record<ProjectStatus, string> = {
  "in-progress": "bg-amber-400",
  shipped: "bg-emerald-400",
  live: "bg-emerald-400",
  "architecture-phase": "bg-sky-400",
  archived: "bg-zinc-400",
};

function formatStatus(status: ProjectStatus): string {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const ogImage =
    project.coverImage ??
    `/api/og?title=${encodeURIComponent(project.title)}&subtitle=${encodeURIComponent(project.tagline)}`;

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      type: "article",
      url: `${siteUrl}/projects/${slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.tagline,
      images: [ogImage],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { links } = project;

  const toc = extractToc(project.body);
  const tocSections: TocSection[] = toc
    .filter((entry) => entry.level === 2)
    .map((entry) => ({ id: entry.id, label: entry.label }));

  return (
    <div className="relative">
      <Aurora className="opacity-40" />
      <Container variant="wide" className="relative z-10 py-12 sm:py-16">
        <ProjectSchema project={project} />

        <Link
          href="/projects"
          className="group inline-flex items-center gap-1.5 font-mono text-xs text-secondary transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          All projects
        </Link>

        <header className="mt-8 mb-12">
          <div className="flex flex-wrap items-center gap-2">
            {project.status && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 backdrop-blur-md">
                <span
                  className={`size-1.5 rounded-full ${STATUS_DOT_CLASS[project.status]}`}
                />
                <span className="font-mono text-[10px] uppercase tracking-wider text-secondary">
                  {formatStatus(project.status)}
                </span>
              </span>
            )}
            <span className="font-mono text-[11px] tracking-tight text-muted">
              {project.year}
            </span>
            {project.role && (
              <>
                <span className="text-muted" aria-hidden>
                  ·
                </span>
                <span className="font-mono text-[11px] tracking-tight text-muted">
                  {project.role}
                </span>
              </>
            )}
          </div>

          <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
            <span className="text-gradient-accent">{project.title}</span>
          </h1>
          <p className="mt-5 max-w-3xl text-balance text-lg leading-relaxed text-secondary">
            {project.tagline}
          </p>

          {(links?.repo || links?.demo) && (
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {links?.repo && (
                <a
                  href={links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass inline-flex h-9 items-center gap-2 rounded-full px-4 text-xs font-medium transition-colors hover:border-border-strong hover:text-accent"
                >
                  <Github className="size-3.5" />
                  Repository
                  <ExternalLink className="size-3" />
                </a>
              )}
              {links?.demo && (
                <a
                  href={links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-full bg-accent px-4 text-xs font-medium text-accent-fg shadow-[0_0_0_1px_var(--accent),0_8px_24px_-12px_var(--accent-glow)] transition-all hover:-translate-y-0.5"
                >
                  Live demo
                  <ExternalLink className="size-3" />
                </a>
              )}
            </div>
          )}
        </header>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
          <article className="min-w-0 max-w-3xl">
            <MDXContent source={project.body} />
          </article>

          <aside className="mt-12 lg:mt-0">
            <div className="flex flex-col gap-6 lg:sticky lg:top-24">
              <div className="glass rounded-2xl p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  Stack
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>

              {tocSections.length > 0 && (
                <div className="glass rounded-2xl p-5">
                  <TableOfContents sections={tocSections} />
                </div>
              )}
            </div>
          </aside>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 font-mono text-xs text-secondary transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            All projects
          </Link>
        </div>
      </Container>
    </div>
  );
}
