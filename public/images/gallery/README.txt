Photo gallery
=============

Drop image files into this folder and they'll automatically appear in the
auto-scrolling marquee on the home page (between the three doors and the
footer).

Conventions
-----------

- Supported formats: .jpg / .jpeg / .png / .webp / .avif / .gif
- Files appear in case-insensitive alphabetical order.
  To control the sequence, prefix with a number, e.g.:
      01-koko-london.jpg
      02-pacha-buzios.jpg
      03-burning-man.webp
- Aspect ratios are preserved. The marquee is a fixed-height strip
  (clamps between 220px and 380px tall) and each photo gets its
  natural width at that height. Mix portrait and landscape freely.
- Filenames are never displayed to visitors — name them however helps
  you keep them organised internally.
- For best performance, pre-optimise to .webp or .avif before dropping
  in. The marquee uses plain <img> tags (not next/image) so no
  build-time resizing happens.

Behaviour
---------

- If this folder is empty (only this README present), the gallery
  section is suppressed entirely — no empty gap on the page.
- The marquee speed scales with the number of photos so 6 photos and
  20 photos both feel cinematic, not rushed or sluggish.
- Hovering pauses the scroll.
- Users with `prefers-reduced-motion: reduce` see a static row instead.

Removing the gallery
--------------------

To temporarily hide the section, either:
  a) Move/rename all image files out of this folder, or
  b) Comment out <GalleryMarquee /> in app/page.tsx
