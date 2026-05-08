import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ArticleCard } from "@/components/content/ArticleCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on backend systems, Laravel patterns, FastAPI architecture, and the occasional rabbit hole — written between client work and personal builds.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container variant="content" className="py-12 sm:py-16">
      <FadeIn>
        <header className="mb-12">
          <p className="font-mono text-xs text-secondary">writing</p>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Notes from the build.
          </h1>
          <p className="mt-6 text-balance text-lg leading-relaxed text-secondary">
            Mostly backend — Laravel, FastAPI, Go, Rust — and the occasional
            opinionated tangent on tooling.
          </p>
        </header>
      </FadeIn>

      {posts.length === 0 ? (
        <FadeIn>
          <p className="text-secondary">No posts yet. Check back soon.</p>
        </FadeIn>
      ) : (
        <ol className="flex flex-col gap-8">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <FadeIn delay={index * 0.08}>
                <ArticleCard post={post} />
              </FadeIn>
            </li>
          ))}
        </ol>
      )}
    </Container>
  );
}
