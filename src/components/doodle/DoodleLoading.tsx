import React from 'react';
import { Loader2, Compass } from 'lucide-react';

interface DoodleLoadingProps {
  message?: string;
  submessage?: string;
  character?: string; // Kept for backwards compatibility
}

export function DoodleLoading({
  message = 'Menyiapkan Canvas Strategi...',
  submessage = 'Membuka lembar catatan kerja dan merapikan diagram taktis...',
}: DoodleLoadingProps) {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm rounded-2xl border border-[#E5E1D8] bg-white p-7 text-center shadow-xl">
        {/* Decorative corner tag */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-0.5 font-mono text-[11px] font-bold tracking-wider text-[#1E40AF] shadow-xs">
          MEMUAT...
        </div>

        {/* Tactical Whiteboard Icon Spinner */}
        <div className="mx-auto my-3 flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-100 bg-[#EFF6FF] shadow-xs">
          <Loader2 className="h-10 w-10 text-[#1E40AF] animate-spin" />
        </div>

        {/* Loading text */}
        <h3 className="text-lg font-bold tracking-tight text-[#18181B]">
          {message}
        </h3>
        <p className="mt-1 font-hand text-sm text-[#52525B] leading-relaxed">
          {submessage}
        </p>

        {/* Tactical progress bar */}
        <div className="mt-5 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100 p-0.5">
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-[#1E40AF] via-[#F59E0B] to-[#059669] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear]" />
        </div>

        {/* Footer note */}
        <div className="mt-4 flex items-center justify-center gap-1.5 font-mono text-[10px] font-bold text-[#52525B]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#059669] animate-ping" />
          <span>aiossan.com • tactical leadership playbook</span>
        </div>
      </div>
    </div>
  );
}
