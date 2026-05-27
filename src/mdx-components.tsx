import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";

export const mdxComponents: MDXComponents = {
  a: ({ href = "#", children, ...rest }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...rest}>
        {children}
      </a>
    );
  },
  img: (props) => {
    const { alt = "", ...rest } = props as ImageProps;
    return (
      <Image
        {...rest}
        alt={alt}
        sizes="(min-width: 768px) 720px, 100vw"
        className="my-6 h-auto w-full rounded-xl"
      />
    );
  },
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...mdxComponents, ...components };
}
