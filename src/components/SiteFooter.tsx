import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 w-full max-w-3xl px-6 pb-10 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-3 border-t border-black/10 pt-6 text-xs text-[var(--color-ink-muted)] sm:flex-row sm:items-center dark:border-white/10">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <a
              href={site.social.github}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-[var(--foreground)]"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={site.social.x}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-[var(--foreground)]"
            >
              X
            </a>
          </li>
          <li>
            <a
              href={site.social.email}
              className="hover:text-[var(--foreground)]"
            >
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
