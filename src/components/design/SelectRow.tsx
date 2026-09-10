import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectRowProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
}

export const SelectRow: React.FC<SelectRowProps> = ({ label, value, onChange, options, className }) => (
  <div className={cn('w-full', className)}>
    <label className="block font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption leading-4 mb-1">
      {label}
    </label>
    <div className="relative border-b border-ink">
      <select
        className="w-full appearance-none bg-transparent font-serif text-[19px] leading-[25px] text-ink py-2 pr-8 focus:outline-none focus:border-accent cursor-pointer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-decorative pointer-events-none"
        strokeWidth={1.5}
      />
    </div>
  </div>
);
