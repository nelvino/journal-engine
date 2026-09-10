'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shell } from '@/components/design/Shell';
import { SectionRule } from '@/components/design/SectionRule';
import { LedgerRow } from '@/components/design/LedgerRow';
import { WeekStrip } from '@/components/design/WeekStrip';
import { HomeHero } from '@/components/design/HomeHero';
import { useLanguage } from '@/context/LanguageContext';
import { useStorage } from '@/lib/useStorage';
import { homeHero } from '@/lib/homeHero';
import type { JournalEntry } from '@/types';

const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function TodayPage() {
  const { t } = useLanguage();
  const storage = useStorage();
  const router = useRouter();
  const [now, setNow] = useState<Date | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    setNow(new Date());
    storage.get<JournalEntry[]>('journal_entries').then((data) => {
      setEntries(data || []);
    });
  }, [storage]);

  const { state, stats } = useMemo(() => {
    if (!now) {
      return { state: 'coldStart' as const, stats: undefined };
    }
    return homeHero(now, entries);
  }, [now, entries]);

  const recent = useMemo(() => {
    return entries.slice(0, 3);
  }, [entries]);

  const days = useMemo(() => {
    if (!now) {
      return [] as { label: string; day: string; state: 'today' | 'written' | 'empty' }[];
    }
    const dayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - dayIndex);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const hasEntry = entries.some((e) => e.date === iso);
      const isToday = i === dayIndex;
      const state: 'today' | 'written' | 'empty' = isToday
        ? 'today'
        : hasEntry
        ? 'written'
        : 'empty';
      return {
        label: labels[i],
        day: String(d.getDate()).padStart(2, '0'),
        state,
      };
    });
  }, [now, entries]);

  if (!now || !stats) {
    return <div className="min-h-screen bg-paper" />;
  }

  return (
    <Shell>
      <HomeHero state={state} stats={stats} />

      <div className="mb-8">
        <WeekStrip days={days} />
      </div>

      <SectionRule eyebrow="Recent pages">
        {recent.length === 0 ? (
          <p className="font-sans text-[13.5px] leading-[21px] text-ink-secondary py-4">
            No pages yet. Start writing on Today.
          </p>
        ) : (
          recent.map((entry) => {
            const d = new Date(entry.date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();
            const title =
              entry.content?.text?.split('\n')[0].trim().slice(0, 120) ||
              t.entryTypes[entry.entryType].label;
            const excerpt =
              entry.content?.text?.split('\n')[1]?.trim().slice(0, 140) || '';
            const words = entry.sessionData?.wordCount ?? 0;
            const meta = `${t.entryTypes[entry.entryType].label} · ${words} ${t.common.words}`;
            return (
              <LedgerRow
                key={entry.id}
                day={day}
                month={month}
                title={title}
                excerpt={excerpt}
                meta={meta}
                href={`/journal/${entry.id}`}
              />
            );
          })
        )}
      </SectionRule>
    </Shell>
  );
}
