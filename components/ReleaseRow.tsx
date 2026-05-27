import type { Release } from '@/lib/types';

export function ReleaseRow({ release }: { release: Release }) {
  const title = release.artist
    ? `${release.artist} — ${release.title}`
    : release.title;

  return (
    <li className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-2 sm:gap-8 items-baseline py-8 border-b border-line transition-[padding] duration-300 hover:pl-4">
      <span className="font-mono text-[1.1rem] tracking-wider text-ink-mute sm:min-w-[80px]">
        {release.year}
      </span>
      <div>
        <h3 className="font-serif font-normal tracking-[-0.01em] text-[clamp(1.65rem,3.25vw,2.15rem)]">
          {title.split('—').map((part, i, arr) => (
            <span key={i}>
              {i > 0 ? <span> — </span> : null}
              {i === arr.length - 1 ? <em className="italic">{part.trim()}</em> : part.trim()}
            </span>
          ))}
        </h3>
        {(release.remixer || release.note) && (
          <p className="font-serif italic text-[1.25rem] text-ink-soft mt-1">
            {[release.remixer, release.note].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
      {release.label && (
        <span className="font-mono text-[0.85rem] tracking-[0.22em] uppercase text-accent">{release.label}</span>
      )}
    </li>
  );
}
