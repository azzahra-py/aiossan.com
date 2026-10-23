import React from 'react';
import { WoodlandMascotSvg, MascotCharacter } from './WoodlandMascotSvg';

interface DoodleLoadingProps {
  message?: string;
  submessage?: string;
  character?: MascotCharacter;
}

export function DoodleLoading({
  message = 'Lagi Menyiapkan Halaman...',
  submessage = 'Membuka lembar catatan kerja & merapikan sketsa...',
  character = 'owl',
}: DoodleLoadingProps) {
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm rounded-3xl border-3 border-[#18181B] bg-[#FAF7F2] p-8 text-center shadow-[6px_6px_0px_#18181B] transition-all">
        {/* Decorative corner pin */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border-2 border-[#18181B] bg-[#FFE66D] px-3 py-0.5 font-mono text-[11px] font-black tracking-wider text-[#18181B] shadow-[2px_2px_0px_#18181B]">
          MEMUAT...
        </div>

        {/* Mascot with float animation */}
        <div className="mx-auto my-3 flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-[#18181B] bg-white shadow-[3px_3px_0px_#18181B] animate-pulse">
          <WoodlandMascotSvg character={character} className="h-16 w-16" />
        </div>

        {/* Loading text */}
        <h3 className="font-hand text-2xl font-bold tracking-tight text-[#18181B]">
          {message}
        </h3>
        <p className="mt-1 text-xs text-[#52525B] leading-relaxed">
          {submessage}
        </p>

        {/* Sketchy animated progress bar */}
        <div className="mt-5 overflow-hidden rounded-full border-2 border-[#18181B] bg-white p-0.5 shadow-[2px_2px_0px_#18181B]">
          <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-[#FFE66D] via-[#38BDF8] to-[#FFE66D] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear]" />
        </div>

        {/* Fun footer note */}
        <div className="mt-4 flex items-center justify-center gap-1.5 font-mono text-[10px] font-semibold text-[#A1A1AA]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#10B981] animate-ping" />
          <span>aiossan.com • naskah kepemimpinan praktis</span>
        </div>
      </div>
    </div>
  );
}
