'use client';

import React, { useState } from 'react';
import { PRICING_TIERS, PricingTier } from '@/lib/pricing';
import { BookId, BookLang } from '@/types/books';
import { formatIDR } from '@/lib/utils';
import {
  Check,
  Sparkles,
  Loader2,
  ShieldCheck,
  Crown,
  ChevronDown,
} from 'lucide-react';

interface PricingGridDoodleProps {
  lang?: BookLang;
  userEmail?: string | null;
  columns?: 1 | 2 | 3;
  compactForBookId?: BookId;
}

const TIER_DESCRIPTIONS: Record<
  PricingTier['id'],
  Record<BookLang, string>
> = {
  'book-1': {
    'id-kasual':
      'Panduan taktis bikin tim baru mandiri, rumus target 3K, dan skrip obrolan 1-on-1.',
    'id-standar':
      'Panduan taktis kepemimpinan tim baru, perumusan target kerja terukur, dan dialog 1-on-1.',
    en: 'Field playbook for first-time leaders, 3C goal formula, and actionable 1-on-1 scripts.',
  },
  'book-2': {
    'id-kasual':
      'Perisai anti-burnout, cara tolak tugas limpahan, dan cetak tangan kanan andalan.',
    'id-standar':
      'Panduan ketahanan kerja pemimpin, manajemen delegasi, dan kaderisasi tangan kanan.',
    en: 'Sustainable leadership stamina, preventing burnout, and grooming your second-in-command.',
  },
  'book-3': {
    'id-kasual':
      'Standar melatih para Team Leader, memecah silo antar-divisi, dan audit organisasi.',
    'id-standar':
      'Panduan memimpin para team lead, menyelaraskan lintas divisi, dan tata kelola unit kerja.',
    en: 'Operating system for managing team leads, eliminating silos, and divisional leadership.',
  },
  'bundle-1-2': {
    'id-kasual':
      'Kombinasi lengkap memimpin tim dan menjaga ritme kerja tetap waras setiap hari.',
    'id-standar':
      'Paket lengkap penguasaan tim dan perlindungan ketahanan kepemimpinan berkelanjutan.',
    en: 'Combined playbook covering team execution and long-term leader resilience.',
  },
  'bundle-2-3': {
    'id-kasual':
      'Paket khusus manajer senior untuk membenahi efisiensi operasional dan melatih para leader.',
    'id-standar':
      'Paket lanjutan untuk membangun sistem kerja sehat dan mengoordinasikan tim gabungan.',
    en: 'Advanced bundle for scaling departmental operations and mentoring frontline team leads.',
  },
  'bundle-trilogy': {
    'id-kasual':
      'Akses penuh seluruh 3 buku interaktif (45 bab), Bahasa Indonesia (Kasual & Standar) + English, dan 9 file Master PDF A5.',
    'id-standar':
      'Akses menyeluruh seluruh trilogi (45 bab), Bahasa Indonesia (Kasual & Standar) + English, dan seluruh berkas PDF A5.',
    en: 'Complete access to all 3 interactive playbooks (45 chapters), Indonesian and English editions, and all 9 A5 PDFs.',
  },
};

const TIER_FEATURES: Record<PricingTier['id'], Record<BookLang, string>> = {
  'book-1': {
    'id-kasual': 'Rumus Target 3K + Kalibrasi Gaya L1-L4 ke G1-G4',
    'id-standar': 'Rumus Target 3K + Kalibrasi Tingkat Kesiapan L1-L4 ke G1-G4',
    en: '3C Target Formula + L1-L4 to G1-G4 Guidance Calibration',
  },
  'book-2': {
    'id-kasual': 'Teknik Glass Shield + Audit Kalender Rumus 3P',
    'id-standar': 'Teknik Perisai Kaca + Audit Kalender Rumus 3P',
    en: 'Glass Shield Technique + 3P Calendar Audit',
  },
  'book-3': {
    'id-kasual': 'Coaching the Coach + Rumus 3S Anti-Silo',
    'id-standar': 'Coaching the Coach + Rumus 3S Penyelarasan Lintas Tim',
    en: 'Coaching the Coach + 3S Cross-Silo Formula',
  },
  'bundle-1-2': {
    'id-kasual': 'Fondasi memimpin tim + perisai anti-burnout',
    'id-standar': 'Fondasi kepemimpinan tim + perlindungan ketahanan diri',
    en: 'Team leadership foundations + burnout shield',
  },
  'bundle-2-3': {
    'id-kasual': 'Ketahanan leader + naik kelas ke level divisi',
    'id-standar': 'Ketahanan kepemimpinan + pengelolaan level divisi',
    en: 'Leader resilience + division-level management',
  },
  'bundle-trilogy': {
    'id-kasual': 'Semua framework: 3K, Glass Shield, 3S, dan 45 bab penuh',
    'id-standar': 'Seluruh kerangka: 3K, Perisai Kaca, 3S, dan 45 bab penuh',
    en: 'Every framework: 3C, Glass Shield, 3S, all 45 chapters',
  },
};

export function PricingGridDoodle({
  lang = 'id-kasual',
  userEmail,
  columns = 3,
  compactForBookId,
}: PricingGridDoodleProps) {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [emailModalTier, setEmailModalTier] = useState<PricingTier | null>(null);
  const [guestEmail, setGuestEmail] = useState(userEmail || '');
  const [guestName, setGuestName] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showAllInCompact, setShowAllInCompact] = useState(false);

  const handleCheckout = async (tier: PricingTier, customEmail?: string) => {
    setErrorMsg(null);
    const emailToUse = (customEmail ?? userEmail ?? '').trim();

    if (!emailToUse) {
      setEmailModalTier(tier);
      return;
    }

    setLoadingTier(tier.id);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tierId: tier.id,
          email: emailToUse,
          customerEmail: emailToUse,
          name: guestName.trim() || emailToUse.split('@')[0],
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.requiresEmail) {
          setEmailModalTier(tier);
          setLoadingTier(null);
          return;
        }
        throw new Error(data.error || 'Gagal membuat sesi pembayaran.');
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kendala jaringan.');
    } finally {
      setLoadingTier(null);
    }
  };

  const trilogyTier = PRICING_TIERS.find((t) => t.id === 'bundle-trilogy')!;
  const otherTiers = PRICING_TIERS.filter((t) => t.id !== 'bundle-trilogy');

  // On homepage (no compactForBookId), feature single books (book-1, book-2, book-3)
  const singleBookTiers = PRICING_TIERS.filter((t) =>
    ['book-1', 'book-2', 'book-3'].includes(t.id)
  );

  const visibleOtherTiers = compactForBookId
    ? !showAllInCompact
      ? otherTiers.filter((t) => t.id === compactForBookId)
      : otherTiers
    : singleBookTiers;

  const gridCols =
    columns === 2 || (compactForBookId && !showAllInCompact)
      ? 'grid-cols-1 md:grid-cols-2'
      : columns === 1
      ? 'grid-cols-1'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="space-y-6">
      {errorMsg && (
        <div className="mx-auto max-w-xl rounded-2xl border border-rose-300 bg-[#FFF1F2] p-4 text-center text-sm font-bold text-[#881337] shadow-xs">
          {errorMsg}
        </div>
      )}

      {/* Spotlight Flagship Card: Complete Trilogy Box Set */}
      <div className="rounded-2xl border-2 border-zinc-900 bg-white p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-600 bg-blue-600 px-3 py-0.5 font-mono text-xs font-bold text-white shadow-xs">
                <Crown className="w-3.5 h-3.5 text-amber-300" />
                <span>
                  {lang === 'en'
                    ? trilogyTier.badgeEn
                    : trilogyTier.badgeId}
                </span>
              </span>
              <span className="rounded-lg border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 font-mono text-[11px] font-bold text-zinc-800">
                ★ {lang === 'en' ? 'MOST POPULAR CHOICE' : 'PILIHAN PALING HEMAT'}
              </span>
            </div>

            <h3 className="text-xl sm:text-3xl font-extrabold text-zinc-900 leading-tight">
              {lang === 'en' ? trilogyTier.nameEn : trilogyTier.nameId}
            </h3>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              {TIER_DESCRIPTIONS['bundle-trilogy'][lang]}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm text-zinc-800">
              <div className="flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'Unlock All 3 Playbooks (45 Chapters)'
                    : 'Akses Penuh 3 Buku (45 Bab Interaktif)'}
                </span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{TIER_FEATURES['bundle-trilogy'][lang]}</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'All 9 Official A5 PDFs (ID Casual, ID Standard & EN)'
                    : '9 File Master PDF A5 (ID Kasual, ID Standar & EN)'}
                </span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'One-Time Payment • Lifetime Access'
                    : 'Sekali Bayar • Akses Selamanya'}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50/70 p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                {trilogyTier.strikePriceIdr && (
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-xs text-rose-600 line-through font-bold">
                      {formatIDR(trilogyTier.strikePriceIdr)}
                    </span>
                    <span className="rounded bg-emerald-50 border border-emerald-600 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
                      {lang === 'en' ? 'Save' : 'Hemat'}{' '}
                      {formatIDR(
                        trilogyTier.strikePriceIdr - trilogyTier.priceIdr
                      )}
                    </span>
                  </div>
                )}
                <div className="font-extrabold text-3xl sm:text-4xl text-zinc-900">
                  {formatIDR(trilogyTier.priceIdr)}
                </div>
                <span className="text-xs text-zinc-500 font-medium">
                  {lang === 'en'
                    ? 'one-time payment for all 3 books'
                    : 'sekali bayar untuk 3 buku lengkap'}
                </span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700 shadow-2xs shrink-0">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>

            <button
              type="button"
              disabled={loadingTier === trilogyTier.id}
              onClick={() => handleCheckout(trilogyTier)}
              className="rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white py-3.5 px-4 text-sm sm:text-base font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              {loadingTier === trilogyTier.id ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>
                    {lang === 'en' ? 'Processing Mayar...' : 'Memproses Mayar...'}
                  </span>
                </>
              ) : (
                <span>
                  {lang === 'en'
                    ? `Get Complete Trilogy (${formatIDR(trilogyTier.priceIdr)})`
                    : `Ambil Bundel 3 Buku (${formatIDR(trilogyTier.priceIdr)})`}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Individual Volumes Grid */}
      <div className={`grid ${gridCols} gap-6 items-stretch`}>
        {visibleOtherTiers.map((tier) => {
          const isTwoBookBundle =
            tier.id === 'bundle-1-2' || tier.id === 'bundle-2-3';
          const title = lang === 'en' ? tier.nameEn : tier.nameId;
          const desc = TIER_DESCRIPTIONS[tier.id][lang];
          const badgeText = lang === 'en' ? tier.badgeEn : tier.badgeId;

          return (
            <div
              key={tier.id}
              className="rounded-2xl border border-zinc-200 bg-white flex flex-col justify-between p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {badgeText && (
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-0.5 font-mono text-[11px] font-bold text-zinc-700">
                      <Sparkles className="w-3 h-3 text-zinc-500" />
                      <span>{badgeText}</span>
                    </span>
                  </div>
                )}

                <h3 className="font-extrabold text-lg text-zinc-900 leading-snug mb-2">
                  {title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 mb-4 leading-relaxed">
                  {desc}
                </p>

                <div className="my-4 rounded-xl border border-zinc-200 bg-zinc-50/70 p-3.5">
                  {tier.strikePriceIdr && (
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="font-mono text-xs text-rose-600 line-through font-bold">
                        {formatIDR(tier.strikePriceIdr)}
                      </span>
                      <span className="rounded bg-emerald-50 border border-emerald-600 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
                        {lang === 'en' ? 'Save' : 'Hemat'}{' '}
                        {formatIDR(tier.strikePriceIdr - tier.priceIdr)}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
                    <span className="font-extrabold text-2xl text-zinc-900">
                      {formatIDR(tier.priceIdr)}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">
                      / {lang === 'en' ? 'lifetime access' : 'sekali bayar'}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6 text-xs text-zinc-700">
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      {lang === 'en'
                        ? `Unlock ${tier.includedBooks.length} Interactive Web Playbook(s)`
                        : `Akses Penuh ${tier.includedBooks.length} Buku di Web Interaktif`}
                    </span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{TIER_FEATURES[tier.id][lang]}</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                disabled={loadingTier === tier.id}
                onClick={() => handleCheckout(tier)}
                className="w-full rounded-xl border border-zinc-300 bg-zinc-50 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 text-zinc-900 py-2.5 px-4 text-xs sm:text-sm font-bold shadow-2xs transition-colors flex items-center justify-center gap-2"
              >
                {loadingTier === tier.id ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>
                      {lang === 'en' ? 'Processing...' : 'Memproses...'}
                    </span>
                  </>
                ) : (
                  <span>
                    {lang === 'en'
                      ? `Buy Now (${formatIDR(tier.priceIdr)})`
                      : `Beli Sekarang (${formatIDR(tier.priceIdr)})`}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {compactForBookId && !showAllInCompact && (
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setShowAllInCompact(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2 font-mono text-xs font-extrabold text-[#18181B] shadow-xs hover:border-zinc-300 hover:shadow-sm transition-all"
          >
            <span>
              {lang === 'en'
                ? 'View All 6 Packages & 2-Book Bundles'
                : 'Lihat Semua 6 Paket & Bundel 2 Buku Lainnya'}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}

      {emailModalTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="doodle-box relative w-full max-w-md bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-[#EFF6FF] text-[#1E40AF] shadow-xs shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <span className="font-mono text-[10px] font-bold uppercase bg-blue-50 text-[#1E40AF] px-2 py-0.5 rounded-md border border-blue-100">
                  {lang === 'en'
                    ? 'Final Step Before Payment'
                    : 'Langkah Terakhir Sebelum Bayar'}
                </span>
                <h4 className="font-extrabold text-lg text-[#18181B]">
                  {lang === 'en'
                    ? 'Where Should We Send Your Book Access?'
                    : 'Ke Mana Akses Buku Dikirim?'}
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#52525B] mb-4">
              {lang === 'en'
                ? 'Enter an active email. Once your payment for '
                : 'Masukkan email aktif kamu. Begitu pembayaran '}
              <strong>
                {lang === 'en' ? emailModalTier.nameEn : emailModalTier.nameId}
              </strong>{' '}
              ({formatIDR(emailModalTier.priceIdr)}){' '}
              {lang === 'en'
                ? 'succeeds in Mayar, all chapters unlock automatically for this email.'
                : 'berhasil di Mayar, seluruh bab langsung terbuka otomatis untuk email ini.'}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const selected = emailModalTier;
                setEmailModalTier(null);
                handleCheckout(selected, guestEmail);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-mono text-xs font-bold text-[#18181B] mb-1">
                  {lang === 'en'
                    ? 'Nickname (Optional)'
                    : 'Nama Panggilan (Opsional)'}
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={lang === 'en' ? 'e.g. Harry' : 'Misal: Harry'}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-sm font-bold focus:ring-2 focus:ring-[#2563EB]/20 shadow-2xs"
                />
              </div>
              <div>
                <label className="block font-mono text-xs font-bold text-[#18181B] mb-1">
                  {lang === 'en'
                    ? 'Active Email Address *'
                    : 'Alamat Email Aktif *'}
                </label>
                <input
                  type="email"
                  required
                  autoFocus
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-sm font-bold focus:ring-2 focus:ring-[#2563EB]/20 shadow-2xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEmailModalTier(null)}
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-bold shadow-xs hover:bg-[#FAF7F2]"
                >
                  {lang === 'en' ? 'Cancel' : 'Batal'}
                </button>
                <button
                  type="submit"
                  className="doodle-button bg-[#FFE66D] px-5 py-2 text-xs sm:text-sm font-extrabold text-[#18181B]"
                >
                  {lang === 'en'
                    ? 'Continue to Mayar Payment →'
                    : 'Lanjut ke Pembayaran Mayar →'}
                </button>
              </div>
            </form>

            <div className="mt-4 flex items-center gap-2 border-t border-dashed border-[#D4D4D8] pt-3 text-[11px] text-[#52525B]">
              <ShieldCheck className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>
                {lang === 'en'
                  ? 'Secure payment via QRIS, Virtual Account, & E-Wallet (Mayar.id)'
                  : 'Pembayaran aman via QRIS, Virtual Account, & E-Wallet (Mayar.id)'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
