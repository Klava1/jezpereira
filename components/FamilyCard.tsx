type Props = {
  type: string;
  name: string;
  nameEm: string;
  desc: string;
  href?: string;
  linkLabel: string;
};

export function FamilyCard({ type, name, nameEm, desc, href, linkLabel }: Props) {
  const inner = (
    <div className="relative z-10 flex flex-col h-full">
      <p className="font-mono text-[0.85rem] tracking-[0.32em] uppercase text-ink-mute mb-6">{type}</p>
      <h3 className="font-serif font-normal text-[2.9rem] leading-none tracking-[-0.02em] mb-4">
        {name} <em className="italic text-accent">{nameEm}</em>
      </h3>
      <p className="font-serif italic text-[1.3rem] leading-relaxed text-ink-soft mb-8 flex-1">{desc}</p>
      <span className={`font-mono text-[0.85rem] tracking-[0.26em] uppercase ${href ? 'text-accent' : 'text-ink-mute'}`}>
        {linkLabel}
      </span>
    </div>
  );

  const className = `group relative block p-10 sm:p-12 bg-surface border border-line overflow-hidden min-h-[280px]
    transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
    hover:border-line-strong hover:-translate-y-1`;

  const overlay = (
    <div
      aria-hidden
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background: 'radial-gradient(circle at 100% 0%, var(--color-accent-faint), transparent 70%)' }}
    />
  );

  return href ? (
    <a href={href} rel="noopener" className={className}>
      {overlay}
      {inner}
    </a>
  ) : (
    <div className={className}>
      {overlay}
      {inner}
    </div>
  );
}
