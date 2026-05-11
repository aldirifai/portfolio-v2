import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

function H2({ children, id, className, ...rest }: ComponentProps<"h2">) {
  return (
    <h2
      id={id}
      className={cn(
        "scroll-mt-24 mt-14 mb-5 text-2xl font-semibold tracking-tight text-primary",
        className,
      )}
      {...rest}
    >
      {children}
    </h2>
  );
}

function H3({ children, id, className, ...rest }: ComponentProps<"h3">) {
  return (
    <h3
      id={id}
      className={cn(
        "scroll-mt-24 mt-9 mb-3 text-lg font-semibold tracking-tight text-primary",
        className,
      )}
      {...rest}
    >
      {children}
    </h3>
  );
}

function H4({ children, id, className, ...rest }: ComponentProps<"h4">) {
  return (
    <h4
      id={id}
      className={cn(
        "scroll-mt-24 mt-6 mb-2 text-base font-semibold text-primary",
        className,
      )}
      {...rest}
    >
      {children}
    </h4>
  );
}

function P({ children, className, ...rest }: ComponentProps<"p">) {
  return (
    <p
      className={cn("my-5 leading-relaxed text-secondary", className)}
      {...rest}
    >
      {children}
    </p>
  );
}

function Strong({ children, className, ...rest }: ComponentProps<"strong">) {
  return (
    <strong
      className={cn("font-semibold text-primary", className)}
      {...rest}
    >
      {children}
    </strong>
  );
}

function A({ href = "", children, className, ...rest }: ComponentProps<"a">) {
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-1 font-medium text-accent underline-offset-4 hover:underline",
          className,
        )}
        {...rest}
      >
        {children}
        <ExternalLink size={12} aria-hidden />
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={cn(
        "font-medium text-accent underline-offset-4 hover:underline",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function Blockquote({
  children,
  className,
  ...rest
}: ComponentProps<"blockquote">) {
  return (
    <blockquote
      className={cn(
        "my-6 rounded-r-xl border-l-2 border-accent bg-accent/5 px-4 py-3 italic text-secondary",
        className,
      )}
      {...rest}
    >
      {children}
    </blockquote>
  );
}

function InlineCode({ children, className, ...rest }: ComponentProps<"code">) {
  return (
    <code
      className={cn(
        "rounded border border-border bg-bg-elevated/60 px-1.5 py-0.5 font-mono text-[0.875em] text-primary backdrop-blur-md",
        className,
      )}
      {...rest}
    >
      {children}
    </code>
  );
}

function Pre({ children, className, ...rest }: ComponentProps<"pre">) {
  return (
    <pre
      className={cn(
        "glass my-6 overflow-x-auto rounded-2xl p-5 text-sm leading-relaxed",
        className,
      )}
      {...rest}
    >
      {children}
    </pre>
  );
}

function UL({ children, className, ...rest }: ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "my-5 ml-6 list-disc space-y-2 text-secondary marker:text-accent/70",
        className,
      )}
      {...rest}
    >
      {children}
    </ul>
  );
}

function OL({ children, className, ...rest }: ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        "my-5 ml-6 list-decimal space-y-2 text-secondary marker:text-muted",
        className,
      )}
      {...rest}
    >
      {children}
    </ol>
  );
}

function HR({ className, ...rest }: ComponentProps<"hr">) {
  return (
    <hr
      className={cn("my-10 border-t border-border", className)}
      {...rest}
    />
  );
}

function Img({
  src,
  alt,
  width,
  height,
  className,
  ...rest
}: ComponentProps<"img">) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- intentional <img/> fallback for MDX without dimension data
    <img
      src={src}
      alt={alt ?? ""}
      width={width}
      height={height}
      className={cn("my-6 rounded-2xl border border-border", className)}
      {...rest}
    />
  );
}

type CalloutType = "info" | "warning" | "tip";

function Callout({
  type = "info",
  children,
}: {
  type?: CalloutType;
  children: ReactNode;
}) {
  const stripes: Record<CalloutType, string> = {
    info: "border-[var(--accent)]/40 bg-[var(--accent-soft)]",
    warning: "border-amber-500/40 bg-amber-500/5",
    tip: "border-emerald-500/40 bg-emerald-500/5",
  };
  return (
    <div
      className={cn(
        "my-6 rounded-2xl border-l-2 px-5 py-4 leading-relaxed text-secondary backdrop-blur-md",
        stripes[type],
      )}
      role="note"
    >
      {children}
    </div>
  );
}

function ComingSoon() {
  return (
    <div className="glass my-6 rounded-2xl p-6">
      <p className="leading-relaxed text-secondary">
        Case study coming soon — a full write-up will be published here.
      </p>
    </div>
  );
}

function Stack({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass my-8 overflow-x-auto rounded-2xl p-6 font-mono text-sm leading-relaxed text-secondary",
        className,
      )}
    >
      {children}
    </div>
  );
}

export const mdxComponents = {
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  a: A,
  strong: Strong,
  blockquote: Blockquote,
  code: InlineCode,
  pre: Pre,
  ul: UL,
  ol: OL,
  hr: HR,
  img: Img,
  Callout,
  ComingSoon,
  Stack,
};
