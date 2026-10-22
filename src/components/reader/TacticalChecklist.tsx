'use client';

import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface TacticalChecklistProps {
  storageKey: string;
  children: React.ReactNode;
}

export function TacticalChecklist({ storageKey, children }: TacticalChecklistProps) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === 'true') setChecked(true);
    } catch {
      // Ignore storage error
    }
  }, [storageKey]);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    try {
      localStorage.setItem(storageKey, String(next));
      window.dispatchEvent(new CustomEvent('aiossan-checklist-change'));
    } catch {
      // Ignore storage error
    }
  };

  return (
    <div
      onClick={toggle}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          toggle();
        }
      }}
      className={`my-2 flex cursor-pointer items-start gap-3.5 rounded-xl border p-3.5 transition-all select-none ${
        checked
          ? 'border-[#0F766E]/40 bg-[#F0FDFA]/60 text-[#52525B]'
          : 'border-[#E4E2DD] bg-white/80 hover:border-[#111113]/40 text-[#111113]'
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
          checked
            ? 'border-[#0F766E] bg-[#0F766E] text-white'
            : 'border-[#71717A] bg-white text-transparent'
        }`}
      >
        <Check className="w-3.5 h-3.5 stroke-[3]" />
      </span>
      <div className={`text-sm sm:text-[15px] leading-relaxed ${checked ? 'line-through opacity-75' : ''}`}>
        {children}
      </div>
    </div>
  );
}
