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
          DEFAULT: '#FAF7F2',
          card: '#FFFFFF',
        },
        ink: {
          DEFAULT: '#1E1E1E',
          muted: '#5C5A54',
        },
        accent: {
          highlighter: '#FFE66D',
          'pen-blue': '#2B59C3',
          'marker-green': '#2A9D8F',
          'red-pen': '#E63946',
        },
      },
      fontFamily: {
        body: ['var(--font-body)', 'sans-serif'],
        hand: ['var(--font-hand)', 'cursive'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
