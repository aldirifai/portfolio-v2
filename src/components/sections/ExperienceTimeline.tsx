import { experience } from "@/lib/data/experience";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/ui/FadeIn";

export function ExperienceTimeline() {
  return (
    <Container variant="content" className="py-12 sm:py-16">
      <FadeIn>
        <h2 className="mb-8 text-2xl font-bold tracking-tight">Experience</h2>
      </FadeIn>
      <ol className="flex flex-col gap-10 border-l border-border pl-6">
        {experience.map((item, index) => (
          <li key={item.role + item.company + item.startDate}>
            <FadeIn delay={index * 0.08} className="relative">
              <span className="absolute -left-[1.625rem] top-2 h-2 w-2 rounded-full bg-accent" />
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                {item.startDate} – {item.endDate} · {item.type}
              </p>
              <h3 className="mt-1 text-base font-semibold text-primary">
                {item.role}
              </h3>
              <p className="text-sm text-secondary">{item.company}</p>
              <ul className="mt-3 flex flex-col gap-1.5 text-sm text-secondary">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-px before:w-2 before:bg-border"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </li>
        ))}
      </ol>
    </Container>
  );
}
