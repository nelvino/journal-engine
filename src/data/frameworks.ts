import { Framework } from '@/types';

export const frameworks: Framework[] = [
  {
    id: 'expressive-writing',
    name: 'Expressive Writing',
    slug: 'expressive-writing',
    description: 'Write about emotional experiences for 15-20 minutes over 3-4 consecutive days. Proven to improve immune function and mental health.',
    category: 'expressive_writing',
    origin: 'scientific',
    evidenceBase: {
      type: 'scientific',
      sources: [
        {
          title: 'Writing About Emotional Experiences as a Therapeutic Process',
          author: 'James W. Pennebaker',
          year: 1997,
          description: 'Seminal paper establishing expressive writing as a therapeutic intervention with proven health benefits.'
        }
      ],
      effectivenessRating: 8
    },
    protocol: {
      frequency: '3-4 consecutive days, repeat monthly',
      duration: '15-20 minutes per session',
      structure: [
        'Write continuously without concern for grammar',
        'Focus on deepest thoughts and feelings about a topic',
        'Choose an emotional experience or trauma',
        'Write for the full time period',
        'Repeat for 3-4 consecutive days'
      ]
    },
    promptIds: ['expressive-1', 'expressive-2', 'expressive-3'],
    difficulty: 'beginner',
    popular: true,
    featured: true,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09')
  },
  {
    id: 'cbt-journaling',
    name: 'CBT Journaling',
    slug: 'cbt-journaling',
    description: 'Structured writing practice from cognitive behavioral therapy to identify negative thoughts, examine evidence, and develop balanced perspectives.',
    category: 'cbt',
    origin: 'scientific',
    evidenceBase: {
      type: 'scientific',
      sources: [
        {
          title: 'Cognitive Therapy of Depression',
          author: 'Aaron T. Beck',
          year: 1979,
          description: 'Foundational text establishing CBT as an evidence-based treatment for depression and anxiety.'
        }
      ],
      effectivenessRating: 9
    },
    protocol: {
      frequency: 'Daily or as needed',
      duration: '10-15 minutes per entry',
      structure: [
        'Identify the situation (objective facts)',
        'Capture automatic thoughts',
        'Name and rate emotions (0-100)',
        'List evidence for and against thoughts',
        'Create balanced alternative perspective',
        'Re-rate emotions'
      ]
    },
    promptIds: ['cbt-1', 'cbt-2', 'cbt-3'],
    difficulty: 'intermediate',
    popular: true,
    featured: true,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09')
  },
  {
    id: 'gratitude-journaling',
    name: 'Gratitude Journaling',
    slug: 'gratitude-journaling',
    description: 'Regular practice of writing about things you are grateful for, proven to increase well-being and positive emotions.',
    category: 'gratitude',
    origin: 'scientific',
    evidenceBase: {
      type: 'scientific',
      sources: [
        {
          title: 'A meta-analysis of the effectiveness of gratitude interventions on well-being across cultures',
          year: 2026,
          description: 'Meta-analysis of 145 papers, 163 samples, 24,804 participants across 28 countries showing small but significant well-being increases.'
        }
      ],
      effectivenessRating: 7
    },
    protocol: {
      frequency: 'Daily',
      duration: '5-10 minutes',
      structure: [
        'Write 3-5 things you are grateful for',
        'Be specific and detailed',
        'Focus on people, experiences, opportunities',
        'Long-form letters more effective than lists'
      ]
    },
    promptIds: ['gratitude-1', 'gratitude-2', 'gratitude-3'],
    difficulty: 'beginner',
    popular: true,
    featured: true,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09')
  },
  {
    id: 'stoic-journaling',
    name: 'Stoic Journaling',
    slug: 'stoic-journaling',
    description: 'Morning preparation and evening review practice from Marcus Aurelius and other Stoic philosophers for virtuous living.',
    category: 'stoic',
    origin: 'ancient_greek',
    evidenceBase: {
      type: 'traditional',
      sources: [
        {
          title: 'Meditations',
          author: 'Marcus Aurelius',
          year: 180,
          description: 'Personal journal of Roman Emperor Marcus Aurelius, never intended for publication, containing Stoic reflections.'
        }
      ],
      effectivenessRating: 8
    },
    protocol: {
      frequency: 'Daily (morning and evening)',
      duration: '5-10 minutes each',
      structure: [
        'Morning: Anticipate challenges and prepare virtuous responses',
        'Evening: Review actions, identify successes and failures',
        'Focus on what is within your control',
        'Practice negative visualization',
        'Remember mortality (memento mori)'
      ]
    },
    promptIds: ['stoic-morning-1', 'stoic-morning-2', 'stoic-evening-1', 'stoic-evening-2'],
    difficulty: 'intermediate',
    popular: true,
    featured: true,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09')
  },
  {
    id: 'confucian-examination',
    name: 'Confucian Self-Examination',
    slug: 'confucian-examination',
    description: 'Daily practice of 吾日三省吾身 - examining oneself three times daily for moral cultivation.',
    category: 'confucian',
    origin: 'chinese',
    evidenceBase: {
      type: 'traditional',
      sources: [
        {
          title: 'Analects',
          author: 'Confucius',
          year: -500,
          description: 'Foundational Confucian text containing the three daily examinations practice.'
        }
      ],
      effectivenessRating: 7
    },
    protocol: {
      frequency: 'Daily',
      duration: '5-10 minutes',
      structure: [
        'Examine loyalty in service to others',
        'Examine trustworthiness in relationships',
        'Examine practice of learned teachings',
        'Rate each area 1-5',
        'Reflect on improvements needed'
      ]
    },
    promptIds: ['confucian-1', 'confucian-2', 'confucian-3'],
    difficulty: 'intermediate',
    popular: false,
    featured: false,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09')
  },
  {
    id: 'self-compassion',
    name: 'Self-Compassion Writing',
    slug: 'self-compassion',
    description: 'Write about stressful events with self-compassion to increase self-compassion and proactive coping.',
    category: 'self_compassion',
    origin: 'scientific',
    evidenceBase: {
      type: 'scientific',
      sources: [
        {
          title: 'A Randomized Controlled Trial of a Self-Compassion Writing Intervention',
          author: 'Debra Urken, Craig Winston LeCroy',
          year: 2021,
          description: 'RCT showing self-compassion writing increases self-compassion and proactive coping in adults with mental illness.'
        }
      ],
      effectivenessRating: 8
    },
    protocol: {
      frequency: '3 consecutive days',
      duration: '10-15 minutes',
      structure: [
        'Write about a stressful event',
        'Acknowledge common humanity (others experience this too)',
        'Practice mindfulness (observe without judgment)',
        'Write a kind response to yourself',
        'Repeat for 3 days'
      ]
    },
    promptIds: ['self-compassion-1', 'self-compassion-2'],
    difficulty: 'intermediate',
    popular: true,
    featured: false,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09')
  }
];