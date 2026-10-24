'use client';

import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BookId, BookLang, BOOK_CATALOG } from '@/types/books';
import {
  WhiteboardSceneSvg,
  WhiteboardScene,
} from '@/components/doodle/WhiteboardSceneSvg';

export interface HeroTrilogyShowcaseProps extends Record<string, unknown> {
  activeBookId: BookId;
  lang: BookLang;
}

const BOOK_STAGE_META: Record<
  BookId,
  {
    vol: string;
    spineHex: string;
    cardTintHex: string;
    badgeBgHex: string;
    scene: WhiteboardScene;
    sceneLabel: Record<BookLang, string>;
    scriptPreview: Record<BookLang, string>;
    pills: Record<BookLang, string[]>;
  }
> = {
  'book-1': {
    vol: 'VOL. 01',
    spineHex: '#1E40AF',
    cardTintHex: '#EFF6FF',
    badgeBgHex: '#DBEAFE',
    scene: 'one-on-one',
    sceneLabel: {
      'id-kasual': 'Sesi 1-on-1 Empat Mata',
      'id-standar': 'Sesi 1-on-1 Terarah',
      en: '1-on-1 Feedback Session',
    },
    scriptPreview: {
      'id-kasual':
        '“Di Rumus 3K kemarin kita sepakat masukin data 3 bulan. Bagian mana yang kita rapiin dulu sore ini?”',
      'id-standar':
        '“Sesuai kesepakatan 3K kemarin, mari kita lengkapi perbandingan 3 bulan sebelum pukul 16.00.”',
      en: '“Per our 3C brief yesterday, what is the fastest way to add the 3-month trend before 4 PM?”',
    },
    pills: {
      'id-kasual': ['Rumus Target 3K', 'Koreksi 4 Mata', 'Kalibrasi L1–L4'],
      'id-standar': ['Rumus Target 3K', 'Koreksi Empat Mata', 'Kalibrasi L1–L4'],
      en: ['3C Goal Brief', 'Private Redirection', 'L1–L4 Calibration'],
    },
  },
  'book-2': {
    vol: 'VOL. 02',
    spineHex: '#D97706',
    cardTintHex: '#FFFBEB',
    badgeBgHex: '#FEF3C7',
    scene: 'sprint-board',
    sceneLabel: {
      'id-kasual': 'Papan Kapasitas Sprint',
      'id-standar': 'Papan Kapasitas Sprint',
      en: 'Sprint Capacity Board',
    },
    scriptPreview: {
      'id-kasual':
        '“Kapasitas tim minggu ini 100% di Proyek A. Kalau Proyek B masuk, opsi mana yang kita geser ke minggu depan?”',
      'id-standar':
        '“Kapasitas tim minggu ini penuh di Proyek A. Jika Proyek B masuk, prioritas mana yang kita sesuaikan?”',
      en: '“Our sprint is at 100% on Project A. To pull Project B in, which deliverable should we trade off?”',
    },
    pills: {
      'id-kasual': ['Teknik Glass Shield', 'Anti-Monkey', 'Saklar 18:00'],
      'id-standar': ['Perisai Kaca Emosi', 'Cegah Ambil Alih', 'Detachment 18:00'],
      en: ['Glass Shield Filter', 'Anti-Monkey Rule', '6 PM Detachment'],
    },
  },
  'book-3': {
    vol: 'VOL. 03',
    spineHex: '#059669',
    cardTintHex: '#F0FDF4',
    badgeBgHex: '#DCFCE7',
    scene: 'strategy-meeting',
    sceneLabel: {
      'id-kasual': 'Presentasi Ruang Strategi',
      'id-standar': 'Presentasi Ruang Strategi',
      en: 'Strategy Alignment Room',
    },
    scriptPreview: {
      'id-kasual':
        '“Sebelum gw jawab, menurut lo sebagai Team Lead-nya, apa akar masalah di titik serah-terima tim lo?”',
      'id-standar':
        '“Sebagai Team Leader mereka, menurut pengamatan kamu apa kendala utama di titik serah-terima ini?”',
      en: '“As their Team Lead, what is your diagnosis of this handoff bottleneck before we step in?”',
    },
    pills: {
      'id-kasual': ['Coaching the Coach', 'Anti-Skip-Level', 'Piagam Silo 3S'],
      'id-standar': ['Membina Para Leader', 'Rantai Komando', 'Piagam Lintas Tim 3S'],
      en: ['Coaching the Coach', 'Anti-Skip-Level', '3S Shared Charter'],
    },
  },
};

export const HeroTrilogyShowcaseComp: React.FC<HeroTrilogyShowcaseProps> = ({
  activeBookId = 'book-1',
  lang = 'id-kasual',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const book =
    BOOK_CATALOG.find((b) => b.id === activeBookId) || BOOK_CATALOG[0];
  const stage = BOOK_STAGE_META[activeBookId] || BOOK_STAGE_META['book-1'];

  // Spring animations
  const bookEntrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110, mass: 0.9 },
  });

  const floatY = Math.sin(frame / 18) * 5;
  const mascotBob = Math.sin((frame + 12) / 14) * 4;
  const mascotRotate = Math.sin(frame / 22) * 3;

  const bubbleEntrance = spring({
    frame: Math.max(0, frame - 14),
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const highlightSweep = interpolate(frame, [10, 42], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pulseScale = 1 + Math.sin(frame / 15) * 0.025;

  const sideBooks = BOOK_CATALOG.filter((b) => b.id !== activeBookId);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: stage.cardTintHex,
        backgroundImage:
          'radial-gradient(#CEC6B6 1.25px, transparent 1.25px)',
        backgroundSize: '20px 20px',
        padding: '22px',
        fontFamily: 'var(--font-body), sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Top Studio Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1.5px dashed #D4D4D8',
          paddingBottom: '10px',
          marginBottom: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              backgroundColor: stage.badgeBgHex,
              border: '1px solid rgba(24, 24, 27, 0.12)',
              borderRadius: '8px',
              padding: '3px 10px',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '12px',
              fontWeight: 800,
              color: '#18181B',
              boxShadow: '0 2px 6px -1px rgba(24, 24, 27, 0.08)',
            }}
          >
            {stage.vol} • INTERACTIVE PLAYBOOK
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '11px',
              fontWeight: 700,
              color: '#52525B',
            }}
          >
            15 {lang === 'en' ? 'Chapters' : 'Bab'} + PDF A5
          </span>
        </div>

        <span
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(24, 24, 27, 0.12)',
            borderRadius: '999px',
            padding: '2px 10px',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '12px',
            fontWeight: 800,
            color: stage.spineHex,
            boxShadow: '0 1px 3px rgba(24, 24, 27, 0.05)',
          }}
        >
          Rp {book.priceIdr.toLocaleString('id-ID')}
        </span>
      </div>

      {/* Main Stage Grid: Left 3D Playbook Stack + Right Mascot & Live Script Bubble */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '230px 1fr',
          gap: '18px',
          alignItems: 'center',
          height: '305px',
        }}
      >
        {/* Left: Fanned 3-Book Stack */}
        <div
          style={{
            position: 'relative',
            height: '285px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Background Fanned Companion Volumes */}
          {sideBooks.map((sb, i) => {
            const angle = i === 0 ? -9 : 9;
            const offsetX = i === 0 ? -22 : 24;
            return (
              <div
                key={sb.id}
                style={{
                  position: 'absolute',
                  width: '158px',
                  height: '225px',
                  borderRadius: '6px 14px 14px 6px',
                  backgroundColor: '#FAF7F2',
                  border: '1px solid #D4D4D8',
                  transform: `translateX(${offsetX}px) rotate(${
                    angle * bookEntrance
                  }deg) scale(0.92)`,
                  opacity: 0.65,
                  boxShadow: '0 4px 12px rgba(24, 24, 27, 0.06)',
                }}
              />
            );
          })}

          {/* Foreground Active Book Card */}
          <div
            style={{
              position: 'relative',
              width: '184px',
              height: '258px',
              borderRadius: '6px 16px 16px 6px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E1D8',
              boxShadow: '0 12px 28px -4px rgba(24, 24, 27, 0.12), 0 4px 10px -2px rgba(24, 24, 27, 0.05)',
              display: 'flex',
              overflow: 'hidden',
              transform: `translateY(${floatY}px) scale(${
                0.85 + 0.15 * bookEntrance
              })`,
            }}
          >
            {/* Spine */}
            <div
              style={{
                width: '18px',
                height: '100%',
                backgroundColor: stage.spineHex,
                borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '8px',
                  fontWeight: 800,
                  letterSpacing: '1.5px',
                }}
              >
                AIOSSAN • {stage.vol}
              </span>
            </div>

            {/* Cover Body */}
            <div
              style={{
                flex: 1,
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#FFFDF9',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #E4E4E7',
                  paddingBottom: '6px',
                }}
              >
                <span
                  style={{
                    backgroundColor: stage.badgeBgHex,
                    border: '1px solid rgba(24, 24, 27, 0.12)',
                    borderRadius: '4px',
                    padding: '1px 6px',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    fontWeight: 800,
                  }}
                >
                  {stage.vol}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px',
                    color: '#52525B',
                    fontWeight: 700,
                  }}
                >
                  ID + EN
                </span>
              </div>

              {/* Mascot Window */}
              <div
                style={{
                  backgroundColor: stage.cardTintHex,
                  border: '1px solid rgba(24, 24, 27, 0.12)',
                  borderRadius: '10px',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 2px 8px rgba(24, 24, 27, 0.06)',
                }}
              >
                <div
                  style={{
                    transform: `translateY(${mascotBob * 0.6}px) rotate(${mascotRotate}deg)`,
                  }}
                >
                  <WhiteboardSceneSvg
                    scene={stage.scene}
                    className="w-16 h-16"
                  />
                </div>
                <span
                  style={{
                    marginTop: '4px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(24, 24, 27, 0.12)',
                    borderRadius: '4px',
                    padding: '1px 6px',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '8px',
                    fontWeight: 800,
                  }}
                >
                  {stage.sceneLabel[lang]}
                </span>
              </div>

              {/* Book Title */}
              <div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 800,
                    color: '#18181B',
                    lineHeight: 1.2,
                    marginBottom: '4px',
                  }}
                >
                  {book.titles[lang]}
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    color: '#52525B',
                    lineHeight: 1.3,
                  }}
                >
                  {book.subtitles[lang]}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Animated Framework Pills + Live 1-on-1 Script Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            justifyContent: 'center',
          }}
        >
          {/* Role Target Label */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(24, 24, 27, 0.1)',
              borderRadius: '12px',
              padding: '10px 12px',
              boxShadow: '0 4px 12px -2px rgba(24, 24, 27, 0.06)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '10px',
                fontWeight: 800,
                color: stage.spineHex,
                textTransform: 'uppercase',
                marginBottom: '3px',
              }}
            >
              {lang === 'en' ? 'TARGET READER ROLE' : 'FOKUS PERAN LEADER'}
            </div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 800,
                color: '#18181B',
                lineHeight: 1.3,
              }}
            >
              {book.targetRole[lang]}
            </div>
          </div>

          {/* 3 Animated Framework Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {stage.pills[lang].map((pill, idx) => {
              const pillSpring = spring({
                frame: Math.max(0, frame - idx * 6),
                fps,
                config: { damping: 14, stiffness: 140 },
              });
              return (
                <span
                  key={pill}
                  style={{
                    transform: `scale(${pillSpring})`,
                    backgroundColor: idx === 0 ? '#FFE66D' : '#FFFFFF',
                    border: '1px solid rgba(24, 24, 27, 0.12)',
                    borderRadius: '8px',
                    padding: '4px 9px',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#18181B',
                    boxShadow: '0 2px 4px rgba(24, 24, 27, 0.06)',
                  }}
                >
                  ✓ {pill}
                </span>
              );
            })}
          </div>

          {/* Animated Copy-Paste Script Preview Card */}
          <div
            style={{
              opacity: bubbleEntrance,
              transform: `translateY(${(1 - bubbleEntrance) * 14}px) scale(${pulseScale})`,
              backgroundColor: '#FFFDF9',
              border: '1px solid rgba(24, 24, 27, 0.1)',
              borderRadius: '14px',
              padding: '12px',
              boxShadow: '0 6px 16px -2px rgba(24, 24, 27, 0.08)',
              position: 'relative',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '6px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#065F46',
                  backgroundColor: '#CCFBF1',
                  border: '1px solid #065F46',
                  borderRadius: '5px',
                  padding: '1px 6px',
                }}
              >
                💬 {lang === 'en' ? '1-ON-1 SCRIPT PREVIEW' : 'CUPLIKAN SKRIP 1-ON-1'}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-hand), cursive',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#52525B',
                }}
              >
                {lang === 'en' ? 'Ready to copy!' : 'Siap salin!'}
              </span>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '11.5px',
                lineHeight: 1.45,
                color: '#18181B',
                position: 'relative',
              }}
            >
              <span
                style={{
                  background: `linear-gradient(90deg, rgba(255,230,109,0.65) ${
                    highlightSweep * 100
                  }%, transparent ${highlightSweep * 100}%)`,
                  padding: '1px 2px',
                  borderRadius: '3px',
                }}
              >
                {stage.scriptPreview[lang]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Mascot Caption Bar */}
      <div
        style={{
          marginTop: '10px',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(24, 24, 27, 0.08)',
          borderRadius: '12px',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(24, 24, 27, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ transform: `translateY(${mascotBob * 0.4}px)` }}>
            <WhiteboardSceneSvg scene={stage.scene} className="w-8 h-8" />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-hand), cursive',
              fontSize: '14px',
              fontWeight: 700,
              color: '#18181B',
            }}
          >
            {lang === 'en'
              ? `${stage.sceneLabel.en}: “Click Vol. 01, 02, or 03 below to inspect each playbook!”`
              : lang === 'id-kasual'
              ? `${stage.sceneLabel['id-kasual']}: “Klik tab Vol. 01, 02, atau 03 di bawah buat ngintip isi tiap buku!”`
              : `${stage.sceneLabel['id-standar']}: “Pilih tab Vol. 01, 02, atau 03 di bawah untuk melihat fokus tiap buku.”`}
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '10px',
            fontWeight: 800,
            color: '#2563EB',
          }}
        >
          45 BAB + 9 PDF
        </span>
      </div>
    </AbsoluteFill>
  );
};
