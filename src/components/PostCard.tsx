import Link from "next/link";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  return (
    <li className="group">
      <Link
        href={post.url}
        className="block rounded-2xl border border-transparent px-4 py-5 transition hover:border-black/10 hover:bg-black/[0.02] dark:hover:border-white/10 dark:hover:bg-white/[0.03]"
      >
        <div className="flex items-center gap-3 text-xs text-[var(--color-ink-muted)]">
          <time dateTime={post.frontmatter.date}>
            {formatDate(post.frontmatter.date)}
          </time>
          <span aria-hidden>·</span>
          <span>{post.readingTimeMinutes} min read</span>
        </div>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">
          {post.frontmatter.title}
        </h3>
        {post.frontmatter.description ? (
          <p className="mt-2 text-[var(--color-ink-muted)]">
            {post.frontmatter.description}
          </p>
        ) : null}
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)]">
          Read
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </Link>
    </li>
  );
}
