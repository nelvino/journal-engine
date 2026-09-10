'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { FieldLabel } from '@/components/ui/Input';
import { useLanguage } from '@/context/LanguageContext';

interface ConfucianExaminationProps {
  data: {
    loyaltyRating: number;
    loyaltyNotes?: string;
    trustworthinessRating: number;
    trustworthinessNotes?: string;
    practiceRating: number;
    practiceNotes?: string;
  };
  onChange: (data: ConfucianExaminationProps['data']) => void;
}

const dimensions = [
  {
    key: 'loyalty' as const,
    label: 'Loyalty / Devotion (忠, zhōng)',
    question: 'In what I have undertaken on behalf of others, have I done my best?',
    description: 'Based on Analects 1.4: "I examine myself on three things." This is a traditional Confucian practice of self-scrutiny, not a clinical intervention.',
  },
  {
    key: 'trustworthiness' as const,
    label: 'Trustworthiness (信, xìn)',
    question: 'In my dealings with friends and others, have I been trustworthy?',
    description: 'Confucius emphasizes trustworthiness as a core virtue. Self-rating here is for reflection, not diagnosis.',
  },
  {
    key: 'practice' as const,
    label: 'Practice / Learning (習, xí)',
    question: 'Have I practiced what I have learned and transmitted?',
    description: 'Confucian self-cultivation involves reviewing whether one applies what one learns.',
  },
] as const;

export const ConfucianExamination: React.FC<ConfucianExaminationProps> = ({ data, onChange }) => {
  const { t } = useLanguage();
  const updateField = <K extends keyof ConfucianExaminationProps['data']>(
    field: K,
    value: ConfucianExaminationProps['data'][K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>{t.frameworks.confucian.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-primary-50 rounded-xl text-sm text-primary-800">
          <p className="font-medium mb-1">{t.frameworks.confucian.source}</p>
          <p>{t.frameworks.confucian.quote}</p>
          <p className="mt-2 text-xs text-primary-700">
            {t.frameworks.confucian.citation}
          </p>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed">
          {t.frameworks.confucian.intro}
        </p>

        {dimensions.map((dimension) => {
          const ratingKey = `${dimension.key}Rating` as keyof ConfucianExaminationProps['data'];
          const notesKey = `${dimension.key}Notes` as keyof ConfucianExaminationProps['data'];
          
          return (
            <div key={dimension.key} className="space-y-3 p-4 bg-muted rounded-xl">
              <h4 className="font-medium text-card-foreground">{t.frameworks.confucian.dimensions[dimension.key].label}</h4>
              <p className="text-sm text-muted-foreground">{t.frameworks.confucian.dimensions[dimension.key].question}</p>
              <p className="text-xs text-muted-foreground">{t.frameworks.confucian.dimensions[dimension.key].description}</p>
              
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  {t.frameworks.confucian.rating}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={data[ratingKey] as number}
                  onChange={(e) => updateField(ratingKey, parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1</span>
                  <span>{data[ratingKey] as number}</span>
                  <span>10</span>
                </div>
              </div>

              <FieldLabel
                label={t.frameworks.confucian.reflection.label}
                hint={t.frameworks.confucian.reflection.hint}
                hasValue={((data[notesKey] as string) || '').trim().length > 0}
              />
              <textarea
                value={(data[notesKey] as string) || ''}
                onChange={(e) => updateField(notesKey, e.target.value || undefined)}
                placeholder={t.frameworks.confucian.reflection.placeholder}
                className="w-full min-h-[80px] px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
