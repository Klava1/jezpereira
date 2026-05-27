type Props = { children: React.ReactNode; first?: boolean };

export function SectionHeading({ children, first }: Props) {
  return (
    <h2
      className={`font-mono text-[0.9rem] tracking-[0.32em] uppercase text-accent
        flex items-center gap-4 mb-8 ${first ? 'mt-0' : 'mt-24'}`}
    >
      <span>{children}</span>
      <span aria-hidden className="flex-1 h-px bg-line" />
    </h2>
  );
}
