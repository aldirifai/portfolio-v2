import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  variant?: "content" | "wide";
  className?: string;
  as?: "div" | "main" | "section" | "article" | "header" | "footer";
};

export function Container({
  children,
  variant = "content",
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        variant === "content" ? "max-w-content" : "max-w-wide",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
