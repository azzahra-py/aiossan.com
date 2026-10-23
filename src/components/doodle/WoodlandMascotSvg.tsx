import React from 'react';

export type MascotCharacter = 'capybara' | 'otter' | 'owl' | 'redpanda' | 'tortoise';

interface WoodlandMascotSvgProps {
  character: MascotCharacter;
  className?: string;
  badgeText?: string;
}

export function WoodlandMascotSvg({
  character,
  className = 'w-20 h-20',
}: WoodlandMascotSvgProps) {
  switch (character) {
    case 'otter':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-label="Oti the Agile Otter">
          <circle cx="60" cy="62" r="46" fill="#DBEAFE" />
          <circle cx="60" cy="60" r="46" stroke="#18181B" strokeWidth="3" strokeDasharray="6 4" />
          <circle cx="32" cy="40" r="9" fill="#B45309" stroke="#18181B" strokeWidth="3" />
          <circle cx="88" cy="40" r="9" fill="#B45309" stroke="#18181B" strokeWidth="3" />
          <path d="M32 88 C30 56, 36 34, 60 34 C84 34, 90 56, 88 88 Z" fill="#D97706" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />
          <ellipse cx="60" cy="64" rx="20" ry="14" fill="#FEF3C7" stroke="#18181B" strokeWidth="2.5" />
          <circle cx="48" cy="52" r="3.5" fill="#18181B" />
          <circle cx="72" cy="52" r="3.5" fill="#18181B" />
          <polygon points="60,57 55,63 65,63" fill="#18181B" />
          <path d="M54 67 Q60 71 66 67" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M35 62 L44 63 M35 67 L44 66 M76 63 L85 62 M76 66 L85 67" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
          <circle cx="60" cy="86" r="10" fill="#FFE66D" stroke="#18181B" strokeWidth="2.5" />
          <circle cx="60" cy="86" r="4" fill="#FFFFFF" stroke="#18181B" strokeWidth="2" />
        </svg>
      );

    case 'owl':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-label="Bubu the Analytical Owl">
          <circle cx="60" cy="62" r="46" fill="#EDE9FE" />
          <circle cx="60" cy="60" r="46" stroke="#18181B" strokeWidth="3" strokeDasharray="6 4" />
          <ellipse cx="60" cy="66" rx="28" ry="30" fill="#8B5CF6" stroke="#18181B" strokeWidth="3" />
          <path d="M36 44 L28 30 L46 38 Z" fill="#7C3AED" stroke="#18181B" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M84 44 L92 30 L74 38 Z" fill="#7C3AED" stroke="#18181B" strokeWidth="2.5" strokeLinejoin="round" />
          <ellipse cx="60" cy="76" rx="18" ry="16" fill="#FAF7F2" stroke="#18181B" strokeWidth="2.5" />
          <path d="M52 72 Q56 76 60 72 M60 72 Q64 76 68 72 M55 80 Q60 84 65 80" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
          <circle cx="49" cy="54" r="10" fill="#FFFFFF" stroke="#18181B" strokeWidth="3" />
          <circle cx="71" cy="54" r="10" fill="#FFFFFF" stroke="#18181B" strokeWidth="3" />
          <circle cx="49" cy="54" r="4" fill="#18181B" />
          <circle cx="71" cy="54" r="4" fill="#18181B" />
          <polygon points="60,57 56,64 64,64" fill="#FFE66D" stroke="#18181B" strokeWidth="2" />
        </svg>
      );

    case 'redpanda':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-label="Rori the Creative Red Panda">
          <circle cx="60" cy="62" r="46" fill="#FFEDD5" />
          <circle cx="60" cy="60" r="46" stroke="#18181B" strokeWidth="3" strokeDasharray="6 4" />
          <polygon points="28,48 24,26 46,36" fill="#EA580C" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />
          <polygon points="92,48 96,26 74,36" fill="#EA580C" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />
          <ellipse cx="60" cy="62" rx="30" ry="25" fill="#EA580C" stroke="#18181B" strokeWidth="3" />
          <circle cx="43" cy="65" r="9" fill="#FAF7F2" />
          <circle cx="77" cy="65" r="9" fill="#FAF7F2" />
          <ellipse cx="60" cy="67" rx="12" ry="10" fill="#FAF7F2" stroke="#18181B" strokeWidth="2.5" />
          <circle cx="48" cy="56" r="3.5" fill="#18181B" />
          <circle cx="72" cy="56" r="3.5" fill="#18181B" />
          <circle cx="60" cy="64" r="3" fill="#18181B" />
          <path d="M55 70 Q60 74 65 70" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="60" cy="22" r="8" fill="#FFE66D" stroke="#18181B" strokeWidth="2.5" />
        </svg>
      );

    case 'tortoise':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-label="Toti the Resilient Tortoise">
          <circle cx="60" cy="62" r="46" fill="#CCFBF1" />
          <circle cx="60" cy="60" r="46" stroke="#18181B" strokeWidth="3" strokeDasharray="6 4" />
          <path d="M26 74 C26 46, 76 46, 78 74 Z" fill="#0D9488" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />
          <path d="M24 74 L82 74" stroke="#FFE66D" strokeWidth="5" strokeLinecap="round" />
          <path d="M24 74 L82 74" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="86" cy="62" r="12" fill="#34D399" stroke="#18181B" strokeWidth="3" />
          <circle cx="90" cy="59" r="3" fill="#18181B" />
          <path d="M85 66 Q90 69 94 65" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
          <rect x="34" y="75" width="10" height="10" rx="4" fill="#34D399" stroke="#18181B" strokeWidth="2.5" />
          <rect x="62" y="75" width="10" height="10" rx="4" fill="#34D399" stroke="#18181B" strokeWidth="2.5" />
        </svg>
      );

    case 'capybara':
    default:
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-label="Kapi the Calm Capybara Leader">
          <circle cx="60" cy="62" r="46" fill="#FFE66D" />
          <circle cx="60" cy="60" r="46" stroke="#18181B" strokeWidth="3" strokeDasharray="6 4" />
          <ellipse cx="35" cy="36" rx="7" ry="9" transform="rotate(-15 35 36)" fill="#92400E" stroke="#18181B" strokeWidth="3" />
          <ellipse cx="85" cy="36" rx="7" ry="9" transform="rotate(15 85 36)" fill="#92400E" stroke="#18181B" strokeWidth="3" />
          <rect x="28" y="34" width="64" height="58" rx="28" fill="#D97706" stroke="#18181B" strokeWidth="3" />
          <rect x="44" y="50" width="32" height="24" rx="11" fill="#B45309" stroke="#18181B" strokeWidth="2.5" />
          <path d="M36 49 Q40 46 44 49" stroke="#18181B" strokeWidth="3" strokeLinecap="round" />
          <path d="M76 49 Q80 46 84 49" stroke="#18181B" strokeWidth="3" strokeLinecap="round" />
          <circle cx="54" cy="57" r="2.2" fill="#18181B" />
          <circle cx="66" cy="57" r="2.2" fill="#18181B" />
          <path d="M60 60 L60 66 M54 67 Q60 71 66 67" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
          <polygon
            points="60,75 63,81 70,82 65,86 66,93 60,89 54,93 55,86 50,82 57,81"
            fill="#FFE66D"
            stroke="#18181B"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
