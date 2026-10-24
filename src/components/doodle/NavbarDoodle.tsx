'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookLang } from '@/types/books';
import { UserCheck, LogIn } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface NavbarDoodleProps {
  userEmail?: string | null;
  langMenu?: React.ReactNode;
  lang?: BookLang;
}

export function NavbarDoodle({
  userEmail: propUserEmail,
  langMenu,
  lang = 'id-kasual',
}: NavbarDoodleProps) {
  const isEn = lang === 'en';
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(
    propUserEmail ?? null
  );

  useEffect(() => {
    if (propUserEmail !== undefined) {
      setCurrentUserEmail(propUserEmail);
      return;
    }

    try {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user?.email) {
          setCurrentUserEmail(user.email);
        }
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setCurrentUserEmail(session?.user?.email ?? null);
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch {
      // Supabase client fallback
    }
  }, [propUserEmail]);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-[#18181B]/10 bg-[#FAFAFA]/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#18181B] bg-white shadow-[2px_2px_0px_#18181B] transition-transform group-hover:-rotate-3">
              <div className="relative flex items-center justify-center">
                <span className="font-mono text-base font-black text-[#18181B]">ai</span>
                <span className="absolute -top-1 -right-1.5 h-2 w-2 rounded-full bg-[#1E40AF]" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-[#18181B]">
                aiossan<span className="text-[#1E40AF]">.com</span>
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-5 text-xs font-bold text-[#52525B]">
            <a href="/#books" className="hover:text-[#18181B] transition-colors">
              {isEn ? '3 Playbooks' : 'Katalog 3 Buku'}
            </a>
            <a href="/#quiz" className="hover:text-[#18181B] transition-colors">
              {isEn ? '45s Diagnostic' : 'Kuis 45 Detik'}
            </a>
            <a href="/#scripts" className="hover:text-[#18181B] transition-colors">
              {isEn ? 'Live 1-on-1 Demo' : 'Demo Skrip 1-on-1'}
            </a>
            <a href="/#pricing" className="hover:text-[#18181B] transition-colors">
              {isEn ? 'Pricing & Box Set' : 'Paket Harga'}
            </a>
          </div>
        </div>

        <nav className="flex items-center gap-2 sm:gap-2.5">
          {currentUserEmail ? (
            <Link
              href="/dashboard"
              className="doodle-button inline-flex items-center gap-1.5 bg-[#CCFBF1] px-3.5 py-1.5 text-xs font-extrabold text-[#065F46]"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="max-w-[110px] sm:max-w-[160px] truncate">{currentUserEmail}</span>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-bold text-[#18181B] shadow-xs hover:border-zinc-300 hover:shadow-sm transition-all"
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
