'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { useLanguage } from '@/context/LanguageContext';
import { frameworks } from '@/data/frameworks';
import { useStorage } from '@/lib/useStorage';
import { CBTThoughtRecord } from '@/components/journal/CBTThoughtRecord';
import { GratitudeEntry } from '@/components/journal/GratitudeEntry';
import { StoicPractice } from '@/components/journal/StoicPractice';
import { ConfucianExamination } from '@/components/journal/ConfucianExamination';
import { SelfCompassion } from '@/components/journal/SelfCompassion';
import { ExpressiveWriting } from '@/components/journal/ExpressiveWriting';
import { FutureSelfVision } from '@/components/journal/FutureSelfVision';
import { EntryTypeSelector, entryTypeOptions } from '@/components/journal/EntryTypeSelector';
import { FrameworkInfo } from '@/components/journal/FrameworkInfo';
import type { JournalEntry, EntryType, MoodRating } from '@/types';
import { Clock, Save, X, ChevronRight, ChevronLeft, Search, Sparkles } from 'lucide-react';

const defaultCBTData = {
  situation: '',
  automaticThoughts: [''],
  emotions: [{ name: '', intensity: 5 }],
  evidenceFor: [''],
  evidenceAgainst: [''],
  balancedPerspective: '',
  finalEmotionRating: 5,
};

const defaultGratitudeData: { items: Array<{ text: string; type: 'person' | 'experience' | 'opportunity' | 'thing'; detail?: string }>; recipient?: string } = {
  items: [{ text: '', type: 'thing', detail: '' }],
  recipient: undefined,
};

const defaultStoicData: { type: 'morning_preparation' | 'evening_review'; challengesAnticipated?: string[]; virtuousResponses?: string[]; successes?: string[]; failures?: string[]; lessons?: string } = {
  type: 'morning_preparation',
  challengesAnticipated: [''],
  virtuousResponses: [''],
  successes: [''],
  failures: [''],
  lessons: '',
};

const defaultConfucianData = {
  loyaltyRating: 5,
  trustworthinessRating: 5,
  practiceRating: 5,
};

const defaultSelfCompassionData = {
  stressfulEvent: '',
  commonHumanity: '',
  mindfulnessObservation: '',
  kindResponse: '',
};

const defaultExpressiveData = {
  topic: '',
  emotionalDepth: 5,
  catharsisRating: 5,
};

const defaultFutureSelfData = {
  presentState: '',
  threeMonthVision: '',
  sixMonthVision: '',
  twelveMonthVision: '',
  obstacles: '',
  supportNeeded: '',
  weeklyAction: '',
};

const defaultMood = {
  overall: 5,
  energy: 5,
  stress: 5,
  focus: 5,
};

const topEntryTypeValues: EntryType[] = ['expressive', 'future_self', 'cbt', 'gratitude'];

function NewEntryPageContent() {
  const { t } = useLanguage();
  const storage = useStorage();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') as EntryType | null;
  
  const validEntryTypes: EntryType[] = ['expressive', 'future_self', 'cbt', 'gratitude', 'self_compassion', 'stoic_morning', 'stoic_evening', 'confucian', 'zen', 'islamic', 'vedanta', 'morning_pages', 'custom'];
  const initialEntryType = typeParam && validEntryTypes.includes(typeParam) ? typeParam : 'expressive';
  
  const [step, setStep] = useState(1);
  const [entryType, setEntryType] = useState<EntryType>(initialEntryType);
  const [frameworkId, setFrameworkId] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodRating>(defaultMood);
  const [wordCount, setWordCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [sessionStart, setSessionStart] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllTypes, setShowAllTypes] = useState(false);
  
  const [cbtData, setCbtData] = useState(defaultCBTData);
  const [gratitudeData, setGratitudeData] = useState(defaultGratitudeData);
  const [stoicData, setStoicData] = useState(defaultStoicData);
  const [confucianData, setConfucianData] = useState(defaultConfucianData);
  const [selfCompassionData, setSelfCompassionData] = useState(defaultSelfCompassionData);
  const [expressiveData, setExpressiveData] = useState(defaultExpressiveData);
  const [futureSelfData, setFutureSelfData] = useState(defaultFutureSelfData);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  const selectedEntryTypeOption = entryTypeOptions.find(o => o.value === entryType) || entryTypeOptions[0];

  const filteredEntryTypes = entryTypeOptions.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    option.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    option.useFor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleEntryTypes = showAllTypes
    ? filteredEntryTypes
    : filteredEntryTypes.filter(option => topEntryTypeValues.includes(option.value));

  const buildStructuredData = () => {
    switch (entryType) {
      case 'cbt':
        return { cbtThoughtRecord: cbtData };
      case 'gratitude':
        return { gratitudeEntry: gratitudeData };
      case 'stoic_morning':
      case 'stoic_evening':
        return { stoicPractice: { ...stoicData, type: entryType === 'stoic_morning' ? 'morning_preparation' as const : 'evening_review' as const } };
      case 'confucian':
        return { confucianExamination: confucianData };
      case 'self_compassion':
        return { selfCompassion: selfCompassionData };
      case 'expressive':
        return { expressiveWriting: expressiveData };
      case 'future_self':
        return { futureSelfVision: futureSelfData };
      default:
        return undefined;
    }
  };

  const handleSave = async () => {
    if (!content.trim()) return;

    setIsSaving(true);
    
    try {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        userId: 'user-1',
        date: new Date().toISOString().split('T')[0],
        entryType,
        frameworkId: frameworkId || undefined,
        content: {
          text: content,
          mood,
          emotions: [],
          tags: [],
        },
        structuredData: buildStructuredData(),
        sessionData: {
          duration: Math.floor((Date.now() - sessionStart.getTime()) / 1000),
          startTime: sessionStart,
          endTime: new Date(),
          wordCount,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const existingEntries = await storage.get<JournalEntry[]>('journal_entries') || [];
      await storage.set('journal_entries', [entry, ...existingEntries]);

      resetForm();
      window.location.href = '/journal';
    } catch (error) {
      console.error('Error saving entry:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setContent('');
    setMood(defaultMood);
    setSessionStart(new Date());
    setCbtData(defaultCBTData);
    setGratitudeData(defaultGratitudeData);
    setStoicData(defaultStoicData);
    setConfucianData(defaultConfucianData);
    setSelfCompassionData(defaultSelfCompassionData);
    setExpressiveData(defaultExpressiveData);
    setFutureSelfData(defaultFutureSelfData);
  };

  const handleCancel = () => {
    window.location.href = '/journal';
  };

  const renderFrameworkForm = () => {
    switch (entryType) {
      case 'cbt':
        return <CBTThoughtRecord data={cbtData} onChange={setCbtData} />;
      case 'gratitude':
        return <GratitudeEntry data={gratitudeData} onChange={setGratitudeData} />;
      case 'stoic_morning':
      case 'stoic_evening':
        return <StoicPractice data={stoicData} onChange={setStoicData} />;
      case 'confucian':
        return <ConfucianExamination data={confucianData} onChange={setConfucianData} />;
      case 'self_compassion':
        return <SelfCompassion data={selfCompassionData} onChange={setSelfCompassionData} />;
      case 'expressive':
        return <ExpressiveWriting data={expressiveData} onChange={setExpressiveData} />;
      case 'future_self':
        return <FutureSelfVision data={futureSelfData} onChange={setFutureSelfData} />;
      default:
        return null;
    }
  };

  const renderStep1 = () => (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>What do you need today?</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Pick a journaling style. Each has guided prompts backed by research or tradition.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowAllTypes(true);
            }}
            placeholder="Search entry types..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {visibleEntryTypes.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setEntryType(option.value);
                setStep(2);
              }}
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 hover:shadow-md ${
                entryType === option.value
                  ? 'border-primary bg-primary-50'
                  : 'border-border bg-card hover:border-primary-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl shrink-0 ${option.color}`}>
                  {option.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-card-foreground text-sm">{option.label}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{option.description}</p>
                  <p className="text-xs text-primary-700 mt-2 font-medium">{option.useFor}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {!searchQuery && (
          <button
            type="button"
            onClick={() => setShowAllTypes(!showAllTypes)}
            className="w-full py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-primary hover:text-primary-700 transition-colors text-sm font-medium"
          >
            {showAllTypes ? 'Show only common options' : `Show all ${entryTypeOptions.length} entry types`}
          </button>
        )}
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-xl ${selectedEntryTypeOption.color}`}>
            {selectedEntryTypeOption.icon}
          </div>
          <div>
            <CardTitle>{selectedEntryTypeOption.label}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{selectedEntryTypeOption.description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-muted rounded-xl">
          <p className="text-sm text-card-foreground font-medium mb-1">Best used for:</p>
          <p className="text-sm text-muted-foreground">{selectedEntryTypeOption.useFor}</p>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="text-sm font-medium text-card-foreground">
              Apply a Research Framework (optional)
            </label>
            <FrameworkInfo framework={frameworks.find(f => f.id === frameworkId) || null} />
          </div>
          <Select
            value={frameworkId}
            onChange={setFrameworkId}
            options={[
              { value: '', label: 'No specific framework, just use the entry type' },
              ...frameworks.map(f => ({ value: f.id, label: f.name })),
            ]}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Frameworks add curated prompts from specific research or traditions. Most of the time, the entry type itself is enough. Tap the info icon once you select one to learn more.
          </p>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(1)} icon={<ChevronLeft className="h-4 w-4" />}>
            Back
          </Button>
          <Button variant="primary" onClick={() => setStep(3)} icon={<ChevronRight className="h-4 w-4" />}>
            Start Writing
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            {selectedEntryTypeOption.icon}
            {selectedEntryTypeOption.label}
          </h2>
          <p className="text-sm text-muted-foreground">{selectedEntryTypeOption.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setStep(2)} icon={<ChevronLeft className="h-4 w-4" />}>
            Back
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCancel} icon={<X className="h-4 w-4" />}>
            Cancel
          </Button>
        </div>
      </div>

      {/* Framework-specific Form */}
      {renderFrameworkForm()}

      {/* Content */}
      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Entry</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{wordCount} words</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your thoughts here..."
            className="w-full min-h-[300px] px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
          />
        </CardContent>
      </Card>

      {/* Mood Selection */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>How are you feeling?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(['overall', 'energy', 'stress', 'focus'] as const).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  {key === 'overall' ? 'Overall Mood' :
                   key === 'energy' ? 'Energy Level' :
                   key === 'stress' ? 'Stress Level' : 'Focus Level'}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={mood[key]}
                  onChange={(e) => setMood({ ...mood, [key]: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1</span>
                  <span>{mood[key]}</span>
                  <span>10</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSave}
          disabled={!content.trim() || isSaving}
          loading={isSaving}
          icon={<Save className="h-4 w-4" />}
        >
          Save Entry
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-accent-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                New Journal Entry
              </h1>
              <p className="text-muted-foreground">
                Step {step} of 3
              </p>
            </div>
            <Button variant="ghost" onClick={handleCancel} icon={<X className="h-4 w-4" />}>
              Cancel
            </Button>
          </div>

          {/* Step Progress */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </main>
    </div>
  );
}

export default function NewEntryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-accent-50 flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>}>
      <NewEntryPageContent />
    </Suspense>
  );
}
