'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { EditorialHeader } from '@/components/ui/EditorialHeader';
import { EditorialCard } from '@/components/ui/EditorialCard';
import { TacticalButton } from '@/components/ui/TacticalButton';
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const supabase = createClient();

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMessage('');
    setSentMessage(false);

    try {
      const origin = window.location.origin;
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSentMessage(true);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal mengirim tautan Magic Link.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const origin = window.location.origin;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      });
      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal masuk dengan Google.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] swiss-grid-bg">
      <EditorialHeader />

      <main className="flex-1 flex items-center justify-center p-4 py-16">
        <EditorialCard
          variant="featured"
          indexLabel="AIOSSAN // READER AUTHENTICATION"
          badgeText="PASSWORDLESS ACCESS"
          accentColor="orange"
          className="w-full max-w-md"
        >
          <div className="mb-6">
            <h1 className="font-serif text-3xl font-bold text-[#111113] mb-2">
              Masuk ke Perpustakaan Pembaca
            </h1>
            <p className="text-sm text-[#52525B] font-sans leading-relaxed">
              Gunakan alamat email saat pembelian untuk mengakses seluruh bab playbook dan mengunduh Master PDF A5.
            </p>
          </div>

          {errorMessage && (
            <div className="rounded-lg bg-[#FFF1F2] border border-[#FECDD3] p-3 mb-4 flex items-start gap-2 text-xs text-[#BE123C]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {sentMessage ? (
            <div className="rounded-xl bg-[#F0FDFA] border border-[#99F6E4] p-5 text-center my-4">
              <CheckCircle2 className="w-8 h-8 text-[#0F766E] mx-auto mb-2" />
              <h2 className="font-serif text-xl font-bold text-[#111113] mb-1">
                Tautan Masuk Terkirim
              </h2>
              <p className="text-xs text-[#52525B] leading-relaxed mb-4">
                Kami telah mengirimkan tautan masuk instan (*Magic Link*) ke{' '}
                <strong>{email}</strong>. Klik tautan di kotak masuk email kamu untuk langsung masuk.
              </p>
              <button
                type="button"
                onClick={() => setSentMessage(false)}
                className="text-xs font-mono font-bold text-[#1D4ED8] underline cursor-pointer"
              >
                Gunakan alamat email lain
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <TacticalButton
                type="button"
                variant="secondary"
                size="md"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full"
              >
                <span>Lanjutkan dengan Google</span>
              </TacticalButton>

              <div className="flex items-center my-4">
                <hr className="flex-1 border-t border-[#E4E2DD]" />
                <span className="px-3 text-[10px] font-mono uppercase tracking-wider text-[#71717A]">
                  atau magic link email
                </span>
                <hr className="flex-1 border-t border-[#E4E2DD]" />
              </div>

              <form onSubmit={handleMagicLink} className="space-y-3.5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono font-bold uppercase text-[#111113] mb-1.5"
                  >
                    Alamat Email Pembelian
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="nama@perusahaan.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FBF9F5] border border-[#D4D0C8] rounded-lg px-3.5 py-2.5 text-sm text-[#111113] font-mono placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#111113]"
                    />
                    <Mail className="w-4 h-4 text-[#71717A] absolute right-3.5 top-3" />
                  </div>
                </div>

                <TacticalButton
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={loading}
                  className="w-full"
                >
                  <span>{loading ? 'Mengirim Tautan...' : 'Kirim Magic Link ke Email'}</span>
                  <ArrowRight className="w-4 h-4" />
                </TacticalButton>
              </form>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-[#E4E2DD] text-center">
            <p className="text-xs text-[#52525B]">
              Belum memiliki akses?{' '}
              <Link href="/#pricing" className="font-semibold text-[#EA580C] hover:underline">
                Lihat Paket Trilogy Box Set
              </Link>
            </p>
          </div>
        </EditorialCard>
      </main>
    </div>
  );
}
