import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ArticleCard } from "@/components/content/ArticleCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { getLatestPosts } from "@/lib/mdx";

export function LatestPosts() {
  const posts = getLatestPosts(3);

  if (posts.length === 0) return null;

  return (
    <Container variant="wide" className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                / 02 — writing
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Latest <span className="text-gradient-accent">notes</span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="group hidden shrink-0 items-center gap-1.5 font-mono text-xs text-secondary transition-colors hover:text-accent sm:inline-flex"
            >
              All posts
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {posts.map((post, index) => (
            <FadeIn key={post.slug} delay={index * 0.06}>
              <ArticleCard post={post} className="h-full" />
            </FadeIn>
          ))}
        </div>
      </div>
    </Container>
  );
}
