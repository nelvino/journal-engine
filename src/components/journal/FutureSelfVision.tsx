'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { FieldLabel } from '@/components/ui/Input';
import { useLanguage } from '@/context/LanguageContext';

interface FutureSelfVisionProps {
  data: {
    presentState: string;
    threeMonthVision: string;
    sixMonthVision: string;
    twelveMonthVision: string;
    obstacles: string;
    supportNeeded: string;
    weeklyAction: string;
  };
  onChange: (data: FutureSelfVisionProps['data']) => void;
}

const fields = [
  {
    key: 'presentState' as const,
    label: 'Where are you right now?',
    placeholder: 'Describe your current situation honestly. What is working and what feels stuck?',
    minHeight: '100px',
  },
  {
    key: 'threeMonthVision' as const,
    label: '3-Month Future Self',
    placeholder: 'Imagine yourself 3 months from now. What has changed? How do you feel? What are you doing?',
    minHeight: '120px',
  },
  {
    key: 'sixMonthVision' as const,
    label: '6-Month Future Self',
    placeholder: 'Look further ahead. What milestones have you reached? What kind of person are you becoming?',
    minHeight: '120px',
  },
  {
    key: 'twelveMonthVision' as const,
    label: '12-Month Future Self',
    placeholder: 'One year from today. What does your life look like? Be specific but flexible. This is a direction, not a contract.',
    minHeight: '120px',
  },
  {
    key: 'obstacles' as const,
    label: 'Likely Obstacles',
    placeholder: 'What might get in the way? Naming obstacles in advance makes them easier to navigate.',
    minHeight: '100px',
  },
  {
    key: 'supportNeeded' as const,
    label: 'Support You Will Need',
    placeholder: 'People, habits, resources, or mindset shifts that will help you move toward this vision.',
    minHeight: '100px',
  },
  {
    key: 'weeklyAction' as const,
    label: 'One Action This Week',
    placeholder: 'What is one small, concrete step you can take this week? (Keep it tiny and doable.)',
    minHeight: '80px',
  },
] as const;

export const FutureSelfVision: React.FC<FutureSelfVisionProps> = ({ data, onChange }) => {
  const { t } = useLanguage();
  const updateField = <K extends keyof FutureSelfVisionProps['data']>(
    field: K,
    value: FutureSelfVisionProps['data'][K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>{t.frameworks.future_self.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-accent-50 rounded-xl text-sm text-accent-800">
          <p className="font-medium mb-1">Why this works</p>
          <p>
            Future-self writing combines expressive writing with goal-directed visualization. 
            Studies on <strong>mental contrasting</strong> (Oettingen, 2014) and <strong>implementation intentions</strong> (Gollwitzer, 1999) 
            suggest that vividly imagining a desired future while also acknowledging present obstacles can increase motivation and planning.
          </p>
          <p className="mt-2 text-xs text-accent-700">
            Oettingen, G. (2014). <em>Rethinking Positive Thinking: Inside the New Science of Motivation</em>. Current Press.
            Gollwitzer, P. M. (1999). Implementation intentions: Strong effects of simple plans. <em>American Psychologist</em>, 54(7), 493–503.
          </p>
          <p className="mt-2 text-xs text-accent-700">
            Note: Visualization alone is not a guarantee of outcomes. Pair it with concrete actions, as you will do below.
          </p>
        </div>

        {fields.map((field) => (
          <div key={field.key}>
            <FieldLabel
              label={t.frameworks.future_self.fields[field.key].label}
              hint={t.frameworks.future_self.fields[field.key].placeholder}
              hasValue={data[field.key].trim().length > 0}
            />
            <textarea
              value={data[field.key]}
              onChange={(e) => updateField(field.key, e.target.value)}
              placeholder={t.frameworks.future_self.fields[field.key].placeholder}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              style={{ minHeight: field.minHeight }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
