'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { EntryType } from '@/types';
import { 
  PenLine, 
  Sparkles, 
  Brain, 
  Heart, 
  Sun, 
  Moon, 
  Scroll, 
  CloudSun, 
  MoonStar, 
  Feather,
  Target,
  MoreHorizontal
} from 'lucide-react';

interface EntryTypeOption {
  value: EntryType;
  label: string;
  description: string;
  useFor: string;
  icon: React.ReactNode;
  color: string;
}

export const entryTypeOptions: EntryTypeOption[] = [
  {
    value: 'expressive',
    label: 'Expressive Writing',
    description: 'Write freely about emotions, experiences, or anything on your mind.',
    useFor: 'Processing feelings, venting, self-discovery',
    icon: <PenLine className="h-5 w-5" />,
    color: 'bg-primary-100 text-primary-700',
  },
  {
    value: 'future_self',
    label: 'Future Self Vision',
    description: 'Imagine where you want to be in 3, 6, and 12 months.',
    useFor: 'Manifestation, goal setting, vision planning',
    icon: <Sparkles className="h-5 w-5" />,
    color: 'bg-accent-100 text-accent-700',
  },
  {
    value: 'cbt',
    label: 'CBT Thought Record',
    description: 'Challenge anxious or negative thoughts with evidence.',
    useFor: 'Anxiety, intrusive thoughts, cognitive reframing',
    icon: <Brain className="h-5 w-5" />,
    color: 'bg-secondary-100 text-secondary-700',
  },
  {
    value: 'gratitude',
    label: 'Gratitude',
    description: 'List what you are thankful for and why.',
    useFor: 'Shifting perspective, building appreciation',
    icon: <Heart className="h-5 w-5" />,
    color: 'bg-success-100 text-success-700',
  },
  {
    value: 'self_compassion',
    label: 'Self-Compassion',
    description: 'Treat yourself with the kindness you would give a friend.',
    useFor: 'Self-criticism, shame, difficult emotions',
    icon: <CloudSun className="h-5 w-5" />,
    color: 'bg-warning-100 text-warning-700',
  },
  {
    value: 'stoic_morning',
    label: 'Stoic Morning',
    description: 'Prepare for the day and plan virtuous responses.',
    useFor: 'Morning routine, anticipatory resilience',
    icon: <Sun className="h-5 w-5" />,
    color: 'bg-secondary-100 text-secondary-700',
  },
  {
    value: 'stoic_evening',
    label: 'Stoic Evening',
    description: 'Review the day honestly: successes, failures, lessons.',
    useFor: 'Evening reflection, daily review',
    icon: <Moon className="h-5 w-5" />,
    color: 'bg-secondary-100 text-secondary-700',
  },
  {
    value: 'confucian',
    label: 'Confucian Examination',
    description: 'Rate and reflect on loyalty, trustworthiness, and practice.',
    useFor: 'Character review, traditional self-examination',
    icon: <Scroll className="h-5 w-5" />,
    color: 'bg-primary-100 text-primary-700',
  },
  {
    value: 'zen',
    label: 'Zen Reflection',
    description: 'Observe thoughts and experiences with mindful awareness.',
    useFor: 'Mindfulness, present-moment awareness',
    icon: <Feather className="h-5 w-5" />,
    color: 'bg-accent-100 text-accent-700',
  },
  {
    value: 'islamic',
    label: 'Islamic Muhasaba',
    description: 'Self-accountability and spiritual review.',
    useFor: 'Spiritual reflection, accountability',
    icon: <MoonStar className="h-5 w-5" />,
    color: 'bg-secondary-100 text-secondary-700',
  },
  {
    value: 'vedanta',
    label: 'Vedanta Self-Inquiry',
    description: 'Ask "Who am I?" and explore the nature of self.',
    useFor: 'Deep self-inquiry, spiritual exploration',
    icon: <Target className="h-5 w-5" />,
    color: 'bg-accent-100 text-accent-700',
  },
  {
    value: 'morning_pages',
    label: 'Morning Pages',
    description: 'Three pages of stream-of-consciousness writing.',
    useFor: 'Creative unblocking, morning ritual',
    icon: <PenLine className="h-5 w-5" />,
    color: 'bg-primary-100 text-primary-700',
  },
  {
    value: 'custom',
    label: 'Custom',
    description: 'A blank entry with no specific framework.',
    useFor: 'Free writing, unstructured journaling',
    icon: <MoreHorizontal className="h-5 w-5" />,
    color: 'bg-muted text-muted-foreground',
  },
];

interface EntryTypeSelectorProps {
  value: EntryType;
  onChange: (value: EntryType) => void;
}

export const EntryTypeSelector: React.FC<EntryTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {entryTypeOptions.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'p-4 rounded-2xl border-2 text-left transition-all duration-200 hover:shadow-md',
              isSelected
                ? 'border-primary bg-primary-50'
                : 'border-border bg-card hover:border-primary-300'
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn('p-2 rounded-xl shrink-0', option.color)}>
                {option.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-card-foreground text-sm">{option.label}</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{option.description}</p>
                <p className="text-xs text-primary-700 mt-2 font-medium">{option.useFor}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
