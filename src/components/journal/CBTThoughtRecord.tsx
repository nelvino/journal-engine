'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input, FieldLabel } from '@/components/ui/Input';
import { useLanguage } from '@/context/LanguageContext';

interface CBTThoughtRecordProps {
  data: {
    situation: string;
    automaticThoughts: string[];
    emotions: Array<{ name: string; intensity: number }>;
    evidenceFor: string[];
    evidenceAgainst: string[];
    balancedPerspective: string;
    finalEmotionRating: number;
  };
  onChange: (data: CBTThoughtRecordProps['data']) => void;
}

export const CBTThoughtRecord: React.FC<CBTThoughtRecordProps> = ({ data, onChange }) => {
  const { t } = useLanguage();
  const updateField = <K extends keyof CBTThoughtRecordProps['data']>(
    field: K,
    value: CBTThoughtRecordProps['data'][K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const addEmotion = () => {
    updateField('emotions', [...data.emotions, { name: '', intensity: 5 }]);
  };

  const updateEmotion = (index: number, updates: Partial<{ name: string; intensity: number }>) => {
    const updatedEmotions = [...data.emotions];
    updatedEmotions[index] = { ...updatedEmotions[index], ...updates };
    updateField('emotions', updatedEmotions);
  };

  const removeEmotion = (index: number) => {
    updateField('emotions', data.emotions.filter((_, i) => i !== index));
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
        {t.frameworks.cbt.addAnother}
      </button>
    </div>
  );

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>{t.frameworks.cbt.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <FieldLabel
            label={t.frameworks.cbt.fields.situation.label}
            hint={t.frameworks.cbt.fields.situation.placeholder}
            hasValue={data.situation.trim().length > 0}
          />
          <textarea
            value={data.situation}
            onChange={(e) => updateField('situation', e.target.value)}
            placeholder={t.frameworks.cbt.fields.situation.placeholder}
            className="w-full min-h-[100px] px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
          />
        </div>

        {listField(
          t.frameworks.cbt.fields.automaticThoughts.label,
          data.automaticThoughts,
          (items) => updateField('automaticThoughts', items),
          t.frameworks.cbt.fields.automaticThoughts.placeholder
        )}

        <div className="space-y-3">
          <label className="block text-sm font-medium text-card-foreground">{t.frameworks.cbt.fields.emotions.label}</label>
          {data.emotions.map((emotion, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
              <input
                type="text"
                value={emotion.name}
                onChange={(e) => updateEmotion(index, { name: e.target.value })}
                placeholder={t.frameworks.cbt.fields.emotions.emotionPlaceholder}
                className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={emotion.intensity}
                  onChange={(e) => updateEmotion(index, { intensity: parseInt(e.target.value) })}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground w-6">{emotion.intensity}</span>
              </div>
              <button
                type="button"
                onClick={() => removeEmotion(index)}
                className="px-2 py-1 text-error-600 hover:bg-error-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addEmotion}
            className="text-sm text-primary-700 hover:text-primary-800 font-medium transition-colors"
          >
            {t.frameworks.cbt.fields.emotions.addEmotion}
          </button>
        </div>

        {listField(
          t.frameworks.cbt.fields.evidenceFor.label,
          data.evidenceFor,
          (items) => updateField('evidenceFor', items),
          t.frameworks.cbt.fields.evidenceFor.placeholder
        )}

        {listField(
          t.frameworks.cbt.fields.evidenceAgainst.label,
          data.evidenceAgainst,
          (items) => updateField('evidenceAgainst', items),
          t.frameworks.cbt.fields.evidenceAgainst.placeholder
        )}

        <div>
          <FieldLabel
            label={t.frameworks.cbt.fields.balancedPerspective.label}
            hint={t.frameworks.cbt.fields.balancedPerspective.placeholder}
            hasValue={data.balancedPerspective.trim().length > 0}
          />
          <textarea
            value={data.balancedPerspective}
            onChange={(e) => updateField('balancedPerspective', e.target.value)}
            placeholder={t.frameworks.cbt.fields.balancedPerspective.placeholder}
            className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            {t.frameworks.cbt.fields.finalEmotionRating.label}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={data.finalEmotionRating}
            onChange={(e) => updateField('finalEmotionRating', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1</span>
            <span>{data.finalEmotionRating}</span>
            <span>10</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
