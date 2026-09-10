import React from 'react';
import { cn } from '@/lib/utils';

interface TypeRowProps {
  num: string;
  title: string;
  description: string;
  tags: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export const TypeRow: React.FC<TypeRowProps> = ({
  num,
  title,
  description,
  tags,
  selected,
  onClick,
  className,
}) => {
  const tagList = tags
    .split(',')
    .map((s) => s.trim().toUpperCase())
    .join(' · ');

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full grid grid-cols-[44px_1fr] items-start py-4 text-left min-h-[44px]',
        'transition-[background-color,border-color,color] duration-[var(--dur)]',
        'border-b border-rule',
        selected
          ? 'border-l-2 border-l-accent bg-[#C2482C0F]'
          : 'border-l-2 border-l-transparent',
        className
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
  );
};
