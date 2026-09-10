'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { useStorage } from '@/lib/useStorage';
import { DailyPrompt } from '@/components/guidance/DailyPrompt';
import { Pen, Clock, Calendar, Trash2, Sun, Moon, Sparkles, Brain, Heart, ChevronRight } from 'lucide-react';
import type { JournalEntry, EntryType } from '@/types';

interface QuickStartJourney {
  id: string;
  title: string;
  description: string;
  entryType: EntryType;
  duration: string;
  icon: React.ReactNode;
  color: string;
}

export default function JournalPage() {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const storage = useStorage();

  useEffect(() => {
    const loadEntries = async () => {
      const loadedEntries = await storage.get<JournalEntry[]>('journal_entries') || [];
      setEntries(loadedEntries);
    };
    loadEntries();
  }, []);

  const deleteEntry = async (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    await storage.set('journal_entries', updatedEntries);
    setEntries(updatedEntries);
  };

  const quickStartJourneys: QuickStartJourney[] = [
    {
      id: 'morning_checkin',
      title: t.journal.quickStart.morning_checkin.title,
      description: t.journal.quickStart.morning_checkin.description,
      entryType: 'expressive',
      duration: t.journal.quickStart.morning_checkin.duration,
      icon: <Sun className="h-5 w-5" />,
      color: 'bg-warning-100 text-warning-700',
    },
    {
      id: 'process_difficult',
      title: t.journal.quickStart.process_difficult.title,
      description: t.journal.quickStart.process_difficult.description,
      entryType: 'cbt',
      duration: t.journal.quickStart.process_difficult.duration,
      icon: <Brain className="h-5 w-5" />,
      color: 'bg-secondary-100 text-secondary-700',
    },
    {
      id: 'future_vision',
      title: t.journal.quickStart.future_vision.title,
      description: t.journal.quickStart.future_vision.description,
      entryType: 'future_self',
      duration: t.journal.quickStart.future_vision.duration,
      icon: <Sparkles className="h-5 w-5" />,
      color: 'bg-accent-100 text-accent-700',
    },
    {
      id: 'evening_review',
      title: t.journal.quickStart.evening_review.title,
      description: t.journal.quickStart.evening_review.description,
      entryType: 'stoic_evening',
      duration: t.journal.quickStart.evening_review.duration,
      icon: <Moon className="h-5 w-5" />,
      color: 'bg-primary-100 text-primary-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-accent-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              {t.journal.title}
            </h1>
            <p className="text-muted-foreground">
              {t.journal.subtitle}
            </p>
          </div>

          {/* Daily Prompt */}
          <DailyPrompt />

          {/* Main Action */}
          <Link href="/journal/new" className="block">
            <Card variant="elevated" className="bg-gradient-to-br from-primary-100 to-accent-50 border-primary/30 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary rounded-xl text-primary-foreground shadow-md">
                      <Pen className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{t.journal.todaysEntry}</h2>
                      <p className="text-sm text-muted-foreground">{t.journal.todaysEntryDescription}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-primary-700 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Quick Start Journeys */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">{t.journal.quickStartTitle}</h2>
              <Link
                href="/journal/new"
                className="text-sm font-medium text-primary-700 hover:text-primary-900 flex items-center gap-1"
              >
                {t.journal.exploreAll} <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {quickStartJourneys.map((journey) => (
                <Link
                  key={journey.id}
                  href={`/journal/new?type=${journey.entryType}`}
                  className="group block"
                >
                  <Card variant="elevated" className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div className={`p-2.5 rounded-xl shrink-0 ${journey.color}`}>
                          {journey.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-card-foreground group-hover:text-primary-700 transition-colors">
                              {journey.title}
                            </h3>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {journey.duration}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {journey.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Entries */}
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t.journal.recentEntries}</CardTitle>
                {entries.length > 0 && (
                  <span className="text-sm text-muted-foreground">{t.journal.list.total.replace('{count}', String(entries.length))}</span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {entries.length === 0 ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center p-4 bg-muted rounded-2xl mb-4">
                    <Pen className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    {t.journal.list.emptyTitle}
                  </p>
                  <Link href="/journal/new" className="inline-block mt-4">
                    <Button variant="primary" size="sm" icon={<Pen className="h-4 w-4" />}>
                      {t.journal.startNewEntry}
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {entries.map((entry) => (
                    <div key={entry.id} className="p-4 border border-border rounded-xl hover:bg-muted transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-primary-700">{entry.entryType.replace(/_/g, ' ')}</span>
                            <span className="text-sm text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</span>
                            {entry.structuredData && (
                              <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                                {t.journal.list.structured}
                              </span>
                            )}
                          </div>
                          <p className="text-foreground line-clamp-3">{entry.content.text}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{entry.sessionData.wordCount} {t.journal.list.words}</span>
                            <span>{Math.floor(entry.sessionData.duration / 60)}m {entry.sessionData.duration % 60}s</span>
                            {entry.content.mood && <span>{t.journal.list.mood}: {entry.content.mood.overall}/10</span>}
                          </div>
                        </div>
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className="p-2 text-error-600 hover:bg-error-100 rounded-lg transition-colors"
                          aria-label={t.journal.list.deleteEntry}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
