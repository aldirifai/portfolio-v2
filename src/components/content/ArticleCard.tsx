import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Post } from "@/types/post";

type ArticleCardProps = {
  post: Post;
  className?: string;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ArticleCard({ post, className }: ArticleCardProps) {
  return (
    <article className={cn("group", className)}>
      <Link
        href={`/blog/${post.slug}`}
        className="block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-base font-semibold text-primary transition-colors group-hover:text-accent">
              {post.title}
            </h3>
            <time
              className="shrink-0 font-mono text-xs text-muted"
              dateTime={post.date}
            >
              {formatDate(post.date)}
            </time>
          </div>
          <p className="text-sm leading-relaxed text-secondary">{post.excerpt}</p>
          {post.readingTime ? (
            <p className="font-mono text-xs text-muted">{post.readingTime}</p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
