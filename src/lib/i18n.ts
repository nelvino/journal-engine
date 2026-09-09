// Internationalization (i18n) configuration
// Supports English (default) and Spanish

export type Language = 'en' | 'es';

export interface Translations {
  nav: {
    home: string;
    journal: string;
    goals: string;
    progress: string;
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
    todaysEntry: string;
    todaysEntryDescription: string;
    startNewEntry: string;
    recentEntries: string;
    recentEntriesDescription: string;
  };
  goals: {
    title: string;
    setGoals: string;
    setGoalsDescription: string;
    createNewGoal: string;
    activeGoals: string;
    activeGoalsDescription: string;
  };
  progress: {
    title: string;
    currentStreak: string;
    currentStreakDescription: string;
    totalEntries: string;
    totalEntriesDescription: string;
    yourProgress: string;
    yourProgressDescription: string;
  };
  settings: {
    title: string;
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
    eveningReview: string;
    data: string;
    exportData: string;
    clearAllData: string;
    language: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      journal: 'Journal',
      goals: 'Goals',
      progress: 'Progress',
      settings: 'Settings',
    },
    home: {
      welcome: 'Lets start Journaling',
      subtitle: 'Evidence-based personal development through journaling. Combining modern scientific research with ancient wisdom traditions to create an adaptive system that evolves with you.',
      startJournaling: 'Start Journaling',
      learnMore: 'Learn More',
      scienceBased: {
        title: 'Science-Based',
        description: 'Backed by peer-reviewed research from expressive writing, CBT, gratitude interventions, and more.',
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
      todaysEntry: "Today's Journal Entry",
      todaysEntryDescription: 'Start your journaling practice with evidence-based prompts and frameworks.',
      startNewEntry: 'Start New Entry',
      recentEntries: 'Recent Entries',
      recentEntriesDescription: 'Your recent journal entries will appear here.',
    },
    goals: {
      title: 'Goals',
      setGoals: 'Set Your Goals',
      setGoalsDescription: 'Create SMART goals and track your progress over time.',
      createNewGoal: 'Create New Goal',
      activeGoals: 'Active Goals',
      activeGoalsDescription: 'Your active goals will appear here.',
    },
    progress: {
      title: 'Progress',
      currentStreak: 'Current Streak',
      currentStreakDescription: 'Keep going to build your streak!',
      totalEntries: 'Total Entries',
      totalEntriesDescription: 'Start journaling to track your progress',
      yourProgress: 'Your Progress',
      yourProgressDescription: 'Your detailed progress analytics will appear here as you journal.',
    },
    settings: {
      title: 'Settings',
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
      eveningReview: 'Evening Review',
      data: 'Data',
      exportData: 'Export Data',
      clearAllData: 'Clear All Data',
      language: 'Language',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      journal: 'Diario',
      goals: 'Metas',
      progress: 'Progreso',
      settings: 'Configuración',
    },
    home: {
      welcome: 'Empecemos a escribir!',
      subtitle: 'Desarrollo personal basado en evidencia a través del diario. Combinando investigación científica moderna con tradiciones de sabiduría antigua para crear un sistema adaptativo que evoluciona contigo.',
      startJournaling: 'Comenzar a Escribir',
      learnMore: 'Más Información',
      scienceBased: {
        title: 'Basado en Ciencia',
        description: 'Respaldado por investigación revisada por pares en escritura expresiva, TCC, intervenciones de gratitud y más.',
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
      todaysEntry: 'Entrada de Hoy',
      todaysEntryDescription: 'Comienza tu práctica de diario con preguntas basadas en evidencia y marcos de trabajo.',
      startNewEntry: 'Nueva Entrada',
      recentEntries: 'Entradas Recientes',
      recentEntriesDescription: 'Tus entradas recientes aparecerán aquí.',
    },
    goals: {
      title: 'Metas',
      setGoals: 'Establece tus Metas',
      setGoalsDescription: 'Crea metas SMART y rastrea tu progreso con el tiempo.',
      createNewGoal: 'Crear Nueva Meta',
      activeGoals: 'Metas Activas',
      activeGoalsDescription: 'Tus metas activas aparecerán aquí.',
    },
    progress: {
      title: 'Progreso',
      currentStreak: 'Racha Actual',
      currentStreakDescription: '¡Continúa para construir tu racha!',
      totalEntries: 'Total de Entradas',
      totalEntriesDescription: 'Comienza a escribir para rastrear tu progreso',
      yourProgress: 'Tu Progreso',
      yourProgressDescription: 'Tus análisis detallados de progreso aparecerán aquí mientras escribes.',
    },
    settings: {
      title: 'Configuración',
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
      eveningReview: 'Revisión Vespertina',
      data: 'Datos',
      exportData: 'Exportar Datos',
      clearAllData: 'Borrar Todos los Datos',
      language: 'Idioma',
    },
  },
};

export const defaultLanguage: Language = 'en';