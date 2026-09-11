import { toDate, getEntryDateISO, toLocalISODate, localDateFromISO } from '@/lib/utils';

describe('toDate', () => {
  it('returns the same Date object', () => {
    const d = new Date('2026-09-11T09:38:00');
    expect(toDate(d)).toBe(d);
  });

  it('parses an ISO string', () => {
    const d = toDate('2026-09-11');
    expect(d).toBeInstanceOf(Date);
    expect(isNaN(d!.getTime())).toBe(false);
  });

  it('parses a numeric timestamp', () => {
    const ms = new Date('2026-09-11T09:38:00').getTime();
    const d = toDate(ms);
    expect(d?.getTime()).toBe(ms);
  });

  it('handles a Firestore-like Timestamp with toDate()', () => {
    const base = new Date('2026-09-11T09:38:00');
    const timestamp = { toDate: () => base };
    expect(toDate(timestamp as any)?.getTime()).toBe(base.getTime());
  });

  it('handles a Firestore-like Timestamp with seconds/nanoseconds', () => {
    const base = new Date('2026-09-11T09:38:00');
    const timestamp = {
      seconds: Math.floor(base.getTime() / 1000),
      nanoseconds: (base.getTime() % 1000) * 1_000_000,
    };
    expect(toDate(timestamp as any)?.getTime()).toBe(base.getTime());
  });

  it('returns undefined for null, undefined, and invalid values', () => {
    expect(toDate(undefined)).toBeUndefined();
    expect(toDate(null)).toBeUndefined();
    expect(toDate('')).toBeUndefined();
    expect(toDate({})).toBeUndefined();
  });
});

describe('getEntryDateISO', () => {
  it('uses the string date field as-is', () => {
    expect(getEntryDateISO({ date: '2026-09-11' })).toBe('2026-09-11');
  });

  it('converts a Date date field to ISO', () => {
    const d = new Date(2026, 8, 11); // local 2026-09-11
    expect(getEntryDateISO({ date: d })).toBe('2026-09-11');
  });

  it('converts a Firestore-like Timestamp date field to ISO', () => {
    const base = new Date(2026, 8, 11);
    expect(getEntryDateISO({ date: { toDate: () => base } })).toBe('2026-09-11');
  });

  it('falls back to createdAt when date is missing', () => {
    const base = new Date(2026, 8, 10);
    expect(getEntryDateISO({ createdAt: { toDate: () => base } })).toBe('2026-09-10');
  });

  it('returns undefined when no date info exists', () => {
    expect(getEntryDateISO({})).toBeUndefined();
  });
});

describe('localDateFromISO', () => {
  it('parses an ISO date into a local Date', () => {
    const d = localDateFromISO('2026-09-11');
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(8); // 0-indexed
    expect(d.getDate()).toBe(11);
  });
});
