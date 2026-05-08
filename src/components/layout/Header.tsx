import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <Container variant="wide">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="font-mono text-sm font-bold tracking-wider text-primary transition-colors hover:text-accent"
          >
            AR
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="flex items-center gap-4 sm:gap-6 text-sm">
              <Link
                href="/about"
                className="text-secondary transition-colors hover:text-primary"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="text-secondary transition-colors hover:text-primary"
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="text-secondary transition-colors hover:text-primary"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-secondary transition-colors hover:text-primary"
              >
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
