"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-bg/70 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/60"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container variant="wide">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            aria-label="Aldi Rifai — Home"
            className="group inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
          >
            <span className="relative inline-flex size-8 items-center justify-center overflow-hidden rounded-lg border border-border bg-bg-elevated/60 backdrop-blur-md font-mono text-xs font-bold tracking-wider text-primary transition-all group-hover:border-border-strong">
              <span
                aria-hidden
                className="absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, var(--accent-soft), transparent 70%)",
                }}
              />
              AR
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-wider text-muted sm:inline">
              aldirifai.com
            </span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <nav
              aria-label="Primary"
              className="glass hidden items-center gap-0.5 rounded-full p-1 sm:flex"
            >
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      isActive
                        ? "bg-surface-strong text-primary shadow-[inset_0_0_0_1px_var(--border-strong)]"
                        : "text-secondary hover:text-primary",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <nav
              aria-label="Primary mobile"
              className="flex items-center gap-3 text-sm sm:hidden"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-sm text-xs text-secondary transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
