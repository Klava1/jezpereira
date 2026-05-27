import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { PageHeader } from '@/components/PageHeader';
import { getBioMovements } from '@/lib/content';

export const metadata: Metadata = {
  title: 'The Story — Mumbai to London, thirty-two years in motion',
  description:
    "Jez Pereira's story — from Orlem, Mumbai, to the booths of London's most exclusive rooms. The teenager who couldn't afford a nightclub became the DJ who shapes the world's most curated sound.",
};

const mdxComponents = {
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="font-serif text-[1.15rem] leading-[1.75] text-ink mb-6" />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className="italic text-accent" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="my-12 pl-8 border-l-2 border-accent font-serif italic text-[2rem] leading-snug text-ink"
    />
  ),
};

export default function StoryPage() {
  const movements = getBioMovements();

  return (
    <>
      <PageHeader
        overline="The Story"
        title={<>Thirty-two years <em className="italic text-accent">in motion</em>.</>}
        lede="From Orlem, Mumbai, to the booths of London's most exclusive rooms. A story told in three movements."
      />

      <article className="max-w-[720px] mx-auto px-[clamp(1.25rem,4vw,3rem)] py-16 pb-32">
        {movements.map((m) => (
          <section key={m.slug} className="mb-24 last:mb-0">
            <p className="font-mono text-[0.9rem] tracking-[0.32em] uppercase text-accent mb-5 flex items-center gap-4">
              <span>{m.movement}</span>
              <span aria-hidden className="flex-1 h-px bg-line" />
            </p>
            <h2 className="font-serif italic font-normal leading-tight tracking-[-0.02em] mb-8 text-[clamp(2.6rem,5.2vw,3.9rem)]">
              {m.title}
            </h2>
            <div>
              <MDXRemote source={m.body} components={mdxComponents} />
            </div>
          </section>
        ))}
      </article>
    </>
  );
}
