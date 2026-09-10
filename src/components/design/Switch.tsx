import React from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, id }) => (
  <button
    id={id}
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={cn(
      'relative w-11 h-6 border border-ink transition-colors duration-[var(--dur)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
      checked ? 'bg-paper-raised' : 'bg-paper-raised'
    )}
  >
    <span
      className={cn(
        'absolute top-1 left-1 w-4 h-4 transition-transform duration-[var(--dur)]',
        checked ? 'translate-x-5 bg-accent' : 'bg-ink-decorative'
      )}
    />
  </button>
);
