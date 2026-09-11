'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shell } from '@/components/design/Shell';
import { Loading } from '@/components/design/Loading';
import { SectionRule } from '@/components/design/SectionRule';
import { LedgerRow } from '@/components/design/LedgerRow';
import { WeekStrip } from '@/components/design/WeekStrip';
import { HomeHero } from '@/components/design/HomeHero';
import { useLanguage } from '@/context/LanguageContext';
import { useStorage } from '@/lib/useStorage';
import { localDateFromISO, toLocalISODate, getEntryDateISO } from '@/lib/utils';
import { homeHero } from '@/lib/homeHero';
import type { JournalEntry } from '@/types';

const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function truncate(text: string, max = 80) {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + '...';
}

export default function TodayPage() {
  const { t } = useLanguage();
  const storage = useStorage();
  const router = useRouter();
  const [now, setNow] = useState<Date | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [hidePreviews, setHidePreviews] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setNow(new Date());
    Promise.all([
      storage.get<JournalEntry[]>('journal_entries'),
      storage.get<any>('user_settings'),
    ]).then(([data, settings]) => {
      setEntries(data || []);
      setHidePreviews(settings?.hidePreviews ?? false);
      setLoaded(true);
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
      return [] as { label: string; day: string; state: 'written' | 'empty' | 'future'; isToday?: boolean }[];
    }
    const dayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - dayIndex);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      const iso = toLocalISODate(d);
      const hasEntry = entries.some((e) => getEntryDateISO(e) === iso);
      const isToday = i === dayIndex;
      const isFuture = !isToday && i > dayIndex;
      const state: 'written' | 'empty' | 'future' = hasEntry
        ? 'written'
        : isFuture
        ? 'future'
        : 'empty';
      return {
        label: labels[i],
        day: String(d.getDate()).padStart(2, '0'),
        state,
        isToday,
      };
    });
  }, [now, entries]);

  if (!loaded || !now || !stats) {
    return (
      <Shell>
        <Loading />
      </Shell>
    );
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
            const dateISO = getEntryDateISO(entry) ?? toLocalISODate(new Date());
            const d = localDateFromISO(dateISO);
            const day = String(d.getDate()).padStart(2, '0');
            const month = d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();
            const title = t.entryTypes[entry.entryType]?.label || entry.entryType;
            const excerpt = hidePreviews ? '' : truncate(entry.content?.text || '', 90);
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
