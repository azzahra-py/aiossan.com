'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { NavbarDoodle } from '@/components/doodle/NavbarDoodle';
import { SketchCard } from '@/components/doodle/SketchCard';
import { SketchButton } from '@/components/doodle/SketchButton';
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
        email,
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
      setErrorMessage(err.message || 'Terjadi kesalahan saat mengirim Magic Link.');
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
      setErrorMessage(err.message || 'Gagal login dengan Google.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <NavbarDoodle />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <SketchCard variant="white" badgeText="Akses Pembaca" className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] mb-2 tracking-tight">
              Masuk ke <mark>aiossan.com</mark>
            </h1>
            <p className="text-sm text-[#52525B]">
              Akses buku digital, unduh PDF resmi, dan simpan progres checklist latihan kamu.
            </p>
          </div>

          {errorMessage && (
            <div className="doodle-box bg-[#FFF5F5] border-[#E63946] p-3 mb-4 flex items-start gap-2 text-sm text-[#E63946]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {sentMessage ? (
            <div className="doodle-box bg-[#F0FAF8] border-[#2A9D8F] p-4 text-center my-4">
              <CheckCircle2 className="w-8 h-8 text-[#2A9D8F] mx-auto mb-2" />
              <h2 className="text-xl font-bold text-[#18181B] mb-1">
                Tautan Masuk Terkirim!
              </h2>
              <p className="text-xs text-[#5C5A54] leading-relaxed mb-4">
                Kami telah mengirimkan tautan masuk rahasia (*Magic Link*) ke <strong>{email}</strong>.
                Buka kotak masuk email kamu dan klik tautan tersebut untuk langsung masuk.
              </p>
              <button
                type="button"
                onClick={() => setSentMessage(false)}
                className="text-xs font-hand font-bold text-[#2B59C3] underline"
              >
                Gunakan email lain
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="doodle-button w-full bg-white text-[#1E1E1E] py-2.5 px-4 text-base font-bold flex items-center justify-center gap-3 cursor-pointer hover:bg-[#FAF7F2]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Lanjut dengan Google</span>
              </button>

              <div className="flex items-center my-4">
                <hr className="flex-1 border-t border-[#1E1E1E]/20" />
                <span className="px-3 text-xs font-mono uppercase text-[#5C5A54] bg-[#FFFDF0]">
                  atau kirim tautan email
                </span>
                <hr className="flex-1 border-t border-[#1E1E1E]/20" />
              </div>

              {/* Magic Link Form */}
              <form onSubmit={handleMagicLink} className="space-y-3">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold font-hand text-[#1E1E1E] mb-1">
                    Alamat Email Kamu
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="nama@perusahaan.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-md px-3 py-2 text-sm text-[#18181B] placeholder:text-[#AAA] focus:outline-none focus:ring-2 focus:ring-[#FFE66D] shadow-2xs"
                    />
                    <Mail className="w-4 h-4 text-[#AAA] absolute right-3 top-2.5" />
                  </div>
                </div>

                <SketchButton
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={loading}
                  className="w-full"
                >
                  <span>{loading ? 'Mengirim...' : 'Kirim Tautan Magic Link'}</span>
                  <ArrowRight className="w-4 h-4" />
                </SketchButton>
              </form>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-[#1E1E1E]/10 text-center">
            <p className="text-xs text-[#5C5A54]">
              Belum punya akses buku?{' '}
              <Link href="/#pricing" className="font-bold text-[#2B59C3] hover:underline">
                Lihat 6 Paket Harga Resmi
              </Link>
            </p>
          </div>
        </SketchCard>
      </main>
    </div>
  );
}
