'use client';

import React from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useLanguage } from '@/context/LanguageContext';

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
  const { t } = useLanguage();
  if (usage.length === 0) {
    return (
      <div className={`text-center py-8 text-muted-foreground ${className}`}>
        {t.progress.frameworkUsageComponent.empty}
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
              {item.count} {item.count === 1 ? t.progress.frameworkUsageComponent.entry : t.progress.frameworkUsageComponent.entries} ({Math.round(item.percentage)}%)
            </span>
          </div>
          <ProgressBar value={item.percentage} />
        </div>
      ))}
    </div>
  );
};
