import type { Pluggable } from "unified";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

const remarkPlugins: Pluggable[] = [remarkGfm];

const rehypePlugins: Pluggable[] = [
  rehypeSlug,
  [
    rehypePrettyCode,
    {
      theme: { light: "github-light", dark: "github-dark-dimmed" },
      keepBackground: false,
    },
  ],
  [rehypeAutolinkHeadings, { behavior: "wrap" }],
];

export const mdxOptions = {
  remarkPlugins,
  rehypePlugins,
};
