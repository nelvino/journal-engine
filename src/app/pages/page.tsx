'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Shell } from '@/components/design/Shell';
import { Loading } from '@/components/design/Loading';
import { SectionRule } from '@/components/design/SectionRule';
import { LedgerRow } from '@/components/design/LedgerRow';
import { useStorage } from '@/lib/useStorage';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { localDateFromISO } from '@/lib/utils';
import type { JournalEntry, EntryType } from '@/types';

const ALL_STYLES = '';

function formatDay(date: string) {
  return localDateFromISO(date).getDate().toString().padStart(2, '0');
}

function formatMonth(date: string) {
  return localDateFromISO(date).toLocaleString('en-US', { month: 'short' }).toUpperCase();
}

function formatMonthGroup(date: string) {
  return localDateFromISO(date).toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function truncate(text: string, max = 80) {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + '...';
}

export default function PagesPage() {
  const { t } = useLanguage();
  const storage = useStorage();
  const router = useRouter();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [search, setSearch] = useState('');
  const [styleFilter, setStyleFilter] = useState<string>(ALL_STYLES);
  const [showAllStyles, setShowAllStyles] = useState(false);
  const [hidePreviews, setHidePreviews] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      storage.get<JournalEntry[]>('journal_entries'),
      storage.get<any>('user_settings'),
    ]).then(([loadedEntries, loadedSettings]) => {
      setEntries(loadedEntries || []);
      setHidePreviews(loadedSettings?.hidePreviews ?? false);
      setLoaded(true);
    });
  }, [storage]);

  const year = new Date().getFullYear();
  const yearTotal = useMemo(
    () => entries.filter((e) => localDateFromISO(e.date).getFullYear() === year).length,
    [entries, year]
  );
  const yearWords = useMemo(
    () =>
      entries
        .filter((e) => localDateFromISO(e.date).getFullYear() === year)
        .reduce((sum, e) => sum + (e.sessionData?.wordCount ?? wordCount(e.content?.text || '')), 0),
    [entries, year]
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return entries
      .filter((entry) => (styleFilter ? entry.entryType === styleFilter : true))
      .filter((entry) => {
        if (!term) return true;
        const title = (t.entryTypes[entry.entryType]?.label || entry.entryType).toLowerCase();
        const excerpt = (entry.content?.text || '').toLowerCase();
        return title.includes(term) || excerpt.includes(term);
      })
      .sort((a, b) => localDateFromISO(b.date).getTime() - localDateFromISO(a.date).getTime());
  }, [entries, search, styleFilter, t.entryTypes]);

  const groups = useMemo(() => {
    const map: Record<string, JournalEntry[]> = {};
    filtered.forEach((entry) => {
      const key = formatMonthGroup(entry.date);
      if (!map[key]) map[key] = [];
      map[key].push(entry);
    });
    return Object.entries(map).sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime());
  }, [filtered]);

  const emptyMessage =
    entries.length === 0 ? t.journal.list.emptyTitle : t.journal.list.noMatches;

  const styleOptions = useMemo(() => {
    const typeCounts: Record<string, number> = {};
    for (const e of entries) {
      typeCounts[e.entryType] = (typeCounts[e.entryType] || 0) + 1;
    }
    const allTypes = Object.keys(t.entryTypes) as EntryType[];
    const sortedTypes = allTypes.sort((a, b) => (typeCounts[b] || 0) - (typeCounts[a] || 0));
    const topTypes = sortedTypes.slice(0, 4);
    const visibleTypes = showAllStyles ? sortedTypes : topTypes;
    const remaining = sortedTypes.length - topTypes.length;
    return { topTypes, visibleTypes, remaining };
  }, [entries, t.entryTypes, showAllStyles]);

  if (!loaded) {
    return (
      <Shell>
        <Loading />
      </Shell>
    );
  }

  return (
    <Shell>
      <h1 className="font-serif text-[30px] leading-[34px] text-ink mb-2">{t.journal.yourPages}</h1>
      <p className="font-sans text-[14px] leading-[22px] text-ink-secondary mb-6">
        {t.journal.writtenThisYear.replace('{count}', String(yearTotal))} ·{' '}
        {t.journal.wordsThisYear.replace('{count}', yearWords.toLocaleString())}
      </p>

      <button
        onClick={() => router.push('/journal/new')}
        className="w-full h-14 bg-ink text-paper-raised px-5 mb-6 flex items-center justify-between hover:bg-ink-secondary transition-colors duration-[var(--dur)]"
      >
        <span className="font-sans text-[15px] font-semibold">{t.journal.newPage}</span>
        <Plus className="w-5 h-5" strokeWidth={1.5} />
      </button>

      <div className="mb-4 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-decorative" strokeWidth={1.5} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.journal.searchYourPages}
          className="w-full pl-11 pr-4 py-3 bg-paper-raised border border-ink font-sans text-[15px] leading-5 text-ink placeholder:text-ink-decorative focus:outline-none focus:border-accent"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
        <button
          onClick={() => setStyleFilter(ALL_STYLES)}
          className={cn(
            'h-10 w-full px-4 font-sans text-[13px] leading-5 border border-ink transition-colors duration-[var(--dur)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent truncate',
            styleFilter === ALL_STYLES
              ? 'bg-ink text-paper-raised'
              : 'bg-paper text-ink hover:bg-paper-raised'
          )}
        >
          {t.common.all}
        </button>
        {styleOptions.visibleTypes.map((type) => {
          const selected = styleFilter === type;
          return (
            <button
              key={type}
              onClick={() => setStyleFilter(type)}
              className={cn(
                'h-10 w-full px-4 font-sans text-[13px] leading-5 border border-ink transition-colors duration-[var(--dur)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent truncate',
                selected
                  ? 'bg-ink text-paper-raised'
                  : 'bg-paper text-ink hover:bg-paper-raised'
              )}
            >
              {t.entryTypes[type].label}
            </button>
          );
        })}
        {styleOptions.remaining > 0 && (
          <button
            onClick={() => setShowAllStyles(!showAllStyles)}
            className={cn(
              'h-10 w-full px-4 font-sans text-[13px] leading-5 border border-ink transition-colors duration-[var(--dur)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent truncate',
              showAllStyles
                ? 'bg-paper-raised text-ink'
                : 'bg-paper text-ink hover:bg-paper-raised'
            )}
          >
            {showAllStyles
              ? t.journal.showFewer
              : t.journal.showMore.replace('{count}', String(styleOptions.remaining))}
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="font-serif text-[16px] leading-[28px] text-ink-secondary">{emptyMessage}</p>
      ) : (
        <div className="space-y-8">
          {groups.map(([month, items]) => (
            <SectionRule
              key={month}
              eyebrow={`${month.toUpperCase()} · ${items.length} ${t.common.pages.toUpperCase()}`}
            >
              {items.map((entry) => {
                const words =
                  entry.sessionData?.wordCount ?? wordCount(entry.content?.text || '');
                return (
                  <LedgerRow
                    key={entry.id}
                    day={formatDay(entry.date)}
                    month={formatMonth(entry.date)}
                    title={t.entryTypes[entry.entryType]?.label || entry.entryType}
                    excerpt={hidePreviews ? '' : truncate(entry.content?.text || '', 90)}
                    meta={`${t.entryTypes[entry.entryType].label} · ${words} ${t.common.words}`}
                    dot="accent"
                    href={`/journal/${entry.id}`}
                  />
                );
              })}
            </SectionRule>
          ))}
        </div>
      )}
    </Shell>
  );
}
