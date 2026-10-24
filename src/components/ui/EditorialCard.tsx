import React from 'react';
import { cn } from '@/lib/utils';

export interface EditorialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'surface' | 'subtle' | 'dark' | 'featured';
  indexLabel?: string;
  badgeText?: string;
  accentColor?: 'cobalt' | 'orange' | 'emerald' | 'neutral';
}

export function EditorialCard({
  children,
  className,
  variant = 'surface',
  indexLabel,
  badgeText,
  accentColor = 'neutral',
  ...props
}: EditorialCardProps) {
  const variantClasses = {
    surface: 'bg-white border border-[#E4E2DD] shadow-[0_2px_12px_-4px_rgba(17,17,19,0.05)]',
    subtle: 'bg-[#F3F0E8]/70 border border-[#E4E2DD]',
    dark: 'bg-[#111113] text-white border border-[#27272A]',
    featured:
      'bg-white border border-[#1E40AF] shadow-[0_12px_32px_-8px_rgba(17,17,19,0.08)]',
  }[variant];

  const badgeColors = {
    cobalt: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
    orange: 'bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]',
    emerald: 'bg-[#F0FDFA] text-[#0F766E] border-[#99F6E4]',
    neutral: 'bg-[#F3F0E8] text-[#111113] border-[#D4D0C8]',
  }[accentColor];

  return (
    <div
      className={cn('rounded-xl overflow-hidden transition-all', variantClasses, className)}
      {...props}
    >
      {(indexLabel || badgeText) && (
        <div
          className={cn(
            'flex items-center justify-between px-5 py-2.5 border-b text-[11px] font-mono uppercase tracking-wider',
            variant === 'dark'
              ? 'border-[#27272A] bg-[#18181B] text-[#A1A1AA]'
              : 'border-[#E4E2DD] bg-[#FBF9F5]/80 text-[#52525B]'
          )}
        >
          <span className="font-semibold">{indexLabel || 'AIOSSAN // PLAYBOOK'}</span>
          {badgeText && (
            <span
              className={cn(
                'px-2 py-0.5 rounded border font-bold text-[10px]',
                badgeColors
              )}
            >
              {badgeText}
            </span>
          )}
        </div>
      )}
      <div className="p-6 sm:p-7">{children}</div>
    </div>
  );
}
