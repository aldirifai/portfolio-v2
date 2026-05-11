import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { FadeIn } from "@/components/ui/FadeIn";
import { Aurora } from "@/components/ui/Aurora";
import { PersonSchema } from "@/components/seo/PersonSchema";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior backend engineer based in Gresik, Indonesia. 5+ years shipping Laravel production systems; expanding into FastAPI, Next.js, and AI-augmented workflows.",
};

export default function AboutPage() {
  return (
    <>
      <PersonSchema />
      <div className="relative">
        <Aurora className="opacity-60" />
        <Container variant="wide" className="relative z-10 pt-16 sm:pt-24">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                / about
              </p>
            </FadeIn>
            <FadeIn delay={0.06}>
              <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
                <span className="text-gradient">Backend engineer,</span>{" "}
                <span className="text-gradient-accent">polyglot in progress.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="mt-6 text-balance text-lg leading-relaxed text-secondary">
                I&apos;m{" "}
                <span className="font-medium text-primary">
                  Muhamad Aldi Rifai
                </span>
                , a senior backend engineer based in Gresik, East Java, Indonesia.
                Over the past 5 years I&apos;ve built and maintained production
                systems across fintech, education, and operational tooling — most of
                them on Laravel + MySQL with production VPS deployments.
              </p>
            </FadeIn>
            <FadeIn delay={0.18}>
              <p className="mt-5 text-balance text-lg leading-relaxed text-secondary">
                Lately I&apos;ve been investing heavily in expanding my stack:
                FastAPI for AI-integrated backends, Next.js for full-stack
                products, and modern infra (Docker + Nginx + Cloudflare) for
                shipping Indonesian-market SaaS. I work primarily through Claude
                Code, which lets me ship more in less time as a solo builder.
              </p>
            </FadeIn>
          </div>
        </Container>
      </div>

      <ExperienceTimeline />
      <SkillsGrid />

      <Container variant="wide" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
              / 04 — beyond work
            </p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Outside the editor.
            </h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="glass mt-6 rounded-2xl p-6 sm:p-8">
              <p className="text-balance leading-relaxed text-secondary">
                Outside of client work, I&apos;m fascinated by financial systems
                and trading — I built an MT5 algorithmic trading bot for Gold and
                BTC, and a lot of my personal projects circle around finance and
                AI agents. My approach to new ideas is{" "}
                <em className="font-medium not-italic text-accent">
                  amati, tiru, modifikasi
                </em>{" "}
                — observe, learn, then modify into something my own.
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </>
  );
}
