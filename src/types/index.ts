// TypeScript types based on DATABASE_SCHEMA.md

export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
  lastActiveAt: Date;
  preferences: {
    timezone: string;
    language: string;
    theme: 'light' | 'dark' | 'auto';
    reminderTime?: string;
    reminderEnabled: boolean;
  };
  journalingPreferences: {
    defaultDuration: number;
    preferredFrameworks: string[];
    morningPagesEnabled: boolean;
    eveningReviewEnabled: boolean;
    handwritingPreference: 'digital' | 'analog' | 'both';
  };
  onboardingCompleted: boolean;
  onboardingStep: number;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  entryType: EntryType;
  frameworkId?: string;
  content: {
    text: string;
    questions?: string[];
    mood?: MoodRating;
    emotions?: string[];
    tags?: string[];
  };
  structuredData?: {
    cbtThoughtRecord?: {
      situation: string;
      automaticThoughts: string[];
      emotions: Array<{ name: string; intensity: number }>;
      evidenceFor: string[];
      evidenceAgainst: string[];
      balancedPerspective: string;
      finalEmotionRating: number;
    };
    gratitudeEntry?: {
      items: Array<{
        text: string;
        type: 'person' | 'experience' | 'opportunity' | 'thing';
        detail?: string;
      }>;
      recipient?: string;
    };
    stoicPractice?: {
      type: 'morning_preparation' | 'evening_review';
      challengesAnticipated?: string[];
      virtuousResponses?: string[];
      successes?: string[];
      failures?: string[];
      lessons?: string;
    };
    confucianExamination?: {
      loyaltyRating: number;
      loyaltyNotes?: string;
      trustworthinessRating: number;
      trustworthinessNotes?: string;
      practiceRating: number;
      practiceNotes?: string;
    };
    selfCompassion?: {
      stressfulEvent: string;
      commonHumanity: string;
      mindfulnessObservation: string;
      kindResponse: string;
    };
    expressiveWriting?: {
      topic: string;
      emotionalDepth: number;
      catharsisRating: number;
    };
    futureSelfVision?: {
      presentState: string;
      threeMonthVision: string;
      sixMonthVision: string;
      twelveMonthVision: string;
      obstacles: string;
      supportNeeded: string;
      weeklyAction: string;
    };
  };
  sessionData: {
    duration: number;
    startTime: Date;
    endTime: Date;
    wordCount: number;
  };
  progressIndicators?: {
    clarityRating: number;
    insightGained: boolean;
    emotionalShift: number;
    wouldRecommend: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type EntryType =
  | 'expressive'
  | 'future_self'
  | 'cbt'
  | 'gratitude'
  | 'self_compassion'
  | 'stoic_morning'
  | 'stoic_evening'
  | 'confucian'
  | 'zen'
  | 'islamic'
  | 'vedanta'
  | 'morning_pages'
  | 'bullet_journal'
  | 'custom';

export interface MoodRating {
  overall: number;
  energy: number;
  stress: number;
  focus: number;
  sleep?: number;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: GoalCategory;
  timeframe: GoalTimeframe;
  startDate: string;
  targetDate: string;
  completedAt?: Date;
  progress: {
    current: number;
    target: number;
    unit?: string;
    percentage: number;
  };
  milestones: Array<{
    id: string;
    title: string;
    targetDate: string;
    completed: boolean;
    completedAt?: Date;
  }>;
  smartElements?: {
    specific: string;
    measurable: string;
    achievable: string;
    relevant: string;
    timeBound: string;
  };
  valueIds?: string[];
  habit?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    daysOfWeek?: number[];
    dayOfMonth?: number;
    streak: number;
    lastCompletedAt?: Date;
  };
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Intention {
  id: string;
  text: string;
  target: number;
  current: number;
  createdAt: string;
  keptAt?: string;
}

export type GoalCategory =
  | 'personal_growth'
  | 'health'
  | 'relationships'
  | 'career'
  | 'financial'
  | 'spiritual'
  | 'creative'
  | 'educational'
  | 'contribution';

export type GoalTimeframe =
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'yearly'
  | 'long_term';

export interface Prompt {
  id: string;
  frameworkId: string;
  category: PromptCategory;
  text: string;
  description?: string;
  example?: string;
  type: PromptType;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timing: 'morning' | 'evening' | 'anytime';
  duration?: number;
  evidenceBase?: {
    source: string;
    citation?: string;
    effectiveness?: number;
  };
  usageCount: number;
  lastUsedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}

export type PromptCategory =
  | 'mood_check'
  | 'gratitude'
  | 'self_reflection'
  | 'goal_setting'
  | 'challenge'
  | 'celebration'
  | 'learning'
  | 'relationship'
  | 'spiritual'
  | 'cbt'
  | 'stoic'
  | 'confucian'
  | 'zen'
  | 'islamic'
  | 'vedanta';

export type PromptType =
  | 'question'
  | 'statement'
  | 'exercise'
  | 'meditation'
  | 'writing_prompt'
  | 'checklist';

export interface Framework {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: FrameworkCategory;
  origin: FrameworkOrigin;
  evidenceBase: {
    type: 'scientific' | 'traditional' | 'modern';
    sources: Array<{
      title: string;
      author?: string;
      year?: number;
      url?: string;
      description: string;
    }>;
  };
  protocol: {
    frequency: string;
    duration: string;
    structure: string[];
    materials?: string[];
  };
  promptIds: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popular: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type FrameworkCategory =
  | 'expressive_writing'
  | 'cbt'
  | 'gratitude'
  | 'self_compassion'
  | 'stoic'
  | 'confucian'
  | 'zen'
  | 'islamic'
  | 'vedanta'
  | 'productivity'
  | 'creative';

export type FrameworkOrigin =
  | 'scientific'
  | 'ancient_greek'
  | 'chinese'
  | 'japanese'
  | 'islamic'
  | 'hindu'
  | 'aboriginal'
  | 'modern';

export interface Quote {
  id: string;
  text: string;
  author?: string;
  source?: string;
  category: QuoteCategory;
  origin: QuoteOrigin;
  tags: string[];
  evidenceBase?: {
    verified: boolean;
    originalLanguage?: string;
    context?: string;
    modernRelevance?: string;
  };
  usageCount: number;
  lastUsedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}

export type QuoteCategory =
  | 'wisdom'
  | 'perseverance'
  | 'gratitude'
  | 'mindfulness'
  | 'self_discipline'
  | 'compassion'
  | 'growth'
  | 'stoic'
  | 'confucian'
  | 'zen'
  | 'islamic'
  | 'vedanta'
  | 'scientific';

export type QuoteOrigin =
  | 'ancient_greek'
  | 'ancient_chinese'
  | 'ancient_japanese'
  | 'islamic'
  | 'hindu'
  | 'aboriginal'
  | 'modern_scientific'
  | 'contemporary';

export interface UserProgress {
  id: string;
  userId: string;
  overallStats: {
    totalEntries: number;
    totalWords: number;
    totalMinutes: number;
    longestStreak: number;
    currentStreak: number;
    averageDailyEntries: number;
    averageSessionDuration: number;
  };
  frameworkUsage: Array<{
    frameworkId: string;
    frameworkName: string;
    count: number;
    percentage: number;
  }>;
  moodTrends: Array<{
    date: string;
    mood: MoodRating;
  }>;
  goalProgress: {
    activeGoals: number;
    completedGoals: number;
    completionRate: number;
    averageCompletionTime: number;
  };
  evolution: {
    current: number;
    progress: number;
    next: number;
  };
  periodicStats: {
    weekly: {
      entriesThisWeek: number;
      wordsThisWeek: number;
      minutesThisWeek: number;
      streakDays: number;
    };
    monthly: {
      entriesThisMonth: number;
      wordsThisMonth: number;
      minutesThisMonth: number;
      completionRate: number;
    };
  };
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    unlockedAt: Date | undefined;
    icon: 'flame' | 'book' | 'calendar' | 'target' | 'award';
  }>;
  updatedAt: Date;
}

export interface UserStreaks {
  id: string;
  userId: string;
  journalingStreak: {
    current: number;
    longest: number;
    lastJournalDate: string;
    streakHistory: Array<{
      startDate: string;
      endDate: string;
      length: number;
    }>;
  };
  frameworkStreaks: Array<{
    frameworkId: string;
    frameworkName: string;
    current: number;
    longest: number;
    lastUsedDate: string;
  }>;
  goalStreaks: {
    dailyGoalsCompleted: number;
    weeklyGoalsCompleted: number;
    monthlyGoalsCompleted: number;
  };
  updatedAt: Date;
}