import { BookId } from '@/types/books';

export type TierId =
  | 'book-1'
  | 'book-2'
  | 'book-3'
  | 'bundle-1-2'
  | 'bundle-2-3'
  | 'bundle-trilogy';

export interface PricingTier {
  id: TierId;
  nameId: string;
  nameEn: string;
  priceIdr: number;
  strikePriceIdr?: number;
  priceUsd: number;
  includedBooks: BookId[];
  badgeId?: string;
  badgeEn?: string;
  isBestValue?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'book-1',
    nameId: 'Buku 1: Mahir Memimpin Tim',
    nameEn: 'Book 1: Practical Team Leadership',
    priceIdr: 49000,
    priceUsd: 4.99,
    includedBooks: ['book-1'],
    badgeId: 'VOL. 01 • First-Time Lead',
    badgeEn: 'VOL. 01 • First-Time Lead',
  },
  {
    id: 'book-2',
    nameId: 'Buku 2: Napas Panjang Memimpin Tim',
    nameEn: 'Book 2: Sustaining Your Leadership',
    priceIdr: 49000,
    priceUsd: 4.99,
    includedBooks: ['book-2'],
    badgeId: 'VOL. 02 • Anti-Burnout',
    badgeEn: 'VOL. 02 • Beat Burnout',
  },
  {
    id: 'book-3',
    nameId: 'Buku 3: Memimpin Para Leader',
    nameEn: 'Book 3: Leading Other Leaders',
    priceIdr: 99000,
    priceUsd: 9.99,
    includedBooks: ['book-3'],
    badgeId: 'VOL. 03 • Manager of Managers',
    badgeEn: 'VOL. 03 • Manager of Managers',
  },
  {
    id: 'bundle-1-2',
    nameId: 'Bundel 2 Buku (Volume 01 & 02)',
    nameEn: '2-Book Bundle (Volumes 01 & 02)',
    priceIdr: 79000,
    strikePriceIdr: 98000,
    priceUsd: 7.99,
    includedBooks: ['book-1', 'book-2'],
    badgeId: 'Hemat Rp 19.000',
    badgeEn: 'Save 19%',
  },
  {
    id: 'bundle-2-3',
    nameId: 'Bundel 2 Buku (Volume 02 & 03)',
    nameEn: '2-Book Bundle (Volumes 02 & 03)',
    priceIdr: 129000,
    strikePriceIdr: 148000,
    priceUsd: 12.99,
    includedBooks: ['book-2', 'book-3'],
    badgeId: 'Hemat Rp 19.000',
    badgeEn: 'Save Rp 19,000',
  },
  {
    id: 'bundle-trilogy',
    nameId: 'Complete Trilogy Box Set (Volume 01, 02 & 03)',
    nameEn: 'Complete 3-Book Trilogy Box Set (Vol. 01, 02 & 03)',
    priceIdr: 149000,
    strikePriceIdr: 197000,
    priceUsd: 14.99,
    includedBooks: ['book-1', 'book-2', 'book-3'],
    badgeId: 'BEST VALUE • Hemat Rp 48.000',
    badgeEn: 'BEST VALUE • Save 25%',
    isBestValue: true,
  },
];

export function getTier(tierId: TierId): PricingTier | undefined {
  return PRICING_TIERS.find((t) => t.id === tierId);
}
