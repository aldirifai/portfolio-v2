import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ArticleCard } from "@/components/content/ArticleCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { Aurora } from "@/components/ui/Aurora";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on backend systems, Laravel patterns, FastAPI architecture, and the occasional rabbit hole — written between client work and personal builds.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="relative">
      <Aurora className="opacity-50" />
      <Container variant="wide" className="relative z-10 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <header className="mb-12">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                / writing
              </p>
              <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
                <span className="text-gradient">Notes from the</span>{" "}
                <span className="text-gradient-accent">build.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-secondary">
                Mostly backend — Laravel, FastAPI, Next.js, and the occasional
                opinionated tangent on tooling and Indonesian SaaS.
              </p>
            </header>
          </FadeIn>

          {posts.length === 0 ? (
            <FadeIn>
              <div className="glass rounded-2xl p-8 text-center">
                <p className="text-secondary">
                  No posts yet — drafting some now. Check back soon.
                </p>
              </div>
            </FadeIn>
          ) : (
            <ol className="flex flex-col gap-4">
              {posts.map((post, index) => (
                <li key={post.slug}>
                  <FadeIn delay={index * 0.06}>
                    <ArticleCard post={post} />
                  </FadeIn>
                </li>
              ))}
            </ol>
          )}
        </div>
      </Container>
    </div>
  );
}
