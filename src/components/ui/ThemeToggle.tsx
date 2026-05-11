"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-gate to avoid SSR/CSR theme mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="size-9" aria-hidden />;
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="glass group relative inline-flex size-9 items-center justify-center overflow-hidden rounded-full text-secondary transition-all hover:border-border-strong hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <span className="relative">
        <Sun
          size={15}
          className="absolute inset-0 transition-all duration-300 dark:scale-0 dark:rotate-90 dark:opacity-0"
        />
        <Moon
          size={15}
          className="scale-0 rotate-90 opacity-0 transition-all duration-300 dark:scale-100 dark:rotate-0 dark:opacity-100"
        />
      </span>
    </button>
  );
}
