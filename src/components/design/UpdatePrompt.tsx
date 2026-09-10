'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ConfirmDialog } from '@/components/design/ConfirmDialog';

const VERSION_KEY = 'journal-app-version';

export const UpdatePrompt: React.FC = () => {
  const { t } = useLanguage();
  const [available, setAvailable] = useState(false);
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      try {
        const res = await fetch(`/version.json?ts=${Date.now()}`, { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        const latest = String(data?.version ?? '');
        const stored = localStorage.getItem(VERSION_KEY);
        if (latest && latest !== stored) {
          if (!mounted) return;
          setVersion(latest);
          setAvailable(true);
        }
      } catch {
        // No version.json yet — ignore.
      }
    };

    check();
    const id = setInterval(check, 5 * 60 * 1000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const apply = () => {
    if (version) {
      localStorage.setItem(VERSION_KEY, version);
    }
    window.location.reload();
  };

  return (
    <ConfirmDialog
      isOpen={available}
      title={t.appUpdate.title}
      message={t.appUpdate.message}
      cancelLabel={t.common.cancel}
      confirmLabel={t.appUpdate.now}
      onCancel={() => setAvailable(false)}
      onConfirm={apply}
    />
  );
};
