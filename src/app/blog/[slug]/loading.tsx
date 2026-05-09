import { Container } from "@/components/layout/Container";

export default function Loading() {
  return (
    <Container variant="wide" className="py-12 sm:py-16">
      <div
        className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12"
        aria-busy="true"
        aria-live="polite"
      >
        <article className="min-w-0 space-y-3">
          <div className="h-3 w-40 rounded bg-bg-elevated" />
          <div className="h-10 w-3/4 rounded bg-bg-elevated" />
          <div className="h-5 w-2/3 rounded bg-bg-elevated" />
          <div className="mt-12 space-y-2">
            <div className="h-4 w-full rounded bg-bg-elevated" />
            <div className="h-4 w-11/12 rounded bg-bg-elevated" />
            <div className="h-4 w-10/12 rounded bg-bg-elevated" />
            <div className="h-4 w-9/12 rounded bg-bg-elevated" />
            <div className="h-4 w-11/12 rounded bg-bg-elevated" />
          </div>
        </article>
        <aside className="mt-12 hidden lg:mt-0 lg:block">
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-bg-elevated" />
            <div className="h-3 w-32 rounded bg-bg-elevated" />
            <div className="h-3 w-28 rounded bg-bg-elevated" />
            <div className="h-3 w-30 rounded bg-bg-elevated" />
          </div>
        </aside>
        <span className="sr-only">Loading post…</span>
      </div>
    </Container>
  );
}
