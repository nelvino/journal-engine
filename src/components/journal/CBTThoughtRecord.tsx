'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input, FieldLabel } from '@/components/ui/Input';

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
        + Add another
      </button>
    </div>
  );

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>CBT Thought Record</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <FieldLabel
            label="Situation"
            hint="Describe what happened, where you were, and who was involved..."
            hasValue={data.situation.trim().length > 0}
          />
          <textarea
            value={data.situation}
            onChange={(e) => updateField('situation', e.target.value)}
            placeholder="Describe what happened, where you were, and who was involved..."
            className="w-full min-h-[100px] px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
          />
        </div>

        {listField(
          'Automatic Thoughts',
          data.automaticThoughts,
          (items) => updateField('automaticThoughts', items),
          'What thought went through your mind?'
        )}

        <div className="space-y-3">
          <label className="block text-sm font-medium text-card-foreground">Emotions & Intensity</label>
          {data.emotions.map((emotion, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
              <input
                type="text"
                value={emotion.name}
                onChange={(e) => updateEmotion(index, { name: e.target.value })}
                placeholder="Emotion (e.g., anxiety, sadness)"
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
            + Add emotion
          </button>
        </div>

        {listField(
          'Evidence For the Thought',
          data.evidenceFor,
          (items) => updateField('evidenceFor', items),
          'What evidence supports this thought?'
        )}

        {listField(
          'Evidence Against the Thought',
          data.evidenceAgainst,
          (items) => updateField('evidenceAgainst', items),
          'What evidence contradicts this thought?'
        )}

        <div>
          <FieldLabel
            label="Balanced Perspective"
            hint="Given the evidence for and against, what is a more balanced way to view this situation?"
            hasValue={data.balancedPerspective.trim().length > 0}
          />
          <textarea
            value={data.balancedPerspective}
            onChange={(e) => updateField('balancedPerspective', e.target.value)}
            placeholder="Given the evidence for and against, what is a more balanced way to view this situation?"
            className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Final Emotion Rating (1-10)
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
