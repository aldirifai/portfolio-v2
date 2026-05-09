import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ContactFormLazy } from "./ContactFormLazy";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about remote backend roles, freelance work, or interesting builds — Indonesia-based, replies in English or Bahasa.",
};

export default function ContactPage() {
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
            className="text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            aldirifaiemail@gmail.com
          </a>
          . Open to remote backend roles, freelance projects, and interesting
          builds.
        </p>
      </header>
      <ContactFormLazy />
    </Container>
  );
}
