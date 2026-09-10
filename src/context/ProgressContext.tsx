'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useStorage } from '@/lib/useStorage';
import { useLanguage } from '@/context/LanguageContext';
import { localDateFromISO } from '@/lib/utils';
import type { JournalEntry, UserProgress, Goal, EntryType } from '@/types';

interface ProgressContextType {
  progress: UserProgress | null;
  loading: boolean;
  refreshProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const storage = useStorage();
  const { t } = useLanguage();

  const calculateProgress = async () => {
    try {
      const entriesData = await storage.get<JournalEntry[]>('journal_entries');
      const goalsData = await storage.get<Goal[]>('goals');
      const entries = entriesData || [];
      const goals = goalsData || [];
      
      if (entries.length === 0) {
        setProgress(createEmptyProgress());
        return;
      }
      
      // Calculate streaks
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const uniqueDates = [...new Set(entries.map(entry => {
        const d = localDateFromISO(entry.date);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      }))].sort((a, b) => b - a);
      
      let currentStreak = 0;
      for (let i = 0; i < uniqueDates.length; i++) {
        const entryDate = new Date(uniqueDates[i]);
        const expectedDate = new Date(today);
        expectedDate.setDate(today.getDate() - i);
        expectedDate.setHours(0, 0, 0, 0);
        
        if (entryDate.getTime() === expectedDate.getTime()) {
          currentStreak++;
        } else {
          break;
        }
      }
      
      let longestStreak = 0;
      let tempStreak = 1;
      const sortedDates = uniqueDates.map(t => new Date(t)).sort((a, b) => a.getTime() - b.getTime());
      
      for (let i = 0; i < sortedDates.length; i++) {
        if (i === 0) {
          tempStreak = 1;
        } else {
          const diffTime = sortedDates[i].getTime() - sortedDates[i - 1].getTime();
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            tempStreak++;
          } else {
            longestStreak = Math.max(longestStreak, tempStreak);
            tempStreak = 1;
          }
        }
      }
      longestStreak = Math.max(longestStreak, tempStreak);
      
      // Calculate totals
      const totalWords = entries.reduce((sum, entry) => sum + (entry.sessionData.wordCount || 0), 0);
      const totalMinutes = entries.reduce((sum, entry) => sum + (entry.sessionData.duration || 0), 0);
      
      // Weekly stats
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);
      const weekEntries = entries.filter(entry => localDateFromISO(entry.date) >= oneWeekAgo);
      const entriesThisWeek = weekEntries.length;
      const wordsThisWeek = weekEntries.reduce((sum, entry) => sum + (entry.sessionData.wordCount || 0), 0);
      const minutesThisWeek = weekEntries.reduce((sum, entry) => sum + (entry.sessionData.duration || 0), 0);
      
      // Framework usage
      const frameworkCounts: Record<string, number> = {};
      entries.forEach(entry => {
        if (entry.frameworkId) {
          frameworkCounts[entry.frameworkId] = (frameworkCounts[entry.frameworkId] || 0) + 1;
        } else if (entry.entryType !== 'custom') {
          // Use entryType as fallback for framework-specific entries
          frameworkCounts[entry.entryType] = (frameworkCounts[entry.entryType] || 0) + 1;
        }
      });
      
      const frameworkUsage = Object.entries(frameworkCounts).map(([id, count]) => ({
        frameworkId: id,
        frameworkName: t.entryTypes[id as EntryType]?.label || id,
        count,
        percentage: (count / entries.length) * 100,
      })).sort((a, b) => b.count - a.count);
      
      // Mood trends
      const moodTrends = entries.slice(-30).map(entry => ({
        date: entry.date,
        mood: entry.content.mood || { overall: 5, energy: 5, stress: 5, focus: 5 },
      }));
      
      // Goal progress
      const activeGoals = goals.filter(g => g.status === 'active').length;
      const completedGoals = goals.filter(g => g.status === 'completed').length;
      const goalCompletionRate = goals.length > 0 ? (completedGoals / goals.length) * 100 : 0;
      
      // Achievements
      const achievements = calculateAchievements(entries, currentStreak, goals, totalWords, t);
      
      const userProgress: UserProgress = {
        id: 'user-1',
        userId: 'user-1',
        overallStats: {
          totalEntries: entries.length,
          totalWords,
          totalMinutes,
          longestStreak,
          currentStreak,
          averageDailyEntries: 0,
          averageSessionDuration: entries.length > 0 ? Math.round(totalMinutes / entries.length) : 0,
        },
        frameworkUsage,
        moodTrends,
        goalProgress: {
          activeGoals,
          completedGoals,
          completionRate: goalCompletionRate,
          averageCompletionTime: 0,
        },
        periodicStats: {
          weekly: {
            entriesThisWeek,
            wordsThisWeek,
            minutesThisWeek,
            streakDays: currentStreak,
          },
          monthly: {
            entriesThisMonth: entries.length,
            wordsThisMonth: totalWords,
            minutesThisMonth: totalMinutes,
            completionRate: goalCompletionRate,
          },
        },
        achievements,
        updatedAt: new Date(),
      };
      
      setProgress(userProgress);
    } catch (error) {
      console.error('Error calculating progress:', error);
      setProgress(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateProgress();
  }, []);

  const refreshProgress = async () => {
    setLoading(true);
    await calculateProgress();
  };

  return (
    <ProgressContext.Provider value={{ progress, loading, refreshProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

function createEmptyProgress(): UserProgress {
  return {
    id: 'user-1',
    userId: 'user-1',
    overallStats: {
      totalEntries: 0,
      totalWords: 0,
      totalMinutes: 0,
      longestStreak: 0,
      currentStreak: 0,
      averageDailyEntries: 0,
      averageSessionDuration: 0,
    },
    frameworkUsage: [],
    moodTrends: [],
    goalProgress: {
      activeGoals: 0,
      completedGoals: 0,
      completionRate: 0,
      averageCompletionTime: 0,
    },
    periodicStats: {
      weekly: {
        entriesThisWeek: 0,
        wordsThisWeek: 0,
        minutesThisWeek: 0,
        streakDays: 0,
      },
      monthly: {
        entriesThisMonth: 0,
        wordsThisMonth: 0,
        minutesThisMonth: 0,
        completionRate: 0,
      },
    },
    achievements: [],
    updatedAt: new Date(),
  };
}

function getFrameworkName(id: string): string {
  const names: Record<string, string> = {
    expressive: 'Expressive Writing',
    cbt: 'CBT Thought Record',
    gratitude: 'Gratitude',
    self_compassion: 'Self-Compassion',
    stoic_morning: 'Stoic Morning',
    stoic_evening: 'Stoic Evening',
    confucian: 'Confucian Examination',
    zen: 'Zen Reflection',
    islamic: 'Islamic Muhasaba',
    vedanta: 'Vedanta Self-Inquiry',
    morning_pages: 'Morning Pages',
    custom: 'Custom',
  };
  return names[id] || id;
}

function calculateAchievements(entries: JournalEntry[], currentStreak: number, goals: Goal[], totalWords: number, t: { progress: { achievementList: Record<string, { title: string; description: string }> } }) {
  const list = t.progress.achievementList;
  const achievements = [
    {
      id: 'first_entry',
      title: list.first_entry.title,
      description: list.first_entry.description,
      icon: 'book' as const,
      unlockedAt: entries.length >= 1 ? new Date(entries[entries.length - 1].createdAt) : undefined,
    },
    {
      id: 'three_day_streak',
      title: list.three_day_streak.title,
      description: list.three_day_streak.description,
      icon: 'flame' as const,
      unlockedAt: currentStreak >= 3 ? new Date() : undefined,
    },
    {
      id: 'seven_day_streak',
      title: list.seven_day_streak.title,
      description: list.seven_day_streak.description,
      icon: 'flame' as const,
      unlockedAt: currentStreak >= 7 ? new Date() : undefined,
    },
    {
      id: 'writer_1000',
      title: list.writer_1000.title,
      description: list.writer_1000.description,
      icon: 'book' as const,
      unlockedAt: totalWords >= 1000 ? new Date() : undefined,
    },
    {
      id: 'goal_setter',
      title: list.goal_setter.title,
      description: list.goal_setter.description,
      icon: 'target' as const,
      unlockedAt: goals.length >= 1 ? new Date() : undefined,
    },
    {
      id: 'goal_achiever',
      title: list.goal_achiever.title,
      description: list.goal_achiever.description,
      icon: 'target' as const,
      unlockedAt: goals.some(g => g.status === 'completed') ? new Date() : undefined,
    },
    {
      id: 'explorer',
      title: list.explorer.title,
      description: list.explorer.description,
      icon: 'award' as const,
      unlockedAt: new Set(entries.map(e => e.entryType)).size >= 3 ? new Date() : undefined,
    },
    {
      id: 'monthly_dedication',
      title: list.monthly_dedication.title,
      description: list.monthly_dedication.description,
      icon: 'calendar' as const,
      unlockedAt: entries.length >= 30 ? new Date() : undefined,
    },
  ];

  return achievements;
}

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
