import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LedgerRowProps {
  day: string;
  month: string;
  title: string;
  excerpt: string;
  meta: string;
  dot?: 'accent' | 'sage' | 'muted';
  href?: string;
  className?: string;
}

const dotStyles = {
  accent: 'bg-accent',
  sage: 'bg-sage',
  muted: 'bg-rule',
};

export const LedgerRow: React.FC<LedgerRowProps> = ({
  day,
  month,
  title,
  excerpt,
  meta,
  dot = 'muted',
  href,
  className,
}) => {
  const content = (
    <div
      className={cn(
        'grid grid-cols-[54px_1fr] items-start min-h-[44px] py-3',
        'transition-colors duration-[var(--dur)] group',
        className
      )}
    >
      <div className="flex flex-col justify-start pr-3">
        <span className="font-serif text-[17px] leading-[22px] text-ink">{day}</span>
        <span className="font-sans text-[9.5px] font-semibold uppercase tracking-[0.13em] text-ink-caption leading-3">
          {month}
        </span>
      </div>
      <div className="border-l border-rule pl-5">
        <div className="flex items-start gap-3">
          <span
            className={cn('mt-2 w-[5px] h-[5px] shrink-0 block', dotStyles[dot])}
            aria-hidden="true"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-[19px] leading-[25px] text-ink group-hover:text-accent transition-colors duration-[var(--dur)]">
              {title}
            </h3>
            <p className="font-serif text-[13.5px] leading-[21px] text-ink-secondary mt-0.5">
              {excerpt}
            </p>
            <p className="font-sans text-[11px] leading-[16px] text-ink-caption mt-1">
              {meta}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        {content}
      </Link>
    );
  }

  return <div>{content}</div>;
};
