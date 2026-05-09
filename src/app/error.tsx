"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app error boundary]", error);
  }, [error]);

  return (
    <Container variant="content" className="py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-wider text-muted">
        500 — something broke
      </p>
      <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
        Apologies — that didn&apos;t work.
      </h1>
      <p className="mt-4 text-balance leading-relaxed text-secondary">
        An unexpected error landed on the page you were trying to open. The
        attempt is logged on my end. Try reloading; if the same page keeps
        failing,{" "}
        <a
          href="mailto:aldirifaiemail@gmail.com"
          className="text-accent underline-offset-4 hover:underline"
        >
          send me a note
        </a>
        .
      </p>
      {error.digest ? (
        <p className="mt-4 font-mono text-xs text-muted">
          Reference: {error.digest}
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="ghost">
          Back to home
        </Button>
      </div>
    </Container>
  );
}
