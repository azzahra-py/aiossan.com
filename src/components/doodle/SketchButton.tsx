import React from 'react';
import { cn } from '@/lib/utils';

export interface SketchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'blue';
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
    variant === 'primary'
      ? 'bg-[#FFE66D] text-[#1E1E1E]'
      : variant === 'blue'
      ? 'bg-[#2B59C3] text-white'
      : 'bg-white text-[#1E1E1E]';

  const sClass =
    size === 'sm'
      ? 'px-3 py-1.5 text-base min-h-[38px]'
      : size === 'lg'
      ? 'px-6 py-3 text-xl min-h-[52px]'
      : 'px-4 py-2 text-lg min-h-[44px]';

  return (
    <button
      className={cn('doodle-button inline-flex items-center justify-center gap-2 font-bold disabled:opacity-50 cursor-pointer', vClass, sClass, className)}
      {...props}
    >
      {children}
    </button>
  );
}
