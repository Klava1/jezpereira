'use client';

import { useCallback, useEffect, useRef } from 'react';

type Props = {
  images: string[];
  animationDuration: string;
};

/**
 * Tuning constants for the scroll-coupled marquee.
 *
 * Mental model: page scrolls (and arrow-button clicks) feed VELOCITY into
 * the marquee. Velocity decays each frame (FRICTION) so a single input
 * doesn't push forever. Velocity is integrated into BOOST — an additive
 * horizontal offset applied to the wrapper, on top of the CSS autoplay
 * animation. Boost also decays slowly (BOOST_RETURN) so when input
 * stops, the marquee glides back to its CSS-animated position rather
 * than drifting permanently out of phase.
 *
 * SCROLL_MULTIPLIER controls how aggressively scrolling translates into
 * marquee motion. 2.5 means scrolling 100px adds 250px of velocity
 * (which then decays — total marquee travel from one scroll burst is
 * less than that).
 *
 * ARROW_KICK is the velocity injected by one click of the left/right
 * arrow buttons — sized to move the marquee by roughly one photo width
 * (~400px) before friction settles things.
 */
const SCROLL_MULTIPLIER = 0.7;
const FRICTION = 0.86;       // velocity decay per frame (~5 frames to half)
const BOOST_RETURN = 0.94;   // boost decay per frame (~11 frames to half ≈ 180ms)
const ARROW_KICK = 650;      // velocity (px/frame) added per arrow click

export function GalleryMarqueeClient({ images, animationDuration }: Props) {
  // Wrapper div — its `translateX` is JS-driven and composes with the
  // inner track's CSS keyframe animation.
  const boostRef = useRef<HTMLDivElement>(null);

  // Marquee physics state lives in a ref so both the scroll listener
  // (set up once in useEffect) and the arrow click handlers can mutate
  // the same velocity field. Without this, click handlers would only
  // see the initial closed-over values.
  const stateRef = useRef({ velocity: 0, boost: 0 });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let rafId = 0;
    let lastFrameTime = performance.now();

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;
      // Scrolling DOWN (positive delta) should push the marquee LEFT
      // (negative translateX), so we subtract.
      stateRef.current.velocity -= delta * SCROLL_MULTIPLIER;
    };

    const tick = (now: number) => {
      // Normalize against 60fps so the friction constants behave the same
      // on a 120Hz display or a throttled background tab.
      const frameRatio = Math.min(3, (now - lastFrameTime) / (1000 / 60));
      lastFrameTime = now;

      const s = stateRef.current;
      // Integrate velocity into boost, then apply both decay terms.
      s.boost += s.velocity * frameRatio;
      s.velocity *= Math.pow(FRICTION, frameRatio);
      s.boost *= Math.pow(BOOST_RETURN, frameRatio);

      // Skip DOM writes when nothing's effectively moving — saves wakeups
      // when the user has been idle on the page.
      if (boostRef.current && (Math.abs(s.boost) > 0.05 || Math.abs(s.velocity) > 0.05)) {
        boostRef.current.style.transform = `translate3d(${s.boost.toFixed(2)}px, 0, 0)`;
      } else if (boostRef.current && boostRef.current.style.transform) {
        boostRef.current.style.transform = '';
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Arrow handlers — push velocity in the chosen direction and let the
  // existing friction/decay loop above smoothly animate the motion and
  // settle back into autoplay.
  const nudgeForward = useCallback(() => {
    stateRef.current.velocity -= ARROW_KICK; // forward = leftward = autoplay direction
  }, []);
  const nudgeBackward = useCallback(() => {
    stateRef.current.velocity += ARROW_KICK; // backward = rightward = against autoplay
  }, []);

  return (
    // Outer wrapper is the positioning context for the arrow buttons so
    // they can sit OUTSIDE the masked region (masks affect descendants
    // and would fade the arrows at the viewport edges otherwise).
    <div className="relative">
      <section
        aria-label="Photo gallery"
        className="gallery-marquee relative w-full overflow-hidden py-20"
      >
        {/* Boost wrapper — its transform is JS-driven by the scroll listener
            and the arrow buttons. Acts purely as a translate container;
            its inner child runs the CSS keyframe autoplay independently. */}
        <div ref={boostRef} className="gallery-marquee-boost will-change-transform">
          {/* Track — flex row with both copies of the photo list. CSS keyframe
              translates it 0 → -50% for the seamless autoplay loop. */}
          <div
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

      {/* Arrow controls — sit on top of the masked area so they stay
          fully opaque (the section's edge-fade mask doesn't reach them
          because they're siblings, not descendants). */}
      <button
        type="button"
        onClick={nudgeBackward}
        aria-label="Scroll gallery backward"
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
        aria-label="Scroll gallery forward"
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
