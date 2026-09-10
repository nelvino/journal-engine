'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Shell } from '@/components/design/Shell';
import { Segmented } from '@/components/design/Segmented';
import { Button } from '@/components/design/Button';
import { SelectRow } from '@/components/design/SelectRow';
import { ConfirmDialog } from '@/components/design/ConfirmDialog';
import { useStorage } from '@/lib/useStorage';
import { useLanguage } from '@/context/LanguageContext';
import { localDateFromISO, toLocalISODate } from '@/lib/utils';
import { calculateEvolution } from '@/lib/evolution';
import type { JournalEntry, Intention } from '@/types';

const MS_PER_DAY = 86400000;

function toISODate(d: Date) {
  return toLocalISODate(d);
}

function getLastNDays(n: number, end = new Date()) {
  const days: { date: Date; iso: string }[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    days.push({ date: d, iso: toISODate(d) });
  }
  return days;
}

function getStreaks(dates: string[]) {
  const set = new Set(dates);
  const today = toLocalISODate(new Date());
  let current = 0;
  let d = localDateFromISO(today);
  while (set.has(toLocalISODate(d))) {
    current++;
    d.setDate(d.getDate() - 1);
  }

  let longest = 0;
  let run = 0;
  let runStart: string | null = null;
  let longestEnd: string | null = null;
  const allDates = [...set].sort();
  for (let i = 0; i < allDates.length; i++) {
    if (i > 0) {
      const prev = localDateFromISO(allDates[i - 1]);
      const curr = localDateFromISO(allDates[i]);
      const diff = (curr.getTime() - prev.getTime()) / MS_PER_DAY;
      if (diff === 1) {
        run++;
      } else {
        run = 1;
        runStart = allDates[i];
      }
    } else {
      run = 1;
      runStart = allDates[i];
    }
    if (run > longest) {
      longest = run;
      longestEnd = allDates[i];
    }
  }

  return {
    current: current || (set.has(today) ? 1 : 0),
    longest,
    longestRunEnd: longestEnd || '',
  };
}

function formatMonth(iso: string, language: 'en' | 'es') {
  return localDateFromISO(iso).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-GB', { month: 'long' });
}

const targetOptions = [1, 2, 3, 4, 5, 6, 7].map((n) => ({
  value: String(n),
  label: String(n),
}));

function Pips({
  current,
  target,
  kept,
}: {
  current: number;
  target: number;
  kept: boolean;
}) {
  return (
    <div className="flex gap-1 h-[5px]">
      {Array.from({ length: target }, (_, i) => {
        const filled = kept || i < current;
        return (
          <div
            key={i}
            className={`flex-1 ${filled ? (kept ? 'bg-sage' : 'bg-accent') : 'bg-paper-raised border border-rule'}`}
          />
        );
      })}
    </div>
  );
}

function RecordView() {
  const { t, language } = useLanguage();
  const storage = useStorage();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [intentions, setIntentions] = useState<Intention[]>([]);

  useEffect(() => {
    storage.get<JournalEntry[]>('journal_entries').then((loaded) => {
      setEntries(loaded || []);
    });
    storage.get<Intention[]>('intentions').then((loaded) => {
      setIntentions(loaded || []);
    });
  }, [storage]);

  const dates = useMemo(() => entries.map((e) => e.date).filter(Boolean), [entries]);
  const streaks = useMemo(() => getStreaks(dates), [dates]);

  const thisWeekDays = useMemo(() => getLastNDays(7), []);
  const thisWeekEntries = useMemo(
    () => thisWeekDays.filter((d) => dates.includes(d.iso)).length,
    [thisWeekDays, dates]
  );
  const thisWeekWords = useMemo(
    () =>
      entries
        .filter((e) => thisWeekDays.some((d) => d.iso === e.date))
        .reduce((sum, e) => sum + (e.sessionData?.wordCount || 0), 0),
    [entries, thisWeekDays]
  );
  const thisWeekMinutes = useMemo(
    () =>
      entries
        .filter((e) => thisWeekDays.some((d) => d.iso === e.date))
        .reduce((sum, e) => sum + (e.sessionData?.duration || 0), 0),
    [entries, thisWeekDays]
  );

  const gridDays = useMemo(() => getLastNDays(28), []);
  const gridDates = useMemo(() => new Set(dates), [dates]);

  const chartDays = useMemo(() => getLastNDays(14), []);
  const chartData = useMemo(() => {
    const map: Record<string, number> = {};
    for (const day of chartDays) map[day.iso] = 0;
    for (const e of entries) {
      if (map[e.date] !== undefined) {
        map[e.date] += e.sessionData?.wordCount || 0;
      }
    }
    return chartDays.map((d) => ({ ...d, words: map[d.iso] }));
  }, [entries, chartDays]);
  const maxChartWords = useMemo(
    () => Math.max(1, ...chartData.map((d) => d.words)),
    [chartData]
  );

  const styleData = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const e of entries) {
      counts[e.entryType] = (counts[e.entryType] || 0) + 1;
    }
    const items = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const max = Math.max(1, ...items.map(([, c]) => c));
    return items.map(([entryType, count]) => ({
      entryType,
      label: t.entryTypes[entryType as JournalEntry['entryType']]?.label || entryType,
      count,
      pct: (count / max) * 100,
    }));
  }, [entries, t.entryTypes]);

  const hasData = entries.length > 0;

  const evolution = useMemo(() => calculateEvolution(entries, intentions), [entries, intentions]);

  const Figure = ({ value, label }: { value: string; label: string }) => (
    <div className="py-2">
      <div className="font-serif text-[40px] leading-[46px] text-ink">{value}</div>
      <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption leading-4">
        {label}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="border-t-2 border-ink pt-4">
        <div className="flex items-baseline justify-between mb-1">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption">
            {t.evolution.title}
          </span>
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption">
            {t.evolution.level} {evolution.level}
          </span>
        </div>
        <h2 className="font-serif text-[28px] leading-[34px] text-ink mb-1">
          {evolution.current.title}
        </h2>
        <p className="font-serif text-[15px] leading-[23px] text-ink-secondary mb-3">
          {evolution.current.description}
        </p>
        <div className="h-1 bg-rule mb-2">
          <div className="h-full bg-accent" style={{ width: `${evolution.progress}%` }} />
        </div>
        {evolution.next && evolution.next.level !== evolution.level && (
          <p className="font-sans text-[11px] leading-[16px] text-ink-caption">
            {t.evolution.next} {evolution.next.level}: {evolution.next.description} · {evolution.progress}%
          </p>
        )}
      </div>

      <div className="bg-ink text-paper-raised p-6">
        <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-night-accent mb-4">
          {t.practice.currentRun}
        </div>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-serif text-[64px] leading-[60px]">{streaks.current}</span>
          <span className="font-sans text-[17px] leading-[23px] opacity-80">{t.practice.daysInARow}</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5 mb-4">
          {gridDays.map((d) => {
            const filled = gridDates.has(d.iso);
            return (
              <div
                key={d.iso}
                className={`w-full aspect-square ${filled ? 'bg-paper-raised' : 'bg-ink-secondary'}`}
              />
            );
          })}
        </div>
        <p className="font-sans text-[11px] leading-[16px] opacity-70">
          {t.practice.lastFourWeeks}{' '}
          {streaks.longest > 0
            ? (() => {
                const month = streaks.longestRunEnd
                  ? localDateFromISO(streaks.longestRunEnd).toLocaleDateString(
                      language === 'es' ? 'es-ES' : 'en-GB',
                      { month: 'long' }
                    )
                  : '';
                return t.practice.longestRun
                  .replace('{count}', String(streaks.longest))
                  .replace('{month}', month);
              })()
            : ''}
        </p>
      </div>

      <div>
        <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption leading-4 mb-3">
          {t.practice.thisWeek}
        </h2>
        <div className="grid grid-cols-3 border-t-2 border-ink">
          <Figure value={String(thisWeekEntries)} label={t.progress.weekly.entries} />
          <div className="border-l border-rule">
            <Figure value={thisWeekWords.toLocaleString()} label={t.progress.weekly.words} />
          </div>
          <div className="border-l border-rule">
            <Figure value={`${thisWeekMinutes}m`} label={t.progress.weekly.time} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption leading-4 mb-3">
          {t.practice.howTheDaysSat}
        </h2>
        <div className="flex items-end justify-between gap-1 h-24 border-b border-rule pb-1">
          {chartData.map((d, i) => {
            const height = Math.round((d.words / maxChartWords) * 88);
            const isFirst = i === 0;
            const isLast = i === chartData.length - 1;
            return (
              <div key={d.iso} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-accent"
                    style={{ height: `${height}px`, opacity: d.words === 0 ? 0.3 : 1 }}
                />
                {(isFirst || isLast) && (
                  <span className="font-sans text-[9.5px] text-ink-caption">
                    {d.date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).toUpperCase()}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {!hasData && (
          <p className="font-sans text-[13.5px] leading-[21px] text-ink-secondary mt-3">
            {t.practice.noData}
          </p>
        )}
      </div>

      <div>
        <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption leading-4 mb-3">
          {t.practice.stylesYouReachFor}
        </h2>
        {hasData ? (
          <div className="space-y-4">
            {styleData.map(({ entryType, label, count, pct }) => (
              <Link
                key={entryType}
                href={`/journal/new?type=${entryType}`}
                className="block transition-opacity duration-[var(--dur)] hover:opacity-80"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-[19px] leading-[25px] text-ink">{label}</h3>
                  <span className="font-sans text-[11px] text-ink-caption">
                    {count} {t.common.pages}
                  </span>
                </div>
                <div className="h-1 bg-rule">
                  <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="font-sans text-[13.5px] leading-[21px] text-ink-secondary">{t.practice.noData}</p>
        )}
      </div>
    </div>
  );
}

function IntentionsView() {
  const { t, language } = useLanguage();
  const storage = useStorage();
  const [intentions, setIntentions] = useState<Intention[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newText, setNewText] = useState('');
  const [newTarget, setNewTarget] = useState('4');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    storage.get<Intention[]>('intentions').then((loaded) => {
      setIntentions(loaded || []);
    });
  }, [storage]);

  const handleSave = async () => {
    const text = newText.trim();
    const target = parseInt(newTarget, 10);
    if (!text || target < 1) return;
    const intention: Intention = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      text,
      target,
      current: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [...intentions, intention];
    setIntentions(updated);
    await storage.set('intentions', updated);
    setNewText('');
    setNewTarget('4');
    setShowAdd(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const updated = intentions.filter((i) => i.id !== deleteId);
    setIntentions(updated);
    await storage.set('intentions', updated);
    setDeleteId(null);
  };

  const handleKeep = async (id: string) => {
    const updated = intentions.map((i) => {
      if (i.id !== id) return i;
      const next = Math.min(i.target, i.current + 1);
      const completed = next >= i.target;
      return {
        ...i,
        current: next,
        keptAt: completed ? i.keptAt || new Date().toISOString().split('T')[0] : undefined,
      };
    });
    setIntentions(updated);
    await storage.set('intentions', updated);
  };

  const stats = useMemo(() => {
    const open = intentions.filter((i) => !i.keptAt).length;
    const kept = intentions.filter((i) => i.keptAt).length;
    const totalTarget = intentions.reduce((s, i) => s + i.target, 0);
    const totalCurrent = intentions.reduce((s, i) => s + i.current, 0);
    const average = totalTarget > 0 ? Math.round((totalCurrent / totalTarget) * 100) : 0;
    return { open, kept, average };
  }, [intentions]);

  const Figure = ({ value, label }: { value: string; label: string }) => (
    <div className="py-2">
      <div className="font-serif text-[40px] leading-[46px] text-ink">{value}</div>
      <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption leading-4">
        {label}
      </div>
    </div>
  );

  const openIntensions = intentions.filter((i) => !i.keptAt);
  const keptIntentions = intentions.filter((i) => i.keptAt);

  return (
    <div className="space-y-8">
      <ConfirmDialog
        isOpen={!!deleteId}
        title={t.practice.intentions}
        message={t.practice.deleteConfirm}
        cancelLabel={t.common.cancel}
        confirmLabel={t.journal.list.deleteEntry}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />

      <div className="grid grid-cols-3 border-t-2 border-ink">
        <Figure
          value={intentions.length ? String(stats.open) : '—'}
          label={t.practice.open}
        />
        <div className="border-l border-rule">
          <Figure
            value={intentions.length ? String(stats.kept) : '—'}
            label={t.practice.kept}
          />
        </div>
        <div className="border-l border-rule">
          <Figure
            value={intentions.length ? `${stats.average}%` : '—'}
            label={t.practice.average}
          />
        </div>
      </div>

      {showAdd ? (
        <div className="space-y-4 border border-ink p-4">
          <h2 className="font-serif text-[22px] leading-[28px] text-ink">
            {t.practice.newIntention}
          </h2>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder={t.practice.newIntentionPlaceholder}
            className="w-full bg-transparent font-sans text-[17px] leading-[27px] text-ink placeholder:text-ink-decorative border-b-2 border-ink py-3 focus:outline-none focus:border-accent"
          />
          <SelectRow
            label={t.practice.target}
            value={newTarget}
            onChange={setNewTarget}
            options={targetOptions}
          />
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowAdd(false)}>
              {t.common.cancel}
            </Button>
            <Button variant="dark" size="lg" className="flex-1" onClick={handleSave}>
              {t.practice.saveIntention}
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="dark"
          className="w-full h-14 inline-flex items-center justify-between px-5"
          onClick={() => setShowAdd(true)}
        >
          <span className="font-sans text-[15px] font-semibold">{t.practice.setFirst}</span>
          <Plus className="w-5 h-5" strokeWidth={1.5} />
        </Button>
      )}

      {intentions.length === 0 && !showAdd && (
        <div className="text-center py-4">
          <h2 className="font-serif text-[28px] leading-[34px] text-ink mb-2">{t.practice.nothingSet}</h2>
          <p className="font-serif text-[17px] leading-[27px] text-ink-secondary max-w-[360px] mx-auto">
            {t.practice.intentionDescription}
          </p>
        </div>
      )}

      {openIntensions.length > 0 && (
        <div>
          <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption leading-4 mb-3">
            {t.practice.open}
          </h2>
          <div className="divide-y divide-rule border-b border-rule">
            {openIntensions.map((i) => (
              <div key={i.id} className="py-4">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-serif text-[19px] leading-[25px] text-ink">{i.text}</h3>
                  <span className="font-sans text-[11px] text-ink-caption shrink-0">
                    {i.current === 0
                      ? t.practice.notStarted
                      : `${i.current} ${t.common.of} ${i.target}`}
                  </span>
                </div>
                <p className="font-sans text-[11px] text-ink-caption mb-3">
                  {t.practice.setIn.replace('{month}', formatMonth(i.createdAt, language))}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <Pips current={i.current} target={i.target} kept={false} />
                  </div>
                  <button
                    onClick={() => handleKeep(i.id)}
                    className="w-11 h-11 flex items-center justify-center border border-ink text-ink hover:bg-paper-raised focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={t.practice.saveIntention}
                  >
                    <Plus className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => setDeleteId(i.id)}
                    className="w-11 h-11 flex items-center justify-center text-ink-caption hover:text-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={t.journal.list.deleteEntry}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {keptIntentions.length > 0 && (
        <div>
          <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption leading-4 mb-3">
            {t.practice.kept}
          </h2>
          <div className="divide-y divide-rule border-b border-rule">
            {keptIntentions.map((i) => (
              <div key={i.id} className="py-4">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-serif text-[19px] leading-[25px] text-ink opacity-60">{i.text}</h3>
                  <span className="font-sans text-[11px] text-ink-caption shrink-0">
                    {t.practice.keptIn.replace('{month}', formatMonth(i.keptAt || i.createdAt, language))}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <Pips current={i.target} target={i.target} kept />
                  </div>
                  <button
                    onClick={() => setDeleteId(i.id)}
                    className="w-11 h-11 flex items-center justify-center text-ink-caption hover:text-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={t.journal.list.deleteEntry}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t-2 border-ink pt-4">
        <p className="font-serif text-[15px] leading-[25px] text-ink-secondary">
          {t.practice.whyItWorks}
        </p>
      </div>

      <div>
        <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption leading-4 mb-3">
          {t.practice.suggested}
        </h2>
        <p className="font-sans text-[13.5px] leading-[21px] text-ink-secondary">{t.practice.noSuggestions}</p>
      </div>
    </div>
  );
}

export default function PracticePage() {
  const { t } = useLanguage();
  const [view, setView] = useState<'record' | 'intentions'>('record');

  const options = [
    { value: 'record', label: t.practice.record },
    { value: 'intentions', label: t.practice.intentions },
  ];

  return (
    <Shell>
      <h1 className="font-serif text-[30px] leading-[34px] text-ink mb-2">{t.practice.title}</h1>
      <p className="font-serif text-[17px] leading-[27px] text-ink-secondary mb-4">
        {t.practice.subtitle}
      </p>
      <p className="font-sans text-[11px] leading-[16px] text-ink-caption mb-6">
        {t.practice.switchDescription}
      </p>

      <div className="mb-8">
        <Segmented value={view} options={options} onChange={(v) => setView(v as 'record' | 'intentions')} />
      </div>

      {view === 'record' ? <RecordView /> : <IntentionsView />}
    </Shell>
  );
}
