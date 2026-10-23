import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Patrick_Hand, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AnimatedPaperBackground } from '@/components/doodle/AnimatedPaperBackground';

// Same three families and CSS variables as design B's local woff2 setup,
// loaded via Google Fonts so the repo snapshot stays text-only.
const fontBody = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
  display: 'swap',
});

const fontHand = Patrick_Hand({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-hand',
  display: 'swap',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'aiossan.com — Interactive Leadership Field Playbook (Web & PDF)',
  description:
    'Trilogi panduan taktis memimpin tim dengan gaya catatan sketsa meja kerja, simulasi interaktif, dan skrip 1-on-1 siap pakai dalam Bahasa Indonesia (gaya Kasual Gue/Lo atau Standar Saya/Kamu) dan Global English.',
  other: {
    'color-scheme': 'light only',
    'darkreader-lock': 'true',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      style={{ colorScheme: 'light' }}
      className={`${fontBody.variable} ${fontHand.variable} ${fontMono.variable}`}
    >
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="darkreader-lock" />
      </head>
      <body className="relative min-h-screen bg-[#FAF7F2] text-[#18181B] antialiased selection:bg-[#FFE66D]">
        <AnimatedPaperBackground />
        {children}
      </body>
    </html>
  );
}
