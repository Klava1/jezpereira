'use client';

import { useCallback, useEffect, useRef } from 'react';

type Props = {
  images: string[];
  animationDuration: string;
};

/**
 * Marquee physics.
 *
 * Three independent motion sources compose on top of the CSS autoplay
 * (which translates the inner track from 0 → -50% and back, infinitely,
 * giving a seamless infinite loop thanks to the duplicated photo list):
 *
 *   1. CSS keyframe autoplay  — always running, owns the base drift.
 *   2. Trackpad horizontal swipe → fed into `velocity`, integrated into
 *      `boost`, decays via FRICTION. Feels like "scrolling the strip".
 *   3. Arrow buttons          → set `targetBoost`. Each frame the engine
 *      tweens `boost` toward `targetBoost` (exponential ease). Feels
 *      like "next / previous picture".
 *
 * Inputs are mutually exclusive: starting a tween cancels in-flight
 * velocity, and a wheel event cancels an in-flight tween. This avoids
 * the "two motions fighting each other" feeling.
 *
 * `boost` is persistent (no decay to zero). Wherever the user leaves the
 * carousel, it stays there and autoplay continues drifting from that
 * point. The duplicated track makes arbitrary `boost` values wrap
 * seamlessly so there's no end-of-strip glitch.
 */
const FRICTION = 0.86;        // velocity decay per frame (~5 frames to half)
const WHEEL_MULTIPLIER = 1.5; // wheel deltaX → px/frame of velocity
const TWEEN_EASE = 0.18;      // higher = arrow snap is faster; 0.18 ≈ 250ms to settle
const FALLBACK_STEP = 400;    // arrow step (px) if photo widths not measured yet
const GAP_PX = 16;            // matches Tailwind `gap-4` on the track

export function GalleryMarqueeClient({ images, animationDuration }: Props) {
  // Outer section — the `wheel` listener attaches here so gestures only
  // count when the pointer is over the carousel.
  const sectionRef = useRef<HTMLElement>(null);
  // Wrapper div — its `translateX` is JS-driven and composes with the
  // inner track's CSS keyframe animation.
  const boostRef = useRef<HTMLDivElement>(null);
  // Track div — used to measure rendered photo widths.
  const trackRef = useRef<HTMLDivElement>(null);

  // Physics state lives in a ref so the wheel listener (set up once
  // inside useEffect) and the arrow click handlers can mutate the same
  // velocity field. Without this, click handlers would only see the
  // initial closed-over values.
  const stateRef = useRef({
    velocity: 0,
    boost: 0,
    targetBoost: null as number | null,
  });

  // Step size used by the arrow controls. Filled in from the rendered
  // width of the first photo + the gap, once images are loaded.
  const stepRef = useRef<number>(FALLBACK_STEP);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ------------------------------------------------------------------
    // Measure the first photo's rendered width so arrow clicks advance
    // by ~one photo. Updates on window resize.
    // ------------------------------------------------------------------
    const measureStep = () => {
      const firstImg = trackRef.current?.querySelector('img');
      if (firstImg && firstImg.offsetWidth > 0) {
        stepRef.current = firstImg.offsetWidth + GAP_PX;
      }
    };
    const trackImgs = trackRef.current
      ? Array.from(trackRef.current.querySelectorAll('img'))
      : [];
    // Re-measure as soon as the first image lays out
    if (trackImgs[0]) {
      if (trackImgs[0].complete) measureStep();
      else trackImgs[0].addEventListener('load', measureStep, { once: true });
    }
    window.addEventListener('resize', measureStep);

    // ------------------------------------------------------------------
    // Wheel listener — captures horizontal trackpad gestures only.
    // Vertical wheel events pass through to normal page scroll so the
    // user can still scroll the page when their pointer is on the
    // carousel.
    // ------------------------------------------------------------------
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        const s = stateRef.current;
        s.targetBoost = null; // cancel any active arrow tween
        // deltaX positive = swipe right-to-left = marquee should move left
        // = translateX more negative.
        s.velocity -= e.deltaX * WHEEL_MULTIPLIER;
      }
    };
    section.addEventListener('wheel', onWheel, { passive: false });

    // ------------------------------------------------------------------
    // Animation loop — runs every frame, integrates whichever motion
    // source is active (tween wins over velocity if both are set, but
    // they're cancelled against each other on input, so in practice
    // only one is active at a time).
    // ------------------------------------------------------------------
    let rafId = 0;
    let lastFrameTime = performance.now();

    const tick = (now: number) => {
      const frameRatio = Math.min(3, (now - lastFrameTime) / (1000 / 60));
      lastFrameTime = now;

      const s = stateRef.current;
      let changed = false;

      if (s.targetBoost !== null) {
        // Arrow tween: exponential ease toward target.
        const diff = s.targetBoost - s.boost;
        if (Math.abs(diff) < 0.5) {
          s.boost = s.targetBoost;
          s.targetBoost = null;
        } else {
          s.boost += diff * TWEEN_EASE * frameRatio;
        }
        changed = true;
      } else if (Math.abs(s.velocity) > 0.05) {
        // Velocity glide from wheel input.
        s.boost += s.velocity * frameRatio;
        s.velocity *= Math.pow(FRICTION, frameRatio);
        changed = true;
      }

      if (changed && boostRef.current) {
        boostRef.current.style.transform = `translate3d(${s.boost.toFixed(2)}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', measureStep);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Arrow handlers — set `targetBoost` so the tween in the tick loop
  // glides the carousel by one photo width.
  const nudgeForward = useCallback(() => {
    const s = stateRef.current;
    const startFrom = s.targetBoost ?? s.boost;
    s.velocity = 0;
    s.targetBoost = startFrom - stepRef.current; // forward = leftward
  }, []);
  const nudgeBackward = useCallback(() => {
    const s = stateRef.current;
    const startFrom = s.targetBoost ?? s.boost;
    s.velocity = 0;
    s.targetBoost = startFrom + stepRef.current; // backward = rightward
  }, []);

  return (
    // Outer wrapper = positioning context for the arrow buttons so they
    // can sit OUTSIDE the masked region (the section's mask fades
    // descendants at the viewport edges).
    <div className="relative">
      <section
        ref={sectionRef}
        aria-label="Photo gallery"
        className="gallery-marquee relative w-full overflow-hidden py-20"
      >
        {/* Boost wrapper — its transform is JS-driven by the wheel listener
            and the arrow buttons. Acts purely as a translate container;
            its inner child runs the CSS keyframe autoplay independently. */}
        <div ref={boostRef} className="gallery-marquee-boost will-change-transform">
          {/* Track — flex row with both copies of the photo list. CSS keyframe
              translates it 0 → -50% for the seamless autoplay loop. */}
          <div
            ref={trackRef}
            className="gallery-marquee-track flex w-max gap-4"
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
        </div>
      </section>

      {/* Arrow controls — siblings of the masked section so the edge-fade
          doesn't reach them. */}
      <button
        type="button"
        onClick={nudgeBackward}
        aria-label="Previous photo"
        className="group absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10
          w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
          bg-[rgba(10,10,11,0.7)] backdrop-blur-md border border-line-strong
          text-ink transition-all duration-200
          hover:bg-[rgba(10,10,11,0.9)] hover:border-accent hover:scale-105
          active:scale-95 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        <ChevronIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={nudgeForward}
        aria-label="Next photo"
        className="group absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10
          w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
          bg-[rgba(10,10,11,0.7)] backdrop-blur-md border border-line-strong
          text-ink transition-all duration-200
          hover:bg-[rgba(10,10,11,0.9)] hover:border-accent hover:scale-105
          active:scale-95 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        <ChevronIcon direction="right" />
      </button>
    </div>
  );
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="transition-transform duration-200 group-hover:scale-110"
    >
      {direction === 'left' ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 18 15 12 9 6" />
      )}
    </svg>
  );
}
