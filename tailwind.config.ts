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
        editorial: {
          bg: '#FBF9F5',
          surface: '#FFFFFF',
          subtle: '#F3F0E8',
          ink: '#111113',
          slate: '#52525B',
          muted: '#71717A',
          border: '#E4E2DD',
          strong: '#18181B',
          orange: '#EA580C',
          cobalt: '#1D4ED8',
          emerald: '#0F766E',
          amber: '#FDE68A',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
