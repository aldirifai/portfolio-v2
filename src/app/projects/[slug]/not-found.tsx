import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function ProjectNotFound() {
  return (
    <Container variant="content" className="py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-wider text-muted">404</p>
      <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
        Project not found
      </h1>
      <p className="mt-4 text-balance leading-relaxed text-secondary">
        The project you&apos;re looking for doesn&apos;t exist, or its slug has changed.
      </p>
      <div className="mt-8 flex justify-center">
        <Button href="/projects" variant="ghost">
          ← All projects
        </Button>
      </div>
    </Container>
  );
}
