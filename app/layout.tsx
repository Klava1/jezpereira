import type { Metadata } from 'next';
// Oswald is a tall, condensed industrial display sans (~0.4em advance per
// uppercase char) — it lets the H1 hold the poster-like presence the user
// wants while still fitting "JEZ PEREIRA" on one line at mobile widths.
// Big Shoulders (the merged Display+Text family) renders too wide at its
// default optical size for the headline to fit on iPhone-sized viewports.
import { Oswald, Fraunces, IBM_Plex_Mono } from 'next/font/google';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { MusicPlayer } from '@/components/MusicPlayer';
import { MediaProvider } from '@/components/MediaProvider';
import './globals.css';

// next/font self-hosts the woff2 files at build time and emits CSS variables
// that the @theme block in globals.css consumes. This eliminates the FOUC the
// hero title would otherwise suffer (Big Shoulders Display is highly condensed
// — when it's missing, the wider fallback overflows the mobile viewport before
// it loads). `display: 'swap'` lets the page paint immediately with a fallback,
// then swap in the web font once it's ready.
// Each font exposes itself through a `--font-…-loaded` CSS variable so
// globals.css can layer it ahead of the literal fallback stack in @theme,
// rather than overwriting Tailwind's `--font-…` token directly.
const fontDisplay = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display-loaded',
  display: 'swap',
});
const fontSerif = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif-loaded',
  display: 'swap',
});
const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono-loaded',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jezpereira.com'),
  title: {
    default: 'Jez Pereira — DJ, Producer, Founder · Music is a feeling',
    template: '%s · Jez Pereira',
  },
  description:
    "Jez Pereira — DJ, producer, and founder of SYCK Talent. Thirty-two years from Mumbai to London, shaping the sound of the world's most exclusive rooms.",
  openGraph: {
    type: 'profile',
    locale: 'en_GB',
    siteName: 'Jez Pereira',
    images: ['/images/og-cover.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSerif.variable} ${fontMono.variable}`}
    >
      <body>
        {/* JSON-LD structured data — Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Jez Pereira',
              jobTitle: ['DJ', 'Music Producer', 'Founder of SYCK Talent'],
              url: 'https://jezpereira.com/',
              birthPlace: {
                '@type': 'Place',
                name: 'Mumbai, India',
                address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressRegion: 'Orlem', addressCountry: 'IN' },
              },
              homeLocation: { '@type': 'Place', name: 'London, United Kingdom' },
              knowsAbout: ['House music', 'Deep house', 'Tech house', 'Afro house', 'DJ performance', 'Music production'],
              founder: { '@type': 'Organization', name: 'SYCK Talent', url: 'https://sycktalent.com/' },
              email: 'info@jezpereira.com',
              telephone: '+44-787-882-4441',
              sameAs: [
                'https://www.instagram.com/jezpereira/',
                'https://soundcloud.com/jezpereira',
                'https://www.mixcloud.com/jezpereira/',
                'https://open.spotify.com/artist/4Yxvfc78HHLFFJRbRpjXM4',
                'https://ra.co/dj/pereira',
              ],
            }),
          }}
        />
        <MediaProvider>
          <Nav />
          <main>{children}</main>
          <MusicPlayer />
          <Footer />
        </MediaProvider>
      </body>
    </html>
  );
}
