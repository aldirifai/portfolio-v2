import type { Post } from "@/types/post";

export const posts: Post[] = [
  {
    slug: "building-an-ai-finance-tracker",
    title: "Building an AI finance tracker with FastAPI and Telegram bots",
    excerpt:
      "Why I'm building Fintrack as a Telegram-first AI agent instead of yet another finance dashboard, and how the FastAPI backend orchestrates OpenRouter, MinIO receipts, and PostgreSQL transactions behind a single chat interface.",
    date: "2026-04-12",
    readingTime: "6 min read",
    tags: ["AI", "FastAPI", "Telegram"],
  },
  {
    slug: "designing-a-zero-knowledge-password-manager",
    title: "Designing a zero-knowledge password manager: Argon2id and AES-GCM in production",
    excerpt:
      "Notes from the architecture phase of my Go + Rust password manager — how I'm reasoning about Argon2id parameters, AES-256-GCM nonce hygiene, and the trust boundary between client-side Rust crypto and a Go SaaS backend that should never see plaintext.",
    date: "2026-03-28",
    readingTime: "9 min read",
    tags: ["Security", "Go", "Rust"],
  },
  {
    slug: "five-years-of-laravel",
    title: "Five years of Laravel: patterns I keep coming back to",
    excerpt:
      "After five years of shipping Laravel in production across fintech, education, and operational tooling, these are the patterns I now reach for by default — service classes, action-oriented controllers, query objects, and what I deliberately avoid.",
    date: "2026-02-14",
    readingTime: "8 min read",
    tags: ["Laravel", "PHP", "Patterns"],
  },
];

export function getLatestPosts(limit: number): Post[] {
  return [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
