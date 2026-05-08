import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ArticleCard } from "@/components/content/ArticleCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { getLatestPosts } from "@/lib/data/posts";

export function LatestPosts() {
  const posts = getLatestPosts(3);

  return (
    <Container variant="content" className="py-12 sm:py-16">
      <section>
        <FadeIn>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Latest writing</h2>
            <Link href="/blog" className="text-sm text-secondary transition-colors hover:text-primary">All posts →</Link>
          </div>
        </FadeIn>
        <div className="flex flex-col gap-6">
          {posts.map((post, index) => (
            <FadeIn key={post.slug} delay={index * 0.08}>
              <ArticleCard post={post} />
            </FadeIn>
          ))}
        </div>
      </section>
    </Container>
  );
}
