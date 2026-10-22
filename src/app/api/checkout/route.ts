import { NextRequest, NextResponse } from 'next/server';
import { getTier, TierId } from '@/lib/pricing';
import { createMayarInvoice } from '@/lib/mayar';
import { createSupabaseAdmin, createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tierId, name, mobile } = body;
    const rawEmail = body.email || body.customerEmail;

    if (!tierId) {
      return NextResponse.json(
        { error: 'Paket pembelian (tierId) wajib dipilih.' },
        { status: 400 }
      );
    }

    const tier = getTier(tierId as TierId);
    if (!tier) {
      return NextResponse.json(
        { error: `Paket pembelian "${tierId}" tidak valid.` },
        { status: 400 }
      );
    }

    let userId: string | null = null;
    let sessionEmail: string | null = null;
    try {
      const cookieStore = cookies();
      const supabaseUser = createClient(cookieStore);
      const {
        data: { user },
      } = await supabaseUser.auth.getUser();
      if (user) {
        userId = user.id;
        sessionEmail = user.email ?? null;
      }
    } catch {
      // Guest checkout
    }

    const finalEmail =
      (typeof rawEmail === 'string' && rawEmail.trim()) || sessionEmail || '';

    if (!finalEmail || !finalEmail.includes('@')) {
      return NextResponse.json(
        {
          error: 'Masukkan alamat email aktif kamu untuk pengiriman akses buku & invoice.',
          requiresEmail: true,
        },
        { status: 400 }
      );
    }

    const normalizedEmail = finalEmail.trim().toLowerCase();
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    const orderNumber = `ORD-${timestamp}-${randomSuffix}`;

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin || 'http://localhost:3000';
    const redirectUrl = `${siteUrl}/checkout/success?order=${orderNumber}`;

    const invoice = await createMayarInvoice({
      name: name?.trim() || normalizedEmail.split('@')[0],
      email: normalizedEmail,
      mobile: mobile?.trim(),
      description: `Pembelian ${tier.nameId} — aiossan.com`,
      redirectUrl,
      amountIdr: tier.priceIdr,
      itemDescription: `Akses Playbook: ${tier.nameId}`,
      extraData: {
        orderNumber,
        tierId: tier.id,
        email: normalizedEmail,
      },
    });

    try {
      const adminClient = createSupabaseAdmin();
      await adminClient.from('orders').insert({
        order_number: orderNumber,
        user_id: userId,
        customer_email: normalizedEmail,
        pricing_tier_id: tier.id,
        amount_idr: tier.priceIdr,
        mayar_invoice_id: invoice.invoiceId,
        mayar_transaction_id: invoice.transactionId,
        payment_link: invoice.paymentUrl,
        payment_status: 'PENDING',
      });
    } catch (dbErr) {
      console.error('Warning: Failed to save order to Supabase:', dbErr);
    }

    return NextResponse.json({
      orderNumber,
      paymentUrl: invoice.paymentUrl,
    });
  } catch (err: any) {
    console.error('Checkout API error:', err);
    return NextResponse.json(
      { error: err.message || 'Terjadi kesalahan saat memproses pesanan.' },
      { status: 500 }
    );
  }
}
