import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
    <article
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl border border-border bg-bg-elevated/40 p-6 backdrop-blur-md transition-all duration-300",
        "hover:border-border-strong hover:bg-bg-elevated/60 hover:-translate-y-0.5",
        "hover:shadow-[0_24px_48px_-24px_var(--accent-glow)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(80% 80% at 0% 0%, var(--accent-soft) 0%, transparent 60%)",
        }}
      />
      <Link
        href={`/blog/${post.slug}`}
        className="relative z-10 block focus-visible:outline-none"
      >
        <div className="flex items-center justify-between gap-3">
          <time
            className="font-mono text-[11px] tracking-tight text-muted"
            dateTime={post.date}
          >
            {formatDate(post.date)}
          </time>
          {post.readingTime && (
            <span className="font-mono text-[11px] tracking-tight text-muted">
              {post.readingTime}
            </span>
          )}
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-primary transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-secondary">
          {post.excerpt}
        </p>
        <div className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors group-hover:text-accent">
          Read post
          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </Link>
    </article>
  );
}
