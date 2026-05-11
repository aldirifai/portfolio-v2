import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Aurora } from "@/components/ui/Aurora";
import { MDXContent } from "@/components/content/MDXContent";
import {
  TableOfContents,
  type TocSection,
} from "@/components/content/TableOfContents";
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

export default async function BlogPostPage({ params }: { params: Params }) {
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
    <div className="relative">
      <Aurora className="opacity-40" />
      <Container variant="wide" className="relative z-10 py-12 sm:py-16">
        <ArticleSchema post={post} />

        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 font-mono text-xs text-secondary transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          All posts
        </Link>

        <header className="mt-8 mb-12">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            {formatDate(post.date)}
            {post.readingTime ? ` · ${post.readingTime}` : ""}
            {post.draft ? " · DRAFT" : ""}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-balance text-lg leading-relaxed text-secondary">
            {post.excerpt}
          </p>
        </header>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
          <article className="min-w-0 max-w-3xl">
            <MDXContent source={post.body} />

            <nav
              aria-label="Post navigation"
              className="mt-16 grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
            >
              {newer ? (
                <Link
                  href={`/blog/${newer.slug}`}
                  className="group glass rounded-2xl p-5 transition-all hover:border-border-strong"
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    <ArrowLeft className="size-3" />
                    Newer
                  </span>
                  <p className="mt-2 text-sm text-secondary transition-colors group-hover:text-accent">
                    {newer.title}
                  </p>
                </Link>
              ) : (
                <span aria-hidden />
              )}
              {older ? (
                <Link
                  href={`/blog/${older.slug}`}
                  className="group glass rounded-2xl p-5 transition-all hover:border-border-strong sm:text-right"
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    Older
                    <ArrowRight className="size-3" />
                  </span>
                  <p className="mt-2 text-sm text-secondary transition-colors group-hover:text-accent">
                    {older.title}
                  </p>
                </Link>
              ) : (
                <span aria-hidden />
              )}
            </nav>
          </article>

          <aside className="mt-12 lg:mt-0">
            {tocSections.length > 0 && (
              <div className="lg:sticky lg:top-24">
                <div className="glass rounded-2xl p-5">
                  <TableOfContents sections={tocSections} />
                </div>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </div>
  );
}
