'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { EditorialHeader } from '@/components/ui/EditorialHeader';
import { EditorialCard } from '@/components/ui/EditorialCard';
import { TacticalButton } from '@/components/ui/TacticalButton';
import { CheckCircle2, BookOpen, ArrowRight, User } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'ORD-COMPLETED';

  return (
    <EditorialCard
      variant="featured"
      indexLabel="AIOSSAN // ORDER CONFIRMATION"
      badgeText="PAYMENT VERIFIED"
      accentColor="emerald"
      className="w-full max-w-lg text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#F0FDFA] border border-[#99F6E4] text-[#0F766E] flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <h1 className="font-serif text-3xl font-bold text-[#111113] mb-2">
        Akses Playbook Telah Aktif
      </h1>
      <p className="text-sm text-[#52525B] leading-relaxed mb-6">
        Terima kasih atas pembelian kamu. Seluruh bab digital, template skrip 1-on-1, dan tautan unduh Master PDF A5 telah dibuka untuk email kamu.
      </p>

      <div className="rounded-xl bg-[#FBF9F5] border border-[#E4E2DD] p-4 mb-6 text-left font-mono text-xs space-y-2">
        <div className="flex justify-between">
          <span className="text-[#71717A]">NOMOR PESANAN:</span>
          <span className="font-bold text-[#111113]">{orderNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#71717A]">STATUS LISENSI:</span>
          <span className="font-bold text-[#0F766E]">AKTIF SELAMANYA (LUNAS)</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/read/book-1/id-kasual/ch-0">
          <TacticalButton variant="primary" size="md" className="w-full sm:w-auto">
            <BookOpen className="w-4 h-4" />
            <span>Mulai Baca Volume 01</span>
            <ArrowRight className="w-4 h-4" />
          </TacticalButton>
        </Link>
        <Link href="/dashboard">
          <TacticalButton variant="secondary" size="md" className="w-full sm:w-auto">
            <User className="w-4 h-4" />
            <span>Buka Perpustakaan & PDF</span>
          </TacticalButton>
        </Link>
      </div>
    </EditorialCard>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] swiss-grid-bg">
      <EditorialHeader />
      <main className="flex-1 flex items-center justify-center p-4 py-16">
        <Suspense fallback={<div className="font-mono text-xs">Loading receipt...</div>}>
          <SuccessContent />
        </Suspense>
      </main>
    </div>
  );
}
