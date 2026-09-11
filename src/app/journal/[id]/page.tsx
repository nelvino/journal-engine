'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Pencil, X, Check, Trash2 } from 'lucide-react';
import { useStorage } from '@/lib/useStorage';
import { useLanguage } from '@/context/LanguageContext';
import { Shell } from '@/components/design/Shell';
import { Button } from '@/components/design/Button';
import { RuledField } from '@/components/design/RuledField';
import { ConfirmDialog } from '@/components/design/ConfirmDialog';
import { localDateFromISO, toLocalISODate, getEntryDateISO } from '@/lib/utils';
import { getStylePrompts } from '@/lib/prompts';
import type { JournalEntry } from '@/types';

export default function ReaderPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const router = useRouter();
  const storage = useStorage();
  const [entries, setEntries] = useState<JournalEntry[] | null>(null);
  const [editOldEntries, setEditOldEntries] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    Promise.all([
      storage.get<JournalEntry[]>('journal_entries'),
      storage.get<any>('user_settings'),
    ]).then(([loaded, settings]) => {
      setEntries(loaded || []);
      setEditOldEntries(settings?.editOldEntries ?? false);
    });
  }, [storage]);

  const entry = useMemo(() => {
    return (entries || []).find((e) => String(e.id) === id);
  }, [entries, id]);

  const handleDelete = async () => {
    const updated = (entries || []).filter((e) => String(e.id) !== id);
    await storage.set('journal_entries', updated);
    setShowDelete(false);
    router.push('/pages');
  };

  const handleStartEdit = () => {
    setEditedText(entry?.content?.text || '');
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText('');
  };

  const handleSaveEdit = async () => {
    if (!entry) return;
    const newWordCount = editedText.trim().split(/\s+/).filter(Boolean).length;
    const updated = (entries || []).map((e) => {
      if (String(e.id) !== id) return e;
      const base = { ...e };
      base.content = { ...base.content, text: editedText };
      base.sessionData = base.sessionData
        ? { ...base.sessionData, wordCount: newWordCount, endTime: new Date() }
        : { duration: 0, startTime: new Date(), endTime: new Date(), wordCount: newWordCount };
      base.updatedAt = new Date();
      return base;
    });
    await storage.set('journal_entries', updated);
    setEntries(updated);
    setIsEditing(false);
    setEditedText('');
  };

  const prompts = useMemo(
    () => (entry ? getStylePrompts(entry.entryType, t) : []),
    [entry, t]
  );
  const parts = useMemo(
    () => (entry?.content?.text || '').split('\n\n'),
    [entry]
  );
  const questions = entry?.content?.questions ?? prompts.map((p) => p.label);

  if (entries === null) {
    return <div className="min-h-screen bg-paper" />;
  }

  if (!entry) {
    return (
      <Shell>
        <div>
          <p className="font-serif text-[17px] leading-[27px] text-ink-secondary mb-6">
            {t.common.search} not found.
          </p>
          <Button variant="outline" onClick={() => router.push('/pages')}>
            {t.common.back}
          </Button>
        </div>
      </Shell>
    );
  }

  const words =
    entry.sessionData?.wordCount ??
    entry.content?.text?.trim().split(/\s+/).filter(Boolean).length ??
    0;

  const date = localDateFromISO(getEntryDateISO(entry) ?? (typeof entry.date === 'string' ? entry.date : toLocalISODate(new Date())));
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();

  return (
    <Shell>
      <div className="min-h-screen bg-paper">
        <ConfirmDialog
        isOpen={showDelete}
        title={t.journal.list.deleteEntry}
        message={t.journal.list.deleteConfirm}
        cancelLabel={t.common.cancel}
        confirmLabel={t.journal.list.deleteEntry}
        onCancel={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />

      <div className="max-w-[430px] md:max-w-[720px] lg:max-w-[900px] mx-auto pb-12">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push('/pages')}
            className="h-11 flex items-center gap-2 font-sans text-[14px] text-ink hover:text-accent transition-colors duration-[var(--dur)]"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            {t.common.back}
          </button>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="h-11 w-11 flex items-center justify-center text-ink-caption hover:text-ink transition-colors duration-[var(--dur)]"
                aria-label={t.common.cancel}
                title={t.common.cancel}
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="h-11 w-11 flex items-center justify-center text-accent hover:text-ink transition-colors duration-[var(--dur)]"
                aria-label={t.common.save}
                title={t.common.save}
              >
                <Check className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {editOldEntries && (
                <button
                  type="button"
                  onClick={handleStartEdit}
                  className="h-11 w-11 flex items-center justify-center text-ink-caption hover:text-accent transition-colors duration-[var(--dur)]"
                  aria-label={t.common.edit}
                  title={t.common.edit}
                >
                  <Pencil className="w-4 h-4" strokeWidth={1.5} />
                </button>
              )}
              <button
                onClick={() => setShowDelete(true)}
                className="h-11 w-11 flex items-center justify-center text-ink-caption hover:text-danger transition-colors duration-[var(--dur)]"
                aria-label={t.journal.list.deleteEntry}
                title={t.journal.list.deleteEntry}
              >
                <Trash2 className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-[54px_1fr] items-start mb-8">
          <div className="flex flex-col justify-start pr-3">
            <span className="font-serif text-[17px] leading-[22px] text-ink">{day}</span>
            <span className="font-sans text-[9.5px] font-semibold uppercase tracking-[0.13em] text-ink-caption leading-3">
              {month}
            </span>
          </div>
          <div className="border-l border-rule pl-5">
            <h1 className="font-serif text-[28px] leading-[34px] text-ink mb-2">
              {t.entryTypes[entry.entryType]?.label || entry.entryType}
            </h1>
            <p className="font-sans text-[11px] leading-[16px] text-ink-caption">
              {words} {t.common.words}
              {entry.frameworkId ? ` · ${t.frameworks[entry.frameworkId]?.name || entry.frameworkId}` : ''}
            </p>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-6">
            <RuledField
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              minHeight={240}
              placeholder={t.newEntry.startAnywhere}
            />
            <div className="flex items-center justify-between border-t border-rule pt-4">
              <span className="font-sans text-[11px] leading-4 text-ink-caption">
                {editedText.trim().split(/\s+/).filter(Boolean).length} {t.common.words}
              </span>
              <span className="font-sans text-[11px] leading-4 text-ink-caption">
                {t.newEntry.autosaving}
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {parts.map((text, i) => (
              <div key={i}>
                {questions[i] ? (
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption leading-4 mb-2">
                    {questions[i]}
                  </p>
                ) : null}
                <p className="font-serif text-[17px] leading-[27px] text-ink-secondary whitespace-pre-wrap">
                  {text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </Shell>
  );
}
