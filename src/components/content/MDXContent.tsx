import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/content/MDXComponents";
import { mdxOptions } from "@/lib/mdx-plugins";

type MDXContentProps = {
  source: string;
};

export function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{ mdxOptions }}
    />
  );
}
