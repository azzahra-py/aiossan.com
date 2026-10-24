'use client';

import React from 'react';

/**
 * WarRoomCanvas
 *
 * Excalidraw-inspired technical whiteboard canvas.
 * Features an infinite living dot-grid texture and minimal tactical
 * registration marks (crosshairs and dry-erase framing accents).
 * Replaces childish pastel watercolor blobs and fabled animal paw prints.
 */
export function WarRoomCanvas() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none bg-[#FAFAFA]"
    >
      {/* Infinite Subtle Technical Dot-Grid Canvas */}
      <div className="ambient-grid absolute inset-0 opacity-80" />

      {/* Subtle Tactical Vignette Overlay for focus */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60" />

      {/* Tactical Corner Crosshairs & Registration Marks */}
      <div className="absolute top-6 left-6 hidden sm:block font-mono text-xs text-zinc-300 font-medium">
        +
      </div>
      <div className="absolute top-6 right-6 hidden sm:block font-mono text-xs text-zinc-300 font-medium">
        +
      </div>
      <div className="absolute bottom-6 left-6 hidden sm:block font-mono text-xs text-zinc-300 font-medium">
        +
      </div>
      <div className="absolute bottom-6 right-6 hidden sm:block font-mono text-xs text-zinc-300 font-medium">
        +
      </div>

      {/* Faint Technical Alignment Marks in Screen Margins */}
      <svg
        className="doodle-float-slow absolute top-32 left-[3%] hidden xl:block h-12 w-12 text-[#1E40AF]/15"
        viewBox="0 0 48 48"
        fill="none"
      >
        {/* Dry-erase tactical flowchart connector */}
        <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8H36C40 8 40 24 36 24H16C12 24 12 40 16 40H36" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M34 37L38 40L34 43" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <svg
        className="doodle-float-slow absolute bottom-32 right-[3%] hidden xl:block h-12 w-12 text-[#059669]/15"
        viewBox="0 0 48 48"
        fill="none"
      >
        {/* War-room coordinate crosshair */}
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="24" y1="4" x2="24" y2="44" stroke="currentColor" strokeWidth="1.5" />
        <line x1="4" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
