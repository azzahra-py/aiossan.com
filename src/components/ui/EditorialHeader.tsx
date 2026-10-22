'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookLang } from '@/types/books';
import { TacticalButton } from './TacticalButton';
import { BookOpen, User, Menu, X, Globe, Sparkles } from 'lucide-react';

interface EditorialHeaderProps {
  lang?: BookLang;
  onLangChange?: (lang: BookLang) => void;
}

export function EditorialHeader({
  lang = 'id-kasual',
  onLangChange,
}: EditorialHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isEn = lang === 'en';

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E4E2DD]">
      {/* Top Micro Editorial Bar (Language Register Selector) */}
      <div className="border-b border-[#E4E2DD] bg-[#F3F0E8]/70 px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[11px] font-mono">
          <div className="flex items-center gap-2 text-[#52525B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
            <span className="uppercase tracking-wider font-semibold">
              {isEn
                ? 'SWISS EDITORIAL EDITION // 3 LANGUAGE REGISTERS INCLUDED'
                : 'EDISI SWISS EDITORIAL // TERMASUK 3 GAYA BAHASA SEKALIGUS'}
            </span>
          </div>

          {onLangChange && (
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#52525B] mr-1" />
              {(
                [
                  { id: 'id-kasual', label: 'ID Kasual (Gue/Lo)' },
                  { id: 'id-standar', label: 'ID Standar (Saya/Kamu)' },
                  { id: 'en', label: 'EN (Global)' },
                ] as { id: BookLang; label: string }[]
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onLangChange(item.id)}
                  className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                    lang === item.id
                      ? 'bg-[#111113] text-white font-bold'
                      : 'text-[#52525B] hover:text-[#111113] hover:bg-white/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#111113] text-white flex items-center justify-center font-mono text-xs font-bold tracking-tighter group-hover:bg-[#EA580C] transition-colors">
            A//O
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight text-[#111113] leading-none">
              aiossan<span className="text-[#EA580C]">.com</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#71717A] mt-0.5">
              Leadership Playbook Press
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-sans font-medium text-[#52525B]">
          <Link href="/#books" className="hover:text-[#111113] transition-colors">
            {isEn ? 'The Trilogy (3 Volumes)' : 'Katalog 3 Buku'}
          </Link>
          <Link href="/#scripts" className="hover:text-[#111113] transition-colors">
            {isEn ? 'Interactive 1-on-1 Scripts' : 'Simulasi Skrip 1-on-1'}
          </Link>
          <Link href="/#pricing" className="hover:text-[#111113] transition-colors">
            {isEn ? 'Box Set & Pricing' : 'Paket & Harga'}
          </Link>
          <div className="h-4 w-[1px] bg-[#E4E2DD]" />
          <Link href="/dashboard">
            <TacticalButton variant="secondary" size="sm">
              <User className="w-3.5 h-3.5" />
              <span>{isEn ? 'Reader Library' : 'Perpustakaan Akun'}</span>
            </TacticalButton>
          </Link>
          <Link href={`/read/book-1/${lang}/ch-0`}>
            <TacticalButton variant="primary" size="sm">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isEn ? 'Read Free Sample' : 'Baca Sampel Gratis'}</span>
            </TacticalButton>
          </Link>
        </nav>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
          className="md:hidden p-2 rounded-lg border border-[#E4E2DD] bg-white text-[#111113]"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E4E2DD] bg-white px-4 py-4 space-y-3">
          <Link
            href="/#books"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-semibold text-[#111113]"
          >
            {isEn ? 'The Trilogy (3 Volumes)' : 'Katalog 3 Buku'}
          </Link>
          <Link
            href="/#scripts"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-semibold text-[#111113]"
          >
            {isEn ? 'Interactive 1-on-1 Scripts' : 'Simulasi Skrip 1-on-1'}
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-semibold text-[#111113]"
          >
            {isEn ? 'Box Set & Pricing' : 'Paket & Harga'}
          </Link>
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
              <TacticalButton variant="secondary" size="md" className="w-full">
                <User className="w-4 h-4" />
                <span>{isEn ? 'Reader Library' : 'Perpustakaan Akun'}</span>
              </TacticalButton>
            </Link>
            <Link
              href={`/read/book-1/${lang}/ch-0`}
              onClick={() => setMobileOpen(false)}
            >
              <TacticalButton variant="primary" size="md" className="w-full">
                <BookOpen className="w-4 h-4" />
                <span>{isEn ? 'Read Free Sample' : 'Baca Sampel Gratis'}</span>
              </TacticalButton>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
