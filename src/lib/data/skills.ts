import type { SkillCategory } from "@/types/skill";

export const skills: SkillCategory[] = [
  {
    name: "Backend",
    skills: ["PHP", "Laravel", "Lumen", "Python", "FastAPI", "Go (learning)", "Rust (learning)"],
  },
  {
    name: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Bootstrap"],
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "MySQL", "Redis", "Relational design"],
  },
  {
    name: "Infrastructure",
    skills: ["Docker", "AWS", "IDCloudHost VPS", "Nginx", "cPanel"],
  },
  {
    name: "Auth & Security",
    skills: [
      "OTP authentication",
      "Social login",
      "JWT",
      "Argon2id",
      "AES-256-GCM",
    ],
  },
  {
    name: "Integrations",
    skills: [
      "Payment gateways",
      "Third-party APIs",
      "Telegram Bot API",
      "OpenRouter",
    ],
  },
  {
    name: "Tools",
    skills: ["Postman", "Swagger/OpenAPI", "Git", "Claude Code", "Jira", "ClickUp"],
  },
];
