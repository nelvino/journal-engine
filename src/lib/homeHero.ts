import type { JournalEntry } from '@/types';

export type HomeHeroState =
  | 'coldStart'
  | 'return'
  | 'unfinished'
  | 'written'
  | 'late'
  | 'morning'
  | 'midday'
  | 'evening';

export interface HomeHeroDraft {
  id: string;
  entryType: string;
  createdAt: string;
  content: { text: string };
  sessionData?: { wordCount: number };
}

export interface HomeHeroStats {
  now: Date;
  todayISO: string;
  dayCount: number;
  todayEntry?: JournalEntry;
  lastEntry?: JournalEntry;
  lastEntryDaysAgo: number;
  lastEntryTitle: string;
  lastEntryWords: number;
  lastEntryTypeLabel: string;
  draft?: HomeHeroDraft;
}

function daysBetween(a: Date, b: Date) {
  const ms = b.getTime() - a.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

export function homeHero(
  now: Date,
  entries: JournalEntry[],
  draft?: HomeHeroDraft
): { state: HomeHeroState; stats: HomeHeroStats } {
  const todayISO = now.toISOString().split('T')[0];

  const sorted = [...entries].sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bTime - aTime;
  });

  const lastEntry = sorted[0];
  const todayEntry = entries.find((e) => e.date === todayISO);
  const uniqueDates = new Set(entries.map((e) => e.date).filter(Boolean));
  const dayCount = uniqueDates.size;

  const lastEntryDate = lastEntry?.createdAt
    ? new Date(lastEntry.createdAt)
    : lastEntry?.date
    ? new Date(lastEntry.date)
    : undefined;

  const lastEntryDaysAgo = lastEntryDate ? daysBetween(lastEntryDate, now) : 0;

  const lastEntryTitle =
    lastEntry?.content?.text?.split('\n')[0].trim().slice(0, 120) ||
    (lastEntry ? 'Your last page' : '');

  const lastEntryWords = lastEntry?.sessionData?.wordCount ?? 0;

  const lastEntryTypeLabel = lastEntry?.entryType || '';

  const stats: HomeHeroStats = {
    now,
    todayISO,
    dayCount,
    todayEntry,
    lastEntry,
    lastEntryDaysAgo,
    lastEntryTitle,
    lastEntryWords,
    lastEntryTypeLabel,
    draft,
  };

  if (entries.length === 0) {
    return { state: 'coldStart', stats };
  }

  if (draft) {
    return { state: 'unfinished', stats };
  }

  if (lastEntryDaysAgo >= 7) {
    return { state: 'return', stats };
  }

  if (todayEntry) {
    return { state: 'written', stats };
  }

  const h = now.getHours();
  if (h >= 23 || h < 5) {
    return { state: 'late', stats };
  }
  if (h < 11) {
    return { state: 'morning', stats };
  }
  if (h < 17) {
    return { state: 'midday', stats };
  }

  return { state: 'evening', stats };
}
