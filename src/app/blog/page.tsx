import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays, notes, and project updates.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Writing
        </h1>
        <p className="mt-3 text-[var(--color-ink-muted)]">
          Essays and notes. Updated whenever there&apos;s something worth saying.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-[var(--color-ink-muted)]">
          No posts yet. Add an MDX file in <code>content/posts/</code>.
        </p>
      ) : (
        <ul className="-mx-4 grid gap-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </ul>
      )}
    </section>
  );
}
