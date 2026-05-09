# Portfolio Blueprint — aldirifai.com

> Living spec for rebuilding the portfolio from scratch.
> Stack: **Next.js 15 (App Router) + TypeScript + Tailwind v3 + MDX**, self-hosted on VPS (Docker + Nginx + Let's Encrypt).
> Owner: Muhamad Aldi Rifai · Last updated: 2026-05

---

## 1. Positioning

**Target audience:** International / remote recruiters, technical hiring managers, potential clients evaluating a senior engineer.

**One-line positioning:**
> Senior backend engineer (Laravel) with 5+ years of production experience, expanding into Python (FastAPI), Go, and Rust. Indonesia-based, ready for global remote roles.

**What this portfolio must communicate in 30 seconds:**
1. Senior level — 5+ years, multiple companies, real production systems
2. Polyglot stack — Laravel core + Python / Go / Rust for newer work
3. Builder mindset — multiple personal projects with real depth (Fintrack, Password Manager, TIPAK)
4. Available for remote work

**Anti-goals:**
- ❌ Looking junior or like a bootcamp grad
- ❌ Generic AI-template aesthetic (gradient hero with floating particles)
- ❌ Over-designed — a recruiter wants substance, not a portfolio that screams "look at me"
- ❌ Using a profile photo (per your request — design accommodates this)

---

## 2. Tech Stack

| Concern | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Already using in Fintrack; SSR/SSG flexibility; RSC; runs as Node server on VPS via standalone build |
| Language | **TypeScript** | Type safety, already in your stack |
| Styling | **Tailwind CSS v3** | Industry standard, drop Windi |
| Content | **MDX** via `@next/mdx` | Blog + project case studies in one system |
| Animation | **Framer Motion** | Subtle entrance only — no parallax theatrics |
| Forms | **react-hook-form + Zod** | Validated contact form |
| Email | **Resend** | Simple API, generous free tier |
| Icons | **lucide-react + simple-icons** | UI icons + tech logos |
| Code highlighting | **rehype-pretty-code** (Shiki) | Best-in-class, zero-runtime |
| Theme | **next-themes** | Dark default, light supported |
| Analytics | **Umami** (self-hosted, optional) | Privacy-friendly, deploy on same VPS; skip for MVP if not ready |
| Hosting | **Self-hosted VPS** (IDCloudHost) | Docker + Nginx + Let's Encrypt; consistent with Inastex/Fintrack stack |
| Domain | aldirifai.com (existing) | A record → VPS IP |
| CI/CD | **GitHub Actions** | Build & deploy on push to `main` |

### Initial install commands

```bash
pnpm create next-app@latest portfolio-v2 --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd portfolio-v2

pnpm add framer-motion lucide-react react-hook-form zod resend next-themes
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
pnpm add rehype-pretty-code shiki rehype-slug rehype-autolink-headings remark-gfm
pnpm add reading-time gray-matter
pnpm add -D prettier prettier-plugin-tailwindcss
```

---

## 3. Site Architecture

```
src/app/
├── layout.tsx              # Root layout, fonts, theme provider, analytics
├── page.tsx                # Home: hero, featured projects, latest posts
├── about/page.tsx          # Bio, timeline, skills
├── projects/
│   ├── page.tsx            # All projects grid
│   └── [slug]/page.tsx     # MDX case study
├── blog/
│   ├── page.tsx            # Articles list
│   └── [slug]/page.tsx     # MDX article
├── uses/page.tsx           # Tools, hardware, software
├── now/page.tsx            # What I'm working on
├── contact/page.tsx        # Contact form
├── api/
│   ├── contact/route.ts    # Resend integration
│   └── og/route.tsx        # Dynamic OG image
├── sitemap.ts              # Auto-generated
├── robots.ts               # Auto-generated
└── feed.xml/route.ts       # RSS

content/
├── projects/
│   ├── fintrack.mdx
│   ├── password-manager-saas.mdx
│   ├── tipak.mdx
│   ├── mt5-trading-bot.mdx
│   └── inastex.mdx
└── posts/
    └── hello.mdx
```

---

## 4. Design System

**Aesthetic:** Minimalist typography (leerob.io reference). Content-first, no profile photo, scannable in 30 seconds. One warm accent color so it doesn't feel sterile.

### Colors (CSS variables in `globals.css`)

```css
:root {
  --bg: #ffffff;
  --bg-elevated: #fafafa;
  --border: #e4e4e7;
  --text-primary: #0a0a0a;
  --text-secondary: #52525b;
  --text-muted: #71717a;
  --accent: #d97706;
  --accent-fg: #ffffff;
}

.dark {
  --bg: #0a0a0a;
  --bg-elevated: #111111;
  --border: #262626;
  --text-primary: #fafafa;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;
  --accent: #f59e0b;
  --accent-fg: #0a0a0a;
}
```

### Typography

- **Display & body:** Geist Sans (free, via `next/font`)
- **Mono:** Geist Mono (for code, metadata lines, tech badges)
- **Scale:** Tailwind defaults; use `text-balance` on headings
- **Tracking:** `tracking-tight` on display sizes

### Layout

- Content max-width: `max-w-2xl` (672px) — leerob's exact width
- Wide max-width (project grids): `max-w-4xl` (896px)
- Vertical rhythm: `space-y-16` between major sections
- Single column, no sidebars

### Replacing the missing photo

Hero anchors visually on:
1. Large display name (`text-4xl md:text-5xl font-bold tracking-tight`)
2. Monospace "metadata" line above name
3. Subtle CSS-only gradient blob top-right (no JS, no image)

Example hero composition:

```tsx
<section className="space-y-6">
  <p className="font-mono text-xs text-secondary">
    aldi.rifai — senior backend engineer — gresik, id
  </p>
  <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
    Hi, I'm Aldi.
  </h1>
  <p className="text-lg text-secondary text-balance leading-relaxed">
    I'm a senior backend engineer with 5+ years building production
    systems in Laravel. Currently exploring Python, Go, and Rust —
    open to remote opportunities worldwide.
  </p>
  <div className="flex flex-wrap gap-3 pt-2">
    <Button href="/contact">Get in touch</Button>
    <Button href="/cv.pdf" variant="ghost">Download CV</Button>
  </div>
</section>
```

---

## 5. Page Content (Drafted from CV)

### Home (`/`)

**Hero:** as in section 4.

**Featured projects (3):** Fintrack, Password Manager SaaS, TIPAK.

**Latest writing (3):** auto-pulled from `content/posts/`.

**Currently building (small section above footer):**
> Working on **Fintrack** — a personal AI agent for finance tracking with Telegram input and FastAPI backend. Next up: a zero-knowledge password manager built in Go and Rust.

### About (`/about`)

**Opening paragraph:**
> I'm Muhamad Aldi Rifai, a senior backend engineer based in Gresik, East Java, Indonesia. Over the past 5 years I've built and maintained production systems across fintech, education, and operational tooling — most of them on Laravel + MySQL + production VPS deployments. Lately I've been investing heavily in expanding my stack: FastAPI for AI-integrated backends, Go for high-throughput services, and Rust for cryptographic correctness in a password manager I'm building. I work primarily through Claude Code, which lets me ship more in less time as a solo builder.

**Career timeline (from CV):**

```
Backend Developer @ PT Layana Computindo Sentratama
Jan 2023 – Present · Full-time
  · Built and maintained Laravel REST APIs for web + mobile platforms
  · Integrated payment gateways for digital transactions
  · Implemented OTP-based authentication and social login
  · Supported high-availability production systems
  · Collaborated with frontend and mobile teams to deliver backend features

Fullstack Developer (Freelance) @ PT Natindo Sejahtera Indonesia
Jul 2022 – Present · Long-term contract
  · Built end-to-end internal business systems
  · Database design through frontend implementation
  · Translated business requirements into scalable technical solutions
  · Long-term system support, enhancements, and optimization

Backend Developer (Freelance) @ Kurva Media Teknologi
Aug 2019 – Sep 2022 · Contract
  · Built academic, occupational safety, and attendance systems
  · Laravel + Lumen for various clients
  · Implemented custom business logic and API services
  · Maintenance, optimization, and issue resolution

Technology Development Engineer @ Universitas Muhammadiyah Gresik
Aug 2019 – Aug 2021 · Full-time
  · Developed and managed institutional web applications
  · Education, research, and public service systems
  · Gathered user requirements and delivered technical solutions
```

**Skills (categorized chips):**

- **Backend:** PHP, Laravel, Lumen, Python, FastAPI, Go (learning), Rust (learning)
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Bootstrap
- **Databases:** PostgreSQL, MySQL, Redis, relational design
- **Infrastructure:** Docker, AWS, IDCloudHost VPS, Nginx, cPanel
- **Auth & Security:** OTP authentication, social login, JWT, Argon2id, AES-256-GCM
- **Integrations:** Payment gateways, third-party APIs, Telegram Bot API, OpenRouter
- **Tools:** Postman, Swagger/OpenAPI, Git, Claude Code, Jira, ClickUp

**Beyond work:**
> Outside of client work, I'm fascinated by financial systems and trading — I built an MT5 algorithmic trading bot for Gold and BTC, and a lot of my personal projects circle around finance and AI agents. My approach to new ideas is *amati, tiru, modifikasi* — observe, learn, then modify into something my own.

### Projects (`/projects`)

Grid of cards. Each card shows: title, 1-line tagline, tech stack chips, link to case study.

**Project entries:**

#### 1. Fintrack
- **Tagline:** Personal AI-powered finance tracker with Telegram input
- **Stack:** FastAPI · Next.js PWA · PostgreSQL 16 · Redis · MinIO · Telegram Bot · OpenRouter
- **Status:** In development
- **Year:** 2025–2026
- **Featured:** ✅

#### 2. Password Manager SaaS
- **Tagline:** Zero-knowledge password manager (1Password-inspired)
- **Stack:** Go · Rust · Tauri v2 · Argon2id · AES-256-GCM · WASM/FFI
- **Status:** Architecture phase
- **Year:** 2026
- **Featured:** ✅

#### 3. TIPAK
- **Tagline:** Agricultural land management platform connecting farmers, inspectors, and regional coordinators
- **Stack:** Laravel · MySQL · Real-time monitoring dashboard
- **Roles:** Petani / Penilik / Koordinator Wilayah
- **Featured:** ✅

#### 4. MT5 Trading Bot
- **Tagline:** Algorithmic scalping bot for XAUUSD & BTCUSD with EMA + ICT liquidity sweeps
- **Stack:** Python · MetaTrader 5 · Streamlit · Telegram

#### 5. Inastex API Stack
- **Tagline:** Containerized FastAPI platform with Postgres, Redis, and external admin access
- **Stack:** FastAPI · Nginx · PostgreSQL 15 · Redis · pgAdmin · Docker

#### 6. Laravel Asset Management System
- **Tagline:** Internal asset tracking with depreciation scheduling and journal entry generation
- **Stack:** Laravel · MySQL · DataTables (server-side) · Select2

### Project case study template

Each MDX file uses this frontmatter (validated by Zod at build time —
invalid frontmatter throws and fails the build loud):

```yaml
---
title: Fintrack
tagline: Personal AI-powered finance tracker
stack: [FastAPI, Next.js, PostgreSQL, Redis, MinIO, Telegram, OpenRouter]
year: "2025–2026"
status: in-progress
role: Solo builder
featured: true
coverImage: /projects/fintrack/cover.png
links:
  repo: https://github.com/aldirifai/fintrack
  demo: https://fintrack.aldirifai.com
---
```

The case study itself lives in the MDX **body**. Five canonical h2 sections
(rehype-slug auto-assigns ids, TableOfContents auto-extracts):

1. `## Problem` — what gap does this fill (1 paragraph)
2. `## Architecture` — diagram (mermaid or simple ASCII) + flow description
3. `## Key decisions` — 3-5 bullets, each with rationale
4. `## Stack rationale` — why these choices vs alternatives
5. `## What I learned` — honest reflection

Repo and demo `links` render in the case study sidebar; project pages
without a body (just `<ComingSoon />`) hide the TOC automatically.

### Blog (`/blog`)

First few post ideas (write progressively, no rush):
- "Building an AI finance tracker with FastAPI and Telegram bots"
- "Designing a zero-knowledge password manager: Argon2id and AES-GCM in production"
- "Five years of Laravel: patterns I keep coming back to"
- "From Indonesia to remote-first: how I'm preparing for global roles"
- "My Claude Code workflow as a solo builder"
- "Docker networking gotchas: when external Postgres access doesn't work"

### `/uses`

Hardware, editor (Claude Code as primary), browser, hosting providers (IDCloudHost VPS), monitoring, daily-driver languages.

### `/now`

What you're currently building / learning / reading. Update every 1–2 months.

### `/contact`

- Form (name, email, message) with react-hook-form + Zod validation
- Direct email link as fallback
- Optional: Cal.com embed for scheduling

---

## 6. Component Inventory

```
src/components/
├── theme-provider.tsx       # next-themes wrapper (client)
├── layout/
│   ├── Header.tsx           # Logo + nav + theme toggle
│   ├── Footer.tsx           # Social links + © year
│   └── Container.tsx        # max-w wrapper variants
├── ui/
│   ├── Button.tsx           # variant: primary | ghost | link
│   ├── Badge.tsx            # tech stack chips
│   ├── Card.tsx
│   ├── FadeIn.tsx           # framer-motion fade-up-on-scroll wrapper
│   └── ThemeToggle.tsx
├── sections/
│   ├── Hero.tsx
│   ├── FeaturedProjects.tsx
│   ├── LatestPosts.tsx
│   ├── ExperienceTimeline.tsx
│   ├── SkillsGrid.tsx
│   └── CurrentlyBuilding.tsx
├── content/
│   ├── ProjectCard.tsx      # featured + grid variants
│   ├── ArticleCard.tsx
│   ├── MDXComponents.tsx    # typography map (h2/h3/p/a/code/pre/...) + Callout, ComingSoon, Stack
│   ├── MDXContent.tsx       # next-mdx-remote/rsc renderer wrapper
│   └── TableOfContents.tsx  # auto-extracts h2 ids from MDX content via extractToc()
├── seo/
│   ├── PersonSchema.tsx     # JSON-LD Person (rendered on / and /about)
│   ├── ProjectSchema.tsx    # JSON-LD CreativeWork per project
│   └── ArticleSchema.tsx    # JSON-LD BlogPosting per post
└── form/
    ├── ContactForm.tsx          # client form (RHF + zod-resolver)
    └── ContactFormSkeleton.tsx  # placeholder shown during dynamic load
```

Phase 7a moves the contact form into its own client component and lazy-loads
it via `next/dynamic({ ssr: false })` from `app/contact/ContactFormLazy.tsx`,
so React-Hook-Form ships in a separate async chunk instead of the initial
`/contact` bundle. The page itself stays a server component (metadata at
page level, no `layout.tsx` wrapper needed).

App-level loading and error UI live alongside the routes:

```
src/app/
├── loading.tsx                          # global skeleton
├── error.tsx                            # error boundary ("use client")
├── blog/[slug]/loading.tsx              # post-shaped skeleton
└── projects/[slug]/loading.tsx          # project-shaped skeleton (sidebar + content)
```

---

## 7. MDX Blog Setup

```ts
// next.config.ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: false }],
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
```

- Frontmatter parsing: `gray-matter` + Zod validation in `src/lib/schemas/`
- Reading time: `reading-time`
- TOC: `extractToc(content)` in `src/lib/mdx.ts` — regex-based h2/h3 scan
  with `github-slugger` to match the ids that `rehype-slug` emits at build
- RSS: route handler at `/feed.xml` (`force-static`)
- Drafts: `draft?: boolean` frontmatter; `getAllPosts()` strips drafts when
  `process.env.NODE_ENV === "production"`. Dev mode shows them so you can
  preview locally.
- Shiki dual theme: `rehype-pretty-code` configured with
  `theme: { light: "github-light", dark: "github-dark-dimmed" }`.
  CSS in `globals.css` swaps between the two via `html.dark` selector on
  the inline `--shiki-light` / `--shiki-dark` custom properties Shiki emits.
- Content compilation runs through `next-mdx-remote/rsc` (App Router).
  `@next/mdx` is wired up in `next.config.ts` with serializable string
  plugin refs (Turbopack constraint), but isn't on the hot path for our
  content collection.

---

## 8. SEO & Performance Checklist

- [x] JSON-LD `Person` schema on `/` and `/about`
- [x] JSON-LD `CreativeWork` per project
- [x] JSON-LD `BlogPosting` per article
- [x] Dynamic OG images via `next/og` (built-in, Node runtime) at `/api/og` (template: name, title, accent color)
- [x] Per-page meta description (no generic copies)
- [x] Canonical URLs on every page (root layout + per-page `metadata.alternates`)
- [x] Sitemap via Next.js native `app/sitemap.ts`
- [x] robots.txt via Next.js native `app/robots.ts`
- [x] RSS feed at `/feed.xml`
- [x] Favicon set (Phase 7a: pre-generated PNG via `pnpm icons` → `app/icon.png` 32, `app/apple-icon.png` 180, `public/icon-{192,512}.png` for PWA, `app/manifest.ts` with theme-color)
- [ ] Lighthouse > 95 on all four axes — pending manual run in Phase 7a checklist
- [x] No layout shift on theme toggle (CSS variables, not class swap)
- [x] Preload critical fonts (`next/font` does this for Geist Sans/Mono)
- [ ] All images via `next/image` with explicit width/height — currently no real images in content; revisit when project covers land

---

## 9. What to Remove from Existing Repo

The current repo is forked from `nurodev/nuro.dev`. Treat the rebuild as **clean** — keep only the domain config and your CV asset.

- ❌ All of `src/` (start fresh)
- ❌ `public/blog/hello_world/` placeholder content
- ❌ `windi.config.ts` — replace with Tailwind v3
- ❌ `next-sitemap.js` — use Next.js native `sitemap.ts`
- ❌ `.eslintrc.json` (legacy) — let `create-next-app` regenerate as flat config
- ❌ Any GLSL shader files
- ❌ Update `LICENSE` — remove Ben Dixon attribution, use your own MIT
- ❌ Update `README.md` — describe your own project, drop nuro.dev references

---

## 10. Implementation Roadmap

| Phase | Goal | Time |
|---|---|---|
| 1 | Foundation: project init, design tokens, layout, theme toggle | 1 day |
| 2 | Home + About pages with placeholder data | 1 day |
| 3 | Projects: list + MDX case study route | 1 day |
| 4 | Blog: MDX setup + first post + RSS | 1 day |
| 5 | Contact + SEO: form + Resend + dynamic OG + sitemap + robots + JSON-LD + metadata | 1 day |
| 6 | Content: write 2 case studies (Fintrack + TIPAK) + migrate CV content | 1 day |
| 7 | Polish & Deploy: Lighthouse, a11y, Dockerize, Nginx, SSL, CI/CD, DNS | 1 day |

**Total: ~7 days of focused work** — splittable across 2 weekends.

---

## 11. Claude Code Prompts (Ready to Paste)

> Paste each prompt as a separate Claude Code session. Reference this blueprint by name (`PORTFOLIO_BLUEPRINT.md`) and keep it in repo root.

### Phase 1 — Foundation

```
I'm rebuilding my portfolio from scratch. Read PORTFOLIO_BLUEPRINT.md
in the repo root before starting.

Create a new Next.js 15 project with:
- App Router, TypeScript, Tailwind v3, ESLint
- src/ directory, "@/*" import alias
- Geist Sans + Geist Mono via next/font
- next-themes for dark/light mode (dark default)
- CSS variables for colors per section 4
- Root layout: Header (logo "AR" + nav: about, projects, blog, contact + theme toggle) and Footer (social: GitHub, LinkedIn, Twitter, email + © year)
- Container component with max-w-2xl content / max-w-4xl wide variants
- Button (primary | ghost | link), Badge, Card primitives in src/components/ui/
- prettier with prettier-plugin-tailwindcss

Match the file structure in section 6.
```

### Phase 2 — Home + About

```
Build the home page (src/app/page.tsx) and about page (src/app/about/page.tsx)
following section 5 of PORTFOLIO_BLUEPRINT.md.

Home:
- Hero (no profile photo, typographic per section 4)
- FeaturedProjects (3 placeholders for Fintrack, Password Manager SaaS, TIPAK)
- LatestPosts (3 placeholders)
- CurrentlyBuilding section before footer

About:
- Opening paragraph (use the drafted copy)
- ExperienceTimeline (4 roles from CV)
- SkillsGrid (categorized)
- "Beyond work" closing section

Use Framer Motion for fade-up-on-scroll animations only. Keep all data
in src/lib/data/ as typed exports for now (we'll migrate to MDX in phase 4).
```

### Phase 3 — Projects

```
Set up the projects system following section 5 of PORTFOLIO_BLUEPRINT.md:
- src/types/project.ts with Project type matching the frontmatter
- src/lib/data/projects.ts with all 6 projects
- src/app/projects/page.tsx — full grid with filters by stack tag (optional)
- src/app/projects/[slug]/page.tsx — case study layout with sticky TOC sidebar
- ProjectCard component (featured and grid variants)
- generateStaticParams for SSG
- generateMetadata for per-project SEO

Skip writing the case study bodies — just the layout. We'll fill content in phase 7.
```

### Phase 4 — Blog (MDX)

```
Set up MDX-powered blog per section 7 of PORTFOLIO_BLUEPRINT.md:
- next.config.mjs with @next/mdx + rehype-pretty-code + rehype-slug + rehype-autolink-headings + remark-gfm
- gray-matter for frontmatter parsing
- reading-time for read time estimation
- src/lib/mdx.ts utilities (getAllPosts, getPostBySlug, etc.)
- src/app/blog/page.tsx — chronological list with reading time
- src/app/blog/[slug]/page.tsx — MDX renderer with TOC + reading time + previous/next
- content/posts/hello.mdx — placeholder first post
- src/app/feed.xml/route.ts — RSS feed
- TableOfContents component auto-extracted from h2/h3
- Custom MDXComponents (styled headings, code blocks, callouts, links)

Then refactor the projects from phase 3 to load from content/projects/*.mdx
using the same MDX utilities.
```

### Phase 5 — Contact + SEO

```
Add contact form and SEO infrastructure per section 8:
- src/app/contact/page.tsx with react-hook-form + Zod validation (name, email, message)
- src/app/api/contact/route.ts using Resend SDK (env: RESEND_API_KEY, CONTACT_TO_EMAIL)
- src/app/api/og/route.tsx — dynamic OG image with `next/og` (built-in; params: title, subtitle; render with accent color and Geist font loaded via fetch)
- src/app/sitemap.ts — auto-include static routes + all MDX slugs
- src/app/robots.ts
- src/components/seo/PersonSchema.tsx, ProjectSchema.tsx, ArticleSchema.tsx (JSON-LD)
- Per-page metadata exports following Next.js Metadata API
- Add favicon set in public/ (16, 32, apple-touch-icon, manifest.json with theme-color)
```

### Phase 6 — Content

```
Write detailed MDX case studies for Fintrack and TIPAK in content/projects/.

Use this structure for each:
1. Problem (1 paragraph — what gap, who hurts)
2. Architecture (mermaid diagram + 1 paragraph flow description)
3. Key technical decisions (3-5 bullets, each with rationale)
4. Stack rationale (why these choices)
5. What I learned
6. Links (repo, related posts)

I'll provide the project context for each in this session.
```

### Phase 7 — Polish & Deploy (Self-Hosted VPS)

```
Final pass + self-hosted deployment to VPS (IDCloudHost) at aldirifai.com.

A) Polish:
1. Run Lighthouse on all pages, fix anything < 95
2. Manual a11y check: keyboard navigation, focus styles, color contrast (axe-core)
3. Add loading.tsx and error.tsx where helpful
4. Test theme toggle for layout shift
5. Verify all OG images render correctly (test with metatags.io)

B) Production build setup (Next.js standalone):
- Update next.config.mjs: output: 'standalone'
- Verify pnpm build && node .next/standalone/server.js works locally on port 3000

C) Dockerization:
- Create Dockerfile (multi-stage build: deps → build → runner)
  Use node:20-alpine, copy .next/standalone, expose 3000, run as non-root user
- Create docker-compose.yml with:
    services:
      web:
        build: .
        restart: unless-stopped
        env_file: .env.production
        ports: ["127.0.0.1:3000:3000"]    # bind localhost only, Nginx fronts it
- Create .dockerignore (exclude node_modules, .next, .git, content/.cache)

D) Nginx reverse proxy config:
- Create deploy/nginx/aldirifai.com.conf with:
    server_name aldirifai.com www.aldirifai.com
    proxy_pass http://127.0.0.1:3000
    SSL via Let's Encrypt (use existing Certbot or add docs to install)
    HSTS, gzip, proper cache headers for /_next/static/* (1y immutable)
    Redirect www → apex
- Document SSL renewal (certbot timer)

E) GitHub Actions CI/CD (.github/workflows/deploy.yml):
- On push to main: SSH to VPS using GH secrets (HOST, USER, SSH_KEY, KNOWN_HOSTS)
- On VPS: cd /srv/portfolio && git pull && docker compose build && docker compose up -d
- Add deployment status comment on commit

F) Documentation in deploy/README.md:
- One-time VPS setup checklist (Docker install, Nginx install, Certbot, firewall, /srv/portfolio bootstrap)
- Required GitHub secrets list
- DNS records needed (A record for aldirifai.com → VPS IP, A record for www → same IP)
- Rollback procedure (git revert + redeploy)
- Log access (docker compose logs -f web)

G) Final steps (manual):
- DNS: point aldirifai.com A record to VPS IP (assume already managed via Cloudflare or domain registrar — provide instructions only, don't execute)
- Submit sitemap.xml to Google Search Console
- Verify analytics (if Umami enabled later)
```

---

## Appendix A — Migration command (if reusing existing repo)

```bash
git checkout -b clean-rebuild
git rm -rf src public/blog .vscode .idea
git rm windi.config.ts next-sitemap.js .prettierignore .eslintrc.json
git rm yarn.lock
# Then run Phase 1 prompt above (it'll regenerate everything)
```

## Appendix B — Recommended `package.json` scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint --fix",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "icons": "node scripts/generate-icons.mjs"
  }
}
```

`pnpm icons` rasterizes `scripts/generate-icons.mjs` (sharp-based SVG → PNG)
into `src/app/icon.png` (32), `src/app/apple-icon.png` (180), and
`public/icon-{192,512}.png` for the PWA manifest. Run it whenever the
monogram changes; otherwise these are static, committed files.

## Appendix C — Inspiration (study before building)

- **leerob.io** — primary reference for layout, typography, MDX setup
- **delba.dev** — warm typography, great blog patterns
- **joshwcomeau.com** — interactive code blocks (inspiration for later)
- **emilkowal.ski** — minimal, animation-aware
- **joaopalmeiro.com** — extreme minimalism (Astro, but principles apply)
- **fkadev.com** — text-driven, classy, strong dev voice

## Appendix D — Environment variables

```
# .env.production (on VPS, mounted via docker-compose env_file)
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=aldirifaiemail@gmail.com
CONTACT_FROM_EMAIL=noreply@aldirifai.com
NEXT_PUBLIC_SITE_URL=https://aldirifai.com
NODE_ENV=production
# Optional, when Umami is set up later:
# NEXT_PUBLIC_UMAMI_WEBSITE_ID=xxxxxxxx
# NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://umami.aldirifai.com/script.js
```

## Appendix E — Featured social copy (for OG / launch tweet)

> Just shipped a fresh portfolio at aldirifai.com — built with Next.js 15, Tailwind, MDX. Showcases 5+ years of Laravel work and current projects (Fintrack, password manager SaaS, TIPAK). Open to remote backend roles. 🇮🇩

## Appendix F — VPS deployment reference

These are reference templates Phase 7 will generate. Listed here so the spec is complete.

### Dockerfile (multi-stage)

```dockerfile
# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
services:
  web:
    build: .
    image: portfolio:latest
    restart: unless-stopped
    env_file: .env.production
    ports:
      - "127.0.0.1:3000:3000"
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3000/"]
      interval: 30s
      timeout: 5s
      retries: 3
```

### Nginx server block (`/etc/nginx/sites-available/aldirifai.com`)

```nginx
server {
    listen 443 ssl http2;
    server_name aldirifai.com;

    ssl_certificate     /etc/letsencrypt/live/aldirifai.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/aldirifai.com/privkey.pem;

    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options DENY always;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name aldirifai.com www.aldirifai.com;
    return 301 https://aldirifai.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.aldirifai.com;
    ssl_certificate     /etc/letsencrypt/live/aldirifai.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/aldirifai.com/privkey.pem;
    return 301 https://aldirifai.com$request_uri;
}
```

### GitHub Actions deploy workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /srv/portfolio
            git fetch --all
            git reset --hard origin/main
            docker compose build
            docker compose up -d
            docker image prune -f
```

### One-time VPS bootstrap (run as root or sudo)

```bash
# 1. Install Docker (if not already)
curl -fsSL https://get.docker.com | sh
usermod -aG docker $USER

# 2. Install Nginx + Certbot
apt update && apt install -y nginx certbot python3-certbot-nginx

# 3. Clone repo to /srv/portfolio
mkdir -p /srv/portfolio && cd /srv/portfolio
git clone git@github.com:aldirifai/portfolio.git .

# 4. Create .env.production with secrets

# 5. Initial build & up
docker compose build && docker compose up -d

# 6. Get SSL cert (after DNS A record points to VPS IP)
certbot --nginx -d aldirifai.com -d www.aldirifai.com

# 7. Test renewal
certbot renew --dry-run
```

### Required GitHub Secrets

- `VPS_HOST` — VPS IP or hostname
- `VPS_USER` — SSH user (e.g. `deploy`)
- `VPS_SSH_KEY` — private key for that user (deploy key, scoped only to this VPS)
