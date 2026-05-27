const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/jezpereira/', label: 'Instagram' },
  { href: 'https://soundcloud.com/jezpereira', label: 'SoundCloud' },
  { href: 'https://www.mixcloud.com/jezpereira/', label: 'Mixcloud' },
  { href: 'https://open.spotify.com/artist/4Yxvfc78HHLFFJRbRpjXM4', label: 'Spotify' },
  { href: 'https://ra.co/dj/pereira', label: 'Resident Advisor' },
];

const FAMILY_LINKS = [
  { href: 'https://sycktalent.com/', label: 'SYCK Talent' },
  { href: 'https://yuartists.com/', label: 'YU Artists' },
  { href: 'https://lostinmusyck.com/', label: 'Lost in Musyck' },
  { href: null, label: 'SYCK Records' },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface px-[clamp(1.25rem,4vw,3rem)] pt-16 pb-8" role="contentinfo">
      <div className="max-w-(--container-wide) mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h4 className="font-mono text-[0.85rem] tracking-[0.32em] uppercase text-ink-mute mb-6 font-normal">Booking</h4>
          <a href="mailto:info@jezpereira.com" className="block font-serif italic text-[1.5rem] text-ink mb-2 hover:opacity-80">
            info@jezpereira.com
          </a>
          <a href="tel:+447878824441" className="font-mono text-[1.1rem] tracking-wider text-ink-soft hover:text-ink">
            +44 787 882 4441
          </a>
        </div>

        <div>
          <h4 className="font-mono text-[0.85rem] tracking-[0.32em] uppercase text-ink-mute mb-6 font-normal">Find</h4>
          <ul className="space-y-3.5">
            {SOCIAL_LINKS.map((l) => (
              <li key={l.href} className="font-serif text-[1.3rem] text-ink-soft hover:text-ink">
                <a href={l.href} rel="noopener">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[0.85rem] tracking-[0.32em] uppercase text-ink-mute mb-6 font-normal">The Family</h4>
          <ul className="space-y-3.5">
            {FAMILY_LINKS.map((l) =>
              l.href ? (
                <li key={l.label} className="font-serif text-[1.3rem] text-ink-soft hover:text-ink">
                  <a href={l.href} rel="noopener">{l.label}</a>
                </li>
              ) : (
                <li key={l.label} className="font-serif text-[1.3rem] text-ink-soft">{l.label}</li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-12 border-t border-line text-center font-serif italic text-[1.3rem] text-ink-mute">
        Musyck is a feeling — and when you can feel it, you understand it better.
      </div>

      <div className="mt-8 pt-6 border-t border-line text-center font-mono text-[0.85rem] tracking-[0.22em] uppercase text-ink-faint">
        &copy; Jez Pereira &middot; Est. 1993 &middot; All rights reserved
      </div>
    </footer>
  );
}
