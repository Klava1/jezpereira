import React from 'react';

type Props = {
  overline: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
};

export function PageHeader({ overline, title, lede }: Props) {
  return (
    <section className="container-wide pt-32 pb-16 border-b border-line">
      <p className="overline mb-6">{overline}</p>
      <h1 className="font-serif font-normal leading-none tracking-[-0.025em] mb-6 text-[clamp(3.25rem,9vw,7rem)]">
        {title}
      </h1>
      {lede && (
        <p className="font-serif italic leading-snug text-ink-soft max-w-[38em] text-[clamp(1.5rem,2.6vw,2rem)]">
          {lede}
        </p>
      )}
    </section>
  );
}
