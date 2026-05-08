import { z } from "zod";

export const PostFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be ISO format YYYY-MM-DD"),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
});

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;
