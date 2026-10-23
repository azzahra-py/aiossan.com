import React from 'react';
import { BookLang } from '@/types/books';

const NODES: Record<
  BookLang,
  { title: string; sub: string }[]
> = {
  'id-kasual': [
    { title: 'Komunikasi', sub: 'Samain persepsi dulu' },
    { title: 'Kesepakatan', sub: 'Sepakat targetnya' },
    { title: 'Konfirmasi', sub: 'Cek di tengah jalan' },
  ],
  'id-standar': [
    { title: 'Komunikasi', sub: 'Menyamakan persepsi' },
    { title: 'Kesepakatan', sub: 'Target disepakati' },
    { title: 'Konfirmasi', sub: 'Pemeriksaan berkala' },
  ],
  en: [
    { title: 'Communication', sub: 'Align perceptions' },
    { title: 'Commitment', sub: 'Agree the target' },
    { title: 'Confirmation', sub: 'Check in mid-flight' },
  ],
};

const LOOP_LABEL: Record<BookLang, string> = {
  'id-kasual': 'siklusnya muter terus di tiap target baru',
  'id-standar': 'siklus berulang untuk setiap target baru',
  en: 'the cycle repeats for every new target',
};

const FILLS = ['#FEF9C3', '#DBEAFE', '#CCFBF1'];

export function FrameworkDiagram3K({ lang }: { lang: BookLang }) {
  const nodes = NODES[lang];
  return (
    <svg
      viewBox="0 0 660 205"
      className="h-auto w-full"
      role="img"
      aria-label={`Rumus 3K: ${nodes.map((n) => n.title).join(', ')}`}
    >
      <defs>
        <marker
          id="arr3k"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10z" fill="#18181B" />
        </marker>
      </defs>

      {nodes.map((node, i) => {
        const x = 10 + i * 220;
        const cx = x + 100;
        return (
          <g key={node.title} transform={`rotate(${i % 2 === 0 ? -1 : 1} ${cx} 72)`}>
            <rect
              x={x}
              y={30}
              width={200}
              height={84}
              rx={14}
              fill={FILLS[i]}
              stroke="#18181B"
              strokeWidth={2.5}
            />
            <text
              x={cx}
              y={70}
              textAnchor="middle"
              fontFamily="var(--font-hand), cursive"
              fontSize={23}
              fill="#18181B"
            >
              {node.title}
            </text>
            <text
              x={cx}
              y={94}
              textAnchor="middle"
              fontFamily="var(--font-body), sans-serif"
              fontSize={12}
              fill="#52525B"
            >
              {node.sub}
            </text>
          </g>
        );
      })}

      <path
        d="M214 72 H224"
        stroke="#18181B"
        strokeWidth={2.5}
        markerEnd="url(#arr3k)"
      />
      <path
        d="M434 72 H444"
        stroke="#18181B"
        strokeWidth={2.5}
        markerEnd="url(#arr3k)"
      />

      <path
        d="M550 118 V158 H110 V122"
        fill="none"
        stroke="#18181B"
        strokeWidth={2}
        strokeDasharray="6 5"
        markerEnd="url(#arr3k)"
      />
      <text
        x={330}
        y={182}
        textAnchor="middle"
        fontFamily="var(--font-hand), cursive"
        fontSize={15}
        fill="#9A3412"
      >
        {LOOP_LABEL[lang]}
      </text>
    </svg>
  );
}
