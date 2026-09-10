// Internationalization (i18n) configuration
// Supports English (default) and Spanish

import type { EntryType } from '@/types';

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
  common: {
    cancel: string;
    back: string;
    save: string;
    saving: string;
    close: string;
    hint: string;
    search: string;
    words: string;
  };
  newEntry: {
    title: string;
    stepOf: string;
    whatDoYouNeed: string;
    whatDoYouNeedDescription: string;
    searchPlaceholder: string;
    showCommon: string;
    showAll: string;
    applyFramework: string;
    noFramework: string;
    frameworkHelp: string;
    startWriting: string;
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
  };
  entryTypes: Record<EntryType, { label: string; description: string; useFor: string }>;
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
    common: {
      cancel: 'Cancel',
      back: 'Back',
      save: 'Save',
      saving: 'Saving...',
      close: 'Close',
      hint: 'Hint',
      search: 'Search',
      words: 'words',
    },
    newEntry: {
      title: 'New Journal Entry',
      stepOf: 'Step {step} of 3',
      whatDoYouNeed: 'What do you need today?',
      whatDoYouNeedDescription: 'Pick a journaling style. Each has guided prompts backed by research or tradition.',
      searchPlaceholder: 'Search entry types...',
      showCommon: 'Show only common options',
      showAll: 'Show all {count} entry types',
      applyFramework: 'Apply a Research Framework (optional)',
      noFramework: 'No specific framework, just use the entry type',
      frameworkHelp: 'Frameworks add curated prompts from specific research or traditions. Most of the time, the entry type itself is enough. Tap the info icon once you select one to learn more.',
      startWriting: 'Start Writing',
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
        description: 'Challenge anxious or negative thoughts with evidence.',
        useFor: 'Anxiety, intrusive thoughts, cognitive reframing',
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
    common: {
      cancel: 'Cancelar',
      back: 'Atrás',
      save: 'Guardar',
      saving: 'Guardando...',
      close: 'Cerrar',
      hint: 'Consejo',
      search: 'Buscar',
      words: 'palabras',
    },
    newEntry: {
      title: 'Nueva Entrada de Diario',
      stepOf: 'Paso {step} de 3',
      whatDoYouNeed: '¿Qué necesitas hoy?',
      whatDoYouNeedDescription: 'Elige un estilo de diario. Cada uno tiene guías respaldadas por investigación o tradición.',
      searchPlaceholder: 'Buscar tipos de entrada...',
      showCommon: 'Mostrar solo opciones comunes',
      showAll: 'Mostrar todas las {count} opciones',
      applyFramework: 'Aplicar un Marco de Investigación (opcional)',
      noFramework: 'Sin marco específico, solo usar el tipo de entrada',
      frameworkHelp: 'Los marcos añaden guías de investigaciones o tradiciones específicas. La mayoría de las veces, el tipo de entrada es suficiente. Toca el ícono de información una vez que selecciones uno para saber más.',
      startWriting: 'Empezar a Escribir',
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
        description: 'Desafía pensamientos ansiosos o negativos con evidencia.',
        useFor: 'Ansiedad, pensamientos intrusivos, reformulación cognitiva',
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
  },
};

export const defaultLanguage: Language = 'en';