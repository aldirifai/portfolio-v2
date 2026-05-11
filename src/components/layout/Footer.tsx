import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

const SOCIAL_LINKS = [
  { href: "https://github.com/aldirifai", label: "GitHub", Icon: Github },
  { href: "https://www.linkedin.com/in/aldirifai", label: "LinkedIn", Icon: Linkedin },
  { href: "https://twitter.com/aldirifai1999", label: "Twitter", Icon: Twitter },
  { href: "mailto:aldirifaiemail@gmail.com", label: "Email", Icon: Mail },
];

const FOOTER_NAV = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent"
      />
      <Container variant="wide" className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-sm font-bold tracking-wider text-primary"
            >
              <span className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-bg-elevated/60 backdrop-blur-md">
                AR
              </span>
              <span>aldirifai.com</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-secondary">
              Senior backend engineer building agentic SaaS for the Indonesian
              market — open to remote work worldwide.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
              Sitemap
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/feed.xml"
                  className="text-secondary transition-colors hover:text-accent"
                >
                  RSS
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
              Reach out
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                    className="group inline-flex items-center gap-2 text-secondary transition-colors hover:text-accent"
                  >
                    <Icon size={14} />
                    {label}
                    {href.startsWith("http") && (
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] tracking-tight text-muted">
            © {new Date().getFullYear()} Muhamad Aldi Rifai. Crafted in Gresik,
            Indonesia.
          </p>
          <p className="font-mono text-[11px] tracking-tight text-muted">
            Built with Next.js · Tailwind v4 · MDX
          </p>
        </div>
      </Container>
    </footer>
  );
}
