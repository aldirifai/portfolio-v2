import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "ghost" | "glass" | "link";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
};

const baseClasses =
  "group relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs rounded-lg",
  md: "h-10 px-4 text-sm rounded-xl",
  lg: "h-12 px-5 text-sm rounded-xl",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg shadow-[0_0_0_1px_var(--accent),0_8px_24px_-12px_var(--accent-glow)] hover:shadow-[0_0_0_1px_var(--accent),0_12px_32px_-12px_var(--accent-glow)] hover:-translate-y-0.5",
  ghost:
    "border border-border bg-transparent text-primary hover:bg-surface hover:border-border-strong",
  glass:
    "glass text-primary hover:border-border-strong hover:bg-surface-strong",
  link: "text-accent hover:underline underline-offset-4 px-0 h-auto",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  type = "button",
  onClick,
  disabled,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    baseClasses,
    variant !== "link" && sizeClasses[size],
    variantClasses[variant],
    className,
  );

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <Link
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          aria-label={ariaLabel}
        >
          {children}
        </Link>
      );
    }
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
