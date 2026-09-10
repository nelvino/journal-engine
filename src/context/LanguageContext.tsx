'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useStorage } from '@/lib/useStorage';
import { Language, Translations, translations, defaultLanguage } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const storage = useStorage();
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  useEffect(() => {
    storage.get<Language>('language').then((saved) => {
      if (saved && (saved === 'en' || saved === 'es')) {
        setLanguageState(saved);
      }
    });
  }, [storage]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    storage.set('language', newLanguage);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    return { language: defaultLanguage, setLanguage: () => {}, t: translations[defaultLanguage] };
  }
  return context;
};
