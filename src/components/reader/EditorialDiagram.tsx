'use client';

import React, { useEffect, useId, useState } from 'react';
import mermaid from 'mermaid';
import { GitBranch } from 'lucide-react';

export function EditorialDiagram({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const rawId = useId();
  const safeId = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;

  useEffect(() => {
    let mounted = true;
    const trimmed = chart.trim();
    if (!trimmed) return;

    if (typeof document !== 'undefined') {
      document.querySelectorAll('[id^="dmermaid-"]').forEach((el) => el.remove());
    }

    mermaid.initialize({
      startOnLoad: false,
      suppressErrorRendering: true,
      securityLevel: 'loose',
      look: 'classic',
      theme: 'neutral',
      fontFamily: 'var(--font-sans), system-ui, sans-serif',
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
        if (typeof document !== 'undefined') {
          const stray =
            document.getElementById(`d${safeId}`) || document.getElementById(safeId);
          if (stray) stray.remove();
        }
      });

    return () => {
      mounted = false;
    };
  }, [chart, safeId]);

  if (hasError) {
    return (
      <div className="my-6 rounded-xl border border-[#E4E2DD] bg-[#FBF9F5] p-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#52525B] mb-2 pb-2 border-b border-[#E4E2DD]">
          <GitBranch className="w-3.5 h-3.5 text-[#EA580C]" />
          <span>SYSTEM FLOW SCHEMATIC</span>
        </div>
        <pre className="font-mono text-xs text-[#111113] whitespace-pre-wrap overflow-x-auto">
          {chart}
        </pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-6 rounded-xl border border-[#E4E2DD] bg-[#FBF9F5] p-6 text-center font-mono text-xs text-[#71717A]">
        Rendering architectural diagram...
      </div>
    );
  }

  return (
    <div className="my-8 rounded-xl border border-[#E4E2DD] bg-white overflow-hidden shadow-xs">
      <div className="flex items-center justify-between px-4 py-2 bg-[#F3F0E8]/70 border-b border-[#E4E2DD] font-mono text-[10px] uppercase tracking-wider text-[#52525B]">
        <span className="inline-flex items-center gap-1.5 font-semibold text-[#111113]">
          <GitBranch className="w-3.5 h-3.5 text-[#EA580C]" />
          TACTICAL WORKFLOW DIAGRAM
        </span>
        <span>SWISS SCHEMATIC VIEW</span>
      </div>
      <div
        className="p-5 sm:p-6 overflow-x-auto text-center bg-white [&_svg]:mx-auto [&_svg]:max-w-full [&_svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
