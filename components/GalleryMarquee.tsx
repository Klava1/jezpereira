import { getGalleryImages } from '@/lib/gallery';

/**
 * Auto-scrolling photo strip rendered between the doors and the footer on
 * the home page. Reads photos from `public/images/gallery/` via the
 * `getGalleryImages` helper; if the folder is empty the section is
 * suppressed entirely so the page never shows a blank gap.
 *
 * Implementation notes:
 *
 *   - The track renders the image list twice. The second copy is
 *     `aria-hidden` (assistive tech sees a single set of photos) and the
 *     CSS keyframe `marquee` translates the track from 0 → -50%, which is
 *     exactly one copy's width. That gives a seamless ribbon — when the
 *     animation snaps back to 0% the visible content is unchanged.
 *
 *   - Animation duration scales with the number of photos so a 6-photo
 *     gallery doesn't whip past and a 20-photo gallery doesn't crawl.
 *     `~8s per photo` lands at "cinematic but watchable".
 *
 *   - Hover pauses the animation (`animation-play-state: paused`) so you
 *     can actually study a single frame.
 *
 *   - We use `<img>` rather than `next/image` because the photos are
 *     dropped in by the user with arbitrary aspect ratios — letting the
 *     browser resolve intrinsic dimensions keeps the marquee a "fixed
 *     height, auto width" strip without a build-time dimension manifest.
 *     `loading="lazy"` and `decoding="async"` keep it cheap.
 */
export function GalleryMarquee() {
  const images = getGalleryImages();
  if (images.length === 0) return null;

  // ~8 seconds per photo, with a floor so very small galleries still feel
  // unhurried. The track is twice the gallery length, but `transform: -50%`
  // means a single "loop" traverses one copy worth of width — so duration
  // here = how long it takes a single photo to drift across the screen.
  const animationDuration = `${Math.max(45, images.length * 8)}s`;

  return (
    <section
      aria-label="Photo gallery"
      className="gallery-marquee relative w-full overflow-hidden py-20"
    >
      <div
        className="gallery-marquee-track flex w-max gap-4 will-change-transform"
        style={{ animationDuration }}
      >
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`a-${i}`}
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-[clamp(220px,32vh,380px)] w-auto shrink-0 object-cover select-none pointer-events-none"
          />
        ))}
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`b-${i}`}
            src={src}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-[clamp(220px,32vh,380px)] w-auto shrink-0 object-cover select-none pointer-events-none"
          />
        ))}
      </div>
    </section>
  );
}
