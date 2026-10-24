'use client';

import React, { useState } from 'react';
import { BookId, BookLang } from '@/types/books';
import { PRICING_TIERS, TierId } from '@/lib/pricing';
import { formatIDR } from '@/lib/utils';
import { TacticalButton } from '@/components/ui/TacticalButton';
import { Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export interface PaywallCardProps {
  bookId: BookId;
  lang: BookLang;
  chapterTitle?: string;
}

export function PaywallCard({ bookId, lang, chapterTitle }: PaywallCardProps) {
  const [selectedTierId, setSelectedTierId] = useState<TierId>('bundle-trilogy');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isEn = lang === 'en';

  const handleUnlock = async () => {
    if (!email || !email.includes('@')) {
      setErrorMsg(
        isEn
          ? 'Please enter a valid email address to unlock instant access.'
          : 'Masukkan alamat email aktif kamu untuk membuka akses instan.'
      );
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tierId: selectedTierId,
          email: email.trim(),
          name: name.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout error');
      if (data.paymentUrl) window.location.href = data.paymentUrl;
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal menghubungkan ke kasir Mayar.');
      setLoading(false);
    }
  };

  return (
    <div className="my-10 rounded-2xl border border-[#E5E1D8] bg-[#FBF9F5] p-6 sm:p-8 text-[#111113] shadow-md">
      <div className="max-w-xl mx-auto text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#1E40AF] text-white mb-3 shadow-xs">
          <Lock className="w-5 h-5" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
          {isEn ? 'Continue Reading with Full Edition Access' : 'Buka Bab Ini & Seluruh Playbook Lengkap'}
        </h2>
        <p className="text-sm text-[#52525B] font-sans">
          {isEn
            ? `Unlock "${chapterTitle || 'this chapter'}" plus all 1-on-1 scripts, checklists, and A5 Master PDFs.`
            : `Buka "${chapterTitle || 'bab ini'}" beserta seluruh contekan skrip 1-on-1, simulasi latihan, dan Master PDF A5.`}
        </p>
      </div>

      {errorMsg && (
        <div className="max-w-xl mx-auto mb-6 p-3 rounded-lg bg-[#FFF1F2] border border-[#FECDD3] text-xs text-[#BE123C] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="max-w-xl mx-auto bg-white border border-[#E4E2DD] rounded-xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-mono font-bold uppercase text-[#111113] mb-1">
            {isEn ? 'Your Email (Required)' : 'Email Aktif (Wajib)'}
          </label>
          <input
            type="email"
            required
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[#D4D0C8] text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-[11px] font-mono uppercase text-[#52525B] mb-1">
            {isEn ? 'Your Name (Optional)' : 'Nama Lengkap (Opsional)'}
          </label>
          <input
            type="text"
            placeholder="Harry"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[#D4D0C8] text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {PRICING_TIERS.filter((t) =>
          ['book-1', 'book-2', 'book-3'].includes(bookId)
            ? [bookId, 'bundle-1-2', 'bundle-trilogy'].includes(t.id)
            : true
        ).map((tier) => {
          const active = selectedTierId === tier.id;
          return (
            <div
              key={tier.id}
              onClick={() => setSelectedTierId(tier.id)}
              className={`rounded-xl border p-4 cursor-pointer transition-all flex flex-col justify-between ${
                active
                  ? 'border-2 border-[#1E40AF] bg-white shadow-xs'
                  : 'border-[#E4E2DD] bg-white/60 hover:bg-white'
              }`}
            >
              <div>
                <div className="font-mono text-[10px] font-bold uppercase text-[#EA580C] mb-1">
                  {isEn ? tier.badgeEn : tier.badgeId}
                </div>
                <div className="font-serif font-bold text-base text-[#111113] mb-1">
                  {isEn ? tier.nameEn : tier.nameId}
                </div>
                <div className="font-mono text-xl font-bold text-[#111113]">
                  {formatIDR(tier.priceIdr)}
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-[#E4E2DD] flex items-center justify-between text-[11px] font-mono text-[#0F766E]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {tier.includedBooks.length} Vol + PDF
                </span>
                <input
                  type="radio"
                  checked={active}
                  onChange={() => setSelectedTierId(tier.id)}
                  className="accent-[#111113]"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="max-w-md mx-auto text-center">
        <TacticalButton
          variant="accent"
          size="lg"
          disabled={loading}
          onClick={handleUnlock}
          className="w-full"
        >
          <span>
            {loading
              ? isEn
                ? 'Redirecting to Mayar...'
                : 'Menghubungkan Kasir Mayar...'
              : isEn
              ? 'Unlock Instant Access via Mayar (QRIS / VA)'
              : 'Buka Akses Instan via Mayar (QRIS / VA)'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </TacticalButton>
      </div>
    </div>
  );
}
