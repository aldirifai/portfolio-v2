import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/ui/FadeIn";

export function CurrentlyBuilding() {
  return (
    <Container variant="wide" className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-bg-elevated/40 p-8 backdrop-blur-md sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(60% 80% at 100% 0%, var(--accent-soft) 0%, transparent 60%), radial-gradient(40% 60% at 0% 100%, var(--accent-soft) 0%, transparent 60%)",
              }}
            />
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 backdrop-blur-md">
                  <Sparkles className="size-3.5 text-accent" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-secondary">
                    Currently building
                  </span>
                </div>
                <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Shipping{" "}
                  <Link
                    href="/projects/fintrack"
                    className="text-accent underline-offset-8 hover:underline"
                  >
                    Fintrack
                  </Link>{" "}
                  — a personal AI finance agent.
                </h2>
                <p className="mt-4 max-w-2xl text-balance leading-relaxed text-secondary">
                  Telegram in, FastAPI orchestrating an LLM, PostgreSQL +
                  pgvector for memory. Next on the runway:{" "}
                  <Link
                    href="/projects/klipin"
                    className="font-medium text-primary hover:text-accent"
                  >
                    Klipin
                  </Link>{" "}
                  (AI video clipping for Indonesian creators) and{" "}
                  <Link
                    href="/projects/tanyaai"
                    className="font-medium text-primary hover:text-accent"
                  >
                    TanyaAI
                  </Link>{" "}
                  (multi-tenant chatbot SaaS for UMKM).
                </p>
              </div>
              <Link
                href="/projects"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium backdrop-blur-md transition-all hover:border-border-strong hover:-translate-y-0.5"
              >
                See all projects
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </Container>
  );
}
