export type ProjectStatus =
  | "in-progress"
  | "shipped"
  | "live"
  | "architecture-phase"
  | "archived";

export type ProjectLinks = {
  repo?: string;
  demo?: string;
  relatedPosts?: string[];
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  stack: string[];
  year: string;
  status?: ProjectStatus;
  role?: string;
  featured: boolean;
  coverImage?: string;
  links?: ProjectLinks;
};
