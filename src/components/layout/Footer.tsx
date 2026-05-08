import { Container } from "@/components/layout/Container";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border py-8">
      <Container variant="wide">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Muhamad Aldi Rifai. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/aldirifai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/aldirifai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://twitter.com/aldirifai1999"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
            >
              <Twitter size={18} />
            </a>
            <a
              href="mailto:aldirifaiemail@gmail.com"
              aria-label="Email"
              className="text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
