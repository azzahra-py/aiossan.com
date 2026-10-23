'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { Play, Pause, Sparkles } from 'lucide-react';

interface RemotionPlayerWrapperProps<T extends Record<string, unknown>> {
  component: React.ComponentType<T>;
  inputProps: T;
  durationInFrames: number;
  compositionWidth: number;
  compositionHeight: number;
  fps?: number;
  initialFrame?: number;
  className?: string;
  badgeLabel?: string;
  showControls?: boolean;
  fallbackContent?: React.ReactNode;
}

export function RemotionPlayerWrapper<T extends Record<string, unknown>>({
  component,
  inputProps,
  durationInFrames,
  compositionWidth,
  compositionHeight,
  fps = 30,
  initialFrame = 45,
  className = '',
  badgeLabel,
  showControls = true,
  fallbackContent,
}: RemotionPlayerWrapperProps<T>) {
  const playerRef = useRef<PlayerRef>(null);
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq.matches) {
        setReducedMotion(true);
        setPlaying(false);
      }
      const listener = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
        if (e.matches) {
          playerRef.current?.pause();
          setPlaying(false);
        }
      };
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const player = playerRef.current;
    if (!player) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    player.addEventListener('play', onPlay);
    player.addEventListener('pause', onPause);

    if (!reducedMotion) {
      try {
        player.play();
      } catch {
        // Safe fallback
      }
    }

    return () => {
      player.removeEventListener('play', onPlay);
      player.removeEventListener('pause', onPause);
    };
  }, [mounted, reducedMotion]);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;
    if (player.isPlaying()) {
      player.pause();
    } else {
      player.play();
    }
  };

  const aspectRatio = `${compositionWidth} / ${compositionHeight}`;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-zinc-200/90 bg-[#FFFDF9] shadow-sm ${className}`}
      style={{ aspectRatio }}
    >
      {!mounted ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#FAF7F2] via-[#FFFDF9] to-[#FEF9C3]/40 p-4">
          {fallbackContent || (
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#52525B]">
              <Sparkles className="h-4 w-4 animate-spin text-[#2563EB]" />
              <span>Menyiapkan Kanvas Animasi...</span>
            </div>
          )}
        </div>
      ) : (
        <>
          <Player
            ref={playerRef}
            component={component as React.ComponentType<any>}
            inputProps={inputProps}
            durationInFrames={durationInFrames}
            compositionWidth={compositionWidth}
            compositionHeight={compositionHeight}
            fps={fps}
            loop
            autoPlay={!reducedMotion}
            initiallyMuted={true}
            numberOfSharedAudioTags={0}
            initialFrame={reducedMotion ? initialFrame : 0}
            controls={false}
            clickToPlay={false}
            style={{
              width: '100%',
              height: '100%',
            }}
          />

          {(badgeLabel || showControls) && (
            <div className="pointer-events-none absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5">
              {badgeLabel && (
                <span className=" hidden sm:inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white/90 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#52525B] shadow-2xs backdrop-blur-xs">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      playing ? 'bg-[#0D9488] animate-pulse' : 'bg-[#D97706]'
                    }`}
                  />
                  {badgeLabel}
                </span>
              )}
              {showControls && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? 'Pause animation' : 'Play animation'}
                  title={playing ? 'Jeda Animasi' : 'Putar Animasi'}
                  className="pointer-events-auto inline-flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white/95 text-[#18181B] shadow-xs transition-transform hover:scale-105 active:scale-95"
                >
                  {playing ? (
                    <Pause className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="h-3.5 w-3.5 translate-x-0.5" />
                  )}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
