'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { FieldLabel } from '@/components/ui/Input';
import { useLanguage } from '@/context/LanguageContext';

interface GratitudeEntryProps {
  data: {
    items: Array<{
      text: string;
      type: 'person' | 'experience' | 'opportunity' | 'thing';
      detail?: string;
    }>;
    recipient?: string;
  };
  onChange: (data: GratitudeEntryProps['data']) => void;
}

const gratitudeTypes = [
  { value: 'person', label: 'Person' },
  { value: 'experience', label: 'Experience' },
  { value: 'opportunity', label: 'Opportunity' },
  { value: 'thing', label: 'Thing' },
] as const;

export const GratitudeEntry: React.FC<GratitudeEntryProps> = ({ data, onChange }) => {
  const { t } = useLanguage();
  const updateField = <K extends keyof GratitudeEntryProps['data']>(
    field: K,
    value: GratitudeEntryProps['data'][K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const addItem = () => {
    updateField('items', [...data.items, { text: '', type: 'thing', detail: '' }]);
  };

  const updateItem = (index: number, updates: Partial<{ text: string; type: 'person' | 'experience' | 'opportunity' | 'thing'; detail: string }>) => {
    const updatedItems = [...data.items];
    updatedItems[index] = { ...updatedItems[index], ...updates };
    updateField('items', updatedItems);
  };

  const removeItem = (index: number) => {
    updateField('items', data.items.filter((_, i) => i !== index));
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>{t.frameworks.gratitude.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t.frameworks.gratitude.intro}
        </p>

        {data.items.map((item, index) => (
          <div key={index} className="p-4 bg-muted rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-card-foreground">{t.frameworks.gratitude.item.title}{index + 1}</span>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="px-2 py-1 text-error-600 hover:bg-error-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <input
              type="text"
              value={item.text}
              onChange={(e) => updateItem(index, { text: e.target.value })}
              placeholder={t.frameworks.gratitude.item.placeholder}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />

            <select
              value={item.type}
              onChange={(e) => updateItem(index, { type: e.target.value as typeof item.type })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
            >
              {gratitudeTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {t.frameworks.gratitude.types[type.value]}
                </option>
              ))}
            </select>

            <textarea
              value={item.detail || ''}
              onChange={(e) => updateItem(index, { detail: e.target.value })}
              placeholder={t.frameworks.gratitude.item.detailPlaceholder}
              className="w-full min-h-[80px] px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="w-full py-3 border-2 border-dashed border-primary rounded-xl text-primary-700 font-medium hover:bg-primary-50 transition-colors"
        >
          {t.frameworks.gratitude.addItem}
        </button>

        <div>
          <FieldLabel
            label={t.frameworks.gratitude.recipient.label}
            hint={t.frameworks.gratitude.recipient.hint}
            hasValue={(data.recipient || '').trim().length > 0}
          />
          <input
            type="text"
            value={data.recipient || ''}
            onChange={(e) => updateField('recipient', e.target.value || undefined)}
            placeholder={t.frameworks.gratitude.recipient.placeholder}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </CardContent>
    </Card>
  );
};
