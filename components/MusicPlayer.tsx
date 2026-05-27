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
      className="fixed bottom-6 right-6 z-[100] flex items-center gap-3.5
        bg-[rgba(10,10,11,0.85)] backdrop-blur-md border border-line
        rounded-full pl-3.5 pr-2.5 py-2.5 transition-colors
        hover:border-line-strong"
    >
      <div className="flex flex-col gap-0.5 overflow-hidden">
        <span className="font-mono text-[0.8rem] tracking-[0.28em] uppercase text-ink-mute">
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
