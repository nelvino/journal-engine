'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useStorage } from '@/lib/useStorage';
import { useLanguage } from '@/context/LanguageContext';
import { toLocalISODate } from '@/lib/utils';
import type { JournalEntry, EntryType, Goal } from '@/types';

interface DailyRecommendation {
  entryType: EntryType;
  title: string;
  subtitle: string;
  prompt: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

interface GuidanceContextType {
  recommendation: DailyRecommendation | null;
  loading: boolean;
  refreshRecommendation: () => Promise<void>;
  dismissRecommendation: () => Promise<void>;
}

const GuidanceContext = createContext<GuidanceContextType | undefined>(undefined);

export function GuidanceProvider({ children }: { children: React.ReactNode }) {
  const [recommendation, setRecommendation] = useState<DailyRecommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const storage = useStorage();
  const { t } = useLanguage();

  const generateRecommendation = async () => {
    try {
      const [entriesData, goalsData] = await Promise.all([
        storage.get<JournalEntry[]>('journal_entries'),
        storage.get<Goal[]>('goals'),
      ]);
      const entries = entriesData || [];
      const goals = goalsData || [];

      const dismissed = await storage.get<string>('recommendation_dismissed_date');
      const today = toLocalISODate(new Date());
      if (dismissed === today) {
        setRecommendation(null);
        return;
      }

      const recommendation = buildRecommendation(entries, goals, t);
      setRecommendation(recommendation);
    } catch (error) {
      console.error('Error generating guidance:', error);
      setRecommendation(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateRecommendation();
  }, []);

  const refreshRecommendation = async () => {
    setLoading(true);
    await generateRecommendation();
  };

  const dismissRecommendation = async () => {
    const today = toLocalISODate(new Date());
    await storage.set('recommendation_dismissed_date', today);
    setRecommendation(null);
  };

  return (
    <GuidanceContext.Provider value={{ recommendation, loading, refreshRecommendation, dismissRecommendation }}>
      {children}
    </GuidanceContext.Provider>
  );
}

function buildRecommendation(entries: JournalEntry[], goals: Goal[], t: { guidance: { recommendations: Record<string, { title: string; subtitle: string; prompt: string; reason: string }> } }): DailyRecommendation {
  const now = new Date();
  const hour = now.getHours();
  const isMorning = hour >= 5 && hour < 12;
  const isEvening = hour >= 17 || hour < 5;

  const lastEntry = entries.length > 0 ? entries[0] : null;
  const lastMood = lastEntry?.content.mood?.overall || 5;
  const hasEntriesToday = entries.some(e => e.date === toLocalISODate(now));

  let entryType: EntryType = 'gratitude';
  let priority: 'high' | 'medium' | 'low' = 'low';

  if (isMorning && !hasEntriesToday) {
    entryType = 'stoic_morning';
    priority = 'high';
  } else if (isEvening && !hasEntriesToday) {
    entryType = 'stoic_evening';
    priority = 'high';
  } else if (lastMood <= 3) {
    entryType = 'self_compassion';
    priority = 'high';
  } else if (lastMood >= 8) {
    entryType = 'gratitude';
    priority = 'medium';
  } else if (goals.some(g => g.status === 'active')) {
    entryType = 'future_self';
    priority = 'medium';
  } else {
    const recentTypes = entries.slice(0, 5).map(e => e.entryType);
    if (!recentTypes.includes('cbt')) {
      entryType = 'expressive';
      priority = 'low';
    } else {
      entryType = 'gratitude';
      priority = 'low';
    }
  }

  const varietyGratitude = entryType === 'gratitude' && priority === 'low';
  const rec = t.guidance.recommendations[varietyGratitude ? 'gratitude_fallback' : entryType];

  if (!rec) {
    return {
      entryType,
      title: '',
      subtitle: '',
      prompt: '',
      reason: '',
      priority,
    };
  }

  return {
    entryType,
    ...rec,
    priority,
  };
}

export const useGuidance = () => {
  const context = useContext(GuidanceContext);
  if (context === undefined) {
    throw new Error('useGuidance must be used within a GuidanceProvider');
  }
  return context;
};
