import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Github } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MDXContent } from "@/components/content/MDXContent";
import { TableOfContents, type TocSection } from "@/components/content/TableOfContents";
import { extractToc, getAllProjects, getProjectBySlug } from "@/lib/mdx";
import type { ProjectStatus } from "@/types/project";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aldirifai.com";

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
  const hasLinks = Boolean(links?.repo || links?.demo);

  const toc = extractToc(project.body);
  const tocSections: TocSection[] = toc
    .filter((entry) => entry.level === 2)
    .map((entry) => ({ id: entry.id, label: entry.label }));

  return (
    <Container variant="wide" className="py-12 sm:py-16">
      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
        <article className="min-w-0">
          <header className="mb-12 space-y-3">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {project.year}
              {project.status ? ` · ${formatStatus(project.status)}` : ""}
            </p>
            <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
              {project.title}
            </h1>
            <p className="text-balance text-lg leading-relaxed text-secondary">
              {project.tagline}
            </p>
          </header>

          <div>
            <MDXContent source={project.body} />
          </div>

          <div className="mt-12 border-t border-border pt-6">
            <Link
              href="/projects"
              className="text-sm text-secondary transition-colors hover:text-primary"
            >
              ← All projects
            </Link>
          </div>
        </article>

        <aside className="mt-12 lg:mt-0">
          <div className="flex flex-col gap-8 lg:sticky lg:top-24">
            <SidebarBlock label="Year">
              <p className="text-sm text-primary">{project.year}</p>
            </SidebarBlock>
            {project.status ? (
              <SidebarBlock label="Status">
                <p className="text-sm text-primary">{formatStatus(project.status)}</p>
              </SidebarBlock>
            ) : null}
            {project.role ? (
              <SidebarBlock label="Role">
                <p className="text-sm text-primary">{project.role}</p>
              </SidebarBlock>
            ) : null}
            <SidebarBlock label="Stack">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </SidebarBlock>
            {hasLinks ? (
              <SidebarBlock label="Links">
                <div className="flex flex-col gap-2">
                  {links?.repo ? (
                    <Button href={links.repo} variant="link">
                      <Github size={16} /> Repository
                    </Button>
                  ) : null}
                  {links?.demo ? (
                    <Button href={links.demo} variant="link">
                      <ExternalLink size={16} /> Live demo
                    </Button>
                  ) : null}
                </div>
              </SidebarBlock>
            ) : null}
            {tocSections.length > 0 ? (
              <TableOfContents sections={tocSections} />
            ) : null}
          </div>
        </aside>
      </div>
    </Container>
  );
}

function SidebarBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">{label}</p>
      {children}
    </div>
  );
}
