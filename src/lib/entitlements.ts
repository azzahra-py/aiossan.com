import { createSupabaseAdmin } from '@/utils/supabase/server';
import { PRICING_TIERS, TierId } from '@/lib/pricing';
import { BookId } from '@/types/books';

export async function syncAndGetUserEntitlements(
  userId: string,
  userEmail?: string | null
): Promise<BookId[]> {
  const admin = createSupabaseAdmin();

  try {
    if (userEmail) {
      const normalizedEmail = userEmail.trim().toLowerCase();
      const { data: paidOrders } = await admin
        .from('orders')
        .select('id, pricing_tier_id, user_id')
        .ilike('customer_email', normalizedEmail)
        .eq('payment_status', 'PAID');

      if (paidOrders && paidOrders.length > 0) {
        for (const ord of paidOrders) {
          if (!ord.user_id) {
            await admin.from('orders').update({ user_id: userId }).eq('id', ord.id);
          }

          const tier = PRICING_TIERS.find((t) => t.id === (ord.pricing_tier_id as TierId));
          if (tier && tier.includedBooks.length > 0) {
            const rows = tier.includedBooks.map((bookId) => ({
              user_id: userId,
              book_id: bookId,
              order_id: ord.id,
              is_active: true,
            }));

            await admin
              .from('user_entitlements')
              .upsert(rows, { onConflict: 'user_id,book_id' });
          }
        }
      }
    }

    const { data: entitlements } = await admin
      .from('user_entitlements')
      .select('book_id')
      .eq('user_id', userId)
      .eq('is_active', true);

    return entitlements ? entitlements.map((e) => e.book_id as BookId) : [];
  } catch (err) {
    console.error('[ENTITLEMENTS SYNC ERROR]:', err);
    return [];
  }
}
