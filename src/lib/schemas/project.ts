import { z } from "zod";

export const ProjectStatusSchema = z.enum([
  "in-progress",
  "shipped",
  "live",
  "architecture-phase",
  "archived",
]);

export const ProjectLinksSchema = z.object({
  repo: z.string().url().optional(),
  demo: z.string().url().optional(),
  relatedPosts: z.array(z.string()).optional(),
});

export const ProjectFrontmatterSchema = z.object({
  title: z.string().min(1),
  tagline: z.string().min(1),
  stack: z.array(z.string()).min(1),
  year: z.string().min(1),
  status: ProjectStatusSchema.optional(),
  role: z.string().optional(),
  featured: z.boolean(),
  coverImage: z.string().optional(),
  links: ProjectLinksSchema.optional(),
});

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;
