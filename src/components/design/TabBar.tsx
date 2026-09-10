import React from 'react';
import { cn } from '@/lib/utils';

export interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TabBarProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, active, onChange, className }) => (
  <nav className={cn('flex items-end bg-paper border-t border-rule w-full', className)}>
    {tabs.map((tab) => {
      const isActive = tab.id === active;
      return (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex-1 flex flex-col items-center justify-start h-14 pb-6 pt-2 min-w-0',
            'transition-[color,border-color] duration-[var(--dur)] focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-accent',
            'border-t-2',
            isActive ? 'border-accent text-accent' : 'border-transparent text-ink-caption'
          )}
          aria-current={isActive ? 'page' : undefined}
        >
          <span className="w-[21px] h-[21px] flex items-center justify-center mb-0.5">
            {tab.icon}
          </span>
          <span className="font-sans text-[11px] font-medium leading-4 tracking-[0.02em] truncate max-w-full px-1">
            {tab.label}
          </span>
        </button>
      );
    })}
  </nav>
);
