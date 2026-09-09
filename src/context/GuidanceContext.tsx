'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useStorage } from '@/lib/useStorage';
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

  const generateRecommendation = async () => {
    try {
      const [entriesData, goalsData] = await Promise.all([
        storage.get<JournalEntry[]>('journal_entries'),
        storage.get<Goal[]>('goals'),
      ]);
      const entries = entriesData || [];
      const goals = goalsData || [];

      const dismissed = await storage.get<string>('recommendation_dismissed_date');
      const today = new Date().toISOString().split('T')[0];
      if (dismissed === today) {
        setRecommendation(null);
        return;
      }

      const recommendation = buildRecommendation(entries, goals);
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
    const today = new Date().toISOString().split('T')[0];
    await storage.set('recommendation_dismissed_date', today);
    setRecommendation(null);
  };

  return (
    <GuidanceContext.Provider value={{ recommendation, loading, refreshRecommendation, dismissRecommendation }}>
      {children}
    </GuidanceContext.Provider>
  );
}

function buildRecommendation(entries: JournalEntry[], goals: Goal[]): DailyRecommendation {
  const now = new Date();
  const hour = now.getHours();
  const isMorning = hour >= 5 && hour < 12;
  const isEvening = hour >= 17 || hour < 5;

  const lastEntry = entries.length > 0 ? entries[0] : null;
  const lastMood = lastEntry?.content.mood?.overall || 5;
  const hasEntriesToday = entries.some(e => e.date === now.toISOString().split('T')[0]);

  // Default by time of day
  if (isMorning && !hasEntriesToday) {
    return {
      entryType: 'stoic_morning',
      title: 'Start your day with intention',
      subtitle: 'A 5-minute Stoic morning practice',
      prompt: 'What challenges might you face today? How would your best self respond with wisdom, courage, justice, and temperance?',
      reason: 'Morning preparation helps you anticipate the day and plan virtuous responses.',
      priority: 'high',
    };
  }

  if (isEvening && !hasEntriesToday) {
    return {
      entryType: 'stoic_evening',
      title: 'Review your day',
      subtitle: 'Honest evening reflection',
      prompt: 'What did you do well today? Where did you fall short? What will you do differently tomorrow?',
      reason: 'Evening review supports learning from the day without self-judgment.',
      priority: 'high',
    };
  }

  // Mood-based guidance
  if (lastMood <= 3) {
    return {
      entryType: 'self_compassion',
      title: 'Be kind to yourself',
      subtitle: 'A gentle self-compassion check-in',
      prompt: 'What is difficult right now? Imagine a friend going through this. What warm, supportive words would you offer them?',
      reason: 'Your recent mood has been low. Self-compassion can help reduce self-criticism and shame.',
      priority: 'high',
    };
  }

  if (lastMood >= 8) {
    return {
      entryType: 'gratitude',
      title: 'Capture the good',
      subtitle: 'Build on positive momentum',
      prompt: 'What are you grateful for today? Name one person, one experience, and one small thing.',
      reason: 'Your recent mood has been strong. Gratitude can help savor and reinforce positive moments.',
      priority: 'medium',
    };
  }

  // Goal-based guidance
  if (goals.some(g => g.status === 'active')) {
    return {
      entryType: 'future_self',
      title: 'Connect with your goals',
      subtitle: 'Future self visualization',
      prompt: 'Imagine yourself 3 months from now having made meaningful progress. What is one small step you can take this week?',
      reason: 'You have active goals. Future-self writing can strengthen motivation and planning.',
      priority: 'medium',
    };
  }

  // Variety-based guidance
  const recentTypes = entries.slice(0, 5).map(e => e.entryType);
  const typeCounts: Record<string, number> = {};
  recentTypes.forEach(t => { typeCounts[t] = (typeCounts[t] || 0) + 1; });

  if (!recentTypes.includes('cbt')) {
    return {
      entryType: 'expressive',
      title: 'Free-write today',
      subtitle: 'Clear your mind',
      prompt: 'Set a timer for 5 minutes and write continuously about whatever is on your mind. Do not worry about grammar or structure.',
      reason: 'Expressive writing can help process thoughts and feelings that are hard to name.',
      priority: 'low',
    };
  }

  return {
    entryType: 'gratitude',
    title: 'Gratitude moment',
    subtitle: 'A quick positive reflection',
    prompt: 'List three things you are grateful for right now, and briefly say why each matters to you.',
    reason: 'Gratitude practice is a simple, low-pressure way to maintain consistency.',
    priority: 'low',
  };
}

export const useGuidance = () => {
  const context = useContext(GuidanceContext);
  if (context === undefined) {
    throw new Error('useGuidance must be used within a GuidanceProvider');
  }
  return context;
};
