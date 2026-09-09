'use client';

import React from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface FrameworkUsageItem {
  frameworkId: string;
  frameworkName: string;
  count: number;
  percentage: number;
}

interface FrameworkUsageProps {
  usage: FrameworkUsageItem[];
  totalEntries: number;
  className?: string;
}

export const FrameworkUsage: React.FC<FrameworkUsageProps> = ({ usage, totalEntries, className = '' }) => {
  if (usage.length === 0) {
    return (
      <div className={`text-center py-8 text-muted-foreground ${className}`}>
        No framework usage yet. Try a framework-specific entry to see your practice patterns.
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {usage.map((item) => (
        <div key={item.frameworkId} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-card-foreground">{item.frameworkName}</span>
            <span className="text-muted-foreground">
              {item.count} {item.count === 1 ? 'entry' : 'entries'} ({Math.round(item.percentage)}%)
            </span>
          </div>
          <ProgressBar value={item.percentage} />
        </div>
      ))}
    </div>
  );
};
