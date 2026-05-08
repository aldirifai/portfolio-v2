import { skills } from "@/lib/data/skills";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/ui/FadeIn";

export function SkillsGrid() {
  return (
    <Container variant="content" className="py-12 sm:py-16">
      <FadeIn>
        <h2 className="mb-8 text-2xl font-bold tracking-tight">Skills</h2>
      </FadeIn>
      <div className="flex flex-col gap-8">
        {skills.map((category, index) => (
          <FadeIn key={category.name} delay={index * 0.08}>
            <div>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Container>
  );
}
