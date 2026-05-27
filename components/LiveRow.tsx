import type { Gig } from '@/lib/types';

export function LiveRow({ gig }: { gig: Gig }) {
  return (
    <li className="grid grid-cols-1 sm:grid-cols-[130px_1fr_1fr] gap-2 sm:gap-8 items-baseline py-7 border-b border-line">
      <span className="font-mono text-[1.1rem] tracking-wider text-ink-mute">{gig.year}</span>
      <h3 className="font-serif text-[1.65rem] tracking-[-0.01em]" dangerouslySetInnerHTML={{ __html: renderEm(gig.venue) }} />
      <span className="font-mono text-[0.9rem] tracking-[0.22em] uppercase text-ink-soft">{gig.location}</span>
    </li>
  );
}

// Allow simple inline italics in the venue field using *asterisks*
function renderEm(s: string) {
  return s.replace(/\*(.+?)\*/g, '<em class="italic text-accent">$1</em>');
}
