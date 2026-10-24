import React from 'react';
import { cn } from '@/lib/utils';

export interface SketchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'blue' | 'amber';
  size?: 'sm' | 'md' | 'lg';
}

export function SketchButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: SketchButtonProps) {
  const vClass =
    variant === 'primary' || variant === 'blue'
      ? 'bg-[#1E40AF] text-white hover:bg-[#1D4ED8]'
      : variant === 'amber'
      ? 'bg-[#F59E0B] text-white hover:bg-[#D97706]'
      : 'bg-white text-[#18181B] border border-[#E5E1D8] hover:bg-zinc-50';

  const sClass =
    size === 'sm'
      ? 'px-3 py-1.5 text-sm min-h-[36px]'
      : size === 'lg'
      ? 'px-6 py-3 text-lg min-h-[50px]'
      : 'px-4.5 py-2.5 text-base min-h-[44px]';

  return (
    <button
      className={cn('doodle-button inline-flex items-center justify-center gap-2 font-bold disabled:opacity-50 cursor-pointer', vClass, sClass, className)}
      {...props}
    >
      {children}
    </button>
  );
}
