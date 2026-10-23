'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { NavbarDoodle } from '@/components/doodle/NavbarDoodle';
import { SketchCard } from '@/components/doodle/SketchCard';
import { SketchButton } from '@/components/doodle/SketchButton';
import { CheckCircle2, BookOpen, ArrowRight, Sparkles, User } from 'lucide-react';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'ORD-SELESAI';

  return (
    <SketchCard variant="yellow" badgeText="Pembayaran Diterima" className="w-full max-w-lg text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2A9D8F] text-white border-2 border-[#1E1E1E] rounded-full shadow-[3px_3px_0px_#1E1E1E] mb-4">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <h1 className="font-hand text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-2">
        Selamat Datang di <mark>Klub Pembaca!</mark>
      </h1>

      <p className="text-sm text-[#5C5A54] leading-relaxed mb-6 font-body">
        Pembayaran kamu telah kami terima. Akses seluruh bab, template skrip komunikasi,
        dan master PDF kini telah resmi terbuka di akun kamu.
      </p>

      <div className="doodle-box bg-white p-4 mb-6 text-left">
        <div className="flex items-center justify-between text-xs font-mono mb-2 pb-2 border-b border-[#E2DDD3]">
          <span className="text-[#5C5A54]">Nomor Pesanan:</span>
          <span className="font-bold text-[#1E1E1E]">{orderNumber}</span>
        </div>
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#5C5A54]">Status Akses:</span>
          <span className="font-bold text-[#2A9D8F] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            AKTIF (Lunas)
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/read/book-1/id-kasual/ch-0" className="w-full sm:w-auto">
          <SketchButton variant="primary" size="lg" className="w-full sm:w-auto">
            <BookOpen className="w-5 h-5 text-[#1E1E1E]" />
            <span>Mulai Baca Buku 1</span>
            <ArrowRight className="w-4 h-4" />
          </SketchButton>
        </Link>

        <Link href="/dashboard" className="w-full sm:w-auto">
          <SketchButton variant="secondary" size="lg" className="w-full sm:w-auto">
            <User className="w-4 h-4 text-[#2B59C3]" />
            <span>Buka Dashboard</span>
          </SketchButton>
        </Link>
      </div>

      <p className="mt-6 text-xs text-[#5C5A54] font-body">
        Butuh bantuan transaksi? Hubungi kami langsung melalui catatan dukungan di dashboard.
      </p>
    </SketchCard>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <NavbarDoodle />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <Suspense
          fallback={
            <div className="doodle-box p-8 bg-white text-center font-hand text-xl">
              Memuat detail pesanan...
            </div>
          }
        >
          <CheckoutSuccessContent />
        </Suspense>
      </main>
    </div>
  );
}
