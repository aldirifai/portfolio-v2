import { SITE_URL } from "@/lib/env";
import { PERSON_SCHEMA_ID } from "@/components/seo/PersonSchema";
import type { Post } from "@/types/post";

type ArticleSchemaProps = {
  post: Post;
};

export function ArticleSchema({ post }: ArticleSchemaProps) {
  const url = `${SITE_URL}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    articleBody: post.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@id": PERSON_SCHEMA_ID },
    ...(post.tags && post.tags.length > 0 ? { keywords: post.tags } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
