import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface PostFrontmatter {
  title: string;
  description?: string;
  date: string;
  draft?: boolean;
  tags?: string[];
}

export interface Post {
  slug: string;
  url: string;
  frontmatter: PostFrontmatter;
  readingTimeMinutes: number;
  content: string;
}

function readPostFile(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, "posts", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;

  return {
    slug,
    url: `/blog/${slug}`,
    frontmatter: fm,
    readingTimeMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    content,
  };
}

export function getAllPostSlugs(): string[] {
  const dir = path.join(CONTENT_DIR, "posts");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPosts(): Post[] {
  return getAllPostSlugs()
    .map((slug) => readPostFile(slug))
    .filter((p): p is Post => p !== null && !p.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

export function getPostBySlug(slug: string): Post | null {
  const post = readPostFile(slug);
  if (!post || post.frontmatter.draft) return null;
  return post;
}
