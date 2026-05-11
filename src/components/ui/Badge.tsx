import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "accent" | "outline";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "border border-border bg-surface text-secondary backdrop-blur-md",
  accent:
    "border border-[var(--accent)]/30 bg-[var(--accent-soft)] text-accent",
  outline: "border border-border-strong bg-transparent text-secondary",
};

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[11px] tracking-tight",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
