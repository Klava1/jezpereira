import Link from 'next/link';

type Props = {
  number: string;
  title: string;
  titleEm?: string;
  text: string;
  href: string;
  cta: string;
};

export function Door({ number, title, titleEm, text, href, cta }: Props) {
  return (
    <Link
      href={href}
      className="group relative block p-8 sm:p-12 border border-line overflow-hidden
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        hover:border-line-strong hover:-translate-y-1"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(135deg, var(--color-accent-faint), transparent 60%)' }}
      />
      <div className="relative z-10">
        <div className="font-mono text-[0.9rem] tracking-[0.32em] uppercase text-ink-mute mb-8">{number}</div>
        <h3 className="font-serif text-[2.6rem] font-normal leading-tight tracking-[-0.015em] mb-5">
          {title}{' '}
          {titleEm && <em className="italic text-accent">{titleEm}</em>}
        </h3>
        <p className="font-serif italic text-[1.3rem] leading-relaxed text-ink-soft mb-8">{text}</p>
        <span className="font-mono text-[0.9rem] tracking-[0.26em] uppercase text-accent">{cta}</span>
      </div>
    </Link>
  );
}
