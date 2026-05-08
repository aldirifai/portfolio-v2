import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-bg-elevated px-2 py-0.5 font-mono text-xs text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}
