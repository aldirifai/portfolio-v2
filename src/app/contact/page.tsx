import type { Metadata } from "next";
import { Mail, Github, Linkedin, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Aurora } from "@/components/ui/Aurora";
import { ContactFormLazy } from "./ContactFormLazy";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about remote backend roles, freelance work, or interesting builds — Indonesia-based, replies in English or Bahasa.",
};

export default function ContactPage() {
  return (
    <div className="relative">
      <Aurora className="opacity-50" />
      <Container variant="wide" className="relative z-10 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <header className="mb-12 max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
              / contact
            </p>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
              <span className="text-gradient">Let&apos;s</span>{" "}
              <span className="text-gradient-accent">build something.</span>
            </h1>
            <p className="mt-6 text-balance text-lg leading-relaxed text-secondary">
              Open to remote backend / full-stack roles, freelance projects, and
              collaborations on Indonesian-market SaaS. The form below is the
              fastest path — replies typically within 24 hours.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <ContactFormLazy />
            </div>

            <aside className="space-y-3">
              <div className="glass rounded-2xl p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
                  Direct
                </p>
                <a
                  href="mailto:aldirifaiemail@gmail.com"
                  className="group mt-3 flex items-start gap-3 transition-colors"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
                  <span className="break-all text-sm text-primary transition-colors group-hover:text-accent">
                    aldirifaiemail@gmail.com
                  </span>
                </a>
              </div>

              <div className="glass rounded-2xl p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
                  Elsewhere
                </p>
                <ul className="mt-3 space-y-2.5 text-sm">
                  <li>
                    <a
                      href="https://github.com/aldirifai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-secondary transition-colors hover:text-accent"
                    >
                      <Github className="size-4 text-muted transition-colors group-hover:text-accent" />
                      github.com/aldirifai
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com/in/aldirifai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-secondary transition-colors hover:text-accent"
                    >
                      <Linkedin className="size-4 text-muted transition-colors group-hover:text-accent" />
                      linkedin.com/in/aldirifai
                    </a>
                  </li>
                </ul>
              </div>

              <div className="glass rounded-2xl p-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
                  Working hours
                </p>
                <ul className="mt-3 space-y-2.5 text-sm text-secondary">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-muted" />
                    Gresik, East Java · WIB / GMT+7
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-muted" />
                    Mon–Fri, 09:00–22:00 WIB · async-friendly
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </div>
  );
}
