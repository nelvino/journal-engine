import type { EntryType, Intention, JournalEntry } from '@/types';
import { localDateFromISO, toLocalISODate } from '@/lib/utils';

export interface EvolutionLevel {
  level: number;
  title: string;
  description: string;
  requirements: {
    entries: number;
    distinctStyles: number;
    intentionsKept: number;
    currentStreak: number;
  };
  unlocks: EntryType[];
}

export const EVOLUTION_LEVELS: EvolutionLevel[] = [
  {
    level: 1,
    title: 'Beginner',
    description: 'Start with free writing and gratitude.',
    requirements: { entries: 0, distinctStyles: 0, intentionsKept: 0, currentStreak: 0 },
    unlocks: ['expressive', 'gratitude', 'morning_pages', 'custom'],
  },
  {
    level: 2,
    title: 'Building',
    description: 'Add structure with CBT and self-compassion.',
    requirements: { entries: 2, distinctStyles: 2, intentionsKept: 0, currentStreak: 1 },
    unlocks: ['cbt', 'self_compassion'],
  },
  {
    level: 3,
    title: 'Intermediate',
    description: 'Try Stoic and Confucian reflection.',
    requirements: { entries: 5, distinctStyles: 3, intentionsKept: 1, currentStreak: 2 },
    unlocks: ['stoic_morning', 'stoic_evening', 'confucian'],
  },
  {
    level: 4,
    title: 'Advanced',
    description: 'Work on future self and deep reflection.',
    requirements: { entries: 10, distinctStyles: 4, intentionsKept: 2, currentStreak: 3 },
    unlocks: ['future_self', 'zen'],
  },
  {
    level: 5,
    title: 'Mastery',
    description: 'Explore deeper traditions and values.',
    requirements: { entries: 20, distinctStyles: 5, intentionsKept: 3, currentStreak: 4 },
    unlocks: ['islamic', 'vedanta', 'bullet_journal'],
  },
  {
    level: 6,
    title: 'Sage',
    description: 'You have a mature, consistent practice.',
    requirements: { entries: 50, distinctStyles: 6, intentionsKept: 5, currentStreak: 7 },
    unlocks: [],
  },
];

function getStreak(entries: JournalEntry[]) {
  const dates = new Set(entries.map((e) => e.date).filter(Boolean));
  const today = localDateFromISO(toLocalISODate(new Date()));
  let current = 0;
  const d = new Date(today);
  while (dates.has(toLocalISODate(d))) {
    current++;
    d.setDate(d.getDate() - 1);
  }
  return current;
}

export function calculateEvolution(entries: JournalEntry[], intentions: Intention[]) {
  const stats = {
    entries: entries.length,
    distinctStyles: new Set(entries.map((e) => e.entryType)).size,
    intentionsKept: intentions.filter((i) => i.keptAt).length,
    currentStreak: getStreak(entries),
  };

  let level = 1;
  for (const l of EVOLUTION_LEVELS) {
    const meets = Object.entries(l.requirements).every(
      ([key, value]) => stats[key as keyof typeof stats] >= value
    );
    if (meets) {
      level = l.level;
    } else {
      break;
    }
  }

  const current = EVOLUTION_LEVELS.find((l) => l.level === level) || EVOLUTION_LEVELS[0];
  const next = EVOLUTION_LEVELS.find((l) => l.level === level + 1) || current;

  const progress = next
    ? Math.round(
        Object.entries(next.requirements).reduce((acc, [key, value]) => {
          if (value === 0) return acc;
          return acc + Math.min(1, stats[key as keyof typeof stats] / value);
        }, 0) /
          Object.values(next.requirements).filter((v) => v > 0).length *
          100
      )
    : 100;

  return { level, current, next, stats, progress: Math.max(0, Math.min(100, progress)) };
}

export function unlockedEntryTypes(entries: JournalEntry[], intentions: Intention[]) {
  const { level } = calculateEvolution(entries, intentions);
  const unlocked = new Set<EntryType>();
  for (const l of EVOLUTION_LEVELS) {
    if (l.level <= level) {
      l.unlocks.forEach((u) => unlocked.add(u));
    }
  }
  return unlocked;
}

export function unlockLevelFor(entryType: EntryType): number {
  const level = EVOLUTION_LEVELS.find((l) => l.unlocks.includes(entryType));
  return level ? level.level : EVOLUTION_LEVELS.length;
}
