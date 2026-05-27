import { Hero } from '@/components/Hero';
import { Door } from '@/components/Door';
import { GalleryMarquee } from '@/components/GalleryMarquee';

export default function Home() {
  return (
    <>
      <Hero />

      {/* Currently Playing */}
      <section id="now" className="container-wide py-24 text-center border-y border-line">
        <p className="font-mono text-[0.9rem] tracking-[0.32em] uppercase text-ink-mute mb-6">Currently Playing</p>
        <h2 className="font-serif font-normal leading-tight tracking-[-0.02em] mb-4 text-[clamp(2.6rem,6.5vw,4.5rem)]">
          Lost in Musyck <em className="italic text-accent">at KOKO</em>, London
        </h2>
        <p className="font-mono text-[0.95rem] tracking-[0.22em] uppercase text-ink-soft mb-8">
          2025 · Camden · A Lost in Musyck Production
        </p>
        <a
          href="/live"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-mono text-[0.9rem] tracking-[0.26em] uppercase text-ink pb-2 border-b border-accent"
        >
          Selected Shows
        </a>
      </section>

      {/* Photo gallery — auto-renders any image dropped into
          public/images/gallery/. Suppresses itself when the folder is empty. */}
      <GalleryMarquee />

      {/* Three doors */}
      <section className="container-wide py-32 grid grid-cols-1 md:grid-cols-3 gap-8" aria-label="Site sections">
        <Door
          number="01 — The Bio"
          title="The"
          titleEm="Story"
          text="From a kid in Orlem who couldn't afford a nightclub, to the booths of London's most exclusive rooms. Thirty-two years in three movements."
          href="/story"
          cta="Read →"
        />
        <Door
          number="02 — Sound"
          title="The"
          titleEm="Music"
          text={`Selected mixes, remixes for Frankie Knuckles and Steve "Silk" Hurley, and a Common × Kanye West remix that hits different.`}
          href="/music"
          cta="Listen →"
        />
        <Door
          number="03 — The Group"
          title="The"
          titleEm="Family"
          text="SYCK Talent. YU Artists. Lost in Musyck. SYCK Records. He built it so others could feel it too."
          href="/family"
          cta="Enter →"
        />
      </section>
    </>
  );
}
