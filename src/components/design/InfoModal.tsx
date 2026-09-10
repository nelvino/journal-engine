'use client';

import React from 'react';
import { Button } from './Button';
import { useLanguage } from '@/context/LanguageContext';

interface InfoModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, title, onClose, children }) => {
  const { t } = useLanguage();
  const titleId = React.useId();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] p-4 flex items-center justify-center bg-ink/60">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-[430px] bg-paper-raised border border-ink p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <h2 id={titleId} className="font-serif text-[25px] leading-[30px] text-ink pr-4">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.common.close}
            className="w-9 h-9 flex items-center justify-center text-ink-caption hover:text-ink transition-colors duration-[var(--dur)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            ×
          </button>
        </div>
        <div className="font-serif text-[15px] leading-[23px] text-ink-secondary">
          {children}
        </div>
        <div className="mt-6">
          <Button variant="outline" className="w-full h-11" onClick={onClose}>
            {t.common.close}
          </Button>
        </div>
      </div>
    </div>
  );
};
