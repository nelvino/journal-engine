'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Pencil, X, Check, Trash2, MoreHorizontal } from 'lucide-react';
import { useStorage } from '@/lib/useStorage';
import { useLanguage } from '@/context/LanguageContext';
import { Shell } from '@/components/design/Shell';
import { Loading } from '@/components/design/Loading';
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
  const [draftParts, setDraftParts] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      storage.get<JournalEntry[]>('journal_entries'),
      storage.get<any>('user_settings'),
    ]).then(([loaded, settings]) => {
      setEntries(loaded || []);
      setEditOldEntries(settings?.editOldEntries ?? false);
    });
  }, [storage]);

  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [menuOpen]);

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
    setDraftParts(parts);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setDraftParts([]);
  };

  const handleChangePart = (index: number, value: string) => {
    setDraftParts((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSaveEdit = async () => {
    if (!entry) return;
    const text = draftParts.join('\n\n');
    const newWordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const updated = (entries || []).map((e) => {
      if (String(e.id) !== id) return e;
      const base = { ...e };
      base.content = { ...base.content, text };
      base.sessionData = base.sessionData
        ? { ...base.sessionData, wordCount: newWordCount, endTime: new Date() }
        : { duration: 0, startTime: new Date(), endTime: new Date(), wordCount: newWordCount };
      base.updatedAt = new Date();
      return base;
    });
    await storage.set('journal_entries', updated);
    setEntries(updated);
    setIsEditing(false);
    setDraftParts([]);
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
    return (
      <Shell>
        <Loading />
      </Shell>
    );
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
          <div className="flex items-center gap-2">
            {isEditing ? (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="h-11 flex items-center gap-2 font-sans text-[14px] text-ink hover:text-accent transition-colors duration-[var(--dur)]"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
                {t.common.cancel}
              </button>
            ) : (
              <button
                onClick={() => router.push('/pages')}
                className="h-11 flex items-center gap-2 font-sans text-[14px] text-ink hover:text-accent transition-colors duration-[var(--dur)]"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                {t.common.back}
              </button>
            )}
            {!isEditing && (
              <div ref={menuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="h-11 w-11 flex items-center justify-center text-ink-caption hover:text-ink transition-colors duration-[var(--dur)]"
                  aria-label={t.common.more}
                  title={t.common.more}
                >
                  <MoreHorizontal className="w-4 h-4" strokeWidth={1.5} />
                </button>
                {menuOpen && (
                  <div className="absolute top-full left-0 mt-1 min-w-[160px] bg-paper border border-ink z-50">
                    {editOldEntries && (
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          handleStartEdit();
                        }}
                        className="w-full h-10 px-4 flex items-center gap-3 font-sans text-[13px] text-ink hover:bg-paper-raised transition-colors duration-[var(--dur)]"
                      >
                        <Pencil className="w-4 h-4" strokeWidth={1.5} />
                        {t.common.edit}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        setShowDelete(true);
                      }}
                      className="w-full h-10 px-4 flex items-center gap-3 font-sans text-[13px] text-danger hover:bg-paper-raised transition-colors duration-[var(--dur)]"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                      {t.journal.list.deleteEntry}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {isEditing && (
            <button
              type="button"
              onClick={handleSaveEdit}
              className="h-11 flex items-center gap-2 font-sans text-[14px] text-accent hover:text-ink transition-colors duration-[var(--dur)]"
            >
              <Check className="w-4 h-4" strokeWidth={1.5} />
              {t.common.save}
            </button>
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
          <div className="space-y-8">
            {parts.map((_, i) => (
              <div key={i}>
                {questions[i] ? (
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption leading-4 mb-2">
                    {questions[i]}
                  </p>
                ) : null}
                <RuledField
                  value={draftParts[i] ?? parts[i]}
                  onChange={(e) => handleChangePart(i, e.target.value)}
                  minHeight={120}
                  placeholder={t.newEntry.startAnywhere}
                />
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-rule pt-4">
              <span className="font-sans text-[11px] leading-4 text-ink-caption">
                {draftParts.join(' ').trim().split(/\s+/).filter(Boolean).length} {t.common.words}
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
