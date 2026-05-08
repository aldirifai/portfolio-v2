import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "fintrack",
    title: "Fintrack",
    tagline: "Personal AI-powered finance tracker with Telegram input",
    stack: [
      "FastAPI",
      "Next.js PWA",
      "PostgreSQL 16",
      "Redis",
      "MinIO",
      "Telegram Bot",
      "OpenRouter",
    ],
    year: "2025–2026",
    status: "in-progress",
    role: "Solo builder",
    featured: true,
  },
  {
    slug: "password-manager-saas",
    title: "Password Manager SaaS",
    tagline: "Zero-knowledge password manager (1Password-inspired)",
    stack: ["Go", "Rust", "Tauri v2", "Argon2id", "AES-256-GCM", "WASM/FFI"],
    year: "2026",
    status: "architecture-phase",
    role: "Solo builder",
    featured: true,
  },
  {
    slug: "tipak",
    title: "TIPAK",
    tagline:
      "Agricultural land management platform connecting farmers, inspectors, and regional coordinators",
    stack: ["Laravel", "MySQL", "Real-time monitoring dashboard"],
    year: "2024",
    status: "shipped",
    role: "Backend lead",
    featured: true,
  },
  {
    slug: "mt5-trading-bot",
    title: "MT5 Trading Bot",
    tagline: "Algorithmic scalping bot for XAUUSD & BTCUSD with EMA + ICT liquidity sweeps",
    stack: ["Python", "MetaTrader 5", "Streamlit", "Telegram"],
    year: "2024",
    status: "live",
    role: "Solo builder",
    featured: false,
  },
  {
    slug: "inastex",
    title: "Inastex API Stack",
    tagline: "Containerized FastAPI platform with Postgres, Redis, and external admin access",
    stack: ["FastAPI", "Nginx", "PostgreSQL 15", "Redis", "pgAdmin", "Docker"],
    year: "2024",
    status: "shipped",
    role: "Backend engineer",
    featured: false,
  },
  {
    slug: "laravel-asset-management",
    title: "Laravel Asset Management System",
    tagline: "Internal asset tracking with depreciation scheduling and journal entry generation",
    stack: ["Laravel", "MySQL", "DataTables (server-side)", "Select2"],
    year: "2022",
    status: "shipped",
    role: "Fullstack",
    featured: false,
  },
];

export function getFeaturedProjects(limit?: number): Project[] {
  const featured = projects.filter((p) => p.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
