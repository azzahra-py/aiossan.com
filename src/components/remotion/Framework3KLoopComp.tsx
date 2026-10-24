'use client';

import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BookLang } from '@/types/books';

export interface Framework3KLoopProps extends Record<string, unknown> {
  lang: BookLang;
  teammateName?: string;
}

const STEPS_DATA: Record<
  BookLang,
  {
    code: string;
    title: string;
    sub: string;
    example: (name: string) => string;
  }[]
> = {
  'id-kasual': [
    {
      code: 'K1',
      title: 'Komunikasi',
      sub: 'Samain persepsi & konteks',
      example: (n) => `“${n}, tujuan laporan ini buat rapat direksi Jumat...”`,
    },
    {
      code: 'K2',
      title: 'Kesepakatan',
      sub: 'Kunci hasil & tenggat',
      example: (n) => `“Kita sepakat ada data 3 bulan terakhir ya, ${n}.”`,
    },
    {
      code: 'K3',
      title: 'Konfirmasi',
      sub: 'Cek progres di tengah jalan',
      example: (n) => `“Gimana progres grafik 3 bulannya sore ini, ${n}?”`,
    },
  ],
  'id-standar': [
    {
      code: 'K1',
      title: 'Komunikasi',
      sub: 'Menyamakan persepsi',
      example: (n) => `“${n}, laporan ini ditujukan untuk evaluasi direksi...”`,
    },
    {
      code: 'K2',
      title: 'Kesepakatan',
      sub: 'Target & kriteria disepakati',
      example: (n) => `“Kita sepakati ada tren 3 bulan terakhir ya, ${n}.”`,
    },
    {
      code: 'K3',
      title: 'Konfirmasi',
      sub: 'Pemeriksaan berkala',
      example: (n) => `“Bagaimana perkembangan bagian kesimpulan, ${n}?”`,
    },
  ],
  en: [
    {
      code: 'C1',
      title: 'Communication',
      sub: 'Align context & purpose',
      example: (n) => `“${n}, this deck drives Friday’s board decision...”`,
    },
    {
      code: 'C2',
      title: 'Commitment',
      sub: 'Lock criteria & deadline',
      example: (n) => `“We agree on including the 3-month trend, ${n}.”`,
    },
    {
      code: 'C3',
      title: 'Confirmation',
      sub: 'Mid-flight check-in',
      example: (n) => `“How is the 3-month comparison coming along, ${n}?”`,
    },
  ],
};

const NODE_COLORS = [
  { bg: '#FEF9C3', accent: '#CA8A04', badge: '#FFE66D' },
  { bg: '#DBEAFE', accent: '#2563EB', badge: '#93C5FD' },
  { bg: '#CCFBF1', accent: '#0D9488', badge: '#5EEAD4' },
];

export const Framework3KLoopComp: React.FC<Framework3KLoopProps> = ({
  lang = 'id-kasual',
  teammateName = 'Budi',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cleanName = (teammateName || 'Budi').trim() || 'Budi';
  const steps = STEPS_DATA[lang] || STEPS_DATA['id-kasual'];

  // Active phase in the 180-frame cycle (0..59 = Step 0, 60..119 = Step 1, 120..179 = Step 2)
  const activeStepIdx = frame < 60 ? 0 : frame < 120 ? 1 : 2;

  const arrow1Progress = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const arrow2Progress = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const loopProgress = interpolate(frame, [135, 172], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFFDF9',
        backgroundImage: 'radial-gradient(#E4E0D6 1px, transparent 1px)',
        backgroundSize: '18px 18px',
        padding: '18px 22px',
        fontFamily: 'var(--font-body), sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Header Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1.5px dashed #D6D0C4',
          paddingBottom: '8px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '11px',
            fontWeight: 800,
            color: '#1E3A8A',
            backgroundColor: '#DBEAFE',
            border: '1px solid #BFDBFE',
            borderRadius: '6px',
            padding: '2px 8px',
            boxShadow: '0 1px 2px rgba(30, 58, 138, 0.06)',
          }}
        >
          {lang === 'en'
            ? '3C TARGET LOOP ANIMATION'
            : 'ANIMASI SIKLUS RUMUS 3K'}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '11px',
            fontWeight: 700,
            color: '#52525B',
          }}
        >
          {lang === 'en' ? `Target: ${cleanName}` : `Staf: ${cleanName}`}
        </span>
      </div>

      {/* 3 Nodes + Connecting Arrows Row */}
      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr 28px 1fr 28px 1fr',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        {steps.map((step, idx) => {
          const isActive = activeStepIdx === idx;
          const enterSpring = spring({
            frame: Math.max(0, frame - idx * 12),
            fps,
            config: { damping: 13, stiffness: 120 },
          });
          const scale = isActive ? 1.04 : 0.98;
          const colors = NODE_COLORS[idx];

          return (
            <React.Fragment key={step.code}>
              <div
                style={{
                  transform: `scale(${enterSpring * scale})`,
                  backgroundColor: colors.bg,
                  border: isActive
                    ? '1.5px solid #2563EB'
                    : '1px solid rgba(24, 24, 27, 0.12)',
                  borderRadius: '14px',
                  padding: '12px 10px',
                  textAlign: 'center',
                  boxShadow: isActive
                    ? '0 8px 20px -3px rgba(37, 99, 235, 0.15), 0 2px 6px -1px rgba(24, 24, 27, 0.05)'
                    : '0 2px 6px rgba(24, 24, 27, 0.04)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(24, 24, 27, 0.12)',
                    borderRadius: '6px',
                    padding: '1px 7px',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '10px',
                    fontWeight: 800,
                    color: '#18181B',
                    marginBottom: '4px',
                    boxShadow: '0 1px 2px rgba(24, 24, 27, 0.04)',
                  }}
                >
                  {step.code}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-hand), cursive',
                    fontSize: '21px',
                    fontWeight: 700,
                    color: '#18181B',
                    lineHeight: 1.1,
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#52525B',
                    marginTop: '3px',
                  }}
                >
                  {step.sub}
                </div>
              </div>

              {idx < 2 && (
                <svg
                  viewBox="0 0 28 24"
                  style={{ width: '28px', height: '24px', overflow: 'visible' }}
                >
                  <line
                    x1="2"
                    y1="12"
                    x2={2 + 20 * (idx === 0 ? arrow1Progress : arrow2Progress)}
                    y2="12"
                    stroke="#18181B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {(idx === 0 ? arrow1Progress : arrow2Progress) > 0.8 && (
                    <polygon points="20,7 27,12 20,17" fill="#18181B" />
                  )}
                </svg>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Feedback Return Loop SVG */}
      <div style={{ position: 'relative', height: '38px', marginTop: '-2px' }}>
        <svg viewBox="0 0 620 42" style={{ width: '100%', height: '100%' }}>
          <path
            d="M 520 4 V 26 H 100 V 6"
            fill="none"
            stroke="#D6D0C4"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <path
            d="M 520 4 V 26 H 100 V 6"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeDasharray="480"
            strokeDashoffset={480 * (1 - loopProgress)}
            strokeLinecap="round"
          />
          <polygon points="95,10 100,2 105,10" fill="#2563EB" />
          <text
            x="310"
            y="39"
            textAnchor="middle"
            fontFamily="var(--font-hand), cursive"
            fontSize="13"
            fill="#9A3412"
          >
            {lang === 'en'
              ? '↻ Continuous alignment loop for every new target'
              : '↻ Siklus berulang di setiap target kerja baru'}
          </text>
        </svg>
      </div>

      {/* Live Dialogue Callout Bubble for Current Active Step */}
      <div
        style={{
          backgroundColor: NODE_COLORS[activeStepIdx].bg,
          border: '2px solid #18181B',
          borderRadius: '12px',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '3px 3px 0px #18181B',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: '2px solid #18181B',
            backgroundColor: '#EFF6FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '1px 1px 0px #18181B',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '11px',
              fontWeight: 900,
              color: '#1E40AF',
            }}
          >
            3K
          </span>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '10px',
              fontWeight: 800,
              color: '#18181B',
            }}
          >
            {steps[activeStepIdx].code} — {steps[activeStepIdx].title.toUpperCase()}:
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '12px',
              fontWeight: 700,
              color: '#1E3A8A',
              marginTop: '1px',
            }}
          >
            {steps[activeStepIdx].example(cleanName)}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
