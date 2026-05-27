'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

type MediaContextValue = {
  /** Called by a media-producing component (e.g. <Hero/>) on mount/unmount. */
  registerVideo: (el: HTMLVideoElement | null) => void;
  /** True when some component has registered a controllable video element. */
  hasVideo: boolean;
  /** User-preferred volume, 0–1. Persists across mute toggles. */
  volume: number;
  /** Mute state. Independent of `volume`. */
  muted: boolean;
  setVolume: (v: number) => void;
  toggleMute: () => void;
};

const MediaContext = createContext<MediaContextValue | null>(null);

const DEFAULT_VOLUME = 0.7;

export function MediaProvider({ children }: { children: ReactNode }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [muted, setMuted] = useState(true);

  // Keep the actual <video> element in sync with our React state.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.volume = volume;
    el.muted = muted;
  }, [volume, muted, hasVideo]);

  const registerVideo = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el;
    setHasVideo(!!el);
  }, []);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    // Dragging the slider above zero implicitly unmutes; dragging to zero
    // implicitly mutes. Matches YouTube / Vimeo conventions.
    setMuted(clamped === 0);
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      // If un-muting from a zeroed slider, restore to default audible volume.
      if (!next && volume === 0) setVolumeState(DEFAULT_VOLUME);
      return next;
    });
  }, [volume]);

  return (
    <MediaContext.Provider
      value={{ registerVideo, hasVideo, volume, muted, setVolume, toggleMute }}
    >
      {children}
    </MediaContext.Provider>
  );
}

export function useMedia(): MediaContextValue {
  const ctx = useContext(MediaContext);
  if (!ctx) {
    throw new Error('useMedia must be called inside <MediaProvider>.');
  }
  return ctx;
}
