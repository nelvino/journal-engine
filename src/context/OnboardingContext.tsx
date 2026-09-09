'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useStorage } from '@/lib/useStorage';

interface OnboardingContextType {
  showOnboarding: boolean;
  completeOnboarding: () => Promise<void>;
  restartOnboarding: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const storage = useStorage();

  useEffect(() => {
    const check = async () => {
      const completed = await storage.get<boolean>('onboarding_completed');
      setShowOnboarding(!completed);
      setLoaded(true);
    };
    check();
  }, []);

  const completeOnboarding = async () => {
    await storage.set('onboarding_completed', true);
    setShowOnboarding(false);
  };

  const restartOnboarding = async () => {
    await storage.set('onboarding_completed', false);
    setShowOnboarding(true);
  };

  if (!loaded) return null;

  return (
    <OnboardingContext.Provider value={{ showOnboarding, completeOnboarding, restartOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
