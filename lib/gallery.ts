import fs from 'node:fs';
import path from 'node:path';

const GALLERY_DIR = path.join(process.cwd(), 'public/images/gallery');
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

/**
 * Read every image in `public/images/gallery/` and return their public URLs.
 *
 * The folder is the single source of truth — drop a file in and it shows up.
 * Files are returned in case-insensitive alphabetical order, so you can
 * control sequence by prefixing names (e.g. `01-koko.jpg`, `02-pacha.jpg`).
 *
 * Runs at build / request time in a Server Component, so it never ships to
 * the browser bundle.
 */
export function getGalleryImages(): string[] {
  if (!fs.existsSync(GALLERY_DIR)) return [];
  return fs
    .readdirSync(GALLERY_DIR)
    .filter((name) => IMAGE_EXT.test(name) && !name.startsWith('.'))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    .map((name) => `/images/gallery/${name}`);
}
