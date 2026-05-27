import Link from "next/link";
import { Hero } from "@/components/Hero";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/content";

export default function HomePage() {
  const recent = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />

      <section className="mt-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Recent writing</h2>
          <Link
            href="/blog"
            className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--foreground)]"
          >
            All posts →
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="text-[var(--color-ink-muted)]">
            No posts yet. Add an MDX file in <code>content/posts/</code>.
          </p>
        ) : (
          <ul className="-mx-4 grid gap-2">
            {recent.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
