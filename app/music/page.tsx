import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { SectionHeading } from '@/components/SectionHeading';
import { ReleaseRow } from '@/components/ReleaseRow';
import { getReleases } from '@/lib/content';

export const metadata: Metadata = {
  title: 'The Music — Selected releases, remixes and mixes',
  description:
    "Selected music by Jez Pereira — including S&S Records remixes of Frankie Knuckles' Baby Wants to Ride, Steve 'Silk' Hurley's Jack Your Body, and Common ft. Kanye West.",
};

const MIX_LINKS = [
  { href: 'https://soundcloud.com/jezpereira', label: 'SoundCloud' },
  { href: 'https://www.mixcloud.com/jezpereira/', label: 'Mixcloud' },
  { href: 'https://open.spotify.com/artist/4Yxvfc78HHLFFJRbRpjXM4', label: 'Spotify' },
  { href: 'https://www.beatport.com/artist/jez-pereira/107581', label: 'Beatport' },
];

export default function MusicPage() {
  const releases = getReleases();

  return (
    <>
      <PageHeader
        overline="The Music"
        title={<>Selected <em className="italic text-accent">works</em>.</>}
        lede={`Remixes for the architects of house — Frankie Knuckles, Steve "Silk" Hurley — and a Common × Kanye West rework on S&S Records, Chicago.`}
      />

      <div className="container-wide py-16">
        <SectionHeading first>Remixes &amp; Releases</SectionHeading>
        <ul className="list-none">
          {releases.map((release) => (
            <ReleaseRow key={release.slug} release={release} />
          ))}
        </ul>

        <SectionHeading>Find the rest</SectionHeading>
        <div className="flex flex-wrap gap-6 py-4">
          {MIX_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              rel="noopener"
              className="font-mono text-[0.9rem] tracking-[0.26em] uppercase text-ink pb-2 border-b border-accent transition-[padding] hover:pb-3"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
