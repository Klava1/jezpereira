import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { MusicPlayer } from '@/components/MusicPlayer';
import { MediaProvider } from '@/components/MediaProvider';
import './globals.css';

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;800;900&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=IBM+Plex+Mono:wght@300;400;500&display=swap"
        />
      </head>
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
