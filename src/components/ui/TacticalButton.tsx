import React from 'react';
import { cn } from '@/lib/utils';

export interface TacticalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function TacticalButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: TacticalButtonProps) {
  const variantStyles = {
    primary:
      'bg-[#111113] text-white hover:bg-[#27272A] border border-[#111113] shadow-sm',
    accent:
      'bg-[#EA580C] text-white hover:bg-[#C2410C] border border-[#C2410C] shadow-sm',
    secondary:
      'bg-white text-[#111113] hover:bg-[#F3F0E8] border border-[#D4D0C8] shadow-xs',
    ghost:
      'bg-transparent text-[#52525B] hover:text-[#111113] hover:bg-[#F3F0E8]/60 border border-transparent',
  }[variant];

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs min-h-[34px] rounded-lg',
    md: 'px-4.5 py-2.5 text-sm min-h-[42px] rounded-lg',
    lg: 'px-6 py-3.5 text-sm sm:text-base min-h-[48px] rounded-xl',
  }[size];

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-tight transition-all duration-150 active:scale-[0.99] disabled:opacity-50 cursor-pointer',
        variantStyles,
        sizeStyles,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
