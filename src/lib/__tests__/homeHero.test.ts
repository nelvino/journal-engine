import { homeHero } from '@/lib/homeHero';
import type { JournalEntry } from '@/types';

const now = new Date('2026-09-10T19:00:00');

function makeEntry(overrides: Partial<JournalEntry> = {}): JournalEntry {
  return {
    id: '1',
    userId: '',
    date: now.toISOString().split('T')[0],
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
});
