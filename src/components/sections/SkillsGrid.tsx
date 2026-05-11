import { skills } from "@/lib/data/skills";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/ui/FadeIn";

export function SkillsGrid() {
  return (
    <Container variant="wide" className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            / 03 — skills
          </p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            What I work with.
          </h2>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {skills.map((category, index) => (
            <FadeIn key={category.name} delay={index * 0.04}>
              <div className="glass h-full rounded-2xl p-5">
                <h3 className="font-mono text-[10px] uppercase tracking-wider text-accent">
                  {category.name}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="inline-flex items-center rounded-full border border-border bg-bg-elevated/40 px-2.5 py-0.5 font-mono text-[11px] text-secondary backdrop-blur-md"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Container>
  );
}
