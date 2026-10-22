import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { BOOK_CATALOG } from '@/lib/books';
import { syncAndGetUserEntitlements } from '@/lib/entitlements';
import { EditorialHeader } from '@/components/ui/EditorialHeader';
import { EditorialCard } from '@/components/ui/EditorialCard';
import { TacticalButton } from '@/components/ui/TacticalButton';
import { BookCover3D } from '@/components/ui/BookCover3D';
import { LogoutButton } from '@/components/auth/LogoutButton';
import {
  BookOpen,
  Download,
  Lock,
  CheckCircle2,
  User,
  ArrowRight,
  Receipt,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FBF9F5] swiss-grid-bg">
        <EditorialHeader />
        <main className="flex-1 flex items-center justify-center p-4 py-16">
          <EditorialCard
            variant="featured"
            indexLabel="AIOSSAN // READER LIBRARY"
            badgeText="AUTH REQUIRED"
            accentColor="orange"
            className="w-full max-w-md text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-[#111113] text-white flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#111113] mb-2">
              Perpustakaan Pembaca
            </h1>
            <p className="text-xs sm:text-sm text-[#52525B] mb-6 leading-relaxed">
              Masuk dengan email pembelian kamu untuk membaca seluruh bab dan mengunduh Master PDF A5.
            </p>
            <div className="space-y-2.5">
              <Link href="/auth/login" className="block">
                <TacticalButton variant="primary" size="lg" className="w-full">
                  <span>Masuk ke Akun</span>
                  <ArrowRight className="w-4 h-4" />
                </TacticalButton>
              </Link>
              <Link href="/" className="block">
                <TacticalButton variant="secondary" size="md" className="w-full">
                  <span>Kembali ke Beranda</span>
                </TacticalButton>
              </Link>
            </div>
          </EditorialCard>
        </main>
      </div>
    );
  }

  const activeBookIds = await syncAndGetUserEntitlements(user.id, user.email);

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .or(`user_id.eq.${user.id},customer_email.ilike.${user.email}`)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5]">
      <EditorialHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-10">
        {/* Account Header Bar */}
        <div className="rounded-xl border border-[#E4E2DD] bg-white p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#0F766E] block mb-1">
              VERIFIED READER ACCOUNT // {activeBookIds.length} OF 3 VOLUMES UNLOCKED
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#111113]">
              {user.email}
            </h1>
          </div>
          <div className="flex items-center gap-2.5">
            <Link href="/#pricing">
              <TacticalButton variant="accent" size="sm">
                <span>Upgrade / Complete Trilogy</span>
              </TacticalButton>
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* 3 Volumes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mb-12">
          {BOOK_CATALOG.map((book) => {
            const hasAccess = activeBookIds.includes(book.id);
            return (
              <EditorialCard
                key={book.id}
                variant={hasAccess ? 'featured' : 'surface'}
                indexLabel={`${book.volumeCode} // 15 CHAPTERS`}
                badgeText={hasAccess ? 'UNLOCKED' : 'SAMPLE ONLY'}
                accentColor={hasAccess ? 'emerald' : 'neutral'}
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="py-4 mb-5 border-b border-[#E4E2DD]">
                      <BookCover3D bookId={book.id} lang="id-kasual" size="sm" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-[#111113] mb-1">
                      {book.titles['id-kasual']}
                    </h2>
                    <p className="font-mono text-xs text-[#71717A] mb-3">
                      EN: {book.titles['en']}
                    </p>
                    <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed mb-6">
                      {book.subtitles['id-kasual']}
                    </p>
                  </div>

                  {hasAccess ? (
                    <div className="space-y-3 pt-4 border-t border-[#E4E2DD]">
                      <Link href={`/read/${book.id}/id-kasual/ch-0`} className="block">
                        <TacticalButton variant="primary" size="md" className="w-full">
                          <BookOpen className="w-4 h-4" />
                          <span>Buka Interactive Web Reader</span>
                          <ArrowRight className="w-4 h-4" />
                        </TacticalButton>
                      </Link>
                      <div className="rounded-lg bg-[#FBF9F5] border border-[#E4E2DD] p-3">
                        <span className="font-mono text-[10px] font-bold uppercase text-[#52525B] block mb-2">
                          Download Official A5 Master PDF:
                        </span>
                        <div className="grid grid-cols-3 gap-1.5">
                          {(['id-kasual', 'id-standar', 'en'] as const).map((l) => (
                            <a
                              key={l}
                              href={`/api/download?book=${book.id}&lang=${l}`}
                              className="px-2 py-1.5 rounded border border-[#D4D0C8] bg-white hover:bg-[#111113] hover:text-white font-mono text-[10px] font-bold text-center flex items-center justify-center gap-1 transition-colors"
                            >
                              <Download className="w-3 h-3" />
                              <span>{l.replace('id-', '').toUpperCase()}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 pt-4 border-t border-[#E4E2DD]">
                      <Link href={`/read/${book.id}/id-kasual/ch-0`} className="block">
                        <TacticalButton variant="secondary" size="sm" className="w-full">
                          <span>Baca Bab 0 & 1 Gratis</span>
                        </TacticalButton>
                      </Link>
                      <Link href="/#pricing" className="block">
                        <TacticalButton variant="accent" size="sm" className="w-full">
                          <span>Buka Akses Volume Ini</span>
                        </TacticalButton>
                      </Link>
                    </div>
                  )}
                </div>
              </EditorialCard>
            );
          })}
        </div>

        {/* Order History Ledger */}
        {orders && orders.length > 0 && (
          <EditorialCard
            variant="surface"
            indexLabel="AIOSSAN // TRANSACTION LEDGER"
            badgeText={`${orders.length} ORDERS`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#111113] text-[#71717A] uppercase">
                    <th className="py-2.5 px-3">Order Number</th>
                    <th className="py-2.5 px-3">Edition / Tier</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E2DD]">
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td className="py-2.5 px-3 font-bold text-[#111113]">
                        {o.order_number}
                      </td>
                      <td className="py-2.5 px-3 uppercase">{o.pricing_tier_id}</td>
                      <td className="py-2.5 px-3">
                        Rp {Number(o.amount_idr).toLocaleString('id-ID')}
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            o.payment_status === 'PAID'
                              ? 'bg-[#F0FDFA] text-[#0F766E] border border-[#99F6E4]'
                              : 'bg-[#FFF7ED] text-[#EA580C]'
                          }`}
                        >
                          {o.payment_status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-[#71717A]">
                        {new Date(o.created_at).toLocaleDateString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </EditorialCard>
        )}
      </main>
    </div>
  );
}
