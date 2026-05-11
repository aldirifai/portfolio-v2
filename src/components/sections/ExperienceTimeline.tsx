import { experience } from "@/lib/data/experience";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/ui/FadeIn";

export function ExperienceTimeline() {
  return (
    <Container variant="wide" className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            / 02 — experience
          </p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Where I&apos;ve worked.
          </h2>
        </FadeIn>

        <ol className="relative mt-10 flex flex-col gap-4 before:absolute before:left-3 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-accent/40 before:via-border before:to-transparent">
          {experience.map((item, index) => (
            <li key={item.role + item.company + item.startDate}>
              <FadeIn delay={index * 0.06} className="relative pl-10">
                <span
                  aria-hidden
                  className="absolute left-0 top-3 flex size-6 items-center justify-center rounded-full border border-border bg-bg-elevated/80 backdrop-blur-md"
                >
                  <span className="size-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent-glow)]" />
                </span>
                <div className="glass rounded-2xl p-5 sm:p-6">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    {item.startDate} — {item.endDate} · {item.type}
                  </p>
                  <h3 className="mt-2 text-base font-semibold tracking-tight text-primary">
                    {item.role}
                  </h3>
                  <p className="text-sm text-accent">{item.company}</p>
                  <ul className="mt-4 flex flex-col gap-2 text-sm text-secondary">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="relative pl-4 before:absolute before:left-0 before:top-2.5 before:h-px before:w-2 before:bg-border-strong"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  );
}
