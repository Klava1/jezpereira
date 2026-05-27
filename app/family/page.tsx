import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { FamilyCard } from '@/components/FamilyCard';

export const metadata: Metadata = {
  title: 'The Family — SYCK Talent, YU Artists, Lost in Musyck, SYCK Records',
  description:
    'The SYCK Group — four arms shaping the sound of London, Paris and Miami. Co-founded by Jez Pereira in 2015.',
};

export default function FamilyPage() {
  return (
    <>
      <PageHeader
        overline="The Family"
        title={<>He built it so <em className="italic text-accent">others could feel it too</em>.</>}
        lede="In 2015, Jez Pereira and his co-founder Laura launched SYCK Talent. It has since become four arms — an agency, a management company, an event series, and a label."
      />

      <div className="container-wide py-16">
        <div className="max-w-[600px] mb-16">
          <p className="font-serif italic text-[1.65rem] leading-snug text-ink-soft">
            SYCK works with brands like Flannels, Gucci and Vogue, and venues across London, Paris and Miami.
            The mantra hasn&rsquo;t changed since the first day: <em className="not-italic text-accent">it&rsquo;s about the You, not the I.</em>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FamilyCard
            type="Arm One · DJ Agency"
            name="SYCK"
            nameEm="Talent"
            desc="A bespoke DJ agency operating across the UK, Paris, and Miami. Shaping the sound of brands and venues that take their music seriously."
            href="https://sycktalent.com/"
            linkLabel="sycktalent.com →"
          />
          <FamilyCard
            type="Arm Two · Management"
            name="YU"
            nameEm="Artists"
            desc="An artist management company built to give hand-picked talent the platform, the patience, and the opportunities they need to grow into their art."
            href="https://yuartists.com/"
            linkLabel="yuartists.com →"
          />
          <FamilyCard
            type="Arm Three · Events"
            name="Lost in"
            nameEm="Musyck"
            desc="A curated event series — a journey through the dimensions of sound. Recent productions include a Jez Pereira live show at KOKO, London (2025)."
            href="https://lostinmusyck.com/"
            linkLabel="lostinmusyck.com →"
          />
          <FamilyCard
            type="Arm Four · Record Label"
            name="SYCK"
            nameEm="Records"
            desc="The newest arm — a record label born from the same ethos. To give the artists in the family a home for the music they're making."
            linkLabel="Coming soon"
          />
        </div>

        <div className="mt-24 pt-16 border-t border-line text-center">
          <p className="font-serif italic leading-tight tracking-[-0.015em] text-ink max-w-[700px] mx-auto text-[clamp(1.95rem,3.9vw,2.95rem)]">
            It&rsquo;s about the <em className="not-italic text-accent">You</em>, not the <em className="not-italic text-accent">I</em>.
          </p>
        </div>
      </div>
    </>
  );
}
