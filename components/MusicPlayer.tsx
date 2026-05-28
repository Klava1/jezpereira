'use client';

import { useMedia } from '@/components/MediaProvider';

const LABEL = 'Now Selecting';
const TRACK = "I'm Free";

export function MusicPlayer() {
  const { hasVideo, volume, muted, setVolume, toggleMute } = useMedia();

  // The player is purely a controller for a registered background video.
  // No video on this route → no controls.
  if (!hasVideo) return null;

  const displayValue = muted ? 0 : volume;

  return (
    <aside
      aria-label="Background video volume"
      // Mobile: pinned to the bottom and horizontally centred — the pill is
      //   the primary mute/unmute affordance for the hero video, and putting
      //   it on the centre line makes it feel like a system-level toolbar
      //   rather than a corner widget you have to thumb-stretch to reach.
      // ≥sm: returns to the bottom-right corner, where it stays out of the
      //   way of the desktop layout's centred content.
      className="fixed z-[100] flex items-center gap-3.5
        bottom-4 left-1/2 -translate-x-1/2
        sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0
        bg-[rgba(10,10,11,0.92)] sm:bg-[rgba(10,10,11,0.85)] backdrop-blur-md
        border border-line-strong sm:border-line
        rounded-full pl-3.5 pr-2.5 py-2.5 transition-colors
        hover:border-accent"
      style={{
        // Layered backlight glow — the "light behind" sits in the same
        // accent hue as the hero's stage-lamp backlight, so the player pill
        // reads as part of the same brand lighting rather than a floating
        // utility chip. Three layers:
        //   1. Tight accent halo  → makes the pill pop on busy backgrounds
        //   2. Soft outer wash    → atmospheric bloom that's strongest on
        //      dark sections (where mobile users usually land first)
        //   3. Neutral drop       → actual elevation, decoupled from accent
        //      so the pill still feels "lifted" against a light section.
        boxShadow:
          '0 0 26px rgba(215, 45, 88, 0.38), 0 0 64px rgba(215, 45, 88, 0.16), 0 8px 24px rgba(0, 0, 0, 0.55)',
      }}
    >
      <div className="flex flex-col gap-0.5 overflow-hidden">
        <span className="font-mono text-[0.8rem] tracking-[0.28em] uppercase text-ink-mute whitespace-nowrap">
          {LABEL}
        </span>
        <span className="font-serif italic text-[1.05rem] text-ink whitespace-nowrap">
          {muted ? 'Muted' : TRACK}
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={displayValue}
        onChange={(e) => setVolume(Number(e.target.value))}
        aria-label="Volume"
        className="volume-slider w-24 h-1 cursor-pointer appearance-none rounded-full"
        style={{
          background: `linear-gradient(to right,
            var(--color-accent) 0%,
            var(--color-accent) ${displayValue * 100}%,
            var(--color-line) ${displayValue * 100}%,
            var(--color-line) 100%)`,
        }}
      />

      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute background video' : 'Mute background video'}
        aria-pressed={muted}
        className="relative w-[38px] h-[38px] rounded-full bg-accent flex items-center justify-center text-background
          transition-transform hover:scale-105 active:scale-[0.98] flex-shrink-0"
      >
        {muted ? <MutedIcon /> : <SoundIcon />}
      </button>
    </aside>
  );
}

function SoundIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.08" />
      <path d="M18.36 5.64a9 9 0 0 1 0 12.72" />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <line x1="22" y1="9" x2="16" y2="15" />
      <line x1="16" y1="9" x2="22" y2="15" />
    </svg>
  );
}
