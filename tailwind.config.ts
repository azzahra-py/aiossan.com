import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAFAFA',
          card: '#FFFFFF',
        },
        canvas: {
          DEFAULT: '#FAFAFA',
          card: '#FFFFFF',
          grid: '#CBD5E1',
        },
        ink: {
          DEFAULT: '#18181B',
          muted: '#52525B',
          dark: '#09090B',
        },
        whiteboard: {
          navy: '#1E40AF',
          red: '#DC2626',
          green: '#059669',
          amber: '#F59E0B',
        },
        accent: {
          highlighter: '#F59E0B',
          'pen-blue': '#1E40AF',
          'marker-green': '#059669',
          'red-pen': '#DC2626',
        },
      },
      fontFamily: {
        body: ['var(--font-body)', 'sans-serif'],
        hand: ['var(--font-hand)', 'cursive'],
        mono: ['var(--font-mono)', 'monospace'],
        serif: ['var(--font-serif-display)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
