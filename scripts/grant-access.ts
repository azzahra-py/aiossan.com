import { createSupabaseAdmin } from '../src/utils/supabase/server';
import { syncAndGetUserEntitlements } from '../src/lib/entitlements';
import { BookId } from '../src/types/books';

async function grantFullAccess(targetEmail: string) {
  const normalizedEmail = targetEmail.trim().toLowerCase();
  console.log(`[GRANT-ACCESS] Registering & granting all books for: ${normalizedEmail}`);

  const admin = createSupabaseAdmin();

  // 1. Check if auth user already exists or create new
  const { data: userList, error: listError } = await admin.auth.admin.listUsers();
  if (listError) {
    throw new Error(`Failed to list users: ${listError.message}`);
  }

  let user = userList.users.find((u) => u.email?.toLowerCase() === normalizedEmail);

  if (!user) {
    console.log(`[GRANT-ACCESS] Creating new confirmed auth user for ${normalizedEmail}...`);
    const { data: newUser, error: createError } = await admin.auth.admin.createUser({
      email: normalizedEmail,
      email_confirm: true,
      user_metadata: {
        full_name: 'Harry Admin',
      },
    });

    if (createError || !newUser.user) {
      throw new Error(`Failed to create auth user: ${createError?.message}`);
    }
    user = newUser.user;
    console.log(`[GRANT-ACCESS] Auth user created with ID: ${user.id}`);
  } else {
    console.log(`[GRANT-ACCESS] Existing auth user found with ID: ${user.id}`);
  }

  // 2. Ensure profile exists in public.profiles
  const { error: profileError } = await admin.from('profiles').upsert(
    {
      id: user.id,
      email: normalizedEmail,
      full_name: user.user_metadata?.full_name || 'Harry Admin',
      preferred_language: 'id-kasual',
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' }
  );

  if (profileError) {
    console.warn(`[GRANT-ACCESS] Warning updating profile: ${profileError.message}`);
  } else {
    console.log(`[GRANT-ACCESS] Profile synchronized for ID: ${user.id}`);
  }

  // 3. Create or update paid order for bundle-trilogy
  const orderNumber = `ORD-LIFETIME-${Date.now().toString().slice(-6)}`;
  const { data: existingOrders } = await admin
    .from('orders')
    .select('id, payment_status, pricing_tier_id')
    .ilike('customer_email', normalizedEmail)
    .eq('payment_status', 'PAID');

  let orderId: string;

  if (existingOrders && existingOrders.length > 0) {
    orderId = existingOrders[0].id;
    console.log(`[GRANT-ACCESS] Using existing paid order ID: ${orderId}`);
  } else {
    const { data: newOrder, error: orderError } = await admin
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: user.id,
        customer_email: normalizedEmail,
        pricing_tier_id: 'bundle-trilogy',
        amount_idr: 149000,
        payment_status: 'PAID',
        paid_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (orderError || !newOrder) {
      throw new Error(`Failed to insert order: ${orderError?.message}`);
    }
    orderId = newOrder.id;
    console.log(`[GRANT-ACCESS] Created paid order ${orderNumber} (ID: ${orderId})`);
  }

  // 4. Upsert entitlements for all 3 books
  const books: BookId[] = ['book-1', 'book-2', 'book-3'];
  const entitlementRows = books.map((bookId) => ({
    user_id: user!.id,
    book_id: bookId,
    order_id: orderId,
    is_active: true,
  }));

  const { error: entError } = await admin
    .from('user_entitlements')
    .upsert(entitlementRows, { onConflict: 'user_id,book_id' });

  if (entError) {
    throw new Error(`Failed to upsert entitlements: ${entError.message}`);
  }
  console.log(`[GRANT-ACCESS] Successfully inserted entitlements for: ${books.join(', ')}`);

  // 5. Verification through the app's syncAndGetUserEntitlements logic
  const verifiedBooks = await syncAndGetUserEntitlements(user.id, normalizedEmail);
  console.log(`[GRANT-ACCESS] Verified unlocked books via syncAndGetUserEntitlements:`, verifiedBooks);

  if (verifiedBooks.length === 3) {
    console.log(`[GRANT-ACCESS] SUCCESS: All 3 books are unlocked for ${normalizedEmail}!`);
  } else {
    throw new Error(`Verification failed. Only ${verifiedBooks.length}/3 books unlocked.`);
  }
}

const target = process.argv[2] || 'harry@admin.com';
grantFullAccess(target)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[GRANT-ACCESS ERROR]:', err);
    process.exit(1);
  });
