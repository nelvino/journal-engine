import { homeHero } from '@/lib/homeHero';
import { toLocalISODate } from '@/lib/utils';
import type { JournalEntry } from '@/types';

const now = new Date('2026-09-10T19:00:00');

function makeEntry(overrides: Partial<JournalEntry> = {}): JournalEntry {
  return {
    id: '1',
    userId: '',
    date: toLocalISODate(now),
    entryType: 'expressive',
    content: { text: 'test' },
    sessionData: {
      duration: 0,
      startTime: now,
      endTime: now,
      wordCount: 10,
    },
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

describe('homeHero', () => {
  it('returns coldStart for no entries', () => {
    const { state } = homeHero(now, []);
    expect(state).toBe('coldStart');
  });

  it('returns written when there is a today entry', () => {
    const { state, stats } = homeHero(now, [makeEntry()]);
    expect(state).toBe('written');
    expect(stats.todayEntry).toBeDefined();
  });

  it('returns return for entries older than a week', () => {
    const old = makeEntry({ date: '2026-08-20', createdAt: new Date('2026-08-20') });
    const { state, stats } = homeHero(now, [old]);
    expect(state).toBe('return');
    expect(stats.lastEntryDaysAgo).toBeGreaterThanOrEqual(7);
  });

  it('returns unfinished when draft exists', () => {
    const draft = {
      id: 'draft1',
      entryType: 'expressive',
      createdAt: new Date('2026-09-08').toISOString(),
      content: { text: 'Draft' },
      sessionData: { wordCount: 5 },
    };
    const { state } = homeHero(now, [makeEntry()], draft);
    expect(state).toBe('unfinished');
  });

  it('recognizes a today entry with a Firestore Timestamp createdAt', () => {
    const createdAt = { toDate: () => now };
    const { state, stats } = homeHero(now, [makeEntry({ date: undefined as any, createdAt })]);
    expect(state).toBe('written');
    expect(stats.todayEntry).toBeDefined();
  });

  it('recognizes a today entry with a Date object date field', () => {
    const { state, stats } = homeHero(now, [makeEntry({ date: now })]);
    expect(state).toBe('written');
    expect(stats.todayEntry).toBeDefined();
  });

  it('counts unique dates from mixed date formats', () => {
    const day1 = { toDate: () => new Date('2026-09-09T08:00:00') };
    const day2 = { toDate: () => new Date('2026-09-10T19:00:00') };
    const entries = [
      makeEntry({ id: '1', date: '2026-09-09', createdAt: day1 }),
      makeEntry({ id: '2', date: '2026-09-09', createdAt: day1 }),
      makeEntry({ id: '3', date: '2026-09-10', createdAt: day2 }),
    ];
    const { stats } = homeHero(now, entries);
    expect(stats.dayCount).toBe(2);
  });

  it('sorts correctly with Firestore Timestamps for createdAt', () => {
    const older = { toDate: () => new Date('2026-09-09T08:00:00') };
    const newer = { toDate: () => new Date('2026-09-10T19:00:00') };
    const entries = [
      makeEntry({ id: '1', createdAt: older }),
      makeEntry({ id: '2', createdAt: newer }),
    ];
    const { stats } = homeHero(now, entries);
    expect(stats.lastEntry?.id).toBe('2');
  });
});
