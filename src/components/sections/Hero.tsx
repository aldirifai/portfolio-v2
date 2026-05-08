import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function Hero() {
  return (
    <Container variant="content" className="py-16 sm:py-24">
      <section className="space-y-6">
        <FadeIn delay={0}>
          <p className="font-mono text-xs text-secondary">aldi.rifai — senior backend engineer — gresik, id</p>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">Hi, I&apos;m Aldi.</h1>
        </FadeIn>
        <FadeIn delay={0.16}>
          <p className="text-balance text-lg leading-relaxed text-secondary">I&apos;m a senior backend engineer with 5+ years building production systems in Laravel. Currently exploring Python, Go, and Rust — open to remote opportunities worldwide.</p>
        </FadeIn>
        <FadeIn delay={0.24}>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button href="/contact">Get in touch</Button>
            <Button href="/cv.pdf" variant="ghost">Download CV</Button>
          </div>
        </FadeIn>
      </section>
    </Container>
  );
}
