import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";

import { getAllPostSlugs, getPostBySlug } from "@/lib/content";
import { mdxComponents } from "@/mdx-components";
import { formatDate } from "@/lib/utils";
import { site } from "@/lib/site";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { dark: "github-dark-dimmed", light: "github-light" },
  keepBackground: false,
};

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${site.url}${post.url}`;
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url,
      publishedTime: post.frontmatter.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  };
}

export default async function PostPage({ params }: RouteParams) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="py-16">
      <Link
        href="/blog"
        className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--foreground)]"
      >
        ← All writing
      </Link>

      <header className="mt-6 mb-10">
        <div className="flex items-center gap-3 text-sm text-[var(--color-ink-muted)]">
          <time dateTime={post.frontmatter.date}>
            {formatDate(post.frontmatter.date)}
          </time>
          <span aria-hidden>·</span>
          <span>{post.readingTimeMinutes} min read</span>
        </div>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {post.frontmatter.title}
        </h1>
        {post.frontmatter.description ? (
          <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
            {post.frontmatter.description}
          </p>
        ) : null}
      </header>

      <div className="prose-jez">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypePrettyCode, prettyCodeOptions],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}
