export interface MayarCreateInvoiceParams {
  name: string;
  email: string;
  mobile?: string;
  description: string;
  redirectUrl: string;
  amountIdr: number;
  itemDescription: string;
  extraData?: Record<string, string>;
}

export interface MayarInvoiceResult {
  invoiceId: string;
  transactionId: string;
  paymentUrl: string;
}

export async function createMayarInvoice(
  params: MayarCreateInvoiceParams
): Promise<MayarInvoiceResult> {
  const baseUrl = process.env.MAYAR_API_URL || 'https://api.mayar.id';
  const apiKey = process.env.MAYAR_API_KEY;

  if (!apiKey || apiKey === 'your-mayar-api-key') {
    if (process.env.NODE_ENV === 'development') {
      console.warn('MAYAR_API_KEY not set. Returning development mock invoice.');
      return {
        invoiceId: `mock-inv-${Date.now()}`,
        transactionId: `mock-tx-${Date.now()}`,
        paymentUrl: params.redirectUrl,
      };
    }
    throw new Error('MAYAR_API_KEY belum dikonfigurasi di environment variables.');
  }

  const res = await fetch(`${baseUrl}/hl/v2/invoice/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: params.name || params.email.split('@')[0],
      email: params.email,
      mobile: params.mobile || '081200000000',
      description: params.description,
      redirectUrl: params.redirectUrl,
      items: [
        {
          quantity: 1,
          rate: params.amountIdr,
          description: params.itemDescription,
        },
      ],
      extraData: params.extraData || {},
    }),
  });

  const json = await res.json();
  if (!res.ok || !json.data?.link) {
    const errorMsg = json.messages || json.message || 'Gagal membuat invoice Mayar.';
    throw new Error(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
  }

  return {
    invoiceId: json.data.id as string,
    transactionId: (json.data.transactionId || json.data.id) as string,
    paymentUrl: json.data.link as string,
  };
}
