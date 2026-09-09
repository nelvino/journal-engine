# Implementation Plan

## Project Overview

**Journal Engine** is a personal, evidence-based journaling and personal-development web application designed for daily use, especially during a short morning session (approximately 10 minutes). It combines modern scientific research with traditional wisdom practices, while clearly distinguishing evidence-based claims from cultural traditions and unvalidated popular practices.

**Core Values:**
- Never fabricate facts, quotes, or citations
- Distinguish clinical evidence from tradition, interpretation, and product experimentation
- Prioritize practical daily usability over excessive complexity
- Build foundations that make future authentication and cloud storage easy
- Support progressive evolution: the app adapts with the user's practice

---

## Current State

### What Works Now

#### ✅ Infrastructure
- Next.js 16.3.4 with App Router and TypeScript
- Tailwind CSS 4 with custom design system
- React 19.2.8
- Storage abstraction layer (localStorage and Firestore adapters)
- Firebase Auth and Firestore integration (enabled via env vars)
- Google sign-in button in header
- Complete TypeScript types for users, entries, goals, progress, prompts, frameworks
- Theme system: light/dark/system, default light, persists to localStorage
- Internationalization: English and Spanish, default English
- Testing: Jest + React Testing Library

#### ✅ Design System
- Soft, harmonious color palette (sage/teal primary, warm secondary, lavender accent)
- Mobile-first responsive design
- Reusable components: Button, Input, Card, Toggle, Select, Typography
- Semantic CSS variables for theme-aware colors
- Beautiful but functional UI with solid contrast

#### ✅ Pages
- Home with hero, daily prompt, and feature cards
- Journal with Quick Start journeys, daily prompt, and recent entries
- `/journal/new` three-step entry creation wizard
- Goals page with SMART goal creation, tracking, and milestones
- Progress with stats, mood charts, framework usage, and achievements
- Settings with theme, language, reminders, profile, and data management

#### ✅ Core Journaling
- Journal entry creation with 12+ entry types
- Framework selection with info modals
- Text area with real-time word count
- Mood selector (overall, energy, stress, focus, 1-10)
- Session duration tracking
- localStorage and Firestore persistence
- Entry deletion
- Quick Start journey cards
- Entry type search and descriptions

#### ✅ Framework-Specific Forms
- CBT Thought Record (situation, automatic thoughts, emotions, evidence for/against, balanced perspective, final rating)
- Gratitude Entry (items with type and detail, optional recipient)
- Stoic Practice (morning preparation / evening review toggle)
- Confucian Self-Examination
- Self-Compassion writing
- Expressive Writing with emotional depth tracking
- Future Self Vision (3, 6, 12 month planning)

#### ✅ Progress Tracking
- `ProgressContext` calculates current streak, longest streak, total entries, total words, total minutes
- Progress page displays current streak and total entries
- Weekly statistics
- Mood trend charts
- Framework usage breakdown
- Achievement system (gentle, non-shaming)

#### ✅ Documentation
- This implementation plan
- `docs/FEATURE_STATUS.md`
- `docs/README.md`
- `docs/FIREBASE_SETUP.md`
- `docs/DEPLOYMENT.md`
- Source code organized with clear separation (components, data, lib, context, types)

---

## What's Missing / Next Steps

### ✅ Recently Completed

1. **Goal System** (complete)
2. **Framework Forms** (CBT, gratitude, stoic, confucian, self-compassion, expressive, future self vision)
3. **Enhanced Progress** (mood charts, framework usage, achievements)
4. **Firebase Auth + Firestore** (code complete, needs console setup)
5. **Adaptive Guidance** (daily prompts, recommendation engine)
6. **Onboarding + UX Polish** (wizard, quick start, framework info modals, user profile)

### 🎯 Next Priorities

1. **Data Export**
   - JSON/CSV export of journal entries, goals, and progress
   - Import from backup

2. **Accessibility & Quality**
   - Screen reader and keyboard navigation audit
   - E2E tests
   - Error boundaries and recovery

3. **Reminders & Engagement**
   - Push notifications for daily reminders
   - Follow-up prompts after entries
   - Email or browser notifications

### 🔥 Critical for Real Use

4. **Data Persistence & Sync**
   - ✅ Firebase project config abstraction
   - ✅ Google authentication integration
   - ✅ Firestore storage adapter
   - ✅ Lazy Firebase initialization (safe for static builds)
   - ⏳ Firestore security rules must be added in console
   - ⏳ Data export/import UI
   - ⏳ Robust offline support and conflict resolution

5. **Adaptive Guidance System (Advanced)**
   - ⏳ Progressive difficulty tiers
   - ⏳ Follow-up reminders and gentle nudges
   - ⏳ Advanced framework recommendations

6. **User Experience Polish**
   - ⏳ Better mobile navigation
   - ⏳ PWA support
   - ⏳ Accessibility improvements

### 🚀 Production Readiness

7. **Testing & Quality**
   - ✅ Component tests for core contexts and UI
   - ⏳ E2E tests
   - ⏳ Performance optimization
   - ⏳ Error boundaries and recovery

8. **Deployment**
   - ✅ Netlify deployment configuration
   - ✅ Environment variable documentation
   - ✅ Firebase setup guide
   - ⏳ Custom domain and SSL

---

## How the App Currently Works

### Daily Flow (MVP)

1. User opens the app (defaults to light theme, English)
2. From Home or Journal, user clicks "Start Journaling"
3. User selects an entry type and optional framework
4. If a framework-specific form exists, the user fills structured fields
5. User writes free-form content
6. User rates mood (overall, energy, stress, focus)
7. User saves the entry
8. Entry is stored in localStorage
9. Progress page recalculates stats

### Current Limitations

- **No strict topic/time capping yet**: The app recommends durations and suggests entry types but does not enforce a 10-minute routine.
- **Basic guidance system in place**: Daily prompts adapt to time of day, mood, and active goals.
- **No incremental difficulty tiers yet**: The app does not yet unlock advanced frameworks based on streak or experience level.
- **Evidence surfaced in forms**: Research references are now shown inside framework-specific forms and framework info modals.
- **Firestore needs manual setup**: Firebase code is ready, but security rules must be published in the Firebase console and environment variables must be set on the host.

### Progressive Evolution (Planned)

The app is designed to evolve with the user:
- **Level 1 (Beginner)**: Simple expressive writing, gratitude, basic mood tracking
- **Level 2 (Building)**: CBT thought records, simple goals, streak tracking
- **Level 3 (Intermediate)**: Stoic/confucian practices, framework-specific forms, progress charts
- **Level 4 (Advanced)**: Self-compassion, values-based goals, deeper reflection
- **Level 5 (Mastery)**: Custom frameworks, integration, export
- **Level 6 (Sage)**: Teaching/mentoring mode, advanced analytics

This system is documented in the original `PROGRESSIVE_EVOLUTION_SYSTEM.md` (currently missing, needs recreation).

---

## Deployment Readiness

### Is it ready to be deployed and used with local/session storage as a test?

**Yes, with caveats.**

The app is functional for local and Netlify test deployment:
- ✅ You can create journal entries
- ✅ You can track mood
- ✅ You can view progress statistics
- ✅ You can switch themes and languages
- ✅ You can sign in with Google and sync to Firestore
- ✅ It builds and runs successfully

**For full production use, still recommended:**
- ⚠️ Data export feature is not implemented
- ⚠️ Firestore security rules must be published manually
- ⚠️ No accessibility audit yet
- ⚠️ No E2E tests yet
- ⏳ No push notifications yet

**For a safe test deployment:**
- Deploy to Netlify using the included `netlify.toml`
- Set Firebase environment variables in Netlify
- Add your Netlify domain to Firebase authorized domains
- Add a clear "beta / test version" notice
- Add data export feature before real use

---

## Evidence-Based References

The app draws on the following research and traditions. Claims in the UI should be clearly attributed and avoid overstatement.

### Modern Research

1. **Expressive Writing**
   - Pennebaker, J. W., & Beall, S. K. (1986). Confronting a traumatic event: Toward an understanding of inhibition and disease. *Journal of Abnormal Psychology*.
   - Frattaroli, J. (2006). Experimental disclosure and its moderators: A meta-analysis. *Psychological Bulletin*.
   - Note: Effects are small to moderate, not universal, and may be delayed.

2. **Cognitive Behavioral Therapy (CBT) Journaling**
   - Beck, A. T. (1976). *Cognitive Therapy and the Emotional Disorders*.
   - Thought records are a standard CBT technique; benefits are supported but not specific to any single app format.

3. **Gratitude Interventions**
   - Emmons, R. A., & McCullough, M. E. (2003). Counting blessings versus burdens: An experimental investigation of gratitude and subjective well-being. *Journal of Personality and Social Psychology*.
   - Meta-analyses (e.g., Cunha et al., 2019; Davis et al., 2016) show small overall improvements in well-being, with cultural and intervention differences.

4. **Self-Compassion**
   - Neff, K. D. (2003). Self-compassion: An alternative conceptualization of a healthy attitude toward oneself. *Self and Identity*.
   - Neff, K. D. (2011). *Self-Compassion: The Proven Power of Being Kind to Yourself*.

5. **Goal-Setting Theory**
   - Locke, E. A., & Latham, G. P. (1990). *A Theory of Goal Setting & Task Performance*.
   - Doran, G. T. (1981). There's a S.M.A.R.T. way to write management's goals and objectives. *Management Review*.

### Traditional Practices

6. **Stoicism**
   - Marcus Aurelius. *Meditations*.
   - Epictetus. *Enchiridion*.
   - Ryan Holiday and Stephen Hanselman's *The Daily Stoic* is a modern compilation, not original source.

7. **Confucian Self-Examination**
   - *Analects* 1.4: "I examine myself on three things..." (loyalty, trustworthiness, practice)
   - Note: This is a traditional practice, not clinical evidence.

8. **Zen/Buddhist Mindfulness**
   - Dogen. *Fukan Zazengi*.
   - Various sutras on mindfulness (*Satipatthana Sutta*).
   - Mindfulness research (e.g., Kral et al., 2018) is related but not equivalent to traditional practice.

9. **Islamic Muhasaba and Muraqabah**
   - Al-Muhasibi, Harith. *Risalat al-Mustarshidin*.
   - Traditional practice of self-accountability before God.

10. **Vedantic Self-Inquiry (Atma-vichara)**
    - Ramana Maharshi's teaching of "Who am I?"
    - *Mandukya Upanishad* and *Vivekachudamani*.

11. **Aboriginal and Indigenous Narrative Practices**
    - Various oral traditions; should be attributed to specific communities where known.
    - Note: These are cultural practices, not to be conflated with clinical interventions.

### Important Caveats

- Journaling research is heterogeneous and effects are often small to moderate.
- Expressive writing may have delayed effects and is not universally beneficial.
- Gratitude interventions show small improvements in well-being, not large transformations.
- Traditional practices should be presented as traditions, not clinical treatments.
- Popular practices like Julia Cameron's "Morning Pages" have adjacent research but the exact "three handwritten pages" protocol has no direct peer-reviewed validation.

---

## Implementation Phases

### Phase 1: Foundation (Complete)
- Next.js app setup
- Design system
- Theme, i18n, storage abstraction
- Basic pages and navigation

### Phase 2: Core Journaling (Complete)
- Journal entry creation
- Framework-specific forms (CBT, Gratitude, Stoic)
- Mood tracking
- Basic progress stats

### Phase 3: Goals & Enhanced Progress ✅
- Goal system with SMART elements
- More framework forms (Confucian, Self-Compassion, Expressive Writing, Future Self Vision)
- Enhanced progress with charts and framework usage

### Phase 4: Onboarding & Basic Guidance ✅
- Onboarding flow
- Daily prompt / recommendation engine
- Time, mood, and goal-aware suggestions
- Framework info modals

### Phase 5: Advanced Adaptive System (Pending)
- Progressive difficulty tiers
- Follow-up reminders and push notifications
- Framework preference learning
- Deep personalization

### Phase 5: Cloud & Production (Foundation Complete)
- ✅ Firebase auth with Google sign-in
- ✅ Firestore persistence adapter
- ⏳ Manual security rules deployment
- ⏳ Data export/import
- ⏳ Robust offline sync
- Security rules
- Deployment

---

## Next Actions

1. Implement Goal System (SMART, milestones, progress)
2. Implement Confucian, Self-Compassion, and Expressive Writing forms
3. Implement Enhanced Progress (mood charts, framework usage, achievements)
4. Add evidence citations directly into framework data and UI
5. Add comprehensive tests
6. Run build and tests
7. Update FEATURE_STATUS.md
8. Assess deployment readiness