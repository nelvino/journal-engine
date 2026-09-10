'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { FieldLabel } from '@/components/ui/Input';
import { useLanguage } from '@/context/LanguageContext';

interface ExpressiveWritingProps {
  data: {
    topic: string;
    emotionalDepth: number;
    catharsisRating: number;
  };
  onChange: (data: ExpressiveWritingProps['data']) => void;
}

export const ExpressiveWriting: React.FC<ExpressiveWritingProps> = ({ data, onChange }) => {
  const { t } = useLanguage();
  const updateField = <K extends keyof ExpressiveWritingProps['data']>(
    field: K,
    value: ExpressiveWritingProps['data'][K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>{t.frameworks.expressive.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-primary-50 rounded-xl text-sm text-primary-800">
          <p className="font-medium mb-1">Evidence Base</p>
          <p>
            Pennebaker and colleagues' expressive-writing paradigm typically involves writing about emotionally significant experiences for 15–20 minutes across 3–4 sessions. 
            Meta-analyses find small-to-moderate benefits for physical and psychological health, though effects are not universal and may be delayed.
          </p>
          <p className="mt-2 text-xs text-primary-700">
            Pennebaker, J. W., & Beall, S. K. (1986). Confronting a traumatic event: Toward an understanding of inhibition and disease. <em>Journal of Abnormal Psychology</em>, 95(3), 274–281.
            Frattaroli, J. (2006). Experimental disclosure and its moderators: A meta-analysis. <em>Psychological Bulletin</em>, 132(6), 823–865.
          </p>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed">
          Choose a topic that feels emotionally significant. Write continuously without worrying about grammar or style. 
          If you feel distressed, stop and consider speaking with a mental-health professional.
        </p>

        <div>
          <FieldLabel
            label={t.frameworks.expressive.fields.topic.label}
            hint={t.frameworks.expressive.fields.topic.placeholder}
            hasValue={data.topic.trim().length > 0}
          />
          <input
            type="text"
            value={data.topic}
            onChange={(e) => updateField('topic', e.target.value)}
            placeholder={t.frameworks.expressive.fields.topic.placeholder}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            {t.frameworks.expressive.fields.emotionalDepth.label}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={data.emotionalDepth}
            onChange={(e) => updateField('emotionalDepth', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{t.frameworks.expressive.fields.emotionalDepth.low}</span>
            <span>{data.emotionalDepth}</span>
            <span>{t.frameworks.expressive.fields.emotionalDepth.high}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            {t.frameworks.expressive.fields.catharsis.label}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={data.catharsisRating}
            onChange={(e) => updateField('catharsisRating', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{t.frameworks.expressive.fields.catharsis.low}</span>
            <span>{data.catharsisRating}</span>
            <span>{t.frameworks.expressive.fields.catharsis.high}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
