"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { cn } from "@/lib/cn";

export type TocSection = {
  id: string;
  label: string;
};

type TableOfContentsProps = {
  sections: TocSection[];
  className?: string;
};

export function TableOfContents({ sections, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0% -70% 0%" },
    );

    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
    history.replaceState(null, "", `#${id}`);
  };

  if (sections.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className={className}>
      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
        On this page
      </p>
      <ul className="flex flex-col border-l border-border">
        {sections.map((s) => {
          const active = activeId === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(event) => handleClick(event, s.id)}
                className={cn(
                  "-ml-px block border-l py-1 pl-3 text-sm transition-colors",
                  active
                    ? "border-accent text-primary"
                    : "border-transparent text-secondary hover:border-border hover:text-primary",
                )}
              >
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
