import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { BOOK_CATALOG } from '@/lib/books';
import { BookId } from '@/types/books';
import { syncAndGetUserEntitlements } from '@/lib/entitlements';
import { NavbarDoodle } from '@/components/doodle/NavbarDoodle';
import { SketchCard } from '@/components/doodle/SketchCard';
import { SketchButton } from '@/components/doodle/SketchButton';
import { LogoutButton } from '@/components/auth/LogoutButton';
import {
  BookOpen,
  Download,
  Lock,
  CheckCircle2,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Receipt,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If unauthenticated, show login prompt card
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
        <NavbarDoodle />

        <main className="flex-1 flex items-center justify-center p-4 py-16">
          <SketchCard variant="yellow" badgeText="Akses Pembaca" className="w-full max-w-md text-center">
            <div className="w-14 h-14 bg-[#FFE66D] border border-amber-300 rounded-full mx-auto flex items-center justify-center shadow-xs mb-4">
              <User className="w-7 h-7 text-[#1E1E1E]" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] mb-2 tracking-tight">
              Dashboard <mark>Pembaca</mark>
            </h1>

            <p className="font-body text-xs sm:text-sm text-[#5C5A54] leading-relaxed mb-6">
              Silakan masuk dengan email akun kamu untuk mengakses buku yang sudah kamu miliki,
              membaca bab lengkap, dan mengunduh Master PDF resmi.
            </p>

            <div className="flex flex-col gap-3">
              <Link href="/auth/login?redirect=/dashboard" className="w-full">
                <SketchButton variant="primary" size="lg" className="w-full justify-center">
                  <span>Masuk ke Akun Kamu</span>
                  <ArrowRight className="w-4 h-4" />
                </SketchButton>
              </Link>

              <Link href="/" className="w-full">
                <SketchButton variant="secondary" size="md" className="w-full justify-center">
                  <span>Kembali ke Beranda</span>
                </SketchButton>
              </Link>
            </div>
          </SketchCard>
        </main>
      </div>
    );
  }

  // 1. Fetch entitlements with guest auto-claim
  const activeBookIds: BookId[] = await syncAndGetUserEntitlements(user.id, user.email);

  // 2. Fetch orders
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .or(`user_id.eq.${user.id},customer_email.eq.${user.email}`)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <NavbarDoodle userEmail={user.email} />

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 py-8 sm:py-12">
        {/* User Profile Bar */}
        <div className="doodle-box bg-white p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#1E40AF] text-white border-2 border-[#18181B] rounded-xl flex items-center justify-center font-mono font-bold text-lg shadow-[2px_2px_0px_#18181B]">
              {user.email ? user.email.slice(0, 2).toUpperCase() : 'ME'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-2xl text-[#18181B]">
                  Halo, {user.email?.split('@')[0]}!
                </h1>
                <span className="font-mono text-[10px] px-2 py-0.5 bg-[#FAF7F2] border border-zinc-200 rounded text-[#2A9D8F] font-bold shadow-2xs">
                  Akun Terverifikasi
                </span>
              </div>
              <p className="font-mono text-xs text-[#5C5A54]">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Link href="/#pricing">
              <SketchButton variant="primary" size="sm">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Beli Bundel Tambahan</span>
              </SketchButton>
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Book Collection */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-200">
            <h2 className="font-extrabold text-xl sm:text-2xl text-[#18181B] flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#1E40AF]" />
              Koleksi Trilogi Buku ({activeBookIds.length}/3 Terbuka)
            </h2>
            <span className="text-xs font-mono text-[#5C5A54] hidden sm:inline">
              Akses Web Interaktif + Master PDF
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BOOK_CATALOG.map((book) => {
              const hasAccess = activeBookIds.includes(book.id);

              return (
                <SketchCard
                  key={book.id}
                  variant={hasAccess ? 'yellow' : 'white'}
                  badgeText={hasAccess ? 'Akses Aktif' : 'Terkunci'}
                  className={`flex flex-col justify-between ${
                    hasAccess ? 'border border-amber-300 shadow-sm' : 'border border-zinc-200 opacity-85'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs uppercase px-2 py-0.5 bg-white border border-zinc-200 rounded shadow-2xs">
                        {book.id.toUpperCase()} • 15 BAB
                      </span>
                      {hasAccess ? (
                        <span className="flex items-center gap-1 font-mono text-xs font-bold text-[#2A9D8F]">
                          <CheckCircle2 className="w-4 h-4" />
                          Lunas
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 font-mono text-xs font-bold text-[#E63946]">
                          <Lock className="w-3.5 h-3.5" />
                          Terkunci
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[#18181B] mb-2 leading-snug">
                      {book.titles['id-kasual']}
                    </h3>

                    <p className="font-mono text-xs text-[#5C5A54] italic mb-4">
                      EN: {book.titles['en']}
                    </p>

                    <p className="font-body text-xs text-[#5C5A54] leading-relaxed mb-6">
                      {book.id === 'book-1' &&
                        'Panduan 4 Obrolan Inti, Rumus Delegasi 3K, dan simulasi 4 pekan untuk first-time leader.'}
                      {book.id === 'book-2' &&
                        'Strategi detachment jam 6 sore, monkey management, dan mencetak kader tangan kanan.'}
                      {book.id === 'book-3' &&
                        'Memimpin para team lead, menyatukan silo lintas divisi, dan playbook transisi 90 hari.'}
                    </p>
                  </div>

                  <div>
                    {hasAccess ? (
                      <div className="space-y-3 pt-3 border-t border-zinc-200">
                        <Link href={`/read/${book.id}/id-kasual/ch-0`} className="w-full block">
                          <SketchButton variant="primary" size="md" className="w-full justify-center">
                            <BookOpen className="w-4 h-4" />
                            <span>Buka Pembaca Web</span>
                            <ArrowRight className="w-4 h-4" />
                          </SketchButton>
                        </Link>

                        <div className="bg-white p-3 rounded border border-zinc-200 shadow-2xs space-y-1.5">
                          <span className="font-mono text-[11px] font-bold text-[#1E1E1E] block">
                            Unduh Master PDF Resmi (A5):
                          </span>
                          <div className="grid grid-cols-3 gap-1">
                            <a
                              href={`/api/download?book=${book.id}&lang=id-kasual`}
                              className="text-[10px] font-mono px-1.5 py-1 text-center bg-[#FAF7F2] hover:bg-[#FFE66D] border border-zinc-200 rounded transition-all flex items-center justify-center gap-1 shadow-2xs"
                            >
                              <Download className="w-3 h-3" />
                              <span>Kasual</span>
                            </a>
                            <a
                              href={`/api/download?book=${book.id}&lang=id-standar`}
                              className="text-[10px] font-mono px-1.5 py-1 text-center bg-[#FAF7F2] hover:bg-[#FFE66D] border border-zinc-200 rounded transition-all flex items-center justify-center gap-1 shadow-2xs"
                            >
                              <Download className="w-3 h-3" />
                              <span>Standar</span>
                            </a>
                            <a
                              href={`/api/download?book=${book.id}&lang=en`}
                              className="text-[10px] font-mono px-1.5 py-1 text-center bg-[#FAF7F2] hover:bg-[#FFE66D] border border-zinc-200 rounded transition-all flex items-center justify-center gap-1 shadow-2xs"
                            >
                              <Download className="w-3 h-3" />
                              <span>English</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 pt-3 border-t border-zinc-200">
                        <Link href={`/read/${book.id}/id-kasual/ch-0`} className="w-full block">
                          <SketchButton variant="secondary" size="sm" className="w-full justify-center">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Baca Bab 0 & 1 Gratis</span>
                          </SketchButton>
                        </Link>

                        <Link href="/#pricing" className="w-full block">
                          <SketchButton variant="primary" size="sm" className="w-full justify-center">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Beli Akses Buku Ini</span>
                          </SketchButton>
                        </Link>
                      </div>
                    )}
                  </div>
                </SketchCard>
              );
            })}
          </div>
        </div>

        {/* Transaction History Section */}
        {orders && orders.length > 0 && (
          <div className="doodle-box bg-white p-6">
            <h2 className="font-extrabold text-lg sm:text-xl text-[#18181B] mb-4 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-[#1E40AF]" />
              Riwayat Pembelian Mayar
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-zinc-200 text-[#5C5A54]">
                    <th className="py-2 px-3">Nomor Pesanan</th>
                    <th className="py-2 px-3">Paket</th>
                    <th className="py-2 px-3">Total (IDR)</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2DDD3]">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#FAF7F2]">
                      <td className="py-2.5 px-3 font-bold text-[#1E1E1E]">
                        {o.order_number}
                      </td>
                      <td className="py-2.5 px-3 uppercase text-[#2B59C3]">
                        {o.pricing_tier_id}
                      </td>
                      <td className="py-2.5 px-3">
                        Rp {Number(o.amount_idr).toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3">
                        {o.payment_status === 'PAID' ? (
                          <span className="px-2 py-0.5 bg-[#F0FAF8] text-[#2A9D8F] border border-teal-300 rounded font-bold shadow-2xs">
                            LUNAS
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-[#FFF5F5] text-[#E63946] border border-rose-200 rounded shadow-2xs">
                            {o.payment_status}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-[#5C5A54]">
                        {new Date(o.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
