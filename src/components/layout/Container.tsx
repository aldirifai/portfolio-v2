import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerVariant = "content" | "wide";

type ContainerProps = {
  children: ReactNode;
  variant?: ContainerVariant;
  className?: string;
  as?: "div" | "main" | "section" | "article" | "header" | "footer";
};

const variantClasses: Record<ContainerVariant, string> = {
  content: "max-w-content",
  wide: "max-w-wide",
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
        "mx-auto w-full px-5 sm:px-8",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
