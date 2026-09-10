'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { FieldLabel } from '@/components/ui/Input';
import { useLanguage } from '@/context/LanguageContext';

interface SelfCompassionProps {
  data: {
    stressfulEvent: string;
    commonHumanity: string;
    mindfulnessObservation: string;
    kindResponse: string;
  };
  onChange: (data: SelfCompassionProps['data']) => void;
}

const fields = [
  {
    key: 'stressfulEvent' as const,
    label: 'Stressful Event',
    placeholder: 'Describe a difficulty, mistake, or painful experience you are facing...',
    description: 'Identify the situation you want to work with, as you would in a self-compassion letter or journal exercise.',
    minHeight: '100px',
  },
  {
    key: 'mindfulnessObservation' as const,
    label: 'Mindfulness: Observe Without Judgment',
    placeholder: 'What thoughts and feelings are present? Can you notice them without suppressing or exaggerating them?',
    description: 'Neff (2003b) identifies mindfulness as the first component of self-compassion: balanced awareness of painful experiences.',
    minHeight: '120px',
  },
  {
    key: 'commonHumanity' as const,
    label: 'Common Humanity: You Are Not Alone',
    placeholder: 'How is this struggle part of the shared human experience? Who else might feel this way?',
    description: 'Self-compassion involves recognizing suffering as part of the human condition, not isolating. See Kristin Neff, Self-Compassion (2011).',
    minHeight: '120px',
  },
  {
    key: 'kindResponse' as const,
    label: 'Self-Kindness: What Would You Say to a Friend?',
    placeholder: 'What caring, supportive, and encouraging words would you offer yourself?',
    description: 'Neff describes self-kindness as extending the same warmth and understanding to oneself as to a good friend.',
    minHeight: '120px',
  },
] as const;

export const SelfCompassion: React.FC<SelfCompassionProps> = ({ data, onChange }) => {
  const { t } = useLanguage();
  const updateField = <K extends keyof SelfCompassionProps['data']>(
    field: K,
    value: SelfCompassionProps['data'][K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>{t.frameworks.self_compassion.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-accent-50 rounded-xl text-sm text-accent-800">
          <p className="font-medium mb-1">Evidence Base</p>
          <p>
            Kristin Neff's self-compassion model includes three interacting components: self-kindness, common humanity, and mindfulness.
            Research suggests self-compassion is associated with lower anxiety and depression and greater well-being, though effects vary by individual.
          </p>
          <p className="mt-2 text-xs text-accent-700">
            Neff, K. D. (2003). Self-compassion: An alternative conceptualization of a healthy attitude toward oneself. <em>Self and Identity</em>, 2(2), 85–101.
            See also Barnard, L. K., & Curry, J. F. (2011). Self-compassion: Conceptualizations, correlates, & interventions. <em>Review of General Psychology</em>.
          </p>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed">
          {t.frameworks.self_compassion.intro}
        </p>

        {fields.map((field) => (
          <div key={field.key}>
            <FieldLabel
              label={t.frameworks.self_compassion.fields[field.key].label}
              hint={t.frameworks.self_compassion.fields[field.key].placeholder}
              hasValue={data[field.key].trim().length > 0}
            />
            <p className="text-xs text-muted-foreground mb-2">{t.frameworks.self_compassion.fields[field.key].description}</p>
            <textarea
              value={data[field.key]}
              onChange={(e) => updateField(field.key, e.target.value)}
              placeholder={t.frameworks.self_compassion.fields[field.key].placeholder}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              style={{ minHeight: field.minHeight }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
