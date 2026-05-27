import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 text-center">
      <p className="text-sm font-medium tracking-wider text-[var(--color-ink-muted)] uppercase">
        404
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Lost in the static.
      </h1>
      <p className="mt-4 text-[var(--color-ink-muted)]">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] hover:opacity-90"
      >
        ← Back home
      </Link>
    </section>
  );
}
