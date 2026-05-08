import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

function H2({ children, id, className, ...rest }: ComponentProps<"h2">) {
  return (
    <h2
      id={id}
      className={cn(
        "scroll-mt-24 mt-12 mb-4 text-xl font-bold tracking-tight text-primary",
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
        "scroll-mt-24 mt-8 mb-3 text-lg font-semibold tracking-tight text-primary",
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
    <p className={cn("my-4 leading-relaxed text-secondary", className)} {...rest}>
      {children}
    </p>
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
          "inline-flex items-center gap-1 text-accent underline-offset-4 hover:underline",
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
        "text-accent underline-offset-4 hover:underline",
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
        "my-6 border-l-2 border-accent pl-4 italic text-secondary",
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
        "rounded border border-border bg-bg-elevated px-1.5 py-0.5 font-mono text-[0.875em]",
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
        "my-6 overflow-x-auto rounded-lg border border-border bg-bg-elevated p-4 text-sm leading-relaxed",
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
        "my-4 ml-6 list-disc space-y-2 text-secondary marker:text-muted",
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
        "my-4 ml-6 list-decimal space-y-2 text-secondary marker:text-muted",
        className,
      )}
      {...rest}
    >
      {children}
    </ol>
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
  // next/image needs explicit dimensions; for content authored without sizes
  // we fall back to a regular <img>. Phase 5+ may add dimension metadata.
  return (
    // eslint-disable-next-line @next/next/no-img-element -- intentional <img/> fallback for MDX without dimension data
    <img
      src={src}
      alt={alt ?? ""}
      width={width}
      height={height}
      className={cn("my-6 rounded-lg border border-border", className)}
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
    info: "border-accent/40 bg-accent/5",
    warning: "border-amber-500/40 bg-amber-500/5",
    tip: "border-emerald-500/40 bg-emerald-500/5",
  };
  return (
    <div
      className={cn(
        "my-6 rounded-md border-l-2 px-4 py-3 leading-relaxed text-secondary",
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
    <Card>
      <p className="leading-relaxed text-secondary">
        Case study coming soon — a full write-up will be published here.
      </p>
    </Card>
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
        "my-6 overflow-x-auto rounded-lg border border-border bg-bg-elevated p-6 font-mono text-sm leading-relaxed text-secondary",
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
  blockquote: Blockquote,
  code: InlineCode,
  pre: Pre,
  ul: UL,
  ol: OL,
  img: Img,
  Callout,
  ComingSoon,
  Stack,
};
