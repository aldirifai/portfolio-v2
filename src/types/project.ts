export type ProjectStatus =
  | "in-progress"
  | "shipped"
  | "live"
  | "architecture-phase"
  | "archived";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  stack: string[];
  year: string;
  status?: ProjectStatus;
  role?: string;
  featured: boolean;
  ogImage?: string;
  links?: {
    repo?: string;
    demo?: string;
  };
};
