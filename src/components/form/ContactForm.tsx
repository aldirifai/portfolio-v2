"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ContactSchema, type ContactInput } from "@/lib/schemas/contact";
import { cn } from "@/lib/cn";

type FormStatus = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-border bg-bg-elevated/40 px-4 py-3 text-sm text-primary placeholder:text-muted backdrop-blur-md transition-all focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30 disabled:opacity-50";

export function ContactForm() {
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

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-6"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={22} />
          <div>
            <p className="font-semibold text-primary">Message sent.</p>
            <p className="mt-1.5 text-sm leading-relaxed text-secondary">
              I read every message and reply within 24 hours. If it&apos;s
              urgent, the email link in the sidebar is the fastest path.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Send another →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot */}
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-accent"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            disabled={isSubmitting}
            className={inputClass}
            aria-invalid={errors.name ? "true" : "false"}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-2 text-xs text-amber-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-accent"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            disabled={isSubmitting}
            className={inputClass}
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-2 text-xs text-amber-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-accent"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="What are you working on, and how can I help?"
          disabled={isSubmitting}
          className={cn(inputClass, "resize-y leading-relaxed")}
          aria-invalid={errors.message ? "true" : "false"}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-2 text-xs text-amber-500">{errors.message.message}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="min-w-[140px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send size={14} className="transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
        {status === "error" && (
          <p role="alert" className="text-xs text-amber-500">
            Couldn&apos;t send — please try again or email directly.
            {errorMessage && ` (${errorMessage})`}
          </p>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
