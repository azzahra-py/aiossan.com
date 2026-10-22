import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/utils/supabase/server';
import { PRICING_TIERS, TierId } from '@/lib/pricing';

export async function POST(req: NextRequest) {
  try {
    const webhookSecret = process.env.MAYAR_WEBHOOK_SECRET;
    if (webhookSecret && webhookSecret !== 'your-mayar-webhook-secret') {
      const authHeader =
        req.headers.get('authorization') ||
        req.headers.get('x-mayar-signature') ||
        req.headers.get('x-callback-token');
      if (!authHeader || !authHeader.includes(webhookSecret)) {
        return NextResponse.json({ error: 'Unauthorized webhook request' }, { status: 401 });
      }
    }

    const payload = await req.json();
    const event = payload.event;
    const data = payload.data;

    const isPaid =
      event === 'payment.received' ||
      data?.status === 'SUCCESS' ||
      data?.status === 'PAID' ||
      data?.status === true;

    if (!isPaid || !data) {
      return NextResponse.json({ received: true, action: 'ignored' });
    }

    const supabaseAdmin = createSupabaseAdmin();
    let order: any = null;

    const extraOrderNumber = data.extraData?.orderNumber;
    if (extraOrderNumber) {
      const { data: byOrderNumber } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('order_number', extraOrderNumber)
        .maybeSingle();
      if (byOrderNumber) order = byOrderNumber;
    }

    if (!order && data.id) {
      const { data: byMayarId } = await supabaseAdmin
        .from('orders')
        .select('*')
        .or(`mayar_invoice_id.eq.${data.id},mayar_transaction_id.eq.${data.id}`)
        .maybeSingle();
      if (byMayarId) order = byMayarId;
    }

    const customerEmail = (data.customerEmail || data.email || '')?.trim().toLowerCase();
    const amount = data.amount || data.totalAmount;
    if (!order && customerEmail && amount) {
      const { data: byEmailAndAmount } = await supabaseAdmin
        .from('orders')
        .select('*')
        .ilike('customer_email', customerEmail)
        .eq('amount_idr', Number(amount))
        .eq('payment_status', 'PENDING')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (byEmailAndAmount) order = byEmailAndAmount;
    }

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    await supabaseAdmin
      .from('orders')
      .update({
        payment_status: 'PAID',
        mayar_transaction_id: data.id || order.mayar_transaction_id,
        paid_at: new Date().toISOString(),
        raw_webhook_payload: payload,
      })
      .eq('id', order.id);

    let finalUserId = order.user_id;
    if (!finalUserId && order.customer_email) {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .ilike('email', order.customer_email.trim())
        .maybeSingle();
      if (profile) {
        finalUserId = profile.id;
        await supabaseAdmin
          .from('orders')
          .update({ user_id: finalUserId })
          .eq('id', order.id);
      }
    }

    const tier = PRICING_TIERS.find((t) => t.id === (order.pricing_tier_id as TierId));
    const includedBooks = tier ? tier.includedBooks : [];

    if (finalUserId && includedBooks.length > 0) {
      const entitlements = includedBooks.map((bookId) => ({
        user_id: finalUserId,
        book_id: bookId,
        order_id: order.id,
        is_active: true,
      }));

      await supabaseAdmin
        .from('user_entitlements')
        .upsert(entitlements, { onConflict: 'user_id,book_id' });
    }

    return NextResponse.json({
      received: true,
      orderNumber: order.order_number,
      unlocked: includedBooks,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
