'use client';

import React, { useEffect, useState } from 'react';
import { useStorage } from '@/lib/useStorage';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/design/Button';

export const AppLockGate: React.FC = () => {
  const { t } = useLanguage();
  const storage = useStorage();
  const { addToast } = useToast();
  const [locked, setLocked] = useState(true);
  const [hasPin, setHasPin] = useState<boolean | null>(null);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'set' | 'enter'>('enter');
  const titleId = React.useId();
  const descId = React.useId();
  const inputId = React.useId();

  useEffect(() => {
    let mounted = true;
    Promise.all([
      storage.get<any>('user_settings'),
      storage.get<string>('app_lock_pin'),
    ]).then(([settings, pin]) => {
      if (!mounted) return;
      if (!settings?.appLock) {
        setLocked(false);
        setHasPin(null);
        return;
      }
      setHasPin(Boolean(pin));
      setMode(pin ? 'enter' : 'set');
      setLocked(true);
    });
    return () => {
      mounted = false;
    };
  }, [storage]);

  const handleSubmit = async () => {
    const code = input.trim();
    if (!/^\d{4,}$/.test(code)) return;

    if (mode === 'set') {
      await storage.set('app_lock_pin', code);
      setHasPin(true);
      setLocked(false);
      setInput('');
      return;
    }

    const saved = await storage.get<string>('app_lock_pin');
    if (saved === code) {
      setLocked(false);
      setInput('');
    } else {
      addToast(t.settings.appLockGate.wrongPasscode, 'error');
      setInput('');
    }
  };

  if (locked && hasPin !== null) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="fixed inset-0 z-[100] bg-paper flex items-center justify-center px-6"
      >
        <div className="w-full max-w-[430px]">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption leading-4 mb-2">
            {t.settings.appLock}
          </p>
          <h1 id={titleId} className="font-serif text-[30px] leading-[34px] text-ink mb-2">
            {mode === 'set' ? t.settings.appLockGate.setPasscode : t.settings.appLockGate.enterPasscode}
          </h1>
          <p id={descId} className="font-sans text-[13.5px] leading-[21px] text-ink-secondary mb-6">
            {t.settings.appLockGate.subtitle}
          </p>
          <input
            id={inputId}
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            autoFocus
            aria-describedby={descId}
            value={input}
            onChange={(e) => setInput(e.target.value.replace(/\D/g, ''))}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="w-full h-12 border border-ink bg-transparent px-4 font-sans text-[15px] text-ink mb-4 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleSubmit}
            disabled={input.length < 4}
          >
            {t.settings.appLockGate.unlock}
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
