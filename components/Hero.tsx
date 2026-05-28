'use client';

import { useEffect, useRef, useState } from 'react';
import { useMedia } from '@/components/MediaProvider';

const TITLE = 'Jez Pereira';
const LETTERS = Array.from(TITLE);
// Per-letter phase offset (s) used in the "wave" phase. Slightly under one
// quarter of a 129 BPM beat (0.4651s), so adjacent letters peak ~80ms apart —
// fast enough to read as a wave, slow enough to see each letter take its turn.
const LETTER_STEP_S = 0.08;

// Hero title animation phases. The schedule is aligned to 129 BPM bar lines
// (4 beats per bar) so every transition lands on a downbeat:
//
//   idle    →  0.000 s   parent's entrance fadeUp is running
//   unison  →            all letters pulse together (+3%)     — 2 bars
//   wave    →            pulse cascades letter-by-letter      — 2 bars
//   bold    →            back to unison, +7% + accent glow    — 4 bars (the drop)
//   fade    →            beat-by-beat decay 7% → ~2.2%        — 2 bars
//   subtle  →            quarter-time resting pulse (~2.2%)   — infinite
//
// The unison→wave→bold sequence is one "cycle" (8 bars / ≈14.88s). The
// timeline runs this cycle THREE times back-to-back, then runs a 2-bar
// fade that decays the amplitude smoothly into the resting subtle phase.
type TitlePhase = 'idle' | 'unison' | 'wave' | 'bold' | 'fade' | 'subtle';

const BEAT_MS = 60_000 / 129;       // ≈ 465.116
const BAR_MS = BEAT_MS * 4;         // ≈ 1860.465  (4 beats per bar in 4/4)
const FADE_DURATION_S = (2 * BAR_MS) / 1000;  // ≈ 3.7209s — matches @keyframes beat129-decay
const SUBTLE_DURATION_S = BAR_MS / 1000;      // ≈ 1.86s — matches @keyframes beat129-subtle

const ENTRANCE_MS = 1400;           // parent fadeUp duration
const CYCLE_COUNT = 3;
const CYCLE_BARS = 8;               // 2 (unison) + 2 (wave) + 4 (bold) bars per cycle
const CYCLE_MS = CYCLE_BARS * BAR_MS; // ≈ 14884 ms
const FADE_START_MS = ENTRANCE_MS + CYCLE_COUNT * CYCLE_MS; // ≈ 46052 ms — downbeat after cycle 3
const SUBTLE_START_MS = FADE_START_MS + 2 * BAR_MS;          // ≈ 49773 ms — downbeat after fade

// Build the flat phase schedule: [{ phase, start }, ...] sorted by start time.
type ScheduledPhase = { phase: TitlePhase; start: number };
const PHASE_SCHEDULE: ScheduledPhase[] = [];
for (let c = 0; c < CYCLE_COUNT; c++) {
  const cycleStart = ENTRANCE_MS + c * CYCLE_MS;
  PHASE_SCHEDULE.push({ phase: 'unison', start: cycleStart });
  PHASE_SCHEDULE.push({ phase: 'wave', start: cycleStart + 2 * BAR_MS });
  PHASE_SCHEDULE.push({ phase: 'bold', start: cycleStart + 4 * BAR_MS });
}
PHASE_SCHEDULE.push({ phase: 'fade', start: FADE_START_MS });
PHASE_SCHEDULE.push({ phase: 'subtle', start: SUBTLE_START_MS });

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { registerVideo, muted } = useMedia();
  const [titlePhase, setTitlePhase] = useState<TitlePhase>('idle');
  // Refs used by the auto-fit effect that guarantees "Jez Pereira" never wraps.
  // titleFrameRef = the outer container that defines the available width.
  // h1Ref         = the H1 we shrink to fit when the CSS-clamped size overflows.
  const titleFrameRef = useRef<HTMLDivElement | null>(null);
  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  // Same auto-fit pattern for the overline — but bi-directional: scales UP
  // to fill the frame edge-to-edge AND scales DOWN if needed to stay on one
  // line at any viewport.
  const overlineFrameRef = useRef<HTMLDivElement | null>(null);
  const overlineRef = useRef<HTMLParagraphElement | null>(null);

  // Register the <video> with the global MediaProvider so the persistent
  // MusicPlayer pill in the corner can drive its volume / mute state.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    registerVideo(el);
    return () => registerVideo(null);
  }, [registerVideo]);

  // Drive the title's animation phases on the bar-aligned schedule built
  // above: entrance → 3× (unison → wave → bold) → subtle resting pulse.
  useEffect(() => {
    const timeouts = PHASE_SCHEDULE.map(({ phase, start }) =>
      setTimeout(() => setTitlePhase(phase), start),
    );
    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Hard guarantee: "Jez Pereira" must NEVER break to a second line. The H1
  // already has `white-space: nowrap`, so the spans can't wrap; but a wide
  // fallback font (or anyone playing with letter-spacing) could still push
  // the headline past the viewport. This effect measures the rendered width
  // after every relevant change and, if it exceeds the frame, scales the
  // font-size down until it fits — with a 1% safety margin for sub-pixel
  // rounding and italic overhangs.
  useEffect(() => {
    const h1 = h1Ref.current;
    const frame = titleFrameRef.current;
    if (!h1 || !frame) return;

    const fit = () => {
      h1.style.fontSize = '';
      const available = frame.clientWidth;
      if (available <= 0) return;
      const natural = h1.scrollWidth;
      if (natural > available) {
        const current = parseFloat(getComputedStyle(h1).fontSize);
        h1.style.fontSize = `${current * (available / natural) * 0.99}px`;
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(frame);
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(fit).catch(() => {});
    }
    return () => ro.disconnect();
  }, []);

  // Stretch-to-fill auto-fit for the overline (city list). Unlike the H1 —
  // which is sized by a CSS clamp() and only shrinks if it overflows — this
  // one always rescales the font-size so the entire row (rules + text + gaps)
  // spans the frame's full width. All horizontal dimensions inside the <p>
  // (rule widths, gaps, letter-spacing) are expressed in `em`, so the natural
  // scrollWidth changes linearly with font-size and one ratio sets the whole
  // line. Result: edge-to-edge on every viewport, never breaks to a new line.
  useEffect(() => {
    const p = overlineRef.current;
    const frame = overlineFrameRef.current;
    if (!p || !frame) return;

    const fit = () => {
      p.style.fontSize = '';
      const available = frame.clientWidth;
      if (available <= 0) return;
      const natural = p.scrollWidth;
      if (natural <= 0) return;
      const current = parseFloat(getComputedStyle(p).fontSize);
      p.style.fontSize = `${current * (available / natural) * 0.99}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(frame);
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(fit).catch(() => {});
    }
    return () => ro.disconnect();
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center px-[clamp(1.25rem,4vw,3rem)] pt-32 pb-16"
    >
      {/* Background video (deepest layer).
          Source video has portrait content (864×1072) pillar-boxed in a 1920×1080
          frame, so we zoom in (1920/864 ≈ 2.222) to crop out the black bars. */}
      <video
        ref={videoRef}
        src="/video/Jez_draft_video.mp4"
        autoPlay
        loop
        muted={muted}
        playsInline
        preload="auto"
        aria-hidden
        className="absolute inset-0 z-0 block"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'scale(2.222)',
          transformOrigin: 'center center',
          filter: 'brightness(0.55) saturate(0.9)',
        }}
      />

      {/* Dark overlay above the video for text legibility */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-b from-background/75 via-background/55 to-background/90"
      />

      {/* Breathing radial gradients */}
      <div aria-hidden className="absolute inset-0 pointer-events-none z-[2]">
        <div
          className="absolute rounded-full blur-[80px]"
          style={{
            width: '60vw',
            height: '60vw',
            top: '-20%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(215, 45, 88, 0.22), transparent 65%)',
            animation: 'drift1 18s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full blur-[80px]"
          style={{
            width: '55vw',
            height: '55vw',
            bottom: '-20%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(80, 30, 90, 0.18), transparent 65%)',
            animation: 'drift2 22s ease-in-out infinite',
          }}
        />
      </div>

      {/* Slow-rotating triangle (Jez's brand mark) */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute top-1/2 left-1/2 z-[2] opacity-[0.28]"
        style={{
          width: 'clamp(280px, 50vw, 540px)',
          height: 'clamp(280px, 50vw, 540px)',
          transform: 'translate(-50%, -50%)',
          animation: 'spin 90s linear infinite',
          filter: 'drop-shadow(0 0 12px rgba(215, 45, 88, 0.35))',
        }}
      >
        <polygon
          points="50,8 92,88 8,88"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>

      {/* Overline — pinned to the top of the hero, above the centered title.
          The full city list "Est. 1993 · London · Miami · Mumbai · Ibiza" is
          43 characters wide.

          The outer frame spans the full hero width (inset-x-0) with just a
          small px-* gutter so the overline stretches edge-to-edge. The JS
          auto-fit effect above rescales the font-size on every resize so the
          whole row exactly fills that frame on one line — bigger on wide
          viewports, smaller on narrow ones, but always one line, always
          stretched.

          Every horizontal dimension inside the <p> (rule widths, flex gap,
          letter-spacing) is expressed in em, so all of them rescale linearly
          with the JS-set font-size and the fit math stays correct. */}
      <div
        ref={overlineFrameRef}
        className="absolute top-20 sm:top-28 inset-x-0 z-10 px-2 sm:px-3"
      >
        <p
          ref={overlineRef}
          // The numbers below set the *natural* row width at the base
          // font-size; smaller natural → auto-fit scales the font UP further
          // to fill the frame. Trimmed deliberately so the overline reads big
          // on wide screens while still fitting on phones in one line:
          //   - tracking 0.05em (sm+): keeps the decorative airy feel, but
          //     drops ~14% width vs the previous 0.2em.
          //   - rule width 2em + gap 0.5em (sm+): keeps the side bars visible
          //     without dominating the row.
          className="font-mono uppercase text-accent flex items-center justify-center
            gap-[0.4em] sm:gap-[0.5em] whitespace-nowrap
            tracking-normal sm:tracking-wider
            text-[0.7rem]"
          style={{ animation: 'fadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <span
            aria-hidden
            className="hidden sm:block h-px bg-accent opacity-60 shrink-0"
            style={{ width: '2em' }}
          />
          Est. 1993 &middot; London &middot; Miami &middot; Mumbai &middot; Ibiza
          <span
            aria-hidden
            className="hidden sm:block h-px bg-accent opacity-60 shrink-0"
            style={{ width: '2em' }}
          />
        </p>
      </div>

      {/* Title — vertically centered in the hero.
          The title goes through three timed phases:
            1. idle:    parent's fadeUp brings it in (~1.4 s)
            2. unison:  every letter pulses together at 129 BPM
            3. wave:    after 5 s, the pulse cascades letter-by-letter
          Letters are split into spans so each one can carry its own
          phase-shifted animation while the whole word stays one piece. */}
      <div
        ref={titleFrameRef}
        className="relative z-10 w-full max-w-[920px]"
        style={{ animation: 'fadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Inline-block wrapper sized to the H1's own width, with `isolate`
            establishing a local stacking context so the accent backlight
            below can live at -z-10 without sliding behind the video. */}
        <div className="relative inline-block isolate">
          {/* Stage-lamp backlight — a soft, blurred accent halo painted
              behind the title. Always on; harmonises with the bold phase's
              text-shadow as a second layer of "lit from behind" when the
              drop hits. Sized in em so it scales with the H1's clamp(). */}
          <span
            aria-hidden
            className="pointer-events-none absolute -z-10"
            style={{
              inset: '-0.2em -0.6em',
              background:
                'radial-gradient(ellipse at center, rgba(215, 45, 88, 0.55) 0%, rgba(215, 45, 88, 0.22) 40%, rgba(215, 45, 88, 0.05) 65%, transparent 80%)',
              filter: 'blur(28px)',
            }}
          />
          {/* H1 sizing: a CSS clamp() picks the "ideal" size based on viewport,
              but two safety nets ensure the headline NEVER wraps:
                1. `whitespace-nowrap` makes the spans behave as a single line,
                   so even an oversized font overflows horizontally instead of
                   breaking to a new row.
                2. The auto-fit effect above measures `scrollWidth` against the
                   frame and scales font-size down if it exceeds. This guards
                   against wide fallback fonts, browser font substitution,
                   stray letter-spacing, etc. */}
          <h1
            ref={h1Ref}
            aria-label={TITLE}
            className="beat-129 font-display font-bold uppercase whitespace-nowrap tracking-[0.04em] leading-[0.95] text-ink text-[clamp(3.5rem,16vw,7.8rem)]"
          >
          {LETTERS.map((char, i) => {
            const isSpace = char === ' ';
            let animation = 'none';
            if (titlePhase === 'unison') {
              animation = 'beat129 0.4651s cubic-bezier(0.4, 0, 0.6, 1) infinite';
            } else if (titlePhase === 'wave') {
              animation = `beat129 0.4651s cubic-bezier(0.4, 0, 0.6, 1) ${(
                i * LETTER_STEP_S
              ).toFixed(3)}s infinite`;
            } else if (titlePhase === 'bold') {
              animation = 'beat129-bold 0.4651s cubic-bezier(0.4, 0, 0.6, 1) infinite';
            } else if (titlePhase === 'fade') {
              // Single run of the 2-bar decay keyframe, holding its final
              // (resting) state once it completes. Last beat lands at
              // beat129-subtle's amplitude so the next phase picks up
              // without a visible step.
              animation = `beat129-decay ${FADE_DURATION_S}s ease-out forwards`;
            } else if (titlePhase === 'subtle') {
              // Quarter-time (one swell per bar ≈ 1.86s), ~2.2% amplitude.
              // The title's resting heartbeat — clearly visible, slower
              // and gentler than the climax.
              animation = `beat129-subtle ${SUBTLE_DURATION_S}s ease-in-out infinite`;
            }
            // 'idle' falls through with animation = 'none'.
            return (
              <span
                key={i}
                aria-hidden
                style={{
                  display: 'inline-block',
                  animation,
                  transformOrigin: 'center center',
                  willChange: 'transform',
                  // Preserve the gap between "Jez" and "Pereira" when split
                  whiteSpace: isSpace ? 'pre' : undefined,
                }}
              >
                {isSpace ? '\u00A0' : char}
              </span>
            );
          })}
          </h1>
        </div>
      </div>

      <a
        href="#now"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 font-mono text-[0.85rem] tracking-[0.3em] uppercase text-ink-mute"
        style={{ animation: 'scrollHint 2s ease-in-out infinite' }}
      >
        Scroll
      </a>
    </section>
  );
}
