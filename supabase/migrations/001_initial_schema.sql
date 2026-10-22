CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    preferred_language TEXT DEFAULT 'id-kasual' CHECK (preferred_language IN ('id-kasual', 'id-standar', 'en')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.books (
    id TEXT PRIMARY KEY,
    title_id_kasual TEXT NOT NULL,
    title_id_standar TEXT NOT NULL,
    title_en TEXT NOT NULL,
    price_single_idr INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.books (id, title_id_kasual, title_id_standar, title_en, price_single_idr) VALUES
('book-1', 'Mahir Memimpin Tim: Strategi Bikin Tim Jadi Mandiri', 'Mahir Memimpin Tim: Strategi Menciptakan Tim yang Mandiri', 'Practical Team Leadership: Developing Autonomous Teams', 49000),
('book-2', 'Napas Panjang Memimpin Tim: Strategi Atasi Jenuh dan Bangun Sistem Kerja Otomatis', 'Napas Panjang Memimpin Tim: Strategi Mengatasi Kejenuhan dan Membangun Sistem Kerja Mandiri', 'Sustaining Your Leadership: Practical Strategies to Beat Burnout and Build Self-Running Teams', 49000),
('book-3', 'Memimpin Para Leader: Strategi Naik Kelas dari Mengatur Tim ke Menggerakkan Divisi', 'Memimpin Para Leader: Strategi Naik Kelas dari Mengarahkan Tim ke Menggerakkan Divisi', 'Leading Other Leaders: Practical Strategies for Moving from Team Lead to Manager of Managers', 99000)
ON CONFLICT (id) DO UPDATE SET
    title_id_kasual = EXCLUDED.title_id_kasual,
    title_id_standar = EXCLUDED.title_id_standar,
    title_en = EXCLUDED.title_en,
    price_single_idr = EXCLUDED.price_single_idr;

CREATE TABLE IF NOT EXISTS public.pricing_tiers (
    id TEXT PRIMARY KEY,
    name_id TEXT NOT NULL,
    name_en TEXT NOT NULL,
    price_idr INTEGER NOT NULL,
    strike_price_idr INTEGER,
    price_usd NUMERIC(6,2) NOT NULL,
    included_book_ids TEXT[] NOT NULL,
    badge_text TEXT,
    sort_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL
);

INSERT INTO public.pricing_tiers (id, name_id, name_en, price_idr, strike_price_idr, price_usd, included_book_ids, badge_text, sort_order) VALUES
('book-1', 'Buku 1: Mahir Memimpin Tim', 'Book 1: Practical Team Leadership', 49000, NULL, 4.99, ARRAY['book-1'], 'VOL. 01 • First-Time Lead', 1),
('book-2', 'Buku 2: Napas Panjang Memimpin Tim', 'Book 2: Sustaining Your Leadership', 49000, NULL, 4.99, ARRAY['book-2'], 'VOL. 02 • Anti-Burnout', 2),
('book-3', 'Buku 3: Memimpin Para Leader', 'Book 3: Leading Other Leaders', 99000, NULL, 9.99, ARRAY['book-3'], 'VOL. 03 • Manager of Managers', 3),
('bundle-1-2', 'Bundel 2 Buku (Volume 01 & 02)', '2-Book Bundle (Volumes 01 & 02)', 79000, 98000, 7.99, ARRAY['book-1', 'book-2'], 'Hemat Rp 19.000', 4),
('bundle-2-3', 'Bundel 2 Buku (Volume 02 & 03)', '2-Book Bundle (Volumes 02 & 03)', 129000, 148000, 12.99, ARRAY['book-2', 'book-3'], 'Hemat Rp 19.000', 5),
('bundle-trilogy', 'Complete Trilogy Box Set (Volume 01, 02 & 03)', 'Complete 3-Book Trilogy Box Set', 149000, 197000, 14.99, ARRAY['book-1', 'book-2', 'book-3'], 'BEST VALUE • Hemat Rp 48.000', 6)
ON CONFLICT (id) DO UPDATE SET
    name_id = EXCLUDED.name_id,
    name_en = EXCLUDED.name_en,
    price_idr = EXCLUDED.price_idr,
    strike_price_idr = EXCLUDED.strike_price_idr,
    price_usd = EXCLUDED.price_usd,
    included_book_ids = EXCLUDED.included_book_ids,
    badge_text = EXCLUDED.badge_text,
    sort_order = EXCLUDED.sort_order;

CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_email TEXT NOT NULL,
    pricing_tier_id TEXT REFERENCES public.pricing_tiers(id) NOT NULL,
    amount_idr INTEGER NOT NULL,
    mayar_invoice_id TEXT UNIQUE,
    mayar_transaction_id TEXT,
    payment_link TEXT,
    payment_status TEXT DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'CLOSED', 'EXPIRED')),
    raw_webhook_payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.user_entitlements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    book_id TEXT REFERENCES public.books(id) ON DELETE RESTRICT NOT NULL,
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    CONSTRAINT unique_user_book UNIQUE (user_id, book_id)
);

CREATE TABLE IF NOT EXISTS public.checklist_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    book_id TEXT REFERENCES public.books(id) NOT NULL,
    chapter_slug TEXT NOT NULL,
    item_index INTEGER NOT NULL,
    is_completed BOOLEAN DEFAULT false NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_user_checklist_item UNIQUE (user_id, book_id, chapter_slug, item_index)
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read books" ON public.books FOR SELECT USING (true);
CREATE POLICY "Public read pricing tiers" ON public.pricing_tiers FOR SELECT USING (true);
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users view own entitlements" ON public.user_entitlements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage own checklists" ON public.checklist_progress FOR ALL USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  rec RECORD;
  book_item TEXT;
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = timezone('utc'::text, now());

  UPDATE public.orders
  SET user_id = new.id
  WHERE lower(customer_email) = lower(new.email)
    AND user_id IS NULL;

  FOR rec IN
    SELECT o.id AS order_id, pt.included_book_ids
    FROM public.orders o
    JOIN public.pricing_tiers pt ON pt.id = o.pricing_tier_id
    WHERE (o.user_id = new.id OR lower(o.customer_email) = lower(new.email))
      AND o.payment_status = 'PAID'
  LOOP
    FOREACH book_item IN ARRAY rec.included_book_ids
    LOOP
      INSERT INTO public.user_entitlements (user_id, book_id, order_id, is_active)
      VALUES (new.id, book_item, rec.order_id, true)
      ON CONFLICT (user_id, book_id) DO UPDATE SET
        is_active = true,
        order_id = EXCLUDED.order_id;
    END LOOP;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
