'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { useStorage } from '@/lib/useStorage';
import { useToast } from '@/context/ToastContext';
import { frameworks } from '@/data/frameworks';
import { Button } from '@/components/design/Button';
import { TypeRow } from '@/components/design/TypeRow';
import { SelectRow } from '@/components/design/SelectRow';
import { RuledField } from '@/components/design/RuledField';
import { EvidenceBlock } from '@/components/design/EvidenceBlock';
import { ConfirmDialog } from '@/components/design/ConfirmDialog';
import type { JournalEntry, EntryType } from '@/types';
import { getStylePrompts, getWhyThisWorks } from '@/lib/prompts';

const validEntryTypes: EntryType[] = [
  'expressive',
  'future_self',
  'cbt',
  'gratitude',
  'self_compassion',
  'stoic_morning',
  'stoic_evening',
  'confucian',
  'zen',
  'islamic',
  'vedanta',
  'morning_pages',
  'bullet_journal',
  'custom',
];

function NewEntryContent() {
  const { t } = useLanguage();
  const router = useRouter();
  const storage = useStorage();
  const { addToast } = useToast();

  const [entryType, setEntryType] = useState<EntryType>('expressive');
  const [step, setStep] = useState(1);
  const [session, setSession] = useState('10');
  const [showLeave, setShowLeave] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const type = new URLSearchParams(window.location.search).get('type') as EntryType | null;
    if (type && validEntryTypes.includes(type)) {
      setEntryType(type);
    }
    storage.get<any>('user_settings').then((s) => {
      if (s?.session) setSession(String(s.session));
    });
  }, [storage]);

  const [frameworkId, setFrameworkId] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [wordCount, setWordCount] = useState(0);
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [sessionStart] = useState(new Date());

  const allTypes = useMemo(() => Object.keys(t.entryTypes) as EntryType[], [t.entryTypes]);

  const filteredTypes = useMemo(() => {
    let list = showAll ? allTypes : allTypes.slice(0, 4);
    const term = search.trim().toLowerCase();
    if (term) {
      list = allTypes.filter((type) => {
        const info = t.entryTypes[type];
        return (
          info.label.toLowerCase().includes(term) ||
          info.description.toLowerCase().includes(term) ||
          info.useFor.toLowerCase().includes(term)
        );
      });
    }
    return list;
  }, [allTypes, showAll, search, t.entryTypes]);

  const frameworkOptions = useMemo(
    () => [
      { value: '', label: t.newEntry.noFramework },
      ...frameworks.map((f) => ({ value: f.id, label: f.name })),
    ],
    [t.newEntry.noFramework]
  );

  const selectedFramework = useMemo(
    () => frameworks.find((f) => f.id === frameworkId),
    [frameworkId]
  );

  const promptFields = useMemo(
    () => getStylePrompts(entryType, t),
    [entryType, t]
  );

  const why = useMemo(
    () => getWhyThisWorks(entryType, selectedFramework, t),
    [entryType, selectedFramework, t]
  );

  useEffect(() => {
    const text = Object.values(answers).join(' ');
    setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
  }, [answers]);

  const updateAnswer = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    const hasDraft =
      Object.values(answers).some((v) => v.trim().length > 0) || step > 1;
    if (!hasDraft) {
      router.push('/');
      return;
    }
    setShowLeave(true);
  };

  const confirmLeave = () => {
    setShowLeave(false);
    router.push('/');
  };

  const handleSave = async () => {
    if (wordCount === 0) {
      addToast(t.newEntry.emptyError, 'error');
      return;
    }
    const answered = Object.entries(answers)
      .map(([key, value]) => ({ key: Number(key), value: value.trim() }))
      .filter(({ value }) => value.length > 0)
      .sort((a, b) => a.key - b.key);
    const text = answered.map((a) => a.value).join('\n\n');
    const questions = answered.map(
      (a) => promptFields[a.key]?.label || t.entryTypes[entryType].description
    );
    const now = new Date();
    const entry: JournalEntry = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      userId: '',
      date: now.toISOString().split('T')[0],
      entryType,
      frameworkId: frameworkId || undefined,
      content: { text, questions },
      sessionData: {
        duration: Math.max(0, Math.round((now.getTime() - sessionStart.getTime()) / 1000 / 60)),
        startTime: sessionStart,
        endTime: now,
        wordCount,
      },
      createdAt: now,
      updatedAt: now,
    };

    const existing = (await storage.get<JournalEntry[]>('journal_entries')) || [];
    await storage.set('journal_entries', [entry, ...existing]);
    addToast(t.newEntry.saveSuccess, 'success');
    router.push('/pages');
  };

  const progress = [1, 2, 3].map((s) => s <= step);

  return (
    <div className="min-h-screen bg-paper">
      <div className="w-full px-[26px] sm:px-[34px] md:px-0 pt-6 pb-32 md:pb-12 max-w-[430px] md:max-w-[620px] lg:max-w-[680px] mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="font-serif text-[30px] leading-[34px] text-ink mb-2">
              {t.newEntry.title}
            </h1>
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption leading-4 mb-3">
              {t.newEntry.stepOf.replace('{step}', String(step))} · {t.newEntry.defaultSession} {session} min
            </p>
            <div className="flex gap-1.5">
              {progress.map((filled, i) => (
                <div
                  key={i}
                  className={cn('h-0.5 flex-1', filled ? 'bg-accent' : 'bg-rule')}
                />
              ))}
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="shrink-0 h-11 font-sans text-[14px] leading-5 text-ink hover:text-accent transition-colors duration-[var(--dur)]"
          >
            × {t.common.cancel}
          </button>
        </div>

        {/* Step 1 — Choose a style */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-[40px] leading-[44px] text-ink mb-2">
                {t.newEntry.whatDoYouNeed}
              </h2>
              <p className="font-sans text-[13.5px] leading-[21px] text-ink-secondary">
                {t.newEntry.whatDoYouNeedDescription}
              </p>
            </div>

            <div className="border border-ink-decorative">
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="font-sans text-[15px] text-ink-decorative">×</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t.newEntry.searchPlaceholder}
                  className="flex-1 bg-transparent font-sans text-[15px] leading-5 text-ink placeholder:text-ink-decorative focus:outline-none"
                />
              </div>
            </div>

            <div className="divide-y divide-rule border-b border-rule">
              {filteredTypes.map((type, i) => (
                <TypeRow
                  key={type}
                  num={String(i + 1).padStart(2, '0')}
                  title={t.entryTypes[type].label}
                  description={t.entryTypes[type].description}
                  tags={t.entryTypes[type].useFor}
                  selected={entryType === type}
                  onClick={() => setEntryType(type)}
                />
              ))}
            </div>

            {!showAll && !search.trim() && filteredTypes.length < allTypes.length && (
              <button
                onClick={() => setShowAll(true)}
                className="w-full text-center font-sans text-[15px] text-accent-text py-4 border-b border-rule"
              >
                {t.newEntry.showAll.replace('{count}', String(allTypes.length))}
              </button>
            )}

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-paper border-t border-rule md:static md:border-0 md:p-0 md:mt-6 z-40">
              <div className="w-full max-w-[430px] sm:max-w-[430px] md:max-w-[680px] mx-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => setStep(2)}
                >
                  {t.newEntry.continue}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Confirm and add a framework */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-text leading-4 mb-1">
                {t.newEntry.chosenStyle}
              </p>
              <h2 className="font-serif text-[30px] leading-[34px] text-ink mb-2">
                {t.entryTypes[entryType].label}
              </h2>
              <p className="font-serif text-[17px] leading-[27px] text-ink-secondary">
                {t.entryTypes[entryType].description}
              </p>
            </div>

            <EvidenceBlock
              label={t.newEntry.bestUsedFor}
              claim={t.entryTypes[entryType].useFor}
            />

            <div>
              <SelectRow
                label={t.newEntry.applyFramework}
                value={frameworkId}
                onChange={setFrameworkId}
                options={frameworkOptions}
              />
              <p className="font-sans text-[11.5px] leading-[19px] text-ink-caption mt-2">
                {t.newEntry.frameworkHelp}
              </p>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-paper border-t border-rule md:static md:border-0 md:p-0 md:mt-6 z-40">
              <div className="flex gap-3 w-full max-w-[430px] sm:max-w-[430px] md:max-w-[680px] mx-auto">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                  {t.common.back}
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={() => setStep(3)}
                >
                  {t.newEntry.startWriting}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Write */}
        {step === 3 && (
          <div className="space-y-8">
            <h2 className="font-serif text-[25px] leading-[30px] text-ink">
              {t.entryTypes[entryType].label}
            </h2>

            <EvidenceBlock
              label={why.label}
              claim={why.claim}
              citation={why.citation}
              note={why.note}
            />

            <div className="space-y-6">
              {promptFields.map((field, i) => (
                <RuledField
                  key={i}
                  label={field.label}
                  hint={field.hint}
                  placeholder={t.newEntry.startAnywhere}
                  value={answers[String(i)] || ''}
                  onChange={(e) => updateAnswer(String(i), e.target.value)}
                  minHeight={88}
                />
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-rule pt-4">
              <span className="font-sans text-[11px] leading-4 text-ink-caption">
                {wordCount} {t.common.words}
              </span>
              <span className="font-sans text-[11px] leading-4 text-ink-caption">
                {t.newEntry.autosaving}
              </span>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-paper border-t border-rule md:static md:border-0 md:p-0 md:mt-6 z-40">
              <div className="flex gap-3 w-full max-w-[430px] sm:max-w-[430px] md:max-w-[680px] mx-auto">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                  {t.common.back}
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={handleSave}
                  disabled={wordCount === 0}
                >
                  {t.newEntry.save}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ConfirmDialog
        isOpen={showLeave}
        title={t.newEntry.leaveTitle}
        message={t.newEntry.leaveDraft}
        cancelLabel={t.common.cancel}
        confirmLabel={t.newEntry.leave}
        onCancel={() => setShowLeave(false)}
        onConfirm={confirmLeave}
      />
    </div>
  );
}

export default NewEntryContent;
