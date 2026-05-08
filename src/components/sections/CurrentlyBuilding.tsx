import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";

export function CurrentlyBuilding() {
  return (
    <Container variant="content" className="py-12 sm:py-16">
      <FadeIn>
        <Card>
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">Currently building</p>
          <p className="leading-relaxed text-primary">Working on <strong className="font-semibold text-accent">Fintrack</strong> — a personal AI agent for finance tracking with Telegram input and FastAPI backend. Next up: a zero-knowledge password manager built in Go and Rust.</p>
        </Card>
      </FadeIn>
    </Container>
  );
}
