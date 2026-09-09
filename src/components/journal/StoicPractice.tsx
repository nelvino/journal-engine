'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { FieldLabel } from '@/components/ui/Input';

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
        + Add another
      </button>
    </div>
  );

  const isMorning = data.type === 'morning_preparation';

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Stoic {isMorning ? 'Morning Preparation' : 'Evening Review'}</CardTitle>
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
            Morning
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
            Evening
          </button>
        </div>

        {isMorning ? (
          <>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Based on Stoic morning practice (premeditatio malorum): anticipate challenges you may face today and plan how you will respond with virtue.
            </p>

            {listField(
              'Challenges You May Face Today',
              data.challengesAnticipated || [],
              (items) => updateField('challengesAnticipated', items),
              'What difficulty might arise today?'
            )}

            {listField(
              'Virtuous Responses',
              data.virtuousResponses || [],
              (items) => updateField('virtuousResponses', items),
              'How will you respond with wisdom, courage, justice, or temperance?'
            )}
          </>
        ) : (
          <>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Based on Stoic evening review: reflect on your day with honesty, noting what went well, what did not, and what you can learn.
            </p>

            {listField(
              'Successes',
              data.successes || [],
              (items) => updateField('successes', items),
              'What did you do well today?'
            )}

            {listField(
              'Failures or Missed Opportunities',
              data.failures || [],
              (items) => updateField('failures', items),
              'Where did you fall short of your values?'
            )}

            <div>
              <FieldLabel
                label="Lessons for Tomorrow"
                hint="What will you do differently tomorrow?"
                hasValue={(data.lessons || '').trim().length > 0}
              />
              <textarea
                value={data.lessons || ''}
                onChange={(e) => updateField('lessons', e.target.value || undefined)}
                placeholder="What will you do differently tomorrow?"
                className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
