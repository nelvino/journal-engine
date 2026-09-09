'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useStorage } from '@/lib/useStorage';
import type { Goal, GoalCategory, GoalTimeframe } from '@/types';

interface GoalContextType {
  goals: Goal[];
  loading: boolean;
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateGoal: (id: string, updates: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  completeGoal: (id: string) => Promise<void>;
  refreshGoals: () => Promise<void>;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

const STORAGE_KEY = 'goals';

export function GoalProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const storage = useStorage();

  const loadGoals = async () => {
    try {
      const loadedGoals = await storage.get<Goal[]>(STORAGE_KEY) || [];
      setGoals(loadedGoals);
    } catch (error) {
      console.error('Error loading goals:', error);
      setGoals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const saveGoals = async (updatedGoals: Goal[]) => {
    await storage.set(STORAGE_KEY, updatedGoals);
    setGoals(updatedGoals);
  };

  const addGoal = async (goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedGoals = [newGoal, ...goals];
    await saveGoals(updatedGoals);
  };

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id ? { ...goal, ...updates, updatedAt: new Date() } : goal
    );
    await saveGoals(updatedGoals);
  };

  const deleteGoal = async (id: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    await saveGoals(updatedGoals);
  };

  const completeGoal = async (id: string) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id
        ? {
            ...goal,
            status: 'completed' as const,
            completedAt: new Date(),
            progress: { ...goal.progress, current: goal.progress.target, percentage: 100 },
            updatedAt: new Date(),
          }
        : goal
    );
    await saveGoals(updatedGoals);
  };

  const refreshGoals = async () => {
    setLoading(true);
    await loadGoals();
  };

  return (
    <GoalContext.Provider value={{ goals, loading, addGoal, updateGoal, deleteGoal, completeGoal, refreshGoals }}>
      {children}
    </GoalContext.Provider>
  );
}

export const useGoals = () => {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
};
