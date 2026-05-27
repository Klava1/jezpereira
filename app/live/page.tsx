import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { SectionHeading } from '@/components/SectionHeading';
import { LiveRow } from '@/components/LiveRow';
import { getGigs } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Live — Selected performances, 1993 to today',
  description:
    'Selected live performances by Jez Pereira — including KOKO London (2025), Burning Man Tetris Stage (2013), Monaco Grand Prix, and a residency at Armani Privé Dubai.',
};

export default function LivePage() {
  const all = getGigs();
  const upcoming = all.filter((g) => g.upcoming);
  const past = all.filter((g) => !g.upcoming);

  return (
    <>
      <PageHeader
        overline="Live"
        title={<>Selected <em className="italic text-accent">shows</em>.</>}
        lede="A curated history of rooms. From a stage in the Nevada desert with the creator of Tetris, to a yacht at the Monaco Grand Prix, to a Lost in Musyck production at KOKO."
      />

      <div className="container-wide py-16">
        {upcoming.length > 0 && (
          <>
            <SectionHeading first>Currently on the calendar</SectionHeading>
            <ul className="list-none">
              {upcoming.map((gig) => <LiveRow key={gig.slug} gig={gig} />)}
            </ul>
          </>
        )}

        <SectionHeading first={upcoming.length === 0}>Selected past performances</SectionHeading>
        <ul className="list-none">
          {past.map((gig) => <LiveRow key={gig.slug} gig={gig} />)}
        </ul>

        <div className="mt-24 border border-line p-16 text-center">
          <p className="font-mono text-[0.9rem] tracking-[0.32em] uppercase text-ink-mute mb-6">Bookings</p>
          <h3 className="font-serif font-normal leading-tight tracking-[-0.02em] mb-4 text-[clamp(2.25rem,5.2vw,3.25rem)]">
            For shows, residencies, &amp; brand work
          </h3>
          <p className="font-mono text-[0.95rem] tracking-[0.22em] uppercase text-ink-soft mb-8">
            Booking handled directly · International enquiries welcome
          </p>
          <a
            href="mailto:info@jezpereira.com"
            className="inline-block font-mono text-[0.9rem] tracking-[0.26em] uppercase text-ink pb-2 border-b border-accent"
          >
            info@jezpereira.com
          </a>
        </div>
      </div>
    </>
  );
}
