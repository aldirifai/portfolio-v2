import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior backend engineer based in Gresik, Indonesia. 5+ years shipping Laravel production systems; expanding into FastAPI, Go, and Rust. Building Fintrack and a zero-knowledge password manager.",
};

export default function AboutPage() {
  return (
    <>
      <Container variant="content" className="pt-16 sm:pt-24">
        <FadeIn>
          <p className="font-mono text-xs text-secondary">about</p>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Backend engineer, polyglot in progress.
          </h1>
        </FadeIn>
        <FadeIn delay={0.16}>
          <p className="mt-6 text-balance text-lg leading-relaxed text-secondary">
            I&apos;m Muhamad Aldi Rifai, a senior backend engineer based in Gresik, East Java,
            Indonesia. Over the past 5 years I&apos;ve built and maintained production
            systems across fintech, education, and operational tooling — most of them on
            Laravel + MySQL + production VPS deployments. Lately I&apos;ve been investing
            heavily in expanding my stack: FastAPI for AI-integrated backends, Go for
            high-throughput services, and Rust for cryptographic correctness in a password
            manager I&apos;m building. I work primarily through Claude Code, which lets me
            ship more in less time as a solo builder.
          </p>
        </FadeIn>
      </Container>

      <ExperienceTimeline />
      <SkillsGrid />

      <Container variant="content" className="py-12 sm:py-16">
        <FadeIn>
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Beyond work</h2>
        </FadeIn>
        <FadeIn delay={0.08}>
          <p className="text-balance leading-relaxed text-secondary">
            Outside of client work, I&apos;m fascinated by financial systems and trading — I
            built an MT5 algorithmic trading bot for Gold and BTC, and a lot of my personal
            projects circle around finance and AI agents. My approach to new ideas is{" "}
            <em className="text-primary">amati, tiru, modifikasi</em> — observe, learn,
            then modify into something my own.
          </p>
        </FadeIn>
      </Container>
    </>
  );
}
