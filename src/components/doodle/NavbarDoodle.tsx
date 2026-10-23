import React from 'react';
import Link from 'next/link';
import { WoodlandMascotSvg } from './WoodlandMascotSvg';
import { BookLang } from '@/types/books';
import { BookOpen, Sparkles, UserCheck, LogIn } from 'lucide-react';

interface NavbarDoodleProps {
  userEmail?: string | null;
  langMenu?: React.ReactNode;
  lang?: BookLang;
}

export function NavbarDoodle({ userEmail, langMenu, lang = 'id-kasual' }: NavbarDoodleProps) {
  const isEn = lang === 'en';
  return (
    <header className="no-print sticky top-0 z-40 border-b border-[#E7E2D9] bg-[#FAF7F2]/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12 py-3">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border-[1.5px] border-[#18181B] bg-[#FFE66D] shadow-[2px_2px_0px_#18181B] transition-transform group-hover:-rotate-6">
            <WoodlandMascotSvg character="capybara" className="h-8 w-8" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-[#18181B]">
              aiossan<span className="text-[#2563EB]">.com</span>
            </span>
            <span className="hidden sm:inline-block ml-2 rounded-md border border-[#18181B] bg-white px-2 py-0.5 font-hand text-xs font-bold text-[#52525B]">
              🐾 Leadership Field Playbook
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href={`/read/book-1/${lang}/ch-0`}
            className="hidden md:inline-flex items-center gap-1.5 rounded-xl border-2 border-[#18181B] bg-white px-3.5 py-1.5 text-xs font-extrabold text-[#18181B] hover:bg-[#FEF9C3]"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>{isEn ? 'Read Free Sample' : 'Baca Sampel Gratis'}</span>
          </Link>

          <a
            href="/#pricing"
            aria-label={isEn ? 'Bundle Package' : 'Paket Bundel'}
            className="doodle-button inline-flex items-center gap-1.5 bg-[#FFE66D] px-2.5 py-1.5 text-xs font-extrabold text-[#18181B] sm:px-3.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isEn ? 'Bundle Package' : 'Paket Bundel'}</span>
          </a>

          {userEmail ? (
            <Link
              href="/dashboard"
              className="doodle-button inline-flex items-center gap-1.5 bg-[#CCFBF1] px-3.5 py-1.5 text-xs font-extrabold text-[#065F46]"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="max-w-[110px] truncate">{userEmail}</span>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#18181B] bg-white px-3 py-1.5 text-xs font-bold text-[#18181B] hover:bg-[#EFF6FF]"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isEn ? 'Sign In' : 'Masuk'}</span>
            </Link>
          )}

          {langMenu}
        </nav>
      </div>
    </header>
  );
}
