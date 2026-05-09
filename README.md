# aldirifai.com

Personal portfolio of Muhamad Aldi Rifai — senior backend engineer.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v3 · MDX
**Deployment:** Self-hosted on a VPS via Docker + Nginx + Let's Encrypt
**Spec:** see [`PORTFOLIO_BLUEPRINT.md`](./PORTFOLIO_BLUEPRINT.md)

## Local development

1. Install dependencies (requires Node 20+ and pnpm):

   ```bash
   pnpm install
   ```

2. Copy env template and fill in your secrets:

   ```bash
   cp .env.example .env.local
   ```

   The contact form needs a [Resend API key](https://resend.com/api-keys) at
   minimum. Other variables have safe defaults for local dev.

3. Start the dev server:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command            | What it does                                         |
| ------------------ | ---------------------------------------------------- |
| `pnpm dev`         | Start the Next.js dev server (Turbopack)             |
| `pnpm build`       | Production build (Next.js + Shiki MDX compilation)   |
| `pnpm start`       | Run the production server (after `build`)            |
| `pnpm lint`        | ESLint with auto-fix                                 |
| `pnpm format`      | Prettier across the repo                             |
| `pnpm type-check`  | `tsc --noEmit`                                       |

## Content

Posts live in `content/posts/*.mdx`, project case studies in
`content/projects/*.mdx`. Frontmatter is validated with Zod at build time —
invalid frontmatter fails the build loud.

Drafts (`draft: true` in post frontmatter) are visible in `pnpm dev` but
stripped from production builds.

## Deployment

See `PORTFOLIO_BLUEPRINT.md` Section 11 / Phase 7 for the full self-host
runbook (Dockerfile, docker-compose, Nginx, GitHub Actions CI/CD,
Let's Encrypt, DNS).

## License

MIT — see `LICENSE`.
