'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Shell } from '@/components/design/Shell';
import { Segmented } from '@/components/design/Segmented';
import { SelectRow } from '@/components/design/SelectRow';
import { Button } from '@/components/design/Button';
import { Switch } from '@/components/design/Switch';
import { ConfirmDialog } from '@/components/design/ConfirmDialog';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useOnboarding } from '@/context/OnboardingContext';
import { useStorage } from '@/lib/useStorage';
import { useToast } from '@/context/ToastContext';
import { localDateFromISO } from '@/lib/utils';
import { Download, HelpCircle, LogIn, LogOut, Trash2 } from 'lucide-react';
import type { JournalEntry } from '@/types';

const USER_DATA_KEYS = [
  'journal_entries',
  'intentions',
  'goals',
  'user_progress',
  'user_settings',
  'onboarding_completed',
  'recommendation_dismissed_date',
];

interface UserSettings {
  eveningReminder: boolean;
  morningPages: boolean;
  monthlyReread: boolean;
  hidePreviews: boolean;
  session: string;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b-2 border-ink pb-1 mb-4">
      <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption leading-4">
        {children}
      </h2>
    </div>
  );
}

function ToggleRow({
  label,
  caption,
  checked,
  onChange,
}: {
  label: string;
  caption: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  const id = React.useId();
  const captionId = `${id}-caption`;
  return (
    <div className="flex items-center justify-between border-b border-rule py-4">
      <div>
        <label htmlFor={id} className="block font-serif text-[19px] leading-[25px] text-ink">{label}</label>
        <p id={captionId} className="font-sans text-[11px] leading-[16px] text-ink-caption mt-0.5">{caption}</p>
      </div>
      <Switch id={id} checked={checked} onChange={onChange} aria-describedby={captionId} />
    </div>
  );
}

export default function YouPage() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { user, loginWithGoogle, logout } = useAuth();
  const { restartOnboarding } = useOnboarding();
  const storage = useStorage();
  const { addToast } = useToast();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showClear, setShowClear] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [eveningReminder, setEveningReminder] = useState(true);
  const [morningPages, setMorningPages] = useState(false);
  const [monthlyReread, setMonthlyReread] = useState(true);
  const [hidePreviews, setHidePreviews] = useState(false);
  const [session, setSession] = useState('10');

  useEffect(() => {
    Promise.all([
      storage.get<JournalEntry[]>('journal_entries'),
      storage.get<UserSettings>('user_settings'),
    ]).then(([loadedEntries, loadedSettings]) => {
      setEntries(loadedEntries || []);
      if (loadedSettings) {
        setEveningReminder(loadedSettings.eveningReminder ?? true);
        setMorningPages(loadedSettings.morningPages ?? false);
        setMonthlyReread(loadedSettings.monthlyReread ?? true);
        setHidePreviews(loadedSettings.hidePreviews ?? false);
        setSession(loadedSettings.session ?? '10');
      }
      setLoaded(true);
    });
  }, [storage]);

  useEffect(() => {
    if (!loaded) return;
    const settings: UserSettings = {
      eveningReminder,
      morningPages,
      monthlyReread,
      hidePreviews,
      session,
    };
    storage.set('user_settings', settings);
  }, [eveningReminder, morningPages, monthlyReread, hidePreviews, session, loaded, storage]);

  const writingSince = useMemo(() => {
    const oldest = entries[entries.length - 1];
    const since =
      user?.metadata?.creationTime ||
      (oldest ? oldest.date || oldest.createdAt : undefined);
    if (!since) return '';
    const d =
      typeof since === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(since)
        ? localDateFromISO(since)
        : new Date(since);
    return d.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [user, entries, language]);

  const handleExport = () => {
    const lines = entries.map((entry) => {
      const date = entry.date;
      const style = t.entryTypes[entry.entryType]?.label || entry.entryType;
      const words = entry.sessionData?.wordCount ?? 0;
      const text = entry.content?.text || '';
      return `${date} — ${style} — ${words} words\n\n${text}`;
    });
    const txt = lines.join('\n\n---\n\n');

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `journal-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const w = window.open('', '_blank');
    if (w) {
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>Journal export</title><style>body{font-family:Newsreader,serif;line-height:1.6;max-width:680px;margin:40px auto;padding:0 20px;}h1{font-size:28px;margin-bottom:24px;}p{margin:0 0 12px;}.entry{margin-bottom:32px;page-break-inside:avoid;}.meta{font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#666;margin-bottom:8px;}.text{white-space:pre-wrap;font-size:16px;}</style></head><body><h1>Journal export</h1>${lines
        .map(
          (l) =>
            `<div class="entry"><p class="meta">${l.split('\n')[0]}</p><p class="text">${l
              .split('\n')
              .slice(2)
              .join('\n')
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')}</p></div>`
        )
        .join('')}</body></html>`;
      w.document.write(html);
      w.document.close();
      w.print();
    }

    addToast('Export downloaded', 'success');
  };

  const handleClearData = async () => {
    try {
      await Promise.all(USER_DATA_KEYS.map((key) => storage.delete(key)));
      addToast(t.settings.clearModal.cleared, 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to clear data', 'error');
    } finally {
      setShowClear(false);
    }
  };

  const name = user?.displayName || '';

  return (
    <Shell>
      <ConfirmDialog
        isOpen={showClear}
        title={t.settings.clearModal.title}
        message={t.settings.clearModal.description}
        cancelLabel={t.common.cancel}
        confirmLabel={t.settings.clearModal.clearData}
        onCancel={() => setShowClear(false)}
        onConfirm={handleClearData}
      />

      <h1 className="font-serif text-[30px] leading-[34px] text-ink mb-2">{t.nav.you}</h1>
      {writingSince && (
        <p className="font-sans text-[15px] leading-[23px] text-ink-secondary mb-8">
          {name ? `${name} · ` : ''}
          {t.settings.writingSince.replace('{date}', writingSince)}
        </p>
      )}

      <div className="space-y-10">
        <section>
          <SectionHeading>{t.settings.readingAndWriting}</SectionHeading>
          <div className="mb-6">
            <h3 className="font-sans text-[11px] leading-4 uppercase tracking-[0.13em] text-ink-caption mb-3">
              {t.settings.language}
            </h3>
            <Segmented
              value={language}
              options={[
                { value: 'en', label: t.settings.english },
                { value: 'es', label: t.settings.spanish },
              ]}
              onChange={(v) => setLanguage(v as 'en' | 'es')}
            />
          </div>
        </section>

        <section>
          <SectionHeading>{t.settings.appearance}</SectionHeading>
          <SelectRow
            label={t.settings.theme}
            value={theme}
            onChange={(v) => setTheme(v as 'light' | 'dark' | 'system')}
            options={[
              { value: 'light', label: t.settings.light },
              { value: 'dark', label: t.settings.dark },
              { value: 'system', label: t.settings.system },
            ]}
          />
        </section>

        <section>
          <SectionHeading>{t.settings.defaultSession}</SectionHeading>
          <SelectRow
            label={t.settings.defaultSessionDuration}
            value={session}
            onChange={setSession}
            options={[
              { value: '5', label: `5 ${t.settings.minutes}` },
              { value: '10', label: `10 ${t.settings.minutes}` },
              { value: '15', label: `15 ${t.settings.minutes}` },
              { value: '20', label: `20 ${t.settings.minutes}` },
              { value: '30', label: `30 ${t.settings.minutes}` },
            ]}
          />
        </section>

        <section>
          <SectionHeading>{t.settings.reminders}</SectionHeading>
          <ToggleRow
            label={t.settings.eveningReminder}
            caption={t.settings.everyDayAt}
            checked={eveningReminder}
            onChange={setEveningReminder}
          />
          <ToggleRow
            label={t.settings.morningPages}
            caption={t.settings.morningPagesDescription}
            checked={morningPages}
            onChange={setMorningPages}
          />
          <ToggleRow
            label={t.settings.monthlyReread}
            caption={t.settings.lastDayOfMonth}
            checked={monthlyReread}
            onChange={setMonthlyReread}
          />
        </section>

        <section>
          <SectionHeading>{t.settings.privacy}</SectionHeading>
          <ToggleRow
            label={t.settings.hideEntryTextInPreviews}
            caption={t.settings.titlesOnlyOnPagesList}
            checked={hidePreviews}
            onChange={setHidePreviews}
          />
        </section>

        <section>
          <SectionHeading>{t.settings.account}</SectionHeading>
          <div className="space-y-3">
            {user ? (
              <>
                <p className="font-sans text-[11px] leading-[16px] text-ink-caption">
                  {t.settings.signedInAs.replace('{email}', user.email ?? '')}
                </p>
                <Button
                  variant="outline"
                  className="w-full h-14 inline-flex items-center justify-center gap-2"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" strokeWidth={1.5} />
                  {t.settings.signOut}
                </Button>
              </>
            ) : (
              <>
                <p className="font-sans text-[11px] leading-[16px] text-ink-caption">
                  {t.settings.signInDescription}
                </p>
                <Button
                  variant="dark"
                  className="w-full h-14 inline-flex items-center justify-center gap-2"
                  onClick={loginWithGoogle}
                >
                  <LogIn className="w-4 h-4" strokeWidth={1.5} />
                  {t.settings.signIn}
                </Button>
              </>
            )}
          </div>
        </section>

        <section>
          <SectionHeading>{t.settings.yourWriting}</SectionHeading>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-14 inline-flex items-center justify-center gap-2"
              onClick={handleExport}
            >
              <Download className="w-4 h-4" strokeWidth={1.5} />
              {t.settings.exportData}
            </Button>
            <Button
              variant="outline"
              className="w-full h-14 inline-flex items-center justify-center gap-2"
              onClick={restartOnboarding}
            >
              <HelpCircle className="w-4 h-4" strokeWidth={1.5} />
              {t.settings.replayOnboarding}
            </Button>
            <Button
              variant="outline"
              className="w-full h-14 text-danger border-danger hover:bg-paper-raised inline-flex items-center justify-center gap-2"
              onClick={() => setShowClear(true)}
            >
              <Trash2 className="w-4 h-4" strokeWidth={1.5} />
              {t.settings.deleteEverything}
            </Button>
            <p className="font-sans text-[11px] leading-[16px] text-ink-caption mt-2">
              {t.settings.clearDataWarning}
            </p>
          </div>
        </section>
      </div>
    </Shell>
  );
}
