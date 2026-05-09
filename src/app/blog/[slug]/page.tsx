import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { MDXContent } from "@/components/content/MDXContent";
import { TableOfContents, type TocSection } from "@/components/content/TableOfContents";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { extractToc, getAllPosts, getPostBySlug } from "@/lib/mdx";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aldirifai.com";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const ogImage = `/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.excerpt)}`;
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${siteUrl}/blog/${slug}`,
      publishedTime: post.date,
      tags: post.tags,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const newer = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const older =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : null;

  const toc = extractToc(post.body);
  const tocSections: TocSection[] = toc
    .filter((entry) => entry.level === 2)
    .map((entry) => ({ id: entry.id, label: entry.label }));

  return (
    <Container variant="wide" className="py-12 sm:py-16">
      <ArticleSchema post={post} />
      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
        <article className="min-w-0">
          <header className="mb-12 space-y-3">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {formatDate(post.date)}
              {post.readingTime ? ` · ${post.readingTime}` : ""}
              {post.draft ? " · DRAFT" : ""}
            </p>
            <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
              {post.title}
            </h1>
            <p className="text-balance text-lg leading-relaxed text-secondary">
              {post.excerpt}
            </p>
          </header>

          <div className="space-y-1">
            <MDXContent source={post.body} />
          </div>

          <nav
            aria-label="Post navigation"
            className="mt-16 flex flex-col gap-6 border-t border-border pt-6 sm:flex-row sm:items-start sm:justify-between"
          >
            {newer ? (
              <Link
                href={`/blog/${newer.slug}`}
                className="group flex flex-col gap-1 text-sm sm:max-w-[45%]"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  ← Newer
                </span>
                <span className="text-secondary transition-colors group-hover:text-primary">
                  {newer.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden />
            )}
            {older ? (
              <Link
                href={`/blog/${older.slug}`}
                className="group flex flex-col gap-1 text-sm sm:max-w-[45%] sm:items-end sm:text-right"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  Older →
                </span>
                <span className="text-secondary transition-colors group-hover:text-primary">
                  {older.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden />
            )}
          </nav>
        </article>

        <aside className="mt-12 lg:mt-0">
          <div className="flex flex-col gap-8 lg:sticky lg:top-24">
            {tocSections.length > 0 ? (
              <TableOfContents sections={tocSections} />
            ) : null}
          </div>
        </aside>
      </div>
    </Container>
  );
}
