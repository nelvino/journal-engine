import React from 'react';
import { cn } from '@/lib/utils';

interface EvidenceBlockProps {
  label: string;
  claim: string;
  citation?: string;
  note?: string;
  className?: string;
}

export const EvidenceBlock: React.FC<EvidenceBlockProps> = ({
  label,
  claim,
  citation,
  note,
  className,
}) => (
  <div
    className={cn(
      'pl-4 pr-4 py-4 border-l-2 border-sage mb-6',
      className
    )}
    style={{ backgroundColor: 'rgba(70, 85, 74, 0.05)' }}
  >
    <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-sage leading-4 mb-2">
      {label}
    </h3>
    <p className="font-serif text-[14.5px] leading-[22px] text-ink mb-2">{claim}</p>
    {citation && (
      <p className="font-sans text-[11px] leading-[17px] text-ink-caption italic mb-1">
        {citation}
      </p>
    )}
    {note && (
      <p className="font-sans text-[11px] leading-[17px] text-ink-caption">{note}</p>
    )}
  </div>
);
