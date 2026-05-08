import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <Container className="py-16 sm:py-24">
      <section className="space-y-6">
        <p className="font-mono text-xs text-secondary">
          aldi.rifai — senior backend engineer — gresik, id
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Hi, I&apos;m Aldi.
        </h1>
        <p className="text-balance text-lg leading-relaxed text-secondary">
          I&apos;m a senior backend engineer with 5+ years building production systems in
          Laravel. Currently exploring Python, Go, and Rust — open to remote opportunities
          worldwide.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button href="/contact">Get in touch</Button>
          <Button href="/cv.pdf" variant="ghost">
            Download CV
          </Button>
        </div>
      </section>
    </Container>
  );
}
