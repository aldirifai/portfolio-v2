import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import { ProjectFrontmatterSchema } from "@/lib/schemas/project";
import { PostFrontmatterSchema } from "@/lib/schemas/post";
import type { Project } from "@/types/project";
import type { Post } from "@/types/post";

const CONTENT_DIR = path.join(process.cwd(), "content");
const POSTS_DIR = path.join(CONTENT_DIR, "posts");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");

const isProduction = () => process.env.NODE_ENV === "production";

export type PostWithBody = Post & { body: string };
export type ProjectWithBody = Project & { body: string };

export type TocEntry = {
  id: string;
  label: string;
  level: 2 | 3;
};

type RawFile = {
  frontmatter: Record<string, unknown>;
  body: string;
};

function readMdxFile(dir: string, slug: string): RawFile | null {
  const filePath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data, body: content };
}

function listSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

// --- Posts -----------------------------------------------------------------

function loadPost(slug: string, file: RawFile): PostWithBody {
  const parsed = PostFrontmatterSchema.safeParse(file.frontmatter);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/posts/${slug}.mdx — ${parsed.error.issues
        .map((i) => `${i.path.join(".") || "<root>"}: ${i.message}`)
        .join("; ")}`,
    );
  }
  const stats = readingTime(file.body);
  return {
    slug,
    title: parsed.data.title,
    excerpt: parsed.data.description,
    date: parsed.data.date,
    readingTime: stats.text,
    tags: parsed.data.tags,
    draft: parsed.data.draft,
    body: file.body,
  };
}

export function getAllPosts(): Post[] {
  const slugs = listSlugs(POSTS_DIR);
  const posts: Post[] = [];
  for (const slug of slugs) {
    const file = readMdxFile(POSTS_DIR, slug);
    if (!file) continue;
    const post = loadPost(slug, file);
    if (isProduction() && post.draft) continue;
    // Don't expose body in list
    const { body: _body, ...listShape } = post;
    void _body;
    posts.push(listShape);
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): PostWithBody | null {
  const file = readMdxFile(POSTS_DIR, slug);
  if (!file) return null;
  const post = loadPost(slug, file);
  if (isProduction() && post.draft) return null;
  return post;
}

export function getLatestPosts(limit: number): Post[] {
  return getAllPosts().slice(0, limit);
}

// --- Projects --------------------------------------------------------------

function loadProject(slug: string, file: RawFile): ProjectWithBody {
  const parsed = ProjectFrontmatterSchema.safeParse(file.frontmatter);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/projects/${slug}.mdx — ${parsed.error.issues
        .map((i) => `${i.path.join(".") || "<root>"}: ${i.message}`)
        .join("; ")}`,
    );
  }
  return {
    slug,
    ...parsed.data,
    body: file.body,
  };
}

export function getAllProjects(): Project[] {
  const slugs = listSlugs(PROJECTS_DIR);
  const projects: Project[] = [];
  for (const slug of slugs) {
    const file = readMdxFile(PROJECTS_DIR, slug);
    if (!file) continue;
    const project = loadProject(slug, file);
    const { body: _body, ...listShape } = project;
    void _body;
    projects.push(listShape);
  }
  return projects;
}

export function getProjectBySlug(slug: string): ProjectWithBody | null {
  const file = readMdxFile(PROJECTS_DIR, slug);
  if (!file) return null;
  return loadProject(slug, file);
}

export function getFeaturedProjects(limit?: number): Project[] {
  const featured = getAllProjects().filter((p) => p.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

// --- TOC -------------------------------------------------------------------

export function extractToc(content: string): TocEntry[] {
  const lines = content.split("\n");
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let inCodeFence = false;
  for (const line of lines) {
    if (/^```/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const level = match[1].length === 2 ? 2 : 3;
    const label = match[2].replace(/[*_`]/g, "").trim();
    if (!label) continue;
    const id = slugger.slug(label);
    entries.push({ id, label, level });
  }
  return entries;
}
