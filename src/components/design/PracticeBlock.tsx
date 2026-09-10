import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface PracticeBlockProps {
  eyebrow: string;
  name: string;
  prompt: string;
  action: string;
  onAction?: () => void;
  className?: string;
}

export const PracticeBlock: React.FC<PracticeBlockProps> = ({
  eyebrow,
  name,
  prompt,
  action,
  onAction,
  className,
}) => (
  <div className={cn('border-t-2 border-ink pt-3', className)}>
    <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption leading-4 mb-2">
      {eyebrow}
    </h2>
    <h3 className="font-serif text-[25px] leading-[30px] text-ink mb-2">{name}</h3>
    <p className="font-sans text-[13.5px] leading-[21px] text-ink-secondary mb-4">{prompt}</p>
    <Button variant="primary" size="md" onClick={onAction}>
      {action}
    </Button>
  </div>
);
