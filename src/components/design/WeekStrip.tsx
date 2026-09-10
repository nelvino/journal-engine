import React from 'react';
import { cn } from '@/lib/utils';

type DayState = 'written' | 'today' | 'empty' | 'future';

interface WeekDay {
  label: string;
  day: string;
  state: DayState;
}

interface WeekStripProps {
  days: WeekDay[];
  className?: string;
}

const cellStyles: Record<DayState, string> = {
  written: 'bg-accent border-accent',
  today: 'border-2 border-accent',
  empty: 'border border-rule',
  future: 'border border-rule',
};

export const WeekStrip: React.FC<WeekStripProps> = ({ days, className }) => (
  <div className={cn('w-full', className)}>
    <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption leading-4 mb-3">
      This week
    </h2>
    <div className="flex justify-between items-end">
      {days.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div
            className={cn(
              'w-[38px] h-[38px] transition-colors duration-[var(--dur)]',
              cellStyles[d.state]
            )}
          />
          <span className="font-sans text-[9.5px] font-semibold uppercase tracking-[0.13em] text-ink-caption leading-3">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  </div>
);
