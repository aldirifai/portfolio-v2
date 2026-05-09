"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ContactSchema, type ContactInput } from "@/lib/schemas/contact";
import { cn } from "@/lib/cn";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("submitting");
    setErrorMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong",
      );
    }
  };

  const inputClass =
    "w-full rounded-md border border-border bg-bg-elevated px-3 py-2 text-sm text-primary placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50";

  return (
    <Container variant="content" className="py-12 sm:py-16">
      <header className="mb-10">
        <p className="font-mono text-xs text-secondary">contact</p>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Get in touch.
        </h1>
        <p className="mt-6 text-balance text-lg leading-relaxed text-secondary">
          The fastest way is the form below — replies come from{" "}
          <a
            href="mailto:aldirifaiemail@gmail.com"
            className="text-accent underline-offset-4 hover:underline"
          >
            aldirifaiemail@gmail.com
          </a>
          . Open to remote backend roles, freelance projects, and interesting
          builds.
        </p>
      </header>

      {status === "success" ? (
        <div
          role="status"
          className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-6 text-secondary"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={20} />
            <div>
              <p className="font-semibold text-primary">Message sent</p>
              <p className="mt-1 text-sm leading-relaxed">
                I read every message and will get back to you soon. If it&apos;s
                urgent, the email link above is the best path.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-3 text-sm text-accent underline-offset-4 hover:underline"
              >
                Send another →
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {/* Honeypot — humans never see or tab to this; bots fill it. */}
          <div
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
          >
            <label htmlFor="website">Website (do not fill)</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              disabled={isSubmitting}
              className={inputClass}
              aria-invalid={errors.name ? "true" : "false"}
              {...register("name")}
            />
            {errors.name ? (
              <p className="mt-1.5 text-sm text-amber-500">{errors.name.message}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              disabled={isSubmitting}
              className={inputClass}
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email")}
            />
            {errors.email ? (
              <p className="mt-1.5 text-sm text-amber-500">{errors.email.message}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              disabled={isSubmitting}
              className={cn(inputClass, "resize-y leading-relaxed")}
              aria-invalid={errors.message ? "true" : "false"}
              {...register("message")}
            />
            {errors.message ? (
              <p className="mt-1.5 text-sm text-amber-500">{errors.message.message}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending…
                </>
              ) : (
                "Send message"
              )}
            </Button>
            {status === "error" ? (
              <p role="alert" className="text-sm text-amber-500">
                Couldn&apos;t send — please try again or email directly.
                {errorMessage ? ` (${errorMessage})` : null}
              </p>
            ) : null}
          </div>
        </form>
      )}
    </Container>
  );
}
