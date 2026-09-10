import React from 'react';
import { cn } from '@/lib/utils';

interface SegmentedOption {
  value: string;
  label: string;
}

interface SegmentedProps {
  value: string;
  options: SegmentedOption[];
  onChange: (value: string) => void;
}

export const Segmented: React.FC<SegmentedProps> = ({ value, options, onChange }) => (
  <div className="flex border border-ink" role="tablist" aria-label="Practice view switcher">
    {options.map((option) => {
      const selected = option.value === value;
      return (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          role="tab"
          aria-selected={selected}
          className={cn(
            'flex-1 h-11 font-sans text-[14px] font-semibold leading-5 transition-colors duration-[var(--dur)]',
            selected
              ? 'bg-ink text-paper-raised'
              : 'bg-paper text-ink hover:bg-paper-raised'
          )}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);
