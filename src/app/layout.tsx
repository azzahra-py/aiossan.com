import type { Metadata } from 'next';
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fontSerif = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'aiossan.com — Tactical Leadership Playbook Trilogy (Interactive Web & A5 PDF)',
  description:
    'Field-tested leadership playbooks for first-time team leads, overwhelmed managers, and department heads. Available in Casual Indonesian, Formal Indonesian, and Global English.',
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
      className={`${fontSerif.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="darkreader-lock" />
      </head>
      <body className="min-h-screen bg-[#FBF9F5] text-[#111113] antialiased selection:bg-[#FDE68A] selection:text-[#111113]">
        {children}
      </body>
    </html>
  );
}
