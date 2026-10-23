import React from 'react';
import { cn } from '@/lib/utils';

export interface SketchCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'yellow' | 'blue' | 'green' | 'red';
  badgeText?: string;
}

const variantMap = {
  white: 'bg-white',
  yellow: 'bg-[#FFFDF0]',
  blue: 'bg-[#F2F6FF]',
  green: 'bg-[#F0FAF8]',
  red: 'bg-[#FFF5F5]',
};

export function SketchCard({
  children,
  className,
  variant = 'white',
  badgeText,
  ...props
}: SketchCardProps) {
  return (
    <div className={cn('doodle-box relative p-5 md:p-6', variantMap[variant], className)} {...props}>
      {badgeText && (
        <span className="font-hand absolute -top-3.5 right-4 inline-block -rotate-2 border border-amber-300 bg-[#FFE66D] px-3 py-0.5 text-sm font-bold text-[#18181B] shadow-2xs">
          {badgeText}
        </span>
      )}
      {children}
    </div>
  );
}
