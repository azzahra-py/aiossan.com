'use client';

import React from 'react';

export function AnimatedPaperBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      {/* Soft Animated Watercolor / Marker Aura Blobs */}
      <div className="ambient-blob ambient-blob-1 absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#FFE66D]/35 blur-3xl" />
      <div className="ambient-blob ambient-blob-2 absolute top-1/4 -right-28 h-[28rem] w-[28rem] rounded-full bg-[#BFDBFE]/40 blur-3xl" />
      <div className="ambient-blob ambient-blob-3 absolute bottom-10 left-1/4 h-96 w-96 rounded-full bg-[#99F6E4]/30 blur-3xl" />
      <div className="ambient-blob ambient-blob-4 absolute -bottom-20 right-1/3 h-80 w-80 rounded-full bg-[#FED7AA]/35 blur-3xl" />

      {/* Subtle Drifting Dot-Matrix & Notebook Margin Rule */}
      <div className="ambient-grid absolute inset-0 opacity-75" />
      <div className="hidden xl:block absolute top-0 bottom-0 left-14 w-[2px] bg-[#F43F5E]/15" />

      {/* Floating Hand-Drawn Micro-Doodles in Screen Margins */}
      <svg
        className="doodle-float-slow absolute top-28 left-[4%] hidden lg:block h-14 w-14 text-[#2563EB]/20"
        viewBox="0 0 64 64"
        fill="none"
      >
        <path
          d="M8 30L56 10L40 54L28 36L8 30Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M56 10L28 36"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </svg>

      <svg
        className="doodle-float-slow absolute bottom-24 left-[6%] hidden lg:block h-12 w-12 text-[#0D9488]/20"
        viewBox="0 0 64 64"
        fill="none"
      >
        {/* Cute Capybara Paw Print Watermark */}
        <ellipse cx="32" cy="40" rx="12" ry="10" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="18" cy="24" r="4.5" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="27" cy="19" r="4.5" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="37" cy="19" r="4.5" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="46" cy="24" r="4.5" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    </div>
  );
}
