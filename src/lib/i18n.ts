// Internationalization (i18n) configuration
// Supports English (default) and Spanish

import type { EntryType } from '@/types';
import type { HomeHeroState } from '@/lib/homeHero';

export type Language = 'en' | 'es';

export interface Translations {
  nav: {
    home: string;
    today: string;
    journal: string;
    pages: string;
    goals: string;
    practice: string;
    progress: string;
    you: string;
    settings: string;
  };
  home: {
    welcome: string;
    subtitle: string;
    startJournaling: string;
    learnMore: string;
    scienceBased: {
      title: string;
      description: string;
    };
    ancientWisdom: {
      title: string;
      description: string;
    };
    adaptiveSystem: {
      title: string;
      description: string;
    };
  };
  journal: {
    title: string;
    subtitle: string;
    todaysEntry: string;
    todaysEntryDescription: string;
    startNewEntry: string;
    recentEntries: string;
    recentEntriesDescription: string;
    quickStartTitle: string;
    exploreAll: string;
    yourPages: string;
    writtenThisYear: string;
    wordsThisYear: string;
    newPage: string;
    searchYourPages: string;
    showMore: string;
    showFewer: string;
    quickStart: Record<string, { title: string; description: string; duration: string }>;
    list: {
      total: string;
      emptyTitle: string;
      noMatches: string;
      structured: string;
      words: string;
      mood: string;
      deleteEntry: string;
      deleteConfirm: string;
    };
  };
  guidance: {
    todaySuggestion: string;
    startThisPrompt: string;
    notNow: string;
    why: string;
    recommendations: Record<string, { title: string; subtitle: string; prompt: string; reason: string }>;
  };
  frameworkInfo: {
    evidenceBase: string;
    type: string;
    howToPractice: string;
    frequency: string;
    duration: string;
    gotIt: string;
    learnMore: string;
  };
  goals: {
    title: string;
    subtitle: string;
    createNewGoal: string;
    activeGoalsTitle: string;
    activeGoalsDescription: string;
    completedGoalsTitle: string;
    loading: string;
    empty: {
      title: string;
      hint: string;
    };
    stats: {
      active: string;
      completed: string;
      avgProgress: string;
    };
    form: {
      title: string;
      goalTitle: string;
      goalTitlePlaceholder: string;
      description: string;
      descriptionPlaceholder: string;
      category: string;
      timeframe: string;
      startDate: string;
      targetDate: string;
      targetValue: string;
      unit: string;
      unitPlaceholder: string;
      smartElements: string;
      smartIntro: string;
      specific: string;
      specificPlaceholder: string;
      measurable: string;
      measurablePlaceholder: string;
      achievable: string;
      achievablePlaceholder: string;
      relevant: string;
      relevantPlaceholder: string;
      timeBound: string;
      timeBoundPlaceholder: string;
      milestones: string;
      addMilestone: string;
      milestonePlaceholder: string;
      cancel: string;
      createGoal: string;
    };
    card: {
      overdue: string;
      completed: string;
      updateProgress: string;
      update: string;
      smartElements: string;
      specific: string;
      measurable: string;
      achievable: string;
      relevant: string;
      timeBound: string;
      milestones: string;
      milestoneCount: string;
    };
    categories: Record<string, string>;
    timeframes: Record<string, string>;
  };
  progress: {
    title: string;
    subtitle: string;
    currentStreak: string;
    currentStreakDescription: string;
    totalEntries: string;
    totalEntriesDescription: string;
    yourProgress: string;
    yourProgressDescription: string;
    stats: {
      totalTime: string;
      goalsDone: string;
    };
    weekly: {
      title: string;
      entries: string;
      words: string;
      time: string;
    };
    moodTrends: string;
    frameworkUsage: string;
    achievements: string;
    moodChart: {
      empty: string;
      labels: {
        overall: string;
        energy: string;
        stress: string;
        focus: string;
      };
    };
    frameworkUsageComponent: {
      empty: string;
      entry: string;
      entries: string;
    };
    achievementsComponent: {
      intro: string;
      unlocked: string;
    };
    achievementList: Record<string, { title: string; description: string }>;
  };
  practice: {
    title: string;
    record: string;
    intentions: string;
    subtitle: string;
    switchDescription: string;
    currentRun: string;
    daysInARow: string;
    lastFourWeeks: string;
    longestRun: string;
    thisWeek: string;
    howTheDaysSat: string;
    stylesYouReachFor: string;
    noData: string;
    noSuggestions: string;
    nothingSet: string;
    setFirst: string;
    intentionDescription: string;
    whyItWorks: string;
    suggested: string;
    open: string;
    kept: string;
    average: string;
    newIntention: string;
    newIntentionPlaceholder: string;
    target: string;
    saveIntention: string;
    deleteConfirm: string;
    keptIn: string;
    notStarted: string;
    setIn: string;
  };
  settings: {
    title: string;
    subtitle: string;
    preferences: string;
    journalingPreferences: string;
    theme: string;
    light: string;
    dark: string;
    system: string;
    dailyReminderTime: string;
    enableDailyReminders: string;
    defaultSessionDuration: string;
    minutes: string;
    morningPages: string;
    morningPagesDescription: string;
    eveningReview: string;
    monthlyReread: string;
    lastDayOfMonth: string;
    eveningReminder: string;
    everyDayAt: string;
    appLock: string;
    faceIdOnOpen: string;
    appLockGate: {
      title: string;
      subtitle: string;
      setPasscode: string;
      enterPasscode: string;
      wrongPasscode: string;
      unlock: string;
    };
    hideEntryTextInPreviews: string;
    titlesOnlyOnPagesList: string;
    editOldEntries: string;
    editOldEntriesDescription: string;
    data: string;
    exportData: string;
    clearAllData: string;
    deleteEverything: string;
    language: string;
    english: string;
    spanish: string;
    profile: string;
    anonymous: string;
    writingSince: string;
    readingAndWriting: string;
    appearance: string;
    defaultSession: string;
    reminders: string;
    privacy: string;
    yourWriting: string;
    account: string;
    notSignedIn: string;
    signedInAs: string;
    signInDescription: string;
    signOutDescription: string;
    signIn: string;
    signOut: string;
    provider: string;
    uid: string;
    replayOnboarding: string;
    clearDataWarning: string;
    clearModal: {
      title: string;
      description: string;
      cloudWarning: string;
      localOnlyWarning: string;
      cleared: string;
      cancel: string;
      clearData: string;
    };
  };
  evolution: {
    title: string;
    level: string;
    next: string;
    requirement: string;
    entries: string;
    styles: string;
    intentions: string;
    streak: string;
    unlocked: string;
    levels: { title: string; description: string }[];
  };
  onboarding: {
    step1Title: string;
    step1Description: string;
    step2Title: string;
    step2Description: string;
    step3Title: string;
    step3Description: string;
    step4Title: string;
    step4Description: string;
    step: string;
    next: string;
    back: string;
    getStarted: string;
    skip: string;
  };
  notFound: {
    title: string;
    description: string;
    home: string;
  };
  common: {
    cancel: string;
    back: string;
    save: string;
    edit: string;
    more: string;
    saving: string;
    close: string;
    hint: string;
    search: string;
    style: string;
    all: string;
    of: string;
    pages: string;
    words: string;
  };
  newEntry: {
    title: string;
    stepOf: string;
    whatDoYouNeed: string;
    whatDoYouNeedDescription: string;
    searchPlaceholder: string;
    moreInfo: string;
    alreadyToday: string;
    alreadyTodayDescription: string;
    unlocksAt: string;
    availableNow: string;
    favorite: string;
    unfavorite: string;
    showCommon: string;
    showAll: string;
    applyFramework: string;
    noFramework: string;
    frameworkHelp: string;
    startWriting: string;
    continue: string;
    chosenStyle: string;
    autosaving: string;
    startAnywhere: string;
    whyThisWorks: string;
    evidence: string;
    leaveDraft: string;
    leaveTitle: string;
    leave: string;
    defaultSession: string;
    bestUsedFor: string;
    yourEntry: string;
    wordCount: string;
    howAreYouFeeling: string;
    mood: {
      overall: string;
      energy: string;
      stress: string;
      focus: string;
    };
    contentPlaceholders: Record<EntryType, string>;
    save: string;
    saving: string;
    saveSuccess: string;
    saveError: string;
    emptyError: string;
  };
  appUpdate: {
    title: string;
    message: string;
    now: string;
  };
  homeHero: {
    day: string;
    days: string;
    minute: string;
    minutes: string;
    wordsLabel: string;
    awayShort: string;
    awayLong: string;
    unknownTopic: string;
    deviceOnly: string;
    cloudAndDevice: string;
    states: Record<
      HomeHeroState,
      {
        eyebrow?: string;
        title: string;
        subhead?: string;
        body?: string;
        cta?: string;
        secondary?: string;
        note?: string;
      }
    >;
  };
  entryTypes: Record<EntryType, { label: string; description: string; useFor: string }>;
  frameworks: Record<string, any>;
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      today: 'Today',
      journal: 'Journal',
      pages: 'Pages',
      goals: 'Goals',
      practice: 'Practice',
      progress: 'Progress',
      you: 'You',
      settings: 'Settings',
    },
    home: {
      welcome: 'Lets start Journaling',
      subtitle: 'Research-informed personal development through journaling. Combining modern scientific research with ancient wisdom traditions to create an adaptive system that evolves with you.',
      startJournaling: 'Start Journaling',
      learnMore: 'Learn More',
      scienceBased: {
        title: 'Research-Informed',
        description: 'Draws on peer-reviewed research from expressive writing, CBT, gratitude, and more.',
      },
      ancientWisdom: {
        title: 'Ancient Wisdom',
        description: 'Integrates Stoic philosophy, Confucian self-examination, Zen mindfulness, and other traditions.',
      },
      adaptiveSystem: {
        title: 'Adaptive System',
        description: 'Progressively evolves with your practice, adjusting complexity based on your readiness.',
      },
    },
    journal: {
      title: 'Journal',
      subtitle: 'Your personal journaling sanctuary',
      todaysEntry: "Today's Journal Entry",
      todaysEntryDescription: 'Start your journaling practice with prompts and frameworks drawn from research and tradition.',
      startNewEntry: 'Start New Entry',
      recentEntries: 'Recent Entries',
      recentEntriesDescription: 'Your recent journal entries will appear here.',
      quickStartTitle: 'Quick Start',
      exploreAll: 'Explore all',
      yourPages: 'Your pages',
      writtenThisYear: '{count} written this year',
      wordsThisYear: '{count} words',
      newPage: 'New page',
      searchYourPages: 'Search your pages',
      showMore: '+ {count} more',
      showFewer: 'Show fewer',
      quickStart: {
        morning_checkin: {
          title: 'Morning Check-In',
          description: 'Set your mood and intentions for the day in under 5 minutes.',
          duration: '5 min',
        },
        process_difficult: {
          title: 'Process Something Difficult',
          description: 'Use the CBT thought record to untangle anxious or negative thinking.',
          duration: '10 min',
        },
        future_vision: {
          title: 'Build Your Future Self',
          description: 'Manifest where you want to be in 3, 6, and 12 months.',
          duration: '15 min',
        },
        evening_review: {
          title: 'Evening Review',
          description: 'Reflect on gratitude and review your day with Stoic honesty.',
          duration: '10 min',
        },
      },
      list: {
        total: '{count} total',
        emptyTitle: 'No entries yet',
        noMatches: 'No pages match your search.',
        structured: 'structured',
        words: 'words',
        mood: 'Mood',
        deleteEntry: 'Delete entry',
        deleteConfirm: 'Delete this entry? This cannot be undone.',
      },
    },
    guidance: {
      todaySuggestion: "Today's Suggestion",
      startThisPrompt: 'Start This Prompt',
      notNow: 'Not now',
      why: 'Why this suggestion?',
      recommendations: {
        stoic_morning: {
          title: 'Start your day with intention',
          subtitle: 'A 5-minute Stoic morning practice',
          prompt: 'What challenges might you face today? How would your best self respond with wisdom, courage, justice, and temperance?',
          reason: 'Morning preparation helps you anticipate the day and plan virtuous responses.',
        },
        stoic_evening: {
          title: 'Review your day',
          subtitle: 'Honest evening reflection',
          prompt: 'What did you do well today? Where did you fall short? What will you do differently tomorrow?',
          reason: 'Evening review supports learning from the day without self-judgment.',
        },
        self_compassion: {
          title: 'Be kind to yourself',
          subtitle: 'A gentle self-compassion check-in',
          prompt: 'What is difficult right now? Imagine a friend going through this. What warm, supportive words would you offer them?',
          reason: 'Your recent mood has been low. Self-compassion is a gentle way to explore self-criticism and shame without judgment.',
        },
        gratitude: {
          title: 'Capture the good',
          subtitle: 'Build on positive momentum',
          prompt: 'What are you grateful for today? Name one person, one experience, and one small thing.',
          reason: 'Your recent mood has been strong. Gratitude can help savor and reinforce positive moments.',
        },
        future_self: {
          title: 'Connect with your goals',
          subtitle: 'Future self visualization',
          prompt: 'Imagine yourself 3 months from now having made meaningful progress. What is one small step you can take this week?',
          reason: 'You have active goals. Future-self writing can strengthen motivation and planning.',
        },
        expressive: {
          title: 'Free-write today',
          subtitle: 'Clear your mind',
          prompt: 'Set a timer for 5 minutes and write continuously about whatever is on your mind. Do not worry about grammar or structure.',
          reason: 'Expressive writing can help process thoughts and feelings that are hard to name.',
        },
        gratitude_fallback: {
          title: 'Gratitude moment',
          subtitle: 'A quick positive reflection',
          prompt: 'List three things you are grateful for right now, and briefly say why each matters to you.',
          reason: 'Gratitude practice is a simple, low-pressure way to maintain consistency.',
        },
      },
    },
    frameworkInfo: {
      evidenceBase: 'Evidence Base',
      type: 'Type',
      howToPractice: 'How to practice',
      frequency: 'Frequency',
      duration: 'Duration',
      gotIt: 'Got it',
      learnMore: 'Learn more about',
    },
    goals: {
      title: 'Goals',
      subtitle: 'Set meaningful goals and track your progress',
      createNewGoal: 'Create New Goal',
      activeGoalsTitle: 'Active Goals',
      activeGoalsDescription: 'Your active goals will appear here.',
      completedGoalsTitle: 'Completed Goals',
      loading: 'Loading goals...',
      empty: {
        title: 'No active goals yet',
        hint: 'Set a goal to start tracking your progress',
      },
      stats: {
        active: 'Active Goals',
        completed: 'Completed',
        avgProgress: 'Avg Progress',
      },
      form: {
        title: 'Create New Goal',
        goalTitle: 'Goal Title',
        goalTitlePlaceholder: 'e.g., Walk 10,000 steps daily',
        description: 'Description',
        descriptionPlaceholder: 'Why is this goal important to you?',
        category: 'Category',
        timeframe: 'Timeframe',
        startDate: 'Start Date',
        targetDate: 'Target Date',
        targetValue: 'Target Value',
        unit: 'Unit (e.g., steps, pages, minutes)',
        unitPlaceholder: 'steps',
        smartElements: 'SMART Elements',
        smartIntro: "Based on Doran's SMART criteria (1981) and Locke & Latham's goal-setting theory. Making goals Specific, Measurable, Achievable, Relevant, and Time-bound improves clarity and commitment.",
        specific: 'Specific: What exactly will you do?',
        specificPlaceholder: 'e.g., Walk outside for 30 minutes',
        measurable: 'Measurable: How will you track progress?',
        measurablePlaceholder: 'e.g., Track steps with my phone',
        achievable: 'Achievable: Why is this realistic?',
        achievablePlaceholder: 'e.g., I already walk 5,000 steps',
        relevant: 'Relevant: Why does this matter?',
        relevantPlaceholder: 'e.g., Improves my energy and mood',
        timeBound: 'Time-bound: When will you do it?',
        timeBoundPlaceholder: 'e.g., Every morning before work',
        milestones: 'Milestones',
        addMilestone: 'Add milestone',
        milestonePlaceholder: 'Milestone description',
        cancel: 'Cancel',
        createGoal: 'Create Goal',
      },
      card: {
        overdue: 'Overdue',
        completed: 'Completed',
        updateProgress: 'Update Progress',
        update: 'Update',
        smartElements: 'SMART Elements',
        specific: 'Specific:',
        measurable: 'Measurable:',
        achievable: 'Achievable:',
        relevant: 'Relevant:',
        timeBound: 'Time-bound:',
        milestones: 'Milestones',
        milestoneCount: 'Milestones: {completed}/{total} completed',
      },
      categories: {
        personal_growth: 'Personal Growth',
        health: 'Health',
        relationships: 'Relationships',
        career: 'Career',
        financial: 'Financial',
        spiritual: 'Spiritual',
        creative: 'Creative',
        educational: 'Educational',
        contribution: 'Contribution',
      },
      timeframes: {
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
        quarterly: 'Quarterly',
        yearly: 'Yearly',
        long_term: 'Long Term',
      },
    },
    progress: {
      title: 'Progress',
      subtitle: 'Track your growth and celebrate your achievements',
      currentStreak: 'Current Streak',
      currentStreakDescription: 'Keep going to build your streak!',
      totalEntries: 'Total Entries',
      totalEntriesDescription: 'Start journaling to track your progress',
      yourProgress: 'Your Progress',
      yourProgressDescription: 'Your detailed progress analytics will appear here as you journal.',
      stats: {
        totalTime: 'Total Time',
        goalsDone: 'Goals Done',
      },
      weekly: {
        title: 'This Week',
        entries: 'Entries',
        words: 'Words',
        time: 'Time',
      },
      moodTrends: 'Mood Trends',
      frameworkUsage: 'Framework Usage',
      achievements: 'Achievements',
      moodChart: {
        empty: 'No mood data yet. Start journaling to see your mood trends.',
        labels: {
          overall: 'Overall',
          energy: 'Energy',
          stress: 'Stress',
          focus: 'Focus',
        },
      },
      frameworkUsageComponent: {
        empty: 'No framework usage yet. Try a framework-specific entry to see your practice patterns.',
        entry: 'entry',
        entries: 'entries',
      },
      achievementsComponent: {
        intro: 'Small celebrations of your consistency. These are optional nudges, not requirements. Missing a day is part of being human.',
        unlocked: 'Unlocked',
      },
      achievementList: {
        first_entry: {
          title: 'First Entry',
          description: 'Write your first journal entry.',
        },
        three_day_streak: {
          title: 'Three-Day Streak',
          description: 'Journal for three days in a row.',
        },
        seven_day_streak: {
          title: 'Seven-Day Streak',
          description: 'Journal for a week in a row.',
        },
        writer_1000: {
          title: 'Thousand Words',
          description: 'Write 1,000 words across all entries.',
        },
        goal_setter: {
          title: 'Goal Setter',
          description: 'Create your first goal.',
        },
        goal_achiever: {
          title: 'Goal Achiever',
          description: 'Complete your first goal.',
        },
        explorer: {
          title: 'Framework Explorer',
          description: 'Try three different frameworks.',
        },
        monthly_dedication: {
          title: 'Monthly Dedication',
          description: 'Journal for 30 total days.',
        },
      },
    },
    practice: {
      title: 'Practice',
      record: 'Record',
      intentions: 'Intentions',
      subtitle: 'A record of what you did, not a verdict on it.',
      switchDescription: 'Two views of the same practice. The app opens on Record; the last view you used is remembered.',
      currentRun: 'CURRENT RUN',
      daysInARow: 'days in a row',
      lastFourWeeks: 'Last four weeks.',
      longestRun: 'Longest run: {count} days, in {month}.',
      thisWeek: 'THIS WEEK',
      howTheDaysSat: 'HOW THE DAYS SAT',
      stylesYouReachFor: 'STYLES YOU REACH FOR',
      noData: 'No data yet. Start writing.',
      noSuggestions: 'No suggestions yet.',
      nothingSet: 'Nothing set yet.',
      setFirst: 'Set your first intention',
      intentionDescription: 'An intention is one sentence you would like to be true in a month. You can change it whenever it stops being true.',
      whyItWorks: 'People who write the intention down, and where and when they will act on it, follow through more often than people who only hold it in mind. That is the only reason this screen exists.',
      suggested: 'SUGGESTED FROM YOUR PAGES',
      open: 'OPEN',
      kept: 'KEPT',
      average: 'AVERAGE',
      newIntention: 'New intention',
      newIntentionPlaceholder: 'e.g. Write four evenings a week',
      target: 'Target',
      saveIntention: 'Save intention',
      deleteConfirm: 'Delete this intention? This cannot be undone.',
      keptIn: 'Kept in {month}',
      notStarted: 'Not started',
      setIn: 'Set in {month}',
    },
    settings: {
      title: 'You',
      subtitle: 'Reminders, privacy, export and account settings',
      preferences: 'Preferences',
      journalingPreferences: 'Journaling Preferences',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      dailyReminderTime: 'Daily Reminder Time',
      enableDailyReminders: 'Enable Daily Reminders',
      defaultSessionDuration: 'Default Session Duration (minutes)',
      minutes: 'minutes',
      morningPages: 'Morning Pages',
      morningPagesDescription: 'Show an in-app nudge at 7:00 am',
      eveningReview: 'Evening Review',
      monthlyReread: 'Monthly re-read',
      lastDayOfMonth: 'Show an in-app nudge on the last day of the month',
      eveningReminder: 'Evening reminder',
      everyDayAt: 'Show an in-app nudge every day at 9:30 pm',
      appLock: 'App lock',
      faceIdOnOpen: 'Face ID on open',
      appLockGate: {
        title: 'Journal is locked',
        subtitle: 'Web apps can use a passcode. Face ID requires a native wrapper.',
        setPasscode: 'Set a 4-digit passcode',
        enterPasscode: 'Enter your passcode',
        wrongPasscode: 'Wrong passcode. Try again.',
        unlock: 'Unlock',
      },
      hideEntryTextInPreviews: 'Hide entry text in previews',
      titlesOnlyOnPagesList: 'Titles only on the Pages list',
      editOldEntries: 'Edit old entries',
      editOldEntriesDescription: 'Allow editing pages after they are saved',
      data: 'Data',
      exportData: 'Export every page',
      clearAllData: 'Delete everything',
      deleteEverything: 'Delete everything',
      language: 'Language',
      english: 'English',
      spanish: 'Español',
      profile: 'Profile',
      anonymous: 'You',
      writingSince: 'writing since {date}',
      readingAndWriting: 'Reading and Writing',
      appearance: 'Appearance',
      defaultSession: 'Default session',
      reminders: 'Reminders',
      privacy: 'Privacy',
      yourWriting: 'Your Writing',
      account: 'Account',
      notSignedIn: 'Not signed in',
      signedInAs: 'Signed in as {email}',
      signInDescription: 'Sign in to back up and sync your pages to your Google account.',
      signOutDescription: 'Signing out keeps your pages on this device.',
      signIn: 'Sign in with Google',
      signOut: 'Sign out',
      provider: 'Provider: Google',
      uid: 'UID',
      replayOnboarding: 'Replay the introduction',
      clearDataWarning: 'Deleting is immediate and cannot be undone — we keep no copy.',
      clearModal: {
        title: 'Clear all data?',
        description: 'This will permanently delete all your journal entries, goals, and progress data.',
        cloudWarning: 'You are signed in as {email}. This will also delete your cloud data from Firebase.',
        localOnlyWarning: 'You are not signed in. This will only clear data stored on this device.',
        cleared: 'Your data has been cleared.',
        cancel: 'Cancel',
        clearData: 'Clear Data',
      },
    },
    appUpdate: {
      title: 'Update available',
      message: 'A new version of the app is ready. Refresh to use it.',
      now: 'Refresh now',
    },
    evolution: {
      title: 'Your path',
      level: 'Level',
      next: 'Next',
      requirement: 'to unlock',
      entries: 'pages',
      styles: 'styles tried',
      intentions: 'intentions kept',
      streak: 'day streak',
      unlocked: 'Unlocked',
      levels: [
        { title: 'Beginner', description: 'Start with free writing and gratitude.' },
        { title: 'Building', description: 'Add structure with CBT and self-compassion.' },
        { title: 'Intermediate', description: 'Try Stoic and Confucian reflection.' },
        { title: 'Advanced', description: 'Work on future self and deep reflection.' },
        { title: 'Mastery', description: 'Explore deeper traditions and values.' },
        { title: 'Sage', description: 'You have a mature, consistent practice.' },
      ],
    },
    onboarding: {
      step1Title: 'Welcome to Journal',
      step1Description: 'A private, research-informed journaling space. Every framework is drawn from research or clearly marked as a tradition.',
      step2Title: 'One page a day',
      step2Description: 'Start from Today. The app suggests a style based on the time of day and your open intentions. Just write for a few minutes.',
      step3Title: 'Your practice',
      step3Description: 'Track your streak, set intentions, and watch your path. The more you write, the more styles and deeper frameworks you unlock.',
      step4Title: 'Honest and private',
      step4Description: 'Your pages stay on this device. Sign in to connect your account. Export or delete anytime.',
      step: 'Step {current} of {total}',
      next: 'Next',
      back: 'Back',
      getStarted: 'Get started',
      skip: 'Skip onboarding',
    },
    notFound: {
      title: 'Page not found',
      description: 'The page you are looking for does not exist.',
      home: 'Go to Today',
    },
    common: {
      cancel: 'Cancel',
      back: 'Back',
      save: 'Save',
      edit: 'Edit',
      more: 'More actions',
      saving: 'Saving...',
      close: 'Close',
      hint: 'Hint',
      search: 'Search',
      style: 'Style',
      all: 'All styles',
      of: 'of',
      pages: 'pages',
      words: 'words',
    },
    newEntry: {
      title: 'New Journal Entry',
      stepOf: 'Step {step} of 3',
      whatDoYouNeed: 'What do you need today?',
      whatDoYouNeedDescription: 'Pick a journaling style. Each has guided prompts drawn from research or tradition.',
      searchPlaceholder: 'Search entry types...',
      moreInfo: 'More about {style}',
      alreadyToday: 'Already today',
      alreadyTodayDescription: 'You already wrote this style today. Each style is meant to be used once a day. Choose a different one or come back tomorrow.',
      unlocksAt: 'Unlocks at level {level}',
      availableNow: 'Available now',
      favorite: 'Add to favorites',
      unfavorite: 'Remove from favorites',
      showCommon: 'Show only common options',
      showAll: 'Show all {count} entry types',
      applyFramework: 'Apply a Framework (optional)',
      noFramework: 'No specific framework, just use the entry type',
      frameworkHelp: 'Frameworks add curated prompts from research or traditions. Most of the time, the entry type itself is enough. Tap the info icon once you select one to learn more.',
      startWriting: 'Start Writing',
      continue: 'Continue',
      chosenStyle: 'Chosen style',
      autosaving: 'Autosaving',
      startAnywhere: 'Start anywhere...',
      whyThisWorks: 'What this draws from',
      evidence: 'Evidence from research and tradition',
      leaveDraft: 'Your draft will not be saved.',
      leaveTitle: 'Leave this entry?',
      leave: 'Leave',
      defaultSession: 'Default session',
      bestUsedFor: 'Best used for:',
      yourEntry: 'Your Entry',
      wordCount: '{count} words',
      howAreYouFeeling: 'How are you feeling?',
      mood: {
        overall: 'Overall Mood',
        energy: 'Energy Level',
        stress: 'Stress Level',
        focus: 'Focus Level',
      },
      contentPlaceholders: {
        expressive: 'Start writing your thoughts here...',
        future_self: 'Use this space to write a free-form reflection or summary based on the prompts above. This is what gets saved as your main journal entry.',
        cbt: 'Summarize the situation and what you learned from the thought record. This is what gets saved as your main journal entry.',
        gratitude: 'Write a free-form gratitude reflection, or summarize the items above. This is what gets saved as your main journal entry.',
        self_compassion: 'Write a free-form reflection on the difficulty and your kind response. This is what gets saved as your main journal entry.',
        stoic_morning: 'Write a free-form reflection on your Stoic morning practice. This is what gets saved as your main journal entry.',
        stoic_evening: 'Write a free-form reflection on your Stoic evening review. This is what gets saved as your main journal entry.',
        confucian: 'Write a free-form reflection on your Confucian self-examination. This is what gets saved as your main journal entry.',
        zen: 'Start writing your thoughts here...',
        islamic: 'Start writing your thoughts here...',
        vedanta: 'Start writing your thoughts here...',
        morning_pages: 'Start writing your thoughts here...',
        bullet_journal: 'Start writing your thoughts here...',
        custom: 'Start writing your thoughts here...',
      },
      save: 'Save Entry',
      saving: 'Saving...',
      saveSuccess: 'Entry saved successfully!',
      saveError: 'Error saving entry: {message}',
      emptyError: 'Please write something before saving.',
    },
    homeHero: {
      day: 'day',
      days: 'days',
      minute: 'minute',
      minutes: 'minutes',
      wordsLabel: 'words',
      awayShort: 'a while',
      awayLong: 'a fortnight',
      unknownTopic: 'the last thing you wrote',
      deviceOnly: 'this device',
      cloudAndDevice: 'your account and this device',
      states: {
        coldStart: {
          eyebrow: 'Journal',
          title: 'Start with one *honest* sentence.',
          body: 'No account yet. Nothing you write leaves this phone until you ask it to.',
          cta: 'Write my first page',
          note: 'Prompts here come from expressive writing, CBT and Stoic practice. You can read the research behind any of them before you write.',
        },
        morning: {
          eyebrow: '{{date}} · Day {{dayCount}}',
          title: 'What are you *carrying* into today?',
          subhead: 'This morning · 5 min',
          body: 'Name the mood, then one thing you intend to do about it.',
          cta: 'Start writing',
          secondary: 'Another',
        },
        midday: {
          eyebrow: '{{date}} · Day {{dayCount}}',
          title: 'Something on your mind *now*?',
          body: "Middle of the day is for the thing you cannot put down, not for a practice. Two minutes is a page.",
          cta: 'Open a blank page',
          secondary: 'Pick a style',
        },
        evening: {
          eyebrow: '{{date}} · Day {{dayCount}}',
          title: 'What did today *ask of* you?',
          subhead: "Tonight's practice · 10 min",
          body: 'Name one thing you handled well, one you would do differently, and one you can let go of.',
          cta: 'Start writing',
          secondary: 'Another',
        },
        late: {
          eyebrow: '{{weekday}} · {{time}}',
          title: 'Put it down and *sleep* on it.',
          body: 'Three lines is enough tonight. The long version can wait for tomorrow.',
          cta: 'Write three lines',
          secondary: 'Not tonight',
          note: 'Nothing resets if you skip. Your run counts days you wrote, not days in a row you did not miss.',
        },
        written: {
          eyebrow: '{{date}} · Day {{dayCount}}',
          title: 'Written. *{{dayCount}} {{dayText}}* of pages behind you.',
          body: '{{typeLabel}}, {{time}} — {{words}} {{wordsLabel}} in {{minutes}} {{minutesLabel}}.',
          cta: 'Add to today',
          secondary: 'Read it back',
          note: 'Your page is saved on {{where}}.',
        },
        unfinished: {
          eyebrow: '{{date}}',
          title: 'You left something *half said*.',
          body: 'Started {{draftDay}} · {{draftWords}} {{wordsLabel}} · {{draftType}}',
          cta: 'Finish it',
          secondary: 'Start something else',
          note: 'A draft is in progress. Finish it or start something new.',
        },
        return: {
          eyebrow: '{{date}}',
          title: 'It has been *{{away}}*. Start where you are.',
          body: 'No catching up to do. The last thing you wrote was about {{lastTopic}} — you can pick that up or leave it.',
          cta: "Write today's page",
          secondary: 'Re-read that one',
          note: 'No page in a week. Never mentions the broken run.',
        },
      },
    },
    entryTypes: {
      expressive: {
        label: 'Expressive Writing',
        description: 'Write freely about emotions, experiences, or anything on your mind.',
        useFor: 'Processing feelings, venting, self-discovery',
      },
      future_self: {
        label: 'Future Self Vision',
        description: 'Imagine where you want to be in 3, 6, and 12 months.',
        useFor: 'Manifestation, goal setting, vision planning',
      },
      cbt: {
        label: 'CBT Thought Record',
        description: 'Explore anxious or negative thoughts by looking at evidence.',
        useFor: 'Anxious thoughts, intrusive thoughts, cognitive reframing',
      },
      gratitude: {
        label: 'Gratitude',
        description: 'List what you are thankful for and why.',
        useFor: 'Shifting perspective, building appreciation',
      },
      self_compassion: {
        label: 'Self-Compassion',
        description: 'Treat yourself with the kindness you would give a friend.',
        useFor: 'Self-criticism, shame, difficult emotions',
      },
      stoic_morning: {
        label: 'Stoic Morning',
        description: 'Prepare for the day and plan virtuous responses.',
        useFor: 'Morning routine, anticipatory resilience',
      },
      stoic_evening: {
        label: 'Stoic Evening',
        description: 'Review the day honestly: successes, failures, lessons.',
        useFor: 'Evening reflection, daily review',
      },
      confucian: {
        label: 'Confucian Examination',
        description: 'Rate and reflect on loyalty, trustworthiness, and practice.',
        useFor: 'Character review, traditional self-examination',
      },
      zen: {
        label: 'Zen Reflection',
        description: 'Observe thoughts and experiences with mindful awareness.',
        useFor: 'Mindfulness, present-moment awareness',
      },
      islamic: {
        label: 'Islamic Muhasaba',
        description: 'Self-accountability and spiritual review.',
        useFor: 'Spiritual reflection, accountability',
      },
      vedanta: {
        label: 'Vedanta Self-Inquiry',
        description: 'Ask "Who am I?" and explore the nature of self.',
        useFor: 'Deep self-inquiry, spiritual exploration',
      },
      morning_pages: {
        label: 'Morning Pages',
        description: 'Three pages of stream-of-consciousness writing.',
        useFor: 'Creative unblocking, morning ritual',
      },
      bullet_journal: {
        label: 'Bullet Journal',
        description: 'Short, structured entries with tasks and rapid logging.',
        useFor: 'Productivity, daily planning, quick capture',
      },
      custom: {
        label: 'Custom',
        description: 'A blank entry with no specific framework.',
        useFor: 'Free writing, unstructured journaling',
      },
    },
    frameworks: {
      expressive: {
        title: 'Expressive Writing',
        fields: {
          topic: {
            label: 'Topic or Focus',
            placeholder: 'e.g., A recent challenge, a memory, a fear...',
          },
          emotionalDepth: {
            label: 'Emotional Depth (1-10)',
            low: 'Surface-level',
            high: 'Deeply emotional',
          },
          catharsis: {
            label: 'Catharsis / Release (1-10)',
            low: 'No release',
            high: 'Strong release',
          },
        },
      },
      future_self: {
        title: 'Future Self Vision',
        fields: {
          presentState: {
            label: 'Where are you right now?',
            placeholder: 'Describe your current situation honestly. What is working and what feels stuck?',
          },
          threeMonthVision: {
            label: '3-Month Future Self',
            placeholder: 'Imagine yourself 3 months from now. What has changed? How do you feel? What are you doing?',
          },
          sixMonthVision: {
            label: '6-Month Future Self',
            placeholder: 'Look further ahead. What milestones have you reached? What kind of person are you becoming?',
          },
          twelveMonthVision: {
            label: '12-Month Future Self',
            placeholder: 'One year from today. What does your life look like? Be specific but flexible. This is a direction, not a contract.',
          },
          obstacles: {
            label: 'Likely Obstacles',
            placeholder: 'What might get in the way? Naming obstacles in advance makes them easier to navigate.',
          },
          supportNeeded: {
            label: 'Support You Will Need',
            placeholder: 'People, habits, resources, or mindset shifts that will help you move toward this vision.',
          },
          weeklyAction: {
            label: 'One Action This Week',
            placeholder: 'What is one small, concrete step you can take this week? (Keep it tiny and doable.)',
          },
        },
      },
      cbt: {
        title: 'CBT Thought Record',
        fields: {
          situation: {
            label: 'Situation',
            placeholder: 'Describe what happened, where you were, and who was involved...',
          },
          automaticThoughts: {
            label: 'Automatic Thoughts',
            placeholder: 'What thought went through your mind?',
          },
          emotions: {
            label: 'Emotions & Intensity',
            emotionPlaceholder: 'Emotion (e.g., anxiety, sadness)',
            addEmotion: '+ Add emotion',
          },
          evidenceFor: {
            label: 'Evidence For the Thought',
            placeholder: 'What evidence supports this thought?',
          },
          evidenceAgainst: {
            label: 'Evidence Against the Thought',
            placeholder: 'What evidence contradicts this thought?',
          },
          balancedPerspective: {
            label: 'Balanced Perspective',
            placeholder: 'Given the evidence for and against, what is a more balanced way to view this situation?',
          },
          finalEmotionRating: {
            label: 'Final Emotion Rating (1-10)',
          },
        },
        addAnother: '+ Add another',
      },
      gratitude: {
        title: 'Gratitude Practice',
        intro: 'List things, people, experiences, or opportunities you feel grateful for today. Research suggests gratitude journaling can support well-being, though effects vary by person and context.',
        item: {
          title: 'Gratitude #',
          placeholder: 'I am grateful for...',
          detailPlaceholder: 'Why are you grateful for this? How does it affect your life? (optional)',
        },
        types: {
          person: 'Person',
          experience: 'Experience',
          opportunity: 'Opportunity',
          thing: 'Thing',
        },
        addItem: '+ Add gratitude item',
        recipient: {
          label: 'Gratitude Letter Recipient (optional)',
          hint: 'Someone you want to express gratitude toward',
          placeholder: 'Someone you want to express gratitude toward',
        },
      },
      self_compassion: {
        title: 'Self-Compassion Writing',
        intro: 'Work through a difficulty using the three components of self-compassion. This exercise is for reflection and emotional support, not a substitute for therapy.',
        fields: {
          stressfulEvent: {
            label: 'Stressful Event',
            placeholder: 'Describe a difficulty, mistake, or painful experience you are facing...',
            description: 'Identify the situation you want to work with, as you would in a self-compassion letter or journal exercise.',
          },
          mindfulnessObservation: {
            label: 'Mindfulness: Observe Without Judgment',
            placeholder: 'What thoughts and feelings are present? Can you notice them without suppressing or exaggerating them?',
            description: 'Neff (2003b) identifies mindfulness as the first component of self-compassion: balanced awareness of painful experiences.',
          },
          commonHumanity: {
            label: 'Common Humanity: You Are Not Alone',
            placeholder: 'How is this struggle part of the shared human experience? Who else might feel this way?',
            description: 'Self-compassion involves recognizing suffering as part of the human condition, not isolating. See Kristin Neff, Self-Compassion (2011).',
          },
          kindResponse: {
            label: 'Self-Kindness: What Would You Say to a Friend?',
            placeholder: 'What caring, supportive, and encouraging words would you offer yourself?',
            description: 'Neff describes self-kindness as extending the same warmth and understanding to oneself as to a good friend.',
          },
        },
      },
      stoic: {
        title: {
          morning: 'Stoic Morning Preparation',
          evening: 'Stoic Evening Review',
        },
        morning: 'Morning',
        evening: 'Evening',
        intro: {
          morning: 'Based on Stoic morning practice (premeditatio malorum): anticipate challenges you may face today and plan how you will respond with virtue.',
          evening: 'Based on Stoic evening review: reflect on your day with honesty, noting what went well, what did not, and what you can learn.',
        },
        fields: {
          challengesAnticipated: {
            label: 'Challenges You May Face Today',
            placeholder: 'What difficulty might arise today?',
          },
          virtuousResponses: {
            label: 'Virtuous Responses',
            placeholder: 'How will you respond with wisdom, courage, justice, or temperance?',
          },
          successes: {
            label: 'Successes',
            placeholder: 'What did you do well today?',
          },
          failures: {
            label: 'Failures or Missed Opportunities',
            placeholder: 'Where did you fall short of your values?',
          },
          lessons: {
            label: 'Lessons for Tomorrow',
            placeholder: 'What will you do differently tomorrow?',
          },
        },
        addAnother: '+ Add another',
      },
      confucian: {
        title: 'Confucian Self-Examination',
        source: 'Source: Analects 1.4',
        quote: '"I examine myself on three things: in what I have undertaken on behalf of others, have I done my best? In my dealings with my friends, have I been trustworthy? And have I practiced what has been transmitted to me?"',
        citation: 'Translation based on Roger T. Ames & Henry Rosemont, Jr., The Analects of Confucius: A Philosophical Translation (1998).',
        intro: 'Rate yourself and reflect on each of the three Confucian dimensions. This is a traditional reflective practice, not a clinical assessment.',
        dimensions: {
          loyalty: {
            label: 'Loyalty / Devotion (忠, zhōng)',
            question: 'In what I have undertaken on behalf of others, have I done my best?',
            description: 'Based on Analects 1.4: "I examine myself on three things." This is a traditional Confucian practice of self-scrutiny, not a clinical intervention.',
          },
          trustworthiness: {
            label: 'Trustworthiness (信, xìn)',
            question: 'In my dealings with friends and others, have I been trustworthy?',
            description: 'Confucius emphasizes trustworthiness as a core virtue. Self-rating here is for reflection, not diagnosis.',
          },
          practice: {
            label: 'Practice / Learning (習, xí)',
            question: 'Did I practice what I have learned? Rate 1-10 and reflect on how to better apply knowledge.',
            description: 'Confucian self-cultivation involves reviewing whether one applies what one learns.',
          },
        },
        rating: 'Rating (1-10)',
        reflection: {
          label: 'Reflection',
          hint: 'What did you do well? Where can you improve?',
          placeholder: 'What did you do well? Where can you improve?',
        },
      },
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      today: 'Hoy',
      journal: 'Diario',
      pages: 'Páginas',
      goals: 'Metas',
      practice: 'Práctica',
      progress: 'Progreso',
      you: 'Tú',
      settings: 'Configuración',
    },
    home: {
      welcome: 'Empecemos a escribir!',
      subtitle: 'Desarrollo personal informado por la investigación a través del diario. Combinando investigación científica moderna con tradiciones de sabiduría antigua para crear un sistema adaptativo que evoluciona contigo.',
      startJournaling: 'Comenzar a Escribir',
      learnMore: 'Más Información',
      scienceBased: {
        title: 'Informado por la Ciencia',
        description: 'Se inspira en investigación revisada por pares sobre escritura expresiva, TCC, gratitud y más.',
      },
      ancientWisdom: {
        title: 'Sabiduría Antigua',
        description: 'Integra filosofía estoica, autoexamen confuciano, atención plena zen y otras tradiciones.',
      },
      adaptiveSystem: {
        title: 'Sistema Adaptativo',
        description: 'Evoluciona progresivamente con tu práctica, ajustando la complejidad según tu preparación.',
      },
    },
    journal: {
      title: 'Diario',
      subtitle: 'Tu santuario personal de diario',
      todaysEntry: 'Entrada de Hoy',
      todaysEntryDescription: 'Comienza tu práctica de diario con preguntas y marcos inspirados en investigaciones y tradiciones.',
      startNewEntry: 'Nueva Entrada',
      recentEntries: 'Entradas Recientes',
      recentEntriesDescription: 'Tus entradas recientes aparecerán aquí.',
      quickStartTitle: 'Inicio Rápido',
      exploreAll: 'Explorar todo',
      yourPages: 'Tus páginas',
      writtenThisYear: '{count} escritas este año',
      wordsThisYear: '{count} palabras',
      newPage: 'Nueva página',
      searchYourPages: 'Busca tus páginas',
      showMore: '+ {count} más',
      showFewer: 'Mostrar menos',
      quickStart: {
        morning_checkin: {
          title: 'Check-In de la Mañana',
          description: 'Establece tu estado de ánimo e intenciones para el día en menos de 5 minutos.',
          duration: '5 min',
        },
        process_difficult: {
          title: 'Procesar Algo Difícil',
          description: 'Usa el registro de pensamientos TCC para desenredar pensamientos ansiosos o negativos.',
          duration: '10 min',
        },
        future_vision: {
          title: 'Construir tu Yo Futuro',
          description: 'Manifiesta dónde quieres estar en 3, 6 y 12 meses.',
          duration: '15 min',
        },
        evening_review: {
          title: 'Revisión de la Noche',
          description: 'Reflexiona sobre la gratitud y revisa tu día con honestidad estoica.',
          duration: '10 min',
        },
      },
      list: {
        total: '{count} total',
        emptyTitle: 'Aún no hay entradas',
        noMatches: 'Ninguna página coincide con tu búsqueda.',
        structured: 'estructurado',
        words: 'palabras',
        mood: 'Estado de ánimo',
        deleteEntry: 'Eliminar entrada',
        deleteConfirm: '¿Eliminar esta entrada? Esta acción no se puede deshacer.',
      },
    },
    guidance: {
      todaySuggestion: 'Sugerencia de Hoy',
      startThisPrompt: 'Comenzar esta Sugerencia',
      notNow: 'Ahora no',
      why: '¿Por qué esta sugerencia?',
      recommendations: {
        stoic_morning: {
          title: 'Comienza tu día con intención',
          subtitle: 'Una práctica estoica de la mañana de 5 minutos',
          prompt: '¿Qué desafíos podrías enfrentar hoy? ¿Cómo respondería tu mejor yo con sabiduría, coraje, justicia y templanza?',
          reason: 'La preparación matutina te ayuda a anticipar el día y planificar respuestas virtuosas.',
        },
        stoic_evening: {
          title: 'Revisa tu día',
          subtitle: 'Reflexión honesta de la noche',
          prompt: '¿Qué hiciste bien hoy? ¿Dónde te quedaste corto? ¿Qué harás diferente mañana?',
          reason: 'La revisión nocturna apoya el aprendizaje del día sin autojuicio.',
        },
        self_compassion: {
          title: 'Sé amable contigo mismo',
          subtitle: 'Una revisión suave de autocompasión',
          prompt: '¿Qué es difícil ahora? Imagina a un amigo pasando por esto. ¿Qué palabras cálidas y de apoyo le ofrecerías?',
          reason: 'Tu estado de ánimo reciente ha sido bajo. La autocompasión es una forma gentil de explorar la autocrítica y la vergüenza sin juicio.',
        },
        gratitude: {
          title: 'Captura lo bueno',
          subtitle: 'Aprovecha el impulso positivo',
          prompt: '¿Por qué estás agradecido hoy? Nombra una persona, una experiencia y una cosa pequeña.',
          reason: 'Tu estado de ánimo reciente ha sido fuerte. La gratitud puede ayudar a saborear y reforzar momentos positivos.',
        },
        future_self: {
          title: 'Conecta con tus metas',
          subtitle: 'Visualización del yo futuro',
          prompt: 'Imagínate dentro de 3 meses habiendo hecho un progreso significativo. ¿Cuál es un pequeño paso que puedes dar esta semana?',
          reason: 'Tienes metas activas. Escribir sobre el yo futuro puede fortalecer la motivación y la planificación.',
        },
        expressive: {
          title: 'Escribe libremente hoy',
          subtitle: 'Despeja tu mente',
          prompt: 'Pon un temporizador de 5 minutos y escribe continuamente sobre lo que sea que esté en tu mente. No te preocupes por la gramática o estructura.',
          reason: 'La escritura expresiva puede ayudar a procesar pensamientos y sentimientos difíciles de nombrar.',
        },
        gratitude_fallback: {
          title: 'Momento de gratitud',
          subtitle: 'Una reflexión positiva rápida',
          prompt: 'Enumera tres cosas por las que estás agradecido ahora, y di brevemente por qué cada una importa.',
          reason: 'La práctica de gratitud es una forma sencilla y sin presión de mantener la constancia.',
        },
      },
    },
    frameworkInfo: {
      evidenceBase: 'Base de Evidencia',
      type: 'Tipo',
      howToPractice: 'Cómo practicar',
      frequency: 'Frecuencia',
      duration: 'Duración',
      gotIt: 'Entendido',
      learnMore: 'Más información sobre',
    },
    goals: {
      title: 'Metas',
      subtitle: 'Establece metas significativas y rastrea tu progreso',
      createNewGoal: 'Crear Nueva Meta',
      activeGoalsTitle: 'Metas Activas',
      activeGoalsDescription: 'Tus metas activas aparecerán aquí.',
      completedGoalsTitle: 'Metas Completadas',
      loading: 'Cargando metas...',
      empty: {
        title: 'Aún no hay metas activas',
        hint: 'Establece una meta para empezar a rastrear tu progreso',
      },
      stats: {
        active: 'Metas Activas',
        completed: 'Completadas',
        avgProgress: 'Progreso Promedio',
      },
      form: {
        title: 'Crear Nueva Meta',
        goalTitle: 'Título de la Meta',
        goalTitlePlaceholder: 'p. ej., Caminar 10,000 pasos diarios',
        description: 'Descripción',
        descriptionPlaceholder: '¿Por qué es importante esta meta para ti?',
        category: 'Categoría',
        timeframe: 'Plazo',
        startDate: 'Fecha de Inicio',
        targetDate: 'Fecha Objetivo',
        targetValue: 'Valor Objetivo',
        unit: 'Unidad (p. ej., pasos, páginas, minutos)',
        unitPlaceholder: 'pasos',
        smartElements: 'Elementos SMART',
        smartIntro: 'Basado en los criterios SMART de Doran (1981) y la teoría de fijación de metas de Locke y Latham. Hacer metas Específicas, Medibles, Alcanzables, Relevantes y con Tiempo definido mejora la claridad y el compromiso.',
        specific: 'Específico: ¿Qué harás exactamente?',
        specificPlaceholder: 'p. ej., Caminar afuera durante 30 minutos',
        measurable: 'Medible: ¿Cómo rastrearás el progreso?',
        measurablePlaceholder: 'p. ej., Rastrear pasos con mi teléfono',
        achievable: 'Alcanzable: ¿Por qué es realista?',
        achievablePlaceholder: 'p. ej., Ya camino 5,000 pasos',
        relevant: 'Relevante: ¿Por qué importa?',
        relevantPlaceholder: 'p. ej., Mejora mi energía y estado de ánimo',
        timeBound: 'Con Tiempo definido: ¿Cuándo lo harás?',
        timeBoundPlaceholder: 'p. ej., Cada mañana antes del trabajo',
        milestones: 'Hitos',
        addMilestone: 'Agregar hito',
        milestonePlaceholder: 'Descripción del hito',
        cancel: 'Cancelar',
        createGoal: 'Crear Meta',
      },
      card: {
        overdue: 'Atrasada',
        completed: 'Completada',
        updateProgress: 'Actualizar Progreso',
        update: 'Actualizar',
        smartElements: 'Elementos SMART',
        specific: 'Específico:',
        measurable: 'Medible:',
        achievable: 'Alcanzable:',
        relevant: 'Relevante:',
        timeBound: 'Con Tiempo definido:',
        milestones: 'Hitos',
        milestoneCount: 'Hitos: {completed}/{total} completados',
      },
      categories: {
        personal_growth: 'Crecimiento Personal',
        health: 'Salud',
        relationships: 'Relaciones',
        career: 'Carrera',
        financial: 'Finanzas',
        spiritual: 'Espiritual',
        creative: 'Creativo',
        educational: 'Educativo',
        contribution: 'Contribución',
      },
      timeframes: {
        daily: 'Diario',
        weekly: 'Semanal',
        monthly: 'Mensual',
        quarterly: 'Trimestral',
        yearly: 'Anual',
        long_term: 'Largo Plazo',
      },
    },
    progress: {
      title: 'Progreso',
      subtitle: 'Rastrea tu crecimiento y celebra tus logros',
      currentStreak: 'Racha Actual',
      currentStreakDescription: '¡Continúa para construir tu racha!',
      totalEntries: 'Total de Entradas',
      totalEntriesDescription: 'Comienza a escribir para rastrear tu progreso',
      yourProgress: 'Tu Progreso',
      yourProgressDescription: 'Tus análisis detallados de progreso aparecerán aquí mientras escribes.',
      stats: {
        totalTime: 'Tiempo Total',
        goalsDone: 'Metas Hechas',
      },
      weekly: {
        title: 'Esta Semana',
        entries: 'Entradas',
        words: 'Palabras',
        time: 'Tiempo',
      },
      moodTrends: 'Tendencias de Estado de Ánimo',
      frameworkUsage: 'Uso de Marcos',
      achievements: 'Logros',
      moodChart: {
        empty: 'Aún no hay datos de estado de ánimo. Comienza a escribir para ver tus tendencias.',
        labels: {
          overall: 'General',
          energy: 'Energía',
          stress: 'Estrés',
          focus: 'Enfoque',
        },
      },
      frameworkUsageComponent: {
        empty: 'Aún no hay uso de marcos. Prueba una entrada específica de un marco para ver tus patrones de práctica.',
        entry: 'entrada',
        entries: 'entradas',
      },
      achievementsComponent: {
        intro: 'Pequeñas celebraciones de tu constancia. Son recordatorios opcionales, no requisitos. Perder un día es parte de ser humano.',
        unlocked: 'Desbloqueado',
      },
      achievementList: {
        first_entry: {
          title: 'Primera Entrada',
          description: 'Escribe tu primera entrada de diario.',
        },
        three_day_streak: {
          title: 'Racha de Tres Días',
          description: 'Escribe en el diario tres días seguidos.',
        },
        seven_day_streak: {
          title: 'Racha de Siete Días',
          description: 'Escribe en el diario una semana seguida.',
        },
        writer_1000: {
          title: 'Mil Palabras',
          description: 'Escribe 1,000 palabras en todas tus entradas.',
        },
        goal_setter: {
          title: 'Fijador de Metas',
          description: 'Crea tu primera meta.',
        },
        goal_achiever: {
          title: 'Cumplidor de Metas',
          description: 'Completa tu primera meta.',
        },
        explorer: {
          title: 'Explorador de Marcos',
          description: 'Prueba tres marcos diferentes.',
        },
        monthly_dedication: {
          title: 'Dedicación Mensual',
          description: 'Escribe 30 días en total.',
        },
      },
    },
    practice: {
      title: 'Práctica',
      record: 'Registro',
      intentions: 'Intenciones',
      subtitle: 'Un registro de lo que hiciste, no un veredicto sobre ello.',
      switchDescription: 'Dos vistas de la misma práctica. La app abre en Registro; la última vista que usaste se recuerda.',
      currentRun: 'RACHA ACTUAL',
      daysInARow: 'días seguidos',
      lastFourWeeks: 'Últimas cuatro semanas.',
      longestRun: 'Racha más larga: {count} días, en {month}.',
      thisWeek: 'ESTA SEMANA',
      howTheDaysSat: 'CÓMO ESTUVIERON LOS DÍAS',
      stylesYouReachFor: 'ESTILOS A LOS QUE RECURRES',
      noData: 'Aún no hay datos. Empieza a escribir.',
      noSuggestions: 'Aún no hay sugerencias.',
      nothingSet: 'Nada establecido todavía.',
      setFirst: 'Establece tu primera intención',
      intentionDescription: 'Una intención es una oración que te gustaría que fuera cierta en un mes. Puedes cambiarla cuando deje de serlo.',
      whyItWorks: 'Las personas que escriben la intención, dónde y cuándo actuarán sobre ella, la siguen más a menudo que quienes solo la mantienen en mente. Esa es la única razón de que esta pantalla exista.',
      suggested: 'SUGERIDO DE TUS PÁGINAS',
      open: 'ABIERTAS',
      kept: 'CUMPLIDAS',
      average: 'PROMEDIO',
      newIntention: 'Nueva intención',
      newIntentionPlaceholder: 'p. ej. Escribir cuatro tardes a la semana',
      target: 'Objetivo',
      saveIntention: 'Guardar intención',
      deleteConfirm: '¿Eliminar esta intención? Esta acción no se puede deshacer.',
      keptIn: 'Cumplida en {month}',
      notStarted: 'Sin empezar',
      setIn: 'Establecida en {month}',
    },
    settings: {
      title: 'Tú',
      subtitle: 'Recordatorios, privacidad, exportación y ajustes de la cuenta',
      preferences: 'Preferencias',
      journalingPreferences: 'Preferencias de Diario',
      theme: 'Tema',
      light: 'Claro',
      dark: 'Oscuro',
      system: 'Sistema',
      dailyReminderTime: 'Hora del Recordatorio Diario',
      enableDailyReminders: 'Activar Recordatorios Diarios',
      defaultSessionDuration: 'Duración Predeterminada de Sesión (minutos)',
      minutes: 'minutos',
      morningPages: 'Páginas de la Mañana',
      morningPagesDescription: 'Mostrar una sugerencia en la app a las 7:00 am',
      eveningReview: 'Revisión Vespertina',
      monthlyReread: 'Relectura mensual',
      lastDayOfMonth: 'Mostrar una sugerencia en la app el último día del mes',
      eveningReminder: 'Recordatorio de la tarde',
      everyDayAt: 'Mostrar una sugerencia en la app todos los días a las 9:30 pm',
      appLock: 'Bloqueo de la app',
      faceIdOnOpen: 'Face ID al abrir',
      appLockGate: {
        title: 'Diario bloqueado',
        subtitle: 'Las apps web pueden usar un código. Face ID requiere una app nativa.',
        setPasscode: 'Crea un código de 4 dígitos',
        enterPasscode: 'Ingresa tu código',
        wrongPasscode: 'Código incorrecto. Inténtalo de nuevo.',
        unlock: 'Desbloquear',
      },
      hideEntryTextInPreviews: 'Ocultar texto de entradas en vistas previas',
      titlesOnlyOnPagesList: 'Solo títulos en la lista de Páginas',
      editOldEntries: 'Editar entradas antiguas',
      editOldEntriesDescription: 'Permitir editar páginas después de guardarlas',
      data: 'Datos',
      exportData: 'Exportar todas las páginas',
      clearAllData: 'Borrar todo',
      deleteEverything: 'Borrar todo',
      language: 'Idioma',
      english: 'English',
      spanish: 'Español',
      profile: 'Perfil',
      anonymous: 'Tú',
      writingSince: 'escribiendo desde {date}',
      readingAndWriting: 'Lectura y Escritura',
      appearance: 'Apariencia',
      defaultSession: 'Sesión predeterminada',
      reminders: 'Recordatorios',
      privacy: 'Privacidad',
      yourWriting: 'Tu Escritura',
      account: 'Cuenta',
      notSignedIn: 'No has iniciado sesión',
      signedInAs: 'Sesión iniciada como {email}',
      signInDescription: 'Inicia sesión para respaldar y sincronizar tus páginas con tu cuenta de Google.',
      signOutDescription: 'Cerrar sesión mantiene tus páginas en este dispositivo.',
      signIn: 'Iniciar sesión con Google',
      signOut: 'Cerrar sesión',
      provider: 'Proveedor: Google',
      uid: 'UID',
      replayOnboarding: 'Repetir introducción',
      clearDataWarning: 'El borrado es inmediato y no se puede deshacer. No guardamos copia.',
      clearModal: {
        title: '¿Borrar todos los datos?',
        description: 'Esto eliminará permanentemente todas tus entradas de diario, metas y datos de progreso.',
        cloudWarning: 'Has iniciado sesión como {email}. Esto también borrará tus datos de la nube de Firebase.',
        localOnlyWarning: 'No has iniciado sesión. Esto solo borrará los datos almacenados en este dispositivo.',
        cleared: 'Tus datos han sido borrados.',
        cancel: 'Cancelar',
        clearData: 'Borrar Datos',
      },
    },
    appUpdate: {
      title: 'Actualización disponible',
      message: 'Hay una nueva versión de la app. Actualiza para usarla.',
      now: 'Actualizar ahora',
    },
    evolution: {
      title: 'Tu camino',
      level: 'Nivel',
      next: 'Siguiente',
      requirement: 'para desbloquear',
      entries: 'páginas',
      styles: 'estilos probados',
      intentions: 'intenciones cumplidas',
      streak: 'racha de días',
      unlocked: 'Desbloqueado',
      levels: [
        { title: 'Principiante', description: 'Empieza con escritura libre y gratitud.' },
        { title: 'Construyendo', description: 'Añade estructura con TCC y autocompasión.' },
        { title: 'Intermedio', description: 'Prueba la reflexión estoica y confuciana.' },
        { title: 'Avanzado', description: 'Trabaja en tu futuro yo y la reflexión profunda.' },
        { title: 'Maestría', description: 'Explora tradiciones y valores más profundos.' },
        { title: 'Sabio', description: 'Tienes una práctica madura y consistente.' },
      ],
    },
    onboarding: {
      step1Title: 'Bienvenido a Journal',
      step1Description: 'Un espacio privado de journaling informado por la investigación. Cada método se inspira en investigación o está claramente marcado como tradición.',
      step2Title: 'Una página al día',
      step2Description: 'Empieza desde Hoy. La app sugiere un estilo según la hora del día y tus intenciones abiertas. Solo escribe unos minutos.',
      step3Title: 'Tu práctica',
      step3Description: 'Sigue tu racha, establece intenciones y mira tu camino. Cuanto más escribes, más estilos y marcos profundos desbloqueas.',
      step4Title: 'Honesto y privado',
      step4Description: 'Tus páginas se quedan en este dispositivo. Inicia sesión para conectar tu cuenta. Exporta o borra cuando quieras.',
      step: 'Paso {current} de {total}',
      next: 'Siguiente',
      back: 'Atrás',
      getStarted: 'Empezar',
      skip: 'Saltar onboarding',
    },
    notFound: {
      title: 'Página no encontrada',
      description: 'La página que buscas no existe.',
      home: 'Ir a Hoy',
    },
    common: {
      cancel: 'Cancelar',
      back: 'Atrás',
      save: 'Guardar',
      edit: 'Editar',
      more: 'Más acciones',
      saving: 'Guardando...',
      close: 'Cerrar',
      hint: 'Consejo',
      search: 'Buscar',
      style: 'Estilo',
      all: 'Todos los estilos',
      of: 'de',
      pages: 'páginas',
      words: 'palabras',
    },
    newEntry: {
      title: 'Nueva Entrada de Diario',
      stepOf: 'Paso {step} de 3',
      whatDoYouNeed: '¿Qué necesitas hoy?',
      whatDoYouNeedDescription: 'Elige un estilo de diario. Cada uno tiene guías inspiradas en investigación o tradición.',
      searchPlaceholder: 'Buscar tipos de entrada...',
      moreInfo: 'Más sobre {style}',
      alreadyToday: 'Ya hoy',
      alreadyTodayDescription: 'Ya escribiste este estilo hoy. Cada estilo está pensado para usarse una vez al día. Elige otro o vuelve mañana.',
      unlocksAt: 'Se desbloquea en el nivel {level}',
      availableNow: 'Disponible ahora',
      favorite: 'Añadir a favoritos',
      unfavorite: 'Quitar de favoritos',
      showCommon: 'Mostrar solo opciones comunes',
      showAll: 'Mostrar todas las {count} opciones',
      applyFramework: 'Aplicar un Marco (opcional)',
      noFramework: 'Sin marco específico, solo usar el tipo de entrada',
      frameworkHelp: 'Los marcos añaden guías de investigaciones o tradiciones. La mayoría de las veces, el tipo de entrada es suficiente. Toca el ícono de información una vez que selecciones uno para saber más.',
      startWriting: 'Empezar a Escribir',
      continue: 'Continuar',
      chosenStyle: 'Estilo elegido',
      autosaving: 'Guardando automáticamente',
      startAnywhere: 'Empieza donde quieras...',
      whyThisWorks: 'En qué se basa',
      evidence: 'Evidencia de investigación y tradición',
      leaveDraft: 'Tu borrador no se guardará.',
      leaveTitle: '¿Salir de esta entrada?',
      leave: 'Salir',
      defaultSession: 'Sesión predeterminada',
      bestUsedFor: 'Mejor para:',
      yourEntry: 'Tu Entrada',
      wordCount: '{count} palabras',
      howAreYouFeeling: '¿Cómo te sientes?',
      mood: {
        overall: 'Estado de Ánimo General',
        energy: 'Nivel de Energía',
        stress: 'Nivel de Estrés',
        focus: 'Nivel de Enfoque',
      },
      contentPlaceholders: {
        expressive: 'Empieza a escribir tus pensamientos aquí...',
        future_self: 'Usa este espacio para escribir una reflexión o resumen basado en las guías anteriores. Esto es lo que se guarda como tu entrada principal.',
        cbt: 'Resume la situación y lo que aprendiste del registro de pensamientos. Esto es lo que se guarda como tu entrada principal.',
        gratitude: 'Escribe una reflexión de gratitud libre, o resume los elementos anteriores. Esto es lo que se guarda como tu entrada principal.',
        self_compassion: 'Escribe una reflexión libre sobre la dificultad y tu respuesta amable. Esto es lo que se guarda como tu entrada principal.',
        stoic_morning: 'Escribe una reflexión libre sobre tu práctica estoica de la mañana. Esto es lo que se guarda como tu entrada principal.',
        stoic_evening: 'Escribe una reflexión libre sobre tu revisión estoica de la noche. Esto es lo que se guarda como tu entrada principal.',
        confucian: 'Escribe una reflexión libre sobre tu autoexamen confuciano. Esto es lo que se guarda como tu entrada principal.',
        zen: 'Empieza a escribir tus pensamientos aquí...',
        islamic: 'Empieza a escribir tus pensamientos aquí...',
        vedanta: 'Empieza a escribir tus pensamientos aquí...',
        morning_pages: 'Empieza a escribir tus pensamientos aquí...',
        bullet_journal: 'Empieza a escribir tus pensamientos aquí...',
        custom: 'Empieza a escribir tus pensamientos aquí...',
      },
      save: 'Guardar Entrada',
      saving: 'Guardando...',
      saveSuccess: '¡Entrada guardada con éxito!',
      saveError: 'Error al guardar la entrada: {message}',
      emptyError: 'Escribe algo antes de guardar.',
    },
    homeHero: {
      day: 'día',
      days: 'días',
      minute: 'minuto',
      minutes: 'minutos',
      wordsLabel: 'palabras',
      awayShort: 'un tiempo',
      awayLong: 'quince días',
      unknownTopic: 'lo último que escribiste',
      deviceOnly: 'este dispositivo',
      cloudAndDevice: 'tu cuenta y este dispositivo',
      states: {
        coldStart: {
          eyebrow: 'Diario',
          title: 'Empieza con una frase *honesta*.',
          body: 'Aún no hay cuenta. Nada de lo que escribas sale de este teléfono hasta que lo pidas.',
          cta: 'Escribir mi primera página',
          note: 'Los prompts vienen de escritura expresiva, CBT y práctica estoica. Puedes leer la investigación detrás de cada uno antes de escribir.',
        },
        morning: {
          eyebrow: '{{date}} · Día {{dayCount}}',
          title: '¿Qué *llevas* a tu día?',
          subhead: 'Esta mañana · 5 min',
          body: 'Nombra el estado de ánimo, luego una cosa que vas a hacer al respecto.',
          cta: 'Empezar a escribir',
          secondary: 'Otra',
        },
        midday: {
          eyebrow: '{{date}} · Día {{dayCount}}',
          title: '¿Hay algo en tu mente *ahora*?',
          body: 'El mediodía es para lo que no puedes soltar, no para una práctica. Dos minutos son una página.',
          cta: 'Abrir una página en blanco',
          secondary: 'Elegir estilo',
        },
        evening: {
          eyebrow: '{{date}} · Día {{dayCount}}',
          title: '¿Qué te *pidió* hoy?',
          subhead: 'Práctica de esta noche · 10 min',
          body: 'Nombra una cosa que manejaste bien, una que harías diferente, y una que puedes soltar.',
          cta: 'Empezar a escribir',
          secondary: 'Otra',
        },
        late: {
          eyebrow: '{{weekday}} · {{time}}',
          title: 'Déjalo y *duérmete* sobre ello.',
          body: 'Tres líneas son suficientes esta noche. La versión larga puede esperar hasta mañana.',
          cta: 'Escribir tres líneas',
          secondary: 'Esta noche no',
          note: 'Nada se reinicia si lo saltas. Tu racha cuenta los días que escribiste, no los que no fallaste.',
        },
        written: {
          eyebrow: '{{date}} · Día {{dayCount}}',
          title: 'Escrito. *{{dayCount}} {{dayText}}* de páginas detrás de ti.',
          body: '{{typeLabel}}, {{time}} — {{words}} {{wordsLabel}} en {{minutes}} {{minutesLabel}}.',
          cta: 'Agregar a hoy',
          secondary: 'Leerla de nuevo',
          note: 'Tu página está guardada en {{where}}.',
        },
        unfinished: {
          eyebrow: '{{date}}',
          title: 'Dejaste algo a *medias*.',
          body: 'Empezado el {{draftDay}} · {{draftWords}} {{wordsLabel}} · {{draftType}}',
          cta: 'Terminarla',
          secondary: 'Empezar algo nuevo',
          note: 'Tienes un borrador en progreso. Termínalo o empieza algo nuevo.',
        },
        return: {
          eyebrow: '{{date}}',
          title: 'Ha pasado *{{away}}*. Empieza donde estás.',
          body: 'No hay nada que ponerte al día. Lo último que escribiste fue sobre {{lastTopic}} — puedes retomarlo o dejarlo.',
          cta: 'Escribir la página de hoy',
          secondary: 'Releer esa',
          note: 'Sin página en una semana. Nunca menciones la racha rota.',
        },
      },
    },
    entryTypes: {
      expressive: {
        label: 'Escritura Expresiva',
        description: 'Escribe libremente sobre emociones, experiencias o lo que tengas en mente.',
        useFor: 'Procesar sentimientos, desahogarte, autodescubrimiento',
      },
      future_self: {
        label: 'Visión del Yo Futuro',
        description: 'Imagina dónde quieres estar en 3, 6 y 12 meses.',
        useFor: 'Manifestación, establecimiento de metas, planificación de visión',
      },
      cbt: {
        label: 'Registro de Pensamientos TCC',
        description: 'Explora pensamientos ansiosos o negativos examinando la evidencia.',
        useFor: 'Pensamientos ansiosos, pensamientos intrusivos, reformulación cognitiva',
      },
      gratitude: {
        label: 'Gratitud',
        description: 'Enumera lo que agradeces y por qué.',
        useFor: 'Cambiar perspectiva, cultivar aprecio',
      },
      self_compassion: {
        label: 'Autocompasión',
        description: 'Trátate con la amabilidad que ofrecerías a un amigo.',
        useFor: 'Autocrítica, vergüenza, emociones difíciles',
      },
      stoic_morning: {
        label: 'Mañana Estoica',
        description: 'Prepárate para el día y planea respuestas virtuosas.',
        useFor: 'Rutina matutina, resiliencia anticipatoria',
      },
      stoic_evening: {
        label: 'Noche Estoica',
        description: 'Revisa el día con honestidad: aciertos, fallas, lecciones.',
        useFor: 'Reflexión nocturna, revisión diaria',
      },
      confucian: {
        label: 'Examen Confuciano',
        description: 'Evalúa y reflexiona sobre lealtad, confiabilidad y práctica.',
        useFor: 'Revisión de carácter, autoexamen tradicional',
      },
      zen: {
        label: 'Reflexión Zen',
        description: 'Observa pensamientos y experiencias con atención plena.',
        useFor: 'Atención plena, consciencia del momento presente',
      },
      islamic: {
        label: 'Muhasaba Islámica',
        description: 'Auto-responsabilidad y revisión espiritual.',
        useFor: 'Reflexión espiritual, responsabilidad',
      },
      vedanta: {
        label: 'Autoindagación Vedanta',
        description: 'Pregúntate "¿Quién soy?" y explora la naturaleza del yo.',
        useFor: 'Autoindagación profunda, exploración espiritual',
      },
      morning_pages: {
        label: 'Páginas de la Mañana',
        description: 'Tres páginas de escritura consciente sin filtros.',
        useFor: 'Desbloqueo creativo, ritual matutino',
      },
      bullet_journal: {
        label: 'Bullet Journal',
        description: 'Entradas cortas y estructuradas con tareas y registro rápido.',
        useFor: 'Productividad, planificación diaria, captura rápida',
      },
      custom: {
        label: 'Personalizado',
        description: 'Una entrada en blanco sin marco específico.',
        useFor: 'Escritura libre, diario no estructurado',
      },
    },
    frameworks: {
      expressive: {
        title: 'Escritura Expresiva',
        fields: {
          topic: {
            label: 'Tema o Enfoque',
            placeholder: 'p. ej., Un desafío reciente, un recuerdo, un miedo...',
          },
          emotionalDepth: {
            label: 'Profundidad Emocional (1-10)',
            low: 'Superficial',
            high: 'Muy emocional',
          },
          catharsis: {
            label: 'Cataris / Liberación (1-10)',
            low: 'Sin liberación',
            high: 'Fuerte liberación',
          },
        },
      },
      future_self: {
        title: 'Visión del Yo Futuro',
        fields: {
          presentState: {
            label: '¿Dónde estás ahora?',
            placeholder: 'Describe tu situación actual con honestidad. ¿Qué funciona y qué se siente estancado?',
          },
          threeMonthVision: {
            label: 'Yo Futuro a 3 Meses',
            placeholder: 'Imagínate dentro de 3 meses. ¿Qué ha cambiado? ¿Cómo te sientes? ¿Qué estás haciendo?',
          },
          sixMonthVision: {
            label: 'Yo Futuro a 6 Meses',
            placeholder: 'Mira más allá. ¿Qué hitos has alcanzado? ¿En qué tipo de persona te estás convirtiendo?',
          },
          twelveMonthVision: {
            label: 'Yo Futuro a 12 Meses',
            placeholder: 'Dentro de un año. ¿Cómo luce tu vida? Sé específico pero flexible. Es una dirección, no un contrato.',
          },
          obstacles: {
            label: 'Obstáculos Probables',
            placeholder: '¿Qué podría interponerse? Nombrar los obstáculos de antemano los hace más manejables.',
          },
          supportNeeded: {
            label: 'Apoyo que Necesitarás',
            placeholder: 'Personas, hábitos, recursos o cambios de mentalidad que te ayudarán a avanzar hacia esta visión.',
          },
          weeklyAction: {
            label: 'Una Acción Esta Semana',
            placeholder: '¿Cuál es un pequeño paso concreto que puedes dar esta semana? (Que sea pequeño y factible).',
          },
        },
      },
      cbt: {
        title: 'Registro de Pensamientos TCC',
        fields: {
          situation: {
            label: 'Situación',
            placeholder: 'Describe qué pasó, dónde estabas y quién estuvo involucrado...',
          },
          automaticThoughts: {
            label: 'Pensamientos Automáticos',
            placeholder: '¿Qué pensamiento pasó por tu mente?',
          },
          emotions: {
            label: 'Emociones e Intensidad',
            emotionPlaceholder: 'Emoción (p. ej., ansiedad, tristeza)',
            addEmotion: '+ Agregar emoción',
          },
          evidenceFor: {
            label: 'Evidencia a Favor del Pensamiento',
            placeholder: '¿Qué evidencia apoya este pensamiento?',
          },
          evidenceAgainst: {
            label: 'Evidencia en Contra del Pensamiento',
            placeholder: '¿Qué evidencia contradice este pensamiento?',
          },
          balancedPerspective: {
            label: 'Perspectiva Equilibrada',
            placeholder: 'Dada la evidencia a favor y en contra, ¿cuál es una forma más equilibrada de ver esta situación?',
          },
          finalEmotionRating: {
            label: 'Calificación Final de la Emoción (1-10)',
          },
        },
        addAnother: '+ Agregar otro',
      },
      gratitude: {
        title: 'Práctica de Gratitud',
        intro: 'Enumera personas, experiencias, oportunidades o cosas por las que sientes gratitud hoy. La investigación sugiere que llevar un diario de gratitud puede apoyar el bienestar, aunque los efectos varían según la persona y el contexto.',
        item: {
          title: 'Gratitud #',
          placeholder: 'Estoy agradecido por...',
          detailPlaceholder: '¿Por qué estás agradecido por esto? ¿Cómo afecta tu vida? (opcional)',
        },
        types: {
          person: 'Persona',
          experience: 'Experiencia',
          opportunity: 'Oportunidad',
          thing: 'Cosa',
        },
        addItem: '+ Agregar item de gratitud',
        recipient: {
          label: 'Destinatario de la Carta de Gratitud (opcional)',
          hint: 'Alguien a quien quieras expresar gratitud',
          placeholder: 'Alguien a quien quieras expresar gratitud',
        },
      },
      self_compassion: {
        title: 'Escritura de Autocompasión',
        intro: 'Trabaja una dificultad usando los tres componentes de la autocompasión. Este ejercicio es para reflexión y apoyo emocional, no sustituye la terapia.',
        fields: {
          stressfulEvent: {
            label: 'Evento Estresante',
            placeholder: 'Describe una dificultad, un error o una experiencia dolorosa que estés enfrentando...',
            description: 'Identifica la situación con la que quieres trabajar, como lo harías en una carta o ejercicio de autocompasión.',
          },
          mindfulnessObservation: {
            label: 'Atención Plena: Observa sin Juzgar',
            placeholder: '¿Qué pensamientos y emociones están presentes? ¿Puedes notarlos sin reprimirlos o exagerarlos?',
            description: 'Neff (2003b) identifica la atención plena como el primer componente de la autocompasión: conciencia equilibrada de experiencias dolorosas.',
          },
          commonHumanity: {
            label: 'Humanidad Común: No Estás Solo',
            placeholder: '¿Cómo forma parte de la experiencia humana compartida esta lucha? ¿Quién más podría sentirse así?',
            description: 'La autocompasión implica reconocer el sufrimiento como parte de la condición humana, no aislarse. Ver Kristin Neff, Self-Compassion (2011).',
          },
          kindResponse: {
            label: 'Amabilidad Hacia Uno Mismo: ¿Qué Le Dirías a un Amigo?',
            placeholder: '¿Qué palabras cariñosas, de apoyo y aliento te ofrecerías a ti mismo?',
            description: 'Neff describe la amabilidad hacia uno mismo como extenderse la misma calidez y comprensión que a un buen amigo.',
          },
        },
      },
      stoic: {
        title: {
          morning: 'Preparación Estoica de la Mañana',
          evening: 'Revisión Estoica de la Noche',
        },
        morning: 'Mañana',
        evening: 'Noche',
        intro: {
          morning: 'Basado en la práctica estoica de la mañana (premeditatio malorum): anticipa los desafíos que puedas enfrentar hoy y planea cómo responder con virtud.',
          evening: 'Basado en la revisión estoica de la noche: reflexiona sobre tu día con honestidad, notando lo que salió bien, lo que no y qué puedes aprender.',
        },
        fields: {
          challengesAnticipated: {
            label: 'Desafíos que Podrías Enfrentar Hoy',
            placeholder: '¿Qué dificultad podría surgir hoy?',
          },
          virtuousResponses: {
            label: 'Respuestas Virtuosas',
            placeholder: '¿Cómo responderás con sabiduría, coraje, justicia o templanza?',
          },
          successes: {
            label: 'Aciertos',
            placeholder: '¿Qué hiciste bien hoy?',
          },
          failures: {
            label: 'Fallos u Oportunidades Perdidas',
            placeholder: '¿Dónde no estuviste a la altura de tus valores?',
          },
          lessons: {
            label: 'Lecciones para Mañana',
            placeholder: '¿Qué harás diferente mañana?',
          },
        },
        addAnother: '+ Agregar otro',
      },
      confucian: {
        title: 'Autoexamen Confuciano',
        source: 'Fuente: Analectas 1.4',
        quote: '"Me examino a mí mismo en tres cosas: en lo que he emprendido en nombre de otros, ¿he hecho lo mejor que puedo? En mis tratos con mis amigos, ¿he sido confiable? ¿Y he practicado lo que se me ha transmitido?"',
        citation: 'Traducción basada en Roger T. Ames y Henry Rosemont, Jr., The Analects of Confucius: A Philosophical Translation (1998).',
        intro: 'Evalúate y reflexiona sobre cada una de las tres dimensiones confucianas. Esta es una práctica de reflexión tradicional, no una evaluación clínica.',
        dimensions: {
          loyalty: {
            label: 'Lealtad / Devoción (忠, zhōng)',
            question: 'En lo que he emprendido en nombre de otros, ¿he hecho lo mejor que puedo?',
            description: 'Basado en Analectas 1.4: "Me examino a mí mismo en tres cosas." Esta es una práctica confuciana tradicional de autoexamen, no una intervención clínica.',
          },
          trustworthiness: {
            label: 'Confiabilidad (信, xìn)',
            question: 'En mis tratos con amigos y otros, ¿he sido confiable?',
            description: 'Confucio enfatiza la confiabilidad como una virtud central. La autoevaluación aquí es para reflexión, no diagnóstico.',
          },
          practice: {
            label: 'Práctica / Aprendizaje (習, xí)',
            question: '¿Practiqué lo que he aprendido? Califícate de 1 a 10 y reflexiona sobre cómo aplicar mejor el conocimiento.',
            description: 'La autocuscación confuciana implica revisar si se aplica lo que se aprende.',
          },
        },
        rating: 'Calificación (1-10)',
        reflection: {
          label: 'Reflexión',
          hint: '¿Qué hiciste bien? ¿Dónde puedes mejorar?',
          placeholder: '¿Qué hiciste bien? ¿Dónde puedes mejorar?',
        },
      },
    },
  },
};

export const defaultLanguage: Language = 'en';