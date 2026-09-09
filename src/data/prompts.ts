import { Prompt } from '@/types';

export const prompts: Prompt[] = [
  // Expressive Writing Prompts
  {
    id: 'expressive-1',
    frameworkId: 'expressive-writing',
    category: 'self_reflection',
    text: 'Write about an emotional experience that has been on your mind lately. Explore your deepest thoughts and feelings about it.',
    description: 'Core expressive writing prompt for emotional processing',
    type: 'writing_prompt',
    difficulty: 'beginner',
    timing: 'anytime',
    duration: 15,
    evidenceBase: {
      source: 'Pennebaker Expressive Writing Protocol',
      effectiveness: 8
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  },
  {
    id: 'expressive-2',
    frameworkId: 'expressive-writing',
    category: 'self_reflection',
    text: 'Write about a traumatic or difficult experience from your past. How has it affected you? What have you learned from it?',
    description: 'Deep processing of past experiences',
    type: 'writing_prompt',
    difficulty: 'intermediate',
    timing: 'anytime',
    duration: 20,
    evidenceBase: {
      source: 'Pennebaker Expressive Writing Protocol',
      effectiveness: 8
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  },
  {
    id: 'expressive-3',
    frameworkId: 'expressive-writing',
    category: 'celebration',
    text: 'Write about a intensely positive experience in your life. What made it so meaningful? How did it change you?',
    description: 'Processing positive experiences for growth',
    type: 'writing_prompt',
    difficulty: 'beginner',
    timing: 'anytime',
    duration: 15,
    evidenceBase: {
      source: 'Burton & King (2004) - Health benefits of writing about positive experiences',
      effectiveness: 7
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  },

  // CBT Prompts
  {
    id: 'cbt-1',
    frameworkId: 'cbt-journaling',
    category: 'cbt',
    text: 'What situation triggered difficult emotions today? What automatic thoughts went through your mind? What evidence do you have for and against these thoughts?',
    description: 'Complete CBT thought record exercise',
    type: 'exercise',
    difficulty: 'intermediate',
    timing: 'evening',
    duration: 15,
    evidenceBase: {
      source: 'Beck Cognitive Therapy',
      effectiveness: 9
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  },
  {
    id: 'cbt-2',
    frameworkId: 'cbt-journaling',
    category: 'cbt',
    text: 'Identify a negative thought pattern you notice recurring. Is this thought based on facts or assumptions? What would you tell a friend who had this thought?',
    description: 'Cognitive restructuring practice',
    type: 'exercise',
    difficulty: 'intermediate',
    timing: 'anytime',
    duration: 10,
    evidenceBase: {
      source: 'CBT Journaling Research',
      effectiveness: 9
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  },
  {
    id: 'cbt-3',
    frameworkId: 'cbt-journaling',
    category: 'cbt',
    text: 'What evidence do you have that challenges your worry? What is the most realistic outcome? How would you cope if that outcome happened?',
    description: 'Worry management using CBT techniques',
    type: 'exercise',
    difficulty: 'intermediate',
    timing: 'evening',
    duration: 10,
    evidenceBase: {
      source: 'CBT for Anxiety',
      effectiveness: 9
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  },

  // Gratitude Prompts
  {
    id: 'gratitude-1',
    frameworkId: 'gratitude-journaling',
    category: 'gratitude',
    text: 'Write about three things you are grateful for today. Be specific about why each one matters to you.',
    description: 'Basic gratitude practice',
    type: 'writing_prompt',
    difficulty: 'beginner',
    timing: 'evening',
    duration: 5,
    evidenceBase: {
      source: 'Emmons & McCullough Gratitude Research',
      effectiveness: 7
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  },
  {
    id: 'gratitude-2',
    frameworkId: 'gratitude-journaling',
    category: 'gratitude',
    text: 'Write a gratitude letter to someone who has been kind to you but whom you never properly thanked.',
    description: 'Gratitude letter practice (most effective format)',
    type: 'writing_prompt',
    difficulty: 'intermediate',
    timing: 'anytime',
    duration: 15,
    evidenceBase: {
      source: 'Gratitude Interventions Meta-Analysis 2026',
      effectiveness: 8
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  },
  {
    id: 'gratitude-3',
    frameworkId: 'gratitude-journaling',
    category: 'gratitude',
    text: 'Write about a simple pleasure you enjoyed today. Why was it meaningful? How often do you take such pleasures for granted?',
    description: 'Mindful gratitude for simple pleasures',
    type: 'writing_prompt',
    difficulty: 'beginner',
    timing: 'evening',
    duration: 5,
    evidenceBase: {
      source: 'Mindfulness-Based Gratitude Research',
      effectiveness: 7
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  },

  // Stoic Prompts
  {
    id: 'stoic-morning-1',
    frameworkId: 'stoic-journaling',
    category: 'stoic',
    text: 'What challenges might I face today? How can I respond with wisdom and virtue rather than being ruled by emotion?',
    description: 'Stoic morning preparation',
    type: 'question',
    difficulty: 'intermediate',
    timing: 'morning',
    duration: 5,
    evidenceBase: {
      source: 'Marcus Aurelius Meditations',
      effectiveness: 8
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  },
  {
    id: 'stoic-morning-2',
    frameworkId: 'stoic-journaling',
    category: 'stoic',
    text: 'Begin the morning by saying to yourself: I shall meet with the busybody, the ungrateful, arrogant, deceitful, envious, unsocial. How will I respond virtuously?',
    description: 'Direct quote from Marcus Aurelius for morning preparation',
    type: 'statement',
    difficulty: 'intermediate',
    timing: 'morning',
    duration: 5,
    evidenceBase: {
      source: 'Marcus Aurelius Meditations Book 2',
      effectiveness: 8
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  },
  {
    id: 'stoic-evening-1',
    frameworkId: 'stoic-journaling',
    category: 'stoic',
    text: 'Where did I act according to my values today? Where did I let passions override reason? What can I learn from today?',
    description: 'Stoic evening review',
    type: 'question',
    difficulty: 'intermediate',
    timing: 'evening',
    duration: 10,
    evidenceBase: {
      source: 'Stoic Evening Review Practice',
      effectiveness: 8
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  },
  {
    id: 'stoic-evening-2',
    frameworkId: 'stoic-journaling',
    category: 'stoic',
    text: 'What did I do well today? Where did I fall short? What will I do differently tomorrow?',
    description: 'Simple evening reflection',
    type: 'question',
    difficulty: 'beginner',
    timing: 'evening',
    duration: 5,
    evidenceBase: {
      source: 'Stoic Evening Review Practice',
      effectiveness: 8
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  },

  // Confucian Prompts
  {
    id: 'confucian-1',
    frameworkId: 'confucian-examination',
    category: 'confucian',
    text: 'In planning for others today, was I faithful and wholehearted? Rate 1-5 and reflect on improvements.',
    description: 'First Confucian examination - loyalty in service',
    type: 'question',
    difficulty: 'intermediate',
    timing: 'evening',
    duration: 5,
    evidenceBase: {
      source: 'Analects - Confucius',
      effectiveness: 7
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  },
  {
    id: 'confucian-2',
    frameworkId: 'confucian-examination',
    category: 'confucian',
    text: 'In my interactions with friends today, was I trustworthy? Rate 1-5 and reflect on improvements.',
    description: 'Second Confucian examination - trustworthiness',
    type: 'question',
    difficulty: 'intermediate',
    timing: 'evening',
    duration: 5,
    evidenceBase: {
      source: 'Analects - Confucius',
      effectiveness: 7
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  },
  {
    id: 'confucian-3',
    frameworkId: 'confucian-examination',
    category: 'confucian',
    text: 'Did I practice what I have learned? Rate 1-5 and reflect on how to better apply knowledge.',
    description: 'Third Confucian examination - practice of learning',
    type: 'question',
    difficulty: 'intermediate',
    timing: 'evening',
    duration: 5,
    evidenceBase: {
      source: 'Analects - Confucius',
      effectiveness: 7
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  },

  // Self-Compassion Prompts
  {
    id: 'self-compassion-1',
    frameworkId: 'self-compassion',
    category: 'self_reflection',
    text: 'Write about a difficult situation you faced today. Acknowledge that suffering is part of the shared human experience. How would you comfort a friend in this situation?',
    description: 'Self-compassion writing exercise',
    type: 'writing_prompt',
    difficulty: 'intermediate',
    timing: 'evening',
    duration: 15,
    evidenceBase: {
      source: 'Neff Self-Compassion Research',
      effectiveness: 8
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  },
  {
    id: 'self-compassion-2',
    frameworkId: 'self-compassion',
    category: 'self_reflection',
    text: 'What harsh judgments do you have about yourself today? How would you reframe these with kindness and understanding?',
    description: 'Reframing self-criticism with self-compassion',
    type: 'writing_prompt',
    difficulty: 'intermediate',
    timing: 'anytime',
    duration: 10,
    evidenceBase: {
      source: 'Self-Compassion Writing Research',
      effectiveness: 8
    },
    usageCount: 0,
    createdAt: new Date('2026-09-09'),
    updatedAt: new Date('2026-09-09'),
    active: true
  }
];