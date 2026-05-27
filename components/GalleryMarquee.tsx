import { getGalleryImages } from '@/lib/gallery';
import { GalleryMarqueeClient } from '@/components/GalleryMarqueeClient';

/**
 * Photo strip rendered between the doors and the footer on the home page.
 * This is a thin Server Component that:
 *
 *   1. Reads the list of photos from `public/images/gallery/` at build time
 *      (the `getGalleryImages` helper uses node:fs and never ships to the
 *      browser).
 *   2. Suppresses itself entirely if the folder is empty, so the page never
 *      shows a blank gap while photos are being staged.
 *   3. Delegates rendering + scroll-coupled motion to the client component,
 *      which needs DOM access to the global scroll event.
 *
 * Animation duration scales with photo count (~5s per photo, 30s floor) so
 * the strip feels cinematic regardless of how many images are dropped in.
 */
export function GalleryMarquee() {
  const images = getGalleryImages();
  if (images.length === 0) return null;

  const animationDuration = `${Math.max(30, images.length * 5)}s`;

  return <GalleryMarqueeClient images={images} animationDuration={animationDuration} />;
}
