'use client';

import React, { useState } from 'react';
import { PRICING_TIERS, PricingTier } from '@/lib/pricing';
import { BookLang } from '@/types/books';
import { formatIDR } from '@/lib/utils';
import { WoodlandMascotSvg } from './WoodlandMascotSvg';
import { Check, Sparkles, Loader2, ShieldCheck, Crown } from 'lucide-react';

interface PricingGridDoodleProps {
  lang?: BookLang;
  userEmail?: string | null;
  columns?: 1 | 2 | 3;
}

const TIER_DESCRIPTIONS: Record<
  PricingTier['id'],
  Record<BookLang, string>
> = {
  'book-1': {
    'id-kasual': 'Panduan taktis bikin tim baru mandiri, rumus target 3K, dan skrip obrolan 1-on-1.',
    'id-standar': 'Panduan taktis kepemimpinan tim baru, perumusan target kerja terukur, dan dialog 1-on-1.',
    en: 'Field playbook for first-time leaders, 3C goal formula, and actionable 1-on-1 scripts.',
  },
  'book-2': {
    'id-kasual': 'Perisai anti-burnout, cara tolak tugas limpahan, dan cetak tangan kanan andalan.',
    'id-standar': 'Panduan ketahanan kerja pemimpin, manajemen delegasi, dan kaderisasi tangan kanan.',
    en: 'Sustainable leadership stamina, preventing burnout, and grooming your second-in-command.',
  },
  'book-3': {
    'id-kasual': 'Standar melatih para Team Leader, memecah silo antar-divisi, dan audit organisasi.',
    'id-standar': 'Panduan memimpin para team lead, menyelaraskan lintas divisi, dan tata kelola unit kerja.',
    en: 'Operating system for managing team leads, eliminating silos, and divisional leadership.',
  },
  'bundle-1-2': {
    'id-kasual': 'Kombinasi lengkap memimpin tim dan menjaga ritme kerja tetap waras setiap hari.',
    'id-standar': 'Paket lengkap penguasaan tim dan perlindungan ketahanan kepemimpinan berkelanjutan.',
    en: 'Combined playbook covering team execution and long-term leader resilience.',
  },
  'bundle-2-3': {
    'id-kasual': 'Paket khusus manajer senior untuk membenahi efisiensi operasional dan melatih para leader.',
    'id-standar': 'Paket lanjutan untuk membangun sistem kerja sehat dan mengoordinasikan tim gabungan.',
    en: 'Advanced bundle for scaling departmental operations and mentoring frontline team leads.',
  },
  'bundle-trilogy': {
    'id-kasual': 'Akses penuh seluruh 3 buku interaktif (45 bab), Bahasa Indonesia dan English, dan file PDF lengkap.',
    'id-standar': 'Akses menyeluruh seluruh trilogi (45 bab), Bahasa Indonesia dan English, dan seluruh berkas PDF.',
    en: 'Complete access to all 3 interactive playbooks (45 chapters), Indonesian and English editions, and PDFs.',
  },
};

export function PricingGridDoodle({
  lang = 'id-kasual',
  userEmail,
  columns = 3,
}: PricingGridDoodleProps) {
  const gridCols =
    columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : columns === 1
      ? 'grid-cols-1'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [emailModalTier, setEmailModalTier] = useState<PricingTier | null>(null);
  const [guestEmail, setGuestEmail] = useState(userEmail || '');
  const [guestName, setGuestName] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  return (
    <div className="space-y-6">
      {errorMsg && (
        <div className="mx-auto max-w-xl rounded-2xl border-2 border-[#E11D48] bg-[#FFF1F2] p-4 text-center text-sm font-bold text-[#881337] shadow-[3px_3px_0px_#E11D48]">
          {errorMsg}
        </div>
      )}

      <div className={`grid ${gridCols} gap-6 items-stretch`}>
        {PRICING_TIERS.map((tier) => {
          const isBestSeller = Boolean(tier.isBestValue);
          const isTwoBookBundle =
            tier.id === 'bundle-1-2' || tier.id === 'bundle-2-3';
          const title = lang === 'en' ? tier.nameEn : tier.nameId;
          const desc = TIER_DESCRIPTIONS[tier.id][lang];
          const badgeText = lang === 'en' ? tier.badgeEn : tier.badgeId;

          return (
            <div
              key={tier.id}
              className={`doodle-box relative flex flex-col justify-between p-6 transition-transform duration-200 hover:-translate-y-1 ${
                isBestSeller
                  ? 'bg-gradient-to-b from-[#FEF9C3] via-white to-[#EFF6FF] ring-4 ring-[#2563EB] md:scale-[1.03]'
                  : isTwoBookBundle
                  ? 'bg-[#FFFDF5]'
                  : 'bg-white'
              }`}
            >
              {badgeText && (
                <div
                  className={`-mt-9 mb-3 self-start rounded-full border-2 border-[#18181B] px-3.5 py-1 font-mono text-xs font-extrabold shadow-[2px_2px_0px_#18181B] flex items-center gap-1.5 ${
                    isBestSeller
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-[#FFE66D] text-[#18181B]'
                  }`}
                >
                  {isBestSeller ? (
                    <Crown className="w-3.5 h-3.5 text-[#FFE66D]" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  <span>{badgeText}</span>
                </div>
              )}

              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-extrabold text-lg sm:text-xl text-[#18181B] leading-snug">
                    {title}
                  </h3>
                  {isBestSeller && (
                    <WoodlandMascotSvg
                      character="capybara"
                      className="w-14 h-14 shrink-0 -mt-2"
                    />
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#52525B] mb-4 leading-relaxed">
                  {desc}
                </p>

                <div className="my-4 rounded-xl border-2 border-[#18181B] bg-[#FAF7F2] p-3.5">
                  {tier.strikePriceIdr && (
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="font-mono text-xs text-[#E11D48] line-through font-bold">
                        {formatIDR(tier.strikePriceIdr)}
                      </span>
                      <span className="rounded bg-[#CCFBF1] border border-[#065F46] px-1.5 py-0.5 font-mono text-[10px] font-extrabold text-[#065F46]">
                        {lang === 'en' ? 'Save' : 'Hemat'}{' '}
                        {formatIDR(tier.strikePriceIdr - tier.priceIdr)}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
                    <span className="font-extrabold text-2xl sm:text-3xl text-[#18181B]">
                      {formatIDR(tier.priceIdr)}
                    </span>
                    <span className="font-hand text-sm text-[#52525B]">
                      / {lang === 'en' ? 'lifetime access' : 'sekali bayar'}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6 text-xs sm:text-sm text-[#18181B]">
                  <li className="flex items-center gap-2 font-bold">
                    <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                    <span>
                      {lang === 'en'
                        ? `Unlock ${tier.includedBooks.length} Interactive Web Playbook(s)`
                        : `Akses Penuh ${tier.includedBooks.length} Buku di Web Interaktif`}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                    <span>
                      {lang === 'en'
                        ? 'Both Languages Included: Indonesian (Casual / Standard) & English'
                        : 'Dua Bahasa Termasuk: Indonesia (Kasual / Standar) & English'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0D9488] shrink-0" />
                    <span>
                      {lang === 'en'
                        ? 'Download Mobile-Friendly PDF + Copy-Paste Scripts'
                        : 'Unduh PDF Mobile-Friendly + Skrip 1-on-1 Siap Salin'}
                    </span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                disabled={loadingTier === tier.id}
                onClick={() => handleCheckout(tier)}
                className={`doodle-button w-full py-3 px-4 text-sm flex items-center justify-center gap-2 ${
                  isBestSeller
                    ? 'bg-[#FFE66D] text-[#18181B] text-base'
                    : isTwoBookBundle
                    ? 'bg-[#DBEAFE] text-[#1E3A8A]'
                    : 'bg-white text-[#18181B] hover:bg-[#FEF9C3]'
                }`}
              >
                {loadingTier === tier.id ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{lang === 'en' ? 'Processing Mayar...' : 'Memproses Mayar...'}</span>
                  </>
                ) : (
                  <span>
                    {lang === 'en'
                      ? `Get Instant Access (${formatIDR(tier.priceIdr)})`
                      : `Beli Sekarang (${formatIDR(tier.priceIdr)})`}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {emailModalTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="doodle-box relative w-full max-w-md bg-[#FAF7F2] p-6">
            <div className="flex items-center gap-3 mb-3">
              <WoodlandMascotSvg character="capybara" className="w-14 h-14" />
              <div>
                <span className="font-mono text-[10px] font-extrabold uppercase bg-[#FFE66D] px-2 py-0.5 rounded border border-[#18181B]">
                  {lang === 'en' ? 'Final Step Before Payment' : 'Langkah Terakhir Sebelum Bayar'}
                </span>
                <h4 className="font-extrabold text-lg text-[#18181B]">
                  {lang === 'en' ? 'Where Should We Send Your Book Access?' : 'Ke Mana Akses Buku Dikirim?'}
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#52525B] mb-4">
              {lang === 'en'
                ? 'Enter an active email. Once your payment for '
                : 'Masukkan email aktif kamu. Begitu pembayaran '}
              <strong>{lang === 'en' ? emailModalTier.nameEn : emailModalTier.nameId}</strong> ({formatIDR(emailModalTier.priceIdr)}){' '}
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
                  {lang === 'en' ? 'Nickname (Optional)' : 'Nama Panggilan (Opsional)'}
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={lang === 'en' ? 'e.g. Harry' : 'Misal: Harry'}
                  className="w-full rounded-xl border-2 border-[#18181B] bg-white px-3.5 py-2 text-sm font-bold"
                />
              </div>
              <div>
                <label className="block font-mono text-xs font-bold text-[#18181B] mb-1">
                  {lang === 'en' ? 'Active Email Address *' : 'Alamat Email Aktif *'}
                </label>
                <input
                  type="email"
                  required
                  autoFocus
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full rounded-xl border-2 border-[#18181B] bg-white px-3.5 py-2 text-sm font-bold"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEmailModalTier(null)}
                  className="rounded-xl border-2 border-[#18181B] bg-white px-4 py-2 text-xs font-bold"
                >
                  {lang === 'en' ? 'Cancel' : 'Batal'}
                </button>
                <button
                  type="submit"
                  className="doodle-button bg-[#FFE66D] px-5 py-2 text-xs sm:text-sm font-extrabold text-[#18181B]"
                >
                  {lang === 'en' ? 'Continue to Mayar Payment →' : 'Lanjut ke Pembayaran Mayar →'}
                </button>
              </div>
            </form>

            <div className="mt-4 flex items-center gap-2 border-t border-dashed border-[#D4D4D8] pt-3 text-[11px] text-[#52525B]">
              <ShieldCheck className="w-4 h-4 text-[#0D9488] shrink-0" />
              <span>{lang === 'en' ? 'Secure payment via QRIS, Virtual Account, & E-Wallet (Mayar.id)' : 'Pembayaran aman via QRIS, Virtual Account, & E-Wallet (Mayar.id)'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
