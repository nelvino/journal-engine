'use client';

import React from 'react';

interface MoodChartProps {
  data: Array<{
    date: string;
    overall: number;
    energy: number;
    stress: number;
    focus: number;
  }>;
  className?: string;
}

export const MoodChart: React.FC<MoodChartProps> = ({ data, className = '' }) => {
  if (data.length === 0) {
    return (
      <div className={`text-center py-8 text-muted-foreground ${className}`}>
        No mood data yet. Start journaling to see your mood trends.
      </div>
    );
  }

  // Show last 7 entries max
  const recentData = data.slice(-7);
  const labels = ['Overall', 'Energy', 'Stress', 'Focus'];
  const colors = ['bg-primary', 'bg-success', 'bg-warning', 'bg-accent'];

  const getBarHeight = (value: number) => `${(value / 10) * 100}%`;
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        {labels.map((label, index) => (
          <div key={label} className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
            <span className="text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="overflow-x-auto">
        <div className="flex items-end gap-2 min-w-[300px] h-48 pb-6 border-b border-border">
          {recentData.map((entry, entryIndex) => (
            <div key={entryIndex} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end gap-0.5 h-40">
                {[entry.overall, entry.energy, entry.stress, entry.focus].map((value, metricIndex) => (
                  <div
                    key={metricIndex}
                    className={`flex-1 ${colors[metricIndex]} rounded-t-sm transition-all duration-500 hover:opacity-80`}
                    style={{ height: getBarHeight(value) }}
                    title={`${labels[metricIndex]}: ${value}/10`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground text-center whitespace-nowrap rotate-0">
                {formatDate(entry.date)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
