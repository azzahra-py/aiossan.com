'use client';

import React, { useEffect, useId, useState } from 'react';
import mermaid from 'mermaid';
import { BookLang } from '@/types/books';
import { GitBranch } from 'lucide-react';

export function HandDrawnMermaid({ chart, lang = 'id-kasual' }: { chart: string; lang?: BookLang }) {
  const [svg, setSvg] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const rawId = useId();
  const safeId = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;

  useEffect(() => {
    let mounted = true;
    const trimmed = chart.trim();
    if (!trimmed) return;

    try {
      mermaid.initialize({
        startOnLoad: false,
        suppressErrorRendering: true,
        securityLevel: 'loose',
        look: 'handDrawn',
        theme: 'base',
        themeVariables: {
          primaryColor: '#FEF3C7',
          primaryTextColor: '#18181B',
          primaryBorderColor: '#18181B',
          lineColor: '#2563EB',
          secondaryColor: '#DBEAFE',
          tertiaryColor: '#CCFBF1',
          fontFamily: 'var(--font-body), sans-serif',
        },
      });

      mermaid
        .render(safeId, trimmed)
        .then(({ svg: renderedSvg }) => {
          if (mounted) {
            setSvg(renderedSvg);
            setHasError(false);
          }
        })
        .catch(() => {
          if (mounted) setHasError(true);
          const stray =
            document.getElementById(`d${safeId}`) ||
            document.getElementById(safeId);
          if (stray) stray.remove();
        });
    } catch {
      if (mounted) setHasError(true);
    }

    return () => {
      mounted = false;
    };
  }, [chart, safeId]);

  if (hasError) {
    return (
      <div className="my-6 rounded-2xl border border-amber-200/90 bg-[#FFFBEB] p-4 shadow-sm">
        <div className="mb-2 flex items-center gap-2 font-mono text-xs font-bold text-[#92400E]">
          <GitBranch className="h-4 w-4" />
          <span>{lang === 'en' ? 'Tactical Framework Flow' : 'Alur Kerangka Taktis'}</span>
        </div>
        <pre className="overflow-x-auto font-mono text-xs text-[#18181B] whitespace-pre-wrap">
          {chart}
        </pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-6 rounded-2xl border border-zinc-200 bg-white p-6 text-center font-mono text-xs text-[#52525B] shadow-sm">
        {lang === 'en' ? 'Drawing the workflow diagram...' : 'Menggambar sketsa bagan alur kerja...'}
      </div>
    );
  }

  return (
    <div className="my-7 rounded-2xl border border-zinc-200/90 bg-white p-4 sm:p-6 shadow-sm overflow-hidden">
      <div className="mb-3 flex items-center justify-between border-b border-dashed border-[#E4E4E7] pb-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#2563EB]">
          <GitBranch className="h-3.5 w-3.5" />
          {lang === 'en' ? 'Tactical Flow Sketch' : 'Sketsa Alur Taktis'}
        </span>
        <span className="font-hand text-xs text-[#52525B]">
          {lang === 'en' ? 'Swipe if narrow →' : 'Geser bila layar sempit →'}
        </span>
      </div>
      <div
        className="overflow-x-auto text-center flex justify-center"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
