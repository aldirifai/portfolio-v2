import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinkClass =
  "rounded-sm text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <Container variant="wide">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            aria-label="Aldi Rifai — Home"
            className="rounded-sm font-mono text-sm font-bold tracking-wider text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
          >
            AR
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <nav aria-label="Primary" className="flex items-center gap-4 text-sm sm:gap-6">
              <Link href="/about" className={navLinkClass}>
                About
              </Link>
              <Link href="/projects" className={navLinkClass}>
                Projects
              </Link>
              <Link href="/blog" className={navLinkClass}>
                Blog
              </Link>
              <Link href="/contact" className={navLinkClass}>
                Contact
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
