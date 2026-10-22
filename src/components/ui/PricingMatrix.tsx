'use client';

import React, { useState } from 'react';
import { PRICING_TIERS, PricingTier } from '@/lib/pricing';
import { BookLang } from '@/types/books';
import { EditorialCard } from './EditorialCard';
import { TacticalButton } from './TacticalButton';
import {
  Check,
  Sparkles,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Download,
  BookOpen,
  X,
  Mail,
} from 'lucide-react';

interface PricingMatrixProps {
  lang?: BookLang;
}

export function PricingMatrix({ lang = 'id-kasual' }: PricingMatrixProps) {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [selectedTierForEmail, setSelectedTierForEmail] = useState<PricingTier | null>(null);
  const [guestEmail, setGuestEmail] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestMobile, setGuestMobile] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const isEn = lang === 'en';

  const handleCheckout = async (
    tier: PricingTier,
    contact?: { email: string; name?: string; mobile?: string }
  ) => {
    try {
      setLoadingTier(tier.id);
      setErrorMsg('');

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tierId: tier.id,
          email: contact?.email || undefined,
          name: contact?.name || undefined,
          mobile: contact?.mobile || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.requiresEmail) {
          setSelectedTierForEmail(tier);
          setLoadingTier(null);
          return;
        }
        throw new Error(data.error || 'Gagal membuat sesi pembayaran.');
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem.');
      setLoadingTier(null);
    }
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestEmail || !selectedTierForEmail) return;
    handleCheckout(selectedTierForEmail, {
      email: guestEmail,
      name: guestName,
      mobile: guestMobile,
    });
  };

  const bundles = PRICING_TIERS.filter((t) => t.id.startsWith('bundle-')).sort((a, b) =>
    a.id === 'bundle-trilogy' ? -1 : b.id === 'bundle-trilogy' ? 1 : 0
  );
  const singles = PRICING_TIERS.filter((t) => !t.id.startsWith('bundle-'));

  return (
    <section id="pricing" className="py-24 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="font-mono text-[11px] uppercase tracking-widest px-3 py-1 rounded-full bg-[#F3F0E8] border border-[#D4D0C8] text-[#111113] font-semibold">
          {isEn ? 'PERPETUAL LICENSE // ONE-TIME PAYMENT' : 'LISENSI PERMANEN // SEKali BAYAR SELAMANYA'}
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#111113] mt-4 mb-4">
          {isEn ? (
            <>
              Acquire Individual Volumes or{' '}
              <mark>The Complete Trilogy Box Set</mark>
            </>
          ) : (
            <>
              Miliki Volume Satuan atau{' '}
              <mark>Paket Lengkap Trilogi (Hemat Rp 48.000)</mark>
            </>
          )}
        </h2>
        <p className="font-sans text-base text-[#52525B] leading-relaxed">
          {isEn
            ? 'Every edition includes lifetime access to the interactive web reader, all 3 language registers (Casual, Formal, & English), and official A5 Master PDFs.'
            : 'Setiap pembelian langsung membuka akses pembaca web interaktif selamanya, 3 edisi gaya bahasa sekaligus (Kasual, Standar, & English), serta Master PDF A5 resmi.'}
        </p>

        {errorMsg && (
          <div className="mt-6 p-3.5 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] text-[#BE123C] text-xs font-mono max-w-lg mx-auto">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Top Row: Bundles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mb-10 items-stretch">
        {bundles.map((tier) => {
          const isTrilogy = tier.id === 'bundle-trilogy';
          const title = isEn ? tier.nameEn : tier.nameId;
          const badge = isEn ? tier.badgeEn : tier.badgeId;

          return (
            <EditorialCard
              key={tier.id}
              variant={isTrilogy ? 'featured' : 'surface'}
              indexLabel={`TIER // ${tier.id.toUpperCase()}`}
              badgeText={badge}
              accentColor={isTrilogy ? 'orange' : 'cobalt'}
              className="flex flex-col justify-between"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  {isTrilogy && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FFF7ED] border border-[#FED7AA] text-[#EA580C] font-mono text-[10px] font-bold uppercase tracking-wider mb-3">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>
                        {isEn
                          ? 'RECOMMENDED EDITION • ALL 45 CHAPTERS'
                          : 'EDISI REKOMENDASI UTAMA • LENGKAP 45 BAB'}
                      </span>
                    </div>
                  )}

                  <h3 className="font-serif text-2xl font-bold text-[#111113] mb-3 leading-snug">
                    {title}
                  </h3>

                  <div className="flex items-baseline gap-2.5 mb-4 pb-4 border-b border-[#E4E2DD]">
                    <span className="font-mono text-3xl sm:text-4xl font-bold text-[#111113]">
                      Rp {tier.priceIdr.toLocaleString('id-ID')}
                    </span>
                    {tier.strikePriceIdr && (
                      <span className="font-mono text-sm line-through text-[#71717A]">
                        Rp {tier.strikePriceIdr.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-2.5 text-sm text-[#27272A] mb-8 font-sans">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>
                        {isEn
                          ? `Full interactive web access to ${tier.includedBooks.length} volumes (${tier.includedBooks.length * 15} chapters)`
                          : `Akses penuh pembaca web untuk ${tier.includedBooks.length} volume (${tier.includedBooks.length * 15} bab)`}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>
                        {isEn
                          ? 'Includes all 3 registers: Casual (Gue/Lo), Standard, & English'
                          : 'Termasuk 3 gaya bahasa: Kasual (Gue/Lo), Standar, & English'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>
                        {isEn
                          ? 'Official A5 Master PDFs via Cloudflare R2'
                          : 'Unduhan Master PDF A5 resmi via Cloudflare R2'}
                      </span>
                    </li>
                  </ul>
                </div>

                <TacticalButton
                  variant={isTrilogy ? 'accent' : 'primary'}
                  size="lg"
                  className="w-full"
                  onClick={() => handleCheckout(tier)}
                  disabled={loadingTier === tier.id}
                >
                  {loadingTier === tier.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{isEn ? 'Preparing Invoice...' : 'Menyiapkan Invoice...'}</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {isTrilogy
                          ? isEn
                            ? 'Get Complete Trilogy Box Set'
                            : 'Ambil Paket Trilogi Lengkap'
                          : isEn
                          ? 'Select This Bundle'
                          : 'Pilih Bundel Ini'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </TacticalButton>
              </div>
            </EditorialCard>
          );
        })}
      </div>

      {/* Bottom Row: Individual Volumes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {singles.map((tier) => (
          <EditorialCard
            key={tier.id}
            variant="subtle"
            indexLabel={`SINGLE VOLUME // ${tier.id.toUpperCase()}`}
            badgeText={isEn ? tier.badgeEn : tier.badgeId}
            accentColor="neutral"
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <h4 className="font-serif text-xl font-bold text-[#111113] mb-2">
                  {isEn ? tier.nameEn : tier.nameId}
                </h4>
                <div className="font-mono text-2xl font-bold text-[#111113] mb-4">
                  Rp {tier.priceIdr.toLocaleString('id-ID')}{' '}
                  <span className="text-xs font-normal text-[#71717A]">/ 15 Chapters</span>
                </div>
              </div>
              <TacticalButton
                variant="secondary"
                size="md"
                className="w-full"
                onClick={() => handleCheckout(tier)}
                disabled={loadingTier === tier.id}
              >
                <span>{isEn ? 'Buy Single Volume' : 'Beli Volume Satuan'}</span>
                <ArrowRight className="w-4 h-4" />
              </TacticalButton>
            </div>
          </EditorialCard>
        ))}
      </div>

      {/* Guest Email Modal */}
      {selectedTierForEmail && (
        <div className="fixed inset-0 z-50 bg-[#111113]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#111113] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-[#FBF9F5] border-b border-[#E4E2DD]">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111113]">
                {isEn ? 'INSTANT ACCESS DELIVERY' : 'PENGIRIMAN AKSES INSTAN'}
              </span>
              <button
                type="button"
                onClick={() => setSelectedTierForEmail(null)}
                className="p-1 rounded-lg hover:bg-[#E4E2DD]/50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleGuestSubmit} className="p-6 space-y-4">
              <div>
                <div className="font-mono text-xs font-semibold text-[#EA580C]">
                  {isEn ? selectedTierForEmail.nameEn : selectedTierForEmail.nameId}
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#111113] mt-0.5">
                  {isEn ? 'Enter Your Email Address' : 'Masukkan Email Penerima Akses'}
                </h3>
                <p className="text-xs text-[#52525B] mt-1 leading-relaxed">
                  {isEn
                    ? 'Your books and PDFs will automatically unlock for this email address as soon as payment completes.'
                    : 'Akses seluruh bab dan Master PDF otomatis aktif pada alamat email ini begitu pembayaran selesai.'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#111113] mb-1">
                  {isEn ? 'Email Address (Required)' : 'Alamat Email Aktif (Wajib)'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="nama@perusahaan.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-9 rounded-lg border border-[#D4D0C8] bg-[#FBF9F5] text-sm font-mono focus:outline-none focus:border-[#111113]"
                  />
                  <Mail className="w-4 h-4 text-[#71717A] absolute right-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#52525B] mb-1">
                    {isEn ? 'Name (Optional)' : 'Nama (Opsional)'}
                  </label>
                  <input
                    type="text"
                    placeholder="Budi"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#D4D0C8] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#52525B] mb-1">
                    WhatsApp (Opsional)
                  </label>
                  <input
                    type="tel"
                    placeholder="0812xxxx"
                    value={guestMobile}
                    onChange={(e) => setGuestMobile(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#D4D0C8] text-sm font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <TacticalButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedTierForEmail(null)}
                >
                  {isEn ? 'Cancel' : 'Batal'}
                </TacticalButton>
                <TacticalButton
                  type="submit"
                  variant="accent"
                  size="md"
                  disabled={loadingTier === selectedTierForEmail.id}
                >
                  <span>
                    {isEn
                      ? `Proceed to Payment (Rp ${selectedTierForEmail.priceIdr.toLocaleString('id-ID')})`
                      : `Lanjut ke Pembayaran (Rp ${selectedTierForEmail.priceIdr.toLocaleString('id-ID')})`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </TacticalButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
