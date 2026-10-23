'use client';

import React, { useEffect, useRef, useState } from 'react';

export type RoughAnnotationType = 'highlight' | 'underline' | 'circle' | 'box';
export type RoughAnnotationColor = 'yellow' | 'blue' | 'teal' | 'coral' | 'rose' | 'violet';

interface RoughHighlightProps {
  children: React.ReactNode;
  type?: RoughAnnotationType;
  color?: RoughAnnotationColor;
  className?: string;
  delayMs?: number;
}

const COLOR_MAP: Record<RoughAnnotationColor, { fill: string; stroke: string }> = {
  yellow: { fill: 'rgba(255, 230, 109, 0.78)', stroke: '#EAB308' },
  blue: { fill: 'rgba(191, 219, 254, 0.72)', stroke: '#2563EB' },
  teal: { fill: 'rgba(153, 246, 228, 0.72)', stroke: '#0D9488' },
  coral: { fill: 'rgba(254, 215, 170, 0.78)', stroke: '#EA580C' },
  rose: { fill: 'rgba(254, 205, 211, 0.75)', stroke: '#E11D48' },
  violet: { fill: 'rgba(221, 214, 254, 0.78)', stroke: '#7C3AED' },
};

export function RoughHighlight({
  children,
  type = 'highlight',
  color = 'yellow',
  className = '',
  delayMs = 80,
}: RoughHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delayMs);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  const palette = COLOR_MAP[color] || COLOR_MAP.yellow;

  if (type === 'highlight') {
    return (
      <span ref={ref} className={`relative inline-block px-1.5 py-0.5 ${className}`}>
        <span
          aria-hidden="true"
          style={{
            backgroundColor: palette.fill,
            transform: visible ? 'scaleX(1) rotate(-0.6deg)' : 'scaleX(0) rotate(-0.6deg)',
            transformOrigin: 'left center',
            transition: 'transform 550ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="pointer-events-none absolute inset-0 -z-0 rounded-md"
        />
        <span className="relative z-10">{children}</span>
      </span>
    );
  }

  return (
    <span ref={ref} className={`relative inline-block px-1 ${className}`}>
      <span className="relative z-10">{children}</span>
      {type === 'underline' && (
        <svg
          aria-hidden="true"
          viewBox="0 0 200 18"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -bottom-1.5 left-0 h-3.5 w-full overflow-visible"
        >
          <path
            d="M3 11 Q 55 4, 105 12 T 197 9"
            fill="none"
            stroke={palette.stroke}
            strokeWidth="4.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 220,
              strokeDashoffset: visible ? 0 : 220,
              transition: 'stroke-dashoffset 650ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        </svg>
      )}
      {type === 'circle' && (
        <svg
          aria-hidden="true"
          viewBox="0 0 220 70"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -inset-x-2 -inset-y-1.5 h-[calc(100%+12px)] w-[calc(100%+16px)] overflow-visible"
        >
          <path
            d="M14 34 C14 12, 65 5, 112 6 C170 7, 208 16, 207 36 C206 56, 158 64, 104 63 C48 62, 10 51, 18 29"
            fill="none"
            stroke={palette.stroke}
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              strokeDasharray: 520,
              strokeDashoffset: visible ? 0 : 520,
              transition: 'stroke-dashoffset 750ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        </svg>
      )}
      {type === 'box' && (
        <svg
          aria-hidden="true"
          viewBox="0 0 220 64"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -inset-x-1.5 -inset-y-1 h-[calc(100%+8px)] w-[calc(100%+12px)] overflow-visible"
        >
          <path
            d="M6 8 L214 6 L212 58 L8 56 Z"
            fill="none"
            stroke={palette.stroke}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 560,
              strokeDashoffset: visible ? 0 : 560,
              transition: 'stroke-dashoffset 700ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        </svg>
      )}
    </span>
  );
}
