import React from 'react';
import { WoodlandMascotSvg } from '@/components/doodle/WoodlandMascotSvg';

export default function ComingSoonPage() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-16 text-center">
      <style>{`
        @keyframes cs-float { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-14px) rotate(2deg); } }
        @keyframes cs-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes cs-bar { 0% { transform: translateX(-110%); } 100% { transform: translateX(340%); } }
        @keyframes cs-dot { 0%,80%,100% { transform: translateY(0); opacity: .4; } 40% { transform: translateY(-8px); opacity: 1; } }
        @keyframes cs-wiggle { 0%,100% { transform: rotate(-1.2deg); } 50% { transform: rotate(1.2deg); } }
        .cs-float { animation: cs-float 5s ease-in-out infinite; }
        .cs-bob { animation: cs-bob 3.2s ease-in-out infinite; }
        .cs-bob-late { animation: cs-bob 3.2s ease-in-out -1.6s infinite; }
        .cs-bar { animation: cs-bar 1.8s ease-in-out infinite; }
        .cs-wiggle { animation: cs-wiggle 6s ease-in-out infinite; display: inline-block; }
        .cs-dot { animation: cs-dot 1.4s ease-in-out infinite; }
      `}</style>

      <p className="font-mono text-xs font-extrabold uppercase tracking-[0.3em] text-[#71717A]">
        aiossan.com
      </p>

      <div className="mt-8 flex items-end justify-center gap-4 sm:gap-6">
        <WoodlandMascotSvg
          character="tortoise"
          className="cs-bob-late hidden h-20 w-20 sm:block"
        />
        <div className="cs-float">
          <WoodlandMascotSvg
            character="capybara"
            className="h-36 w-36 sm:h-44 sm:w-44"
          />
        </div>
        <WoodlandMascotSvg
          character="owl"
          className="cs-bob hidden h-20 w-20 sm:block"
        />
      </div>

      <h1 className="cs-wiggle mt-8 font-hand text-6xl leading-none text-[#18181B] sm:text-7xl">
        Segera Hadir!
      </h1>

      <p className="mt-5 max-w-xl text-base leading-relaxed text-[#52525B] sm:text-lg">
        Playbook kepemimpinan interaktif bareng Kapi &amp; kru lagi disiapin.
        Bentar lagi terbit, ditunggu ya.
      </p>
      <p className="mt-2 max-w-xl text-sm text-[#71717A]">
        Our interactive leadership playbooks are almost ready. Stay tuned.
      </p>

      <div className="mt-10 h-3 w-56 overflow-hidden rounded-full border-[1.5px] border-[#18181B] bg-white">
        <div className="cs-bar h-full w-16 rounded-full bg-[#FFE66D]" />
      </div>
      <div className="mt-4 flex items-center gap-1.5" aria-hidden="true">
        <span className="cs-dot h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
        <span
          className="cs-dot h-2.5 w-2.5 rounded-full bg-[#0D9488]"
          style={{ animationDelay: '0.15s' }}
        />
        <span
          className="cs-dot h-2.5 w-2.5 rounded-full bg-[#D97706]"
          style={{ animationDelay: '0.3s' }}
        />
      </div>

      <p className="mt-12 font-hand text-lg text-[#9A3412]">
        work hard, play hard, and level up your life ♡
      </p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-[#A1A1AA]">
        © 2026 aiossan.com
      </p>
    </main>
  );
}
