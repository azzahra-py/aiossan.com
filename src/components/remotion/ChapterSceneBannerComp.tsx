'use client';

import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BookId, BookLang } from '@/types/books';
import { DoodleIconType } from '@/lib/illustrations';

export interface ChapterSceneBannerProps extends Record<string, unknown> {
  bookId: BookId;
  chapterIndex: number;
  iconType: DoodleIconType;
  lang: BookLang;
}

const PALETTES: Record<
  BookId,
  {
    bgStart: string;
    bgEnd: string;
    accentHex: string;
    pillBg: string;
    label: string;
  }
> = {
  'book-1': {
    bgStart: '#EFF6FF',
    bgEnd: '#FEF9C3',
    accentHex: '#2563EB',
    pillBg: '#DBEAFE',
    label: 'VOL. 01 • MAHIR MEMIMPIN TIM',
  },
  'book-2': {
    bgStart: '#FFF7ED',
    bgEnd: '#CCFBF1',
    accentHex: '#EA580C',
    pillBg: '#FFEDD5',
    label: 'VOL. 02 • NAPAS PANJANG LEADER',
  },
  'book-3': {
    bgStart: '#F0FDFA',
    bgEnd: '#EDE9FE',
    accentHex: '#0D9488',
    pillBg: '#CCFBF1',
    label: 'VOL. 03 • MEMIMPIN PARA LEADER',
  },
};

function AnimatedMetaphorIcon({
  iconType,
  frame,
  accentHex,
}: {
  iconType: DoodleIconType;
  frame: number;
  accentHex: string;
}) {
  const angle = (frame * 2) % 360;
  const wave = Math.sin(frame / 10);
  const pulse = 1 + Math.sin(frame / 12) * 0.08;

  switch (iconType) {
    case 'gears':
      return (
        <svg viewBox="0 0 120 80" style={{ width: 110, height: 74 }}>
          <g transform={`translate(42,40) rotate(${angle})`}>
            <circle r="18" fill="#FFE66D" stroke="#18181B" strokeWidth="2.5" />
            <circle r="7" fill="#FFFFFF" stroke="#18181B" strokeWidth="2" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <rect
                key={deg}
                x="-3"
                y="-23"
                width="6"
                height="6"
                rx="1"
                fill="#18181B"
                transform={`rotate(${deg})`}
              />
            ))}
          </g>
          <g transform={`translate(80,44) rotate(${-angle * 1.2})`}>
            <circle r="14" fill="#DBEAFE" stroke="#18181B" strokeWidth="2.5" />
            <circle r="5" fill="#FFFFFF" stroke="#18181B" strokeWidth="2" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <rect
                key={deg}
                x="-2.5"
                y="-18"
                width="5"
                height="5"
                rx="1"
                fill="#18181B"
                transform={`rotate(${deg})`}
              />
            ))}
          </g>
        </svg>
      );

    case 'shield':
      return (
        <svg viewBox="0 0 120 80" style={{ width: 110, height: 74 }}>
          <g transform={`scale(${pulse})`} style={{ transformOrigin: '60px 40px' }}>
            <path
              d="M60 10 L90 22 V42 C90 58 76 68 60 74 C44 68 30 58 30 42 V22 Z"
              fill="#CCFBF1"
              stroke="#18181B"
              strokeWidth="2.5"
            />
            <path
              d="M48 42 L56 50 L74 32"
              fill="none"
              stroke="#0D9488"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );

    case 'target':
      return (
        <svg viewBox="0 0 120 80" style={{ width: 110, height: 74 }}>
          <circle cx="60" cy="40" r="28" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.5" />
          <circle cx="60" cy="40" r="19" fill="#DBEAFE" stroke="#18181B" strokeWidth="2" />
          <circle
            cx="60"
            cy="40"
            r={9 * pulse}
            fill="#FFE66D"
            stroke="#18181B"
            strokeWidth="2.5"
          />
          <line
            x1={92 - wave * 4}
            y1={12 + wave * 3}
            x2="63"
            y2="37"
            stroke="#E11D48"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'switch':
      return (
        <svg viewBox="0 0 120 80" style={{ width: 110, height: 74 }}>
          <rect
            x="25"
            y="24"
            width="70"
            height="32"
            rx="16"
            fill={wave > 0 ? '#CCFBF1' : '#FFE66D'}
            stroke="#18181B"
            strokeWidth="2.5"
          />
          <circle
            cx={60 + wave * 16}
            cy="40"
            r="12"
            fill="#FFFFFF"
            stroke="#18181B"
            strokeWidth="2.5"
          />
          <text
            x="60"
            y="70"
            textAnchor="middle"
            fontFamily="var(--font-mono), monospace"
            fontSize="9"
            fontWeight="800"
            fill="#18181B"
          >
            18:00 OFF
          </text>
        </svg>
      );

    case 'lighthouse':
    case 'bridge':
      return (
        <svg viewBox="0 0 120 80" style={{ width: 110, height: 74 }}>
          <polygon
            points={`60,22 115,${10 + wave * 8} 115,${34 + wave * 8}`}
            fill="rgba(255, 230, 109, 0.7)"
          />
          <polygon
            points="48,68 53,22 67,22 72,68"
            fill="#FFFFFF"
            stroke="#18181B"
            strokeWidth="2.5"
          />
          <rect
            x="51"
            y="36"
            width="18"
            height="10"
            fill={accentHex}
            stroke="#18181B"
            strokeWidth="2"
          />
          <circle
            cx="60"
            cy="18"
            r="6"
            fill="#FFE66D"
            stroke="#18181B"
            strokeWidth="2.5"
          />
        </svg>
      );

    case 'blueprint':
    default:
      return (
        <svg viewBox="0 0 120 80" style={{ width: 110, height: 74 }}>
          <rect
            x="22"
            y="14"
            width="76"
            height="52"
            rx="10"
            fill="#FFFFFF"
            stroke="#18181B"
            strokeWidth="2.5"
          />
          <circle
            cx="60"
            cy="40"
            r="16"
            fill="#FFE66D"
            stroke="#18181B"
            strokeWidth="2"
          />
          <g
            transform={`translate(60,40) rotate(${wave * 28})`}
          >
            <polygon points="0,-13 5,0 0,4 -5,0" fill={accentHex} />
            <polygon points="0,13 5,0 0,-4 -5,0" fill="#18181B" />
          </g>
        </svg>
      );
  }
}

export const ChapterSceneBannerComp: React.FC<ChapterSceneBannerProps> = ({
  bookId = 'book-1',
  chapterIndex = 0,
  iconType = 'compass',
  lang = 'id-kasual',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const palette = PALETTES[bookId] || PALETTES['book-1'];

  const enter = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const dashOffset = interpolate(frame, [0, 180], [60, 0]);

  const stageLabel =
    lang === 'en'
      ? chapterIndex <= 2
        ? 'Tactical Foundation'
        : chapterIndex <= 6
        ? '4 Core Skills'
        : chapterIndex <= 10
        ? 'Dialogue Scripts'
        : 'Simulation & Action'
      : chapterIndex <= 2
      ? 'Fondasi Taktis'
      : chapterIndex <= 6
      ? '4 Skill Inti'
      : chapterIndex <= 10
      ? 'Skrip Dialog'
      : 'Simulasi & Aksi';

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${palette.bgStart} 0%, #FFFDF9 50%, ${palette.bgEnd} 100%)`,
        padding: '16px 24px',
        fontFamily: 'var(--font-body), sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Top Metadata Strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            backgroundColor: palette.pillBg,
            border: '1px solid rgba(24, 24, 27, 0.12)',
            borderRadius: '999px',
            padding: '3px 12px',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '11px',
            fontWeight: 800,
            color: '#18181B',
            boxShadow: '0 1px 3px rgba(24, 24, 27, 0.08)',
          }}
        >
          ★ {palette.label}
        </span>

        <span
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(24, 24, 27, 0.1)',
            borderRadius: '8px',
            padding: '2px 10px',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '11px',
            fontWeight: 800,
            color: '#52525B',
            boxShadow: '0 1px 2px rgba(24, 24, 27, 0.04)',
          }}
        >
          {lang === 'en'
            ? `CH ${chapterIndex === 0 ? 'INTRO' : chapterIndex} • ${stageLabel.toUpperCase()}`
            : `BAB ${chapterIndex === 0 ? 'PENDAHULUAN' : chapterIndex} • ${stageLabel.toUpperCase()}`}
        </span>
      </div>

      {/* Center Whiteboard Tactical Schematic Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          transform: `scale(${0.94 + 0.06 * enter})`,
          margin: 'auto 0',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E1D8',
          borderRadius: '16px',
          padding: '12px 28px',
          boxShadow: '0 8px 24px -4px rgba(24, 24, 27, 0.08)',
        }}
      >
        <svg width="60" height="24" viewBox="0 0 60 24">
          <line
            x1="2"
            y1="12"
            x2="56"
            y2="12"
            stroke="#18181B"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            strokeDashoffset={dashOffset}
          />
          <path d="M52 7 L58 12 L52 17" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <AnimatedMetaphorIcon
            iconType={iconType}
            frame={frame}
            accentHex={palette.accentHex}
          />
          <span
            style={{
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: '6px',
              padding: '2px 12px',
              fontFamily: 'var(--font-hand), cursive',
              fontSize: '15px',
              fontWeight: 700,
              color: '#1E40AF',
              boxShadow: '0 1px 2px rgba(30, 58, 138, 0.06)',
            }}
          >
            {stageLabel}
          </span>
        </div>

        <svg width="60" height="24" viewBox="0 0 60 24">
          <line
            x1="4"
            y1="12"
            x2="58"
            y2="12"
            stroke="#A1A1AA"
            strokeWidth="2"
            strokeDasharray="6 4"
            strokeDashoffset={dashOffset}
          />
          <path d="M54 7 L58 12 L54 17" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
