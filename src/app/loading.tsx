import { Container } from "@/components/layout/Container";

export default function Loading() {
  return (
    <Container variant="content" className="py-16 sm:py-24">
      <div className="space-y-6" aria-busy="true" aria-live="polite">
        <div className="h-3 w-48 rounded bg-bg-elevated" />
        <div className="h-12 w-3/4 rounded bg-bg-elevated" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-bg-elevated" />
          <div className="h-4 w-11/12 rounded bg-bg-elevated" />
          <div className="h-4 w-2/3 rounded bg-bg-elevated" />
        </div>
        <span className="sr-only">Loading…</span>
      </div>
    </Container>
  );
}
