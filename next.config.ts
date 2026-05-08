import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Turbopack requires plugin options to be JSON-serializable, so plugins are
// referenced by package name here. The same plugins are imported as functions
// in src/lib/mdx-plugins.ts for the next-mdx-remote/rsc path that powers
// content/* compilation.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-pretty-code",
        {
          theme: { light: "github-light", dark: "github-dark-dimmed" },
          keepBackground: false,
        },
      ],
      ["rehype-autolink-headings", { behavior: "wrap" }],
    ],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
