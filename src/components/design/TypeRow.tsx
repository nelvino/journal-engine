import React from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TypeRowProps {
  num: string;
  title: string;
  description: string;
  tags: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  onInfo?: () => void;
  infoLabel?: string;
  className?: string;
}

export const TypeRow: React.FC<TypeRowProps> = ({
  num,
  title,
  description,
  tags,
  selected,
  disabled,
  onClick,
  onInfo,
  infoLabel,
  className,
}) => {
  const tagList = tags
    .split(',')
    .map((s) => s.trim().toUpperCase())
    .join(' · ');

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        aria-disabled={disabled}
        aria-pressed={selected}
        className={cn(
          'w-full grid grid-cols-[44px_1fr] items-start py-4 text-left min-h-[44px]',
          'transition-[background-color,border-color,color] duration-[var(--dur)]',
          'border-b border-rule',
          disabled && 'opacity-50 cursor-not-allowed',
          selected
            ? 'border-l-2 border-l-accent bg-[#C2482C0F]'
            : 'border-l-2 border-l-transparent',
          onInfo && 'pr-10'
        )}
      >
        <span
          className={cn(
            'font-sans text-[15px] leading-5 pt-0.5 pl-2',
            selected ? 'text-accent' : 'text-ink-caption'
          )}
        >
          {num}
        </span>
        <div className="pr-1">
          <h3
            className={cn(
              'font-serif text-[19px] leading-[25px]',
              selected ? 'text-accent' : 'text-ink'
            )}
          >
            {title}
          </h3>
          <p className="font-serif text-[13.5px] leading-[21px] text-ink-secondary mt-0.5">
            {description}
          </p>
          <p className="font-sans text-[9.5px] font-semibold uppercase tracking-[0.13em] text-sage leading-3 mt-2">
            {tagList}
          </p>
        </div>
      </button>
      {onInfo && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onInfo();
          }}
          aria-label={infoLabel}
          className="absolute right-2 top-4 w-9 h-9 flex items-center justify-center text-ink-caption hover:text-accent transition-colors duration-[var(--dur)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Info className="w-4 h-4" strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
};
