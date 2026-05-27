import Link from "next/link";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="mx-auto w-full max-w-3xl px-6 sm:px-8">
      <nav className="flex items-center justify-between py-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight hover:opacity-80"
        >
          {site.name}
        </Link>
        <ul className="flex items-center gap-5 text-sm text-[var(--color-ink-muted)]">
          {site.nav
            .filter((item) => item.href !== "/")
            .map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition hover:text-[var(--foreground)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
}
