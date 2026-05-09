import { SITE_URL } from "@/lib/env";
import { PERSON_SCHEMA_ID } from "@/components/seo/PersonSchema";
import type { Project } from "@/types/project";

type ProjectSchemaProps = {
  project: Project;
};

export function ProjectSchema({ project }: ProjectSchemaProps) {
  const url = `${SITE_URL}/projects/${project.slug}`;
  const dateCreated = project.year.split(/[–-]/)[0]?.trim() ?? project.year;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.tagline,
    url,
    dateCreated,
    programmingLanguage: project.stack,
    author: { "@id": PERSON_SCHEMA_ID },
    ...(project.links?.repo
      ? { codeRepository: project.links.repo }
      : {}),
    ...(project.links?.demo
      ? { sameAs: [project.links.demo] }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
