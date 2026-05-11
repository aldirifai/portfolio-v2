import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardVariant = "glass" | "solid" | "bare";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section" | "li";
  variant?: CardVariant;
  interactive?: boolean;
};

const variantClasses: Record<CardVariant, string> = {
  glass: "glass rounded-2xl",
  solid: "rounded-2xl border border-border bg-bg-elevated",
  bare: "rounded-2xl border border-border",
};

export function Card({
  children,
  className,
  as: Tag = "div",
  variant = "glass",
  interactive = false,
}: CardProps) {
  return (
    <Tag
      className={cn(
        "relative overflow-hidden p-6 transition-all duration-300",
        variantClasses[variant],
        interactive &&
          "hover:border-border-strong hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-20px_var(--accent-glow)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
