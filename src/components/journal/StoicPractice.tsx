'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { FieldLabel } from '@/components/ui/Input';
import { useLanguage } from '@/context/LanguageContext';

interface StoicPracticeProps {
  data: {
    type: 'morning_preparation' | 'evening_review';
    challengesAnticipated?: string[];
    virtuousResponses?: string[];
    successes?: string[];
    failures?: string[];
    lessons?: string;
  };
  onChange: (data: StoicPracticeProps['data']) => void;
}

export const StoicPractice: React.FC<StoicPracticeProps> = ({ data, onChange }) => {
  const { t } = useLanguage();
  const updateField = <K extends keyof StoicPracticeProps['data']>(
    field: K,
    value: StoicPracticeProps['data'][K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const listField = (
    label: string,
    items: string[],
    onItemsChange: (items: string[]) => void,
    placeholder: string
  ) => (
    <div className="space-y-2">
      <FieldLabel
        label={label}
        hint={placeholder}
        hasValue={items.some((item) => item.trim().length > 0)}
      />
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => {
              const newItems = [...items];
              newItems[index] = e.target.value;
              onItemsChange(newItems);
            }}
            placeholder={placeholder}
            className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <button
            type="button"
            onClick={() => onItemsChange(items.filter((_, i) => i !== index))}
            className="px-3 py-2 text-error-600 hover:bg-error-100 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onItemsChange([...items, ''])}
        className="text-sm text-primary-700 hover:text-primary-800 font-medium transition-colors"
      >
        {t.frameworks.stoic.addAnother}
      </button>
    </div>
  );

  const isMorning = data.type === 'morning_preparation';

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>{t.frameworks.stoic.title[isMorning ? 'morning' : 'evening']}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2 p-1 bg-muted rounded-xl">
          <button
            type="button"
            onClick={() => updateField('type', 'morning_preparation')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              isMorning
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.frameworks.stoic.morning}
          </button>
          <button
            type="button"
            onClick={() => updateField('type', 'evening_review')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              !isMorning
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.frameworks.stoic.evening}
          </button>
        </div>

        {isMorning ? (
          <>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t.frameworks.stoic.intro.morning}
            </p>

            {listField(
              t.frameworks.stoic.fields.challengesAnticipated.label,
              data.challengesAnticipated || [],
              (items) => updateField('challengesAnticipated', items),
              t.frameworks.stoic.fields.challengesAnticipated.placeholder
            )}

            {listField(
              t.frameworks.stoic.fields.virtuousResponses.label,
              data.virtuousResponses || [],
              (items) => updateField('virtuousResponses', items),
              t.frameworks.stoic.fields.virtuousResponses.placeholder
            )}
          </>
        ) : (
          <>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t.frameworks.stoic.intro.evening}
            </p>

            {listField(
              t.frameworks.stoic.fields.successes.label,
              data.successes || [],
              (items) => updateField('successes', items),
              t.frameworks.stoic.fields.successes.placeholder
            )}

            {listField(
              t.frameworks.stoic.fields.failures.label,
              data.failures || [],
              (items) => updateField('failures', items),
              t.frameworks.stoic.fields.failures.placeholder
            )}

            <div>
              <FieldLabel
                label={t.frameworks.stoic.fields.lessons.label}
                hint={t.frameworks.stoic.fields.lessons.placeholder}
                hasValue={(data.lessons || '').trim().length > 0}
              />
              <textarea
                value={data.lessons || ''}
                onChange={(e) => updateField('lessons', e.target.value || undefined)}
                placeholder={t.frameworks.stoic.fields.lessons.placeholder}
                className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
