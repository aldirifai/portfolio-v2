export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime?: string;
  tags?: string[];
  draft?: boolean;
};
