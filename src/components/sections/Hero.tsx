import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Aurora } from "@/components/ui/Aurora";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Aurora />
      <Container variant="wide" className="relative z-10 pb-12 pt-20 sm:pt-28 lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-secondary">
                Open to remote roles
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tight md:text-7xl">
              <span className="text-gradient">Senior backend engineer</span>{" "}
              <span className="text-gradient-accent">building agentic SaaS for Indonesia.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.12}>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-secondary">
              I&apos;m{" "}
              <span className="font-medium text-primary">Muhamad Aldi Rifai</span>{" "}
              — 5+ years building production systems in Laravel, expanding into
              FastAPI, Next.js, and AI-augmented workflows. Based in Gresik,
              Indonesia. Open to remote opportunities worldwide.
            </p>
          </FadeIn>

          <FadeIn delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/contact" size="lg">
                Get in touch
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
              <Button href="/projects" variant="glass" size="lg">
                View projects
              </Button>
              <div className="ml-auto flex items-center gap-1">
                <Button
                  href="https://github.com/aldirifai"
                  variant="ghost"
                  size="sm"
                  aria-label="GitHub"
                  className="size-9 px-0"
                >
                  <Github className="size-4" />
                </Button>
                <Button
                  href="https://linkedin.com/in/aldirifai"
                  variant="ghost"
                  size="sm"
                  aria-label="LinkedIn"
                  className="size-9 px-0"
                >
                  <Linkedin className="size-4" />
                </Button>
                <Button
                  href="mailto:aldirifaiemail@gmail.com"
                  variant="ghost"
                  size="sm"
                  aria-label="Email"
                  className="size-9 px-0"
                >
                  <Mail className="size-4" />
                </Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.24}>
            <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-8 sm:grid-cols-4">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Experience
                </dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight">
                  5<span className="text-accent">+</span>
                  <span className="ml-1 text-sm font-normal text-secondary">years</span>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Projects shipped
                </dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight">
                  20<span className="text-accent">+</span>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Stack focus
                </dt>
                <dd className="mt-1 text-sm font-medium text-primary">
                  Laravel · FastAPI · Next.js
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Location
                </dt>
                <dd className="mt-1 text-sm font-medium text-primary">
                  Gresik, ID · Remote
                </dd>
              </div>
            </dl>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
