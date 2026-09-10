import React from 'react';
import { cn } from '@/lib/utils';

interface SectionRuleProps {
  eyebrow: string;
  children: React.ReactNode;
  className?: string;
}

export const SectionRule: React.FC<SectionRuleProps> = ({ eyebrow, children, className }) => (
  <section className={cn('pt-1', className)}>
    <div className="border-t-2 border-ink">
      <div className="pt-3 pb-2">
        <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption leading-4">
          {eyebrow}
        </h2>
      </div>
    </div>
    <div className="divide-y divide-rule border-b border-rule">
      {children}
    </div>
  </section>
);
