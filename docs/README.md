# Journal Engine
## Evidence-Based Personal Development Platform

A private, evidence-based journaling application that combines modern scientific research with timeless wisdom traditions to create an adaptive personal development system.

## 🚀 Quick Start (Local)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`.

By default it uses `localStorage`. To test with Firebase, copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_USE_FIREBASE=true` with your Firebase config.

## 🎯 Features

- **Multiple Journaling Frameworks**: Expressive writing, CBT, gratitude, Stoic, Confucian, self-compassion, Future Self Vision
- **Quick Start Journeys**: Morning Check-In, Process Something Difficult, Build Your Future Self, Evening Review
- **Three-Step Entry Wizard**: Select type, review description, write with guided prompts
- **Evidence-Based Prompts**: All prompts backed by research or traditional wisdom, with info modals for frameworks
- **Adaptive Guidance**: Daily prompt recommendations based on time of day, mood, and active goals
- **Goal Tracking**: SMART goals with milestones and progress monitoring
- **Progress Analytics**: Mood trends, framework usage, streaks, and achievements
- **Onboarding**: First-time user flow with replay from Settings
- **User Profile**: View Google account details and UID in Settings
- **Cloud Sync**: Firebase Auth + Firestore persistence via environment variables

## 🏗️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Auth**: Firebase Authentication (Google sign-in)
- **Storage**: localStorage (dev default) or Firestore (production)
- **Testing**: Jest + React Testing Library
- **Deployment**: Netlify (configured via `netlify.toml`)

## 📚 Documentation

- [Feature Status](./FEATURE_STATUS.md) - What is implemented and what is next
- [Implementation Plan](../IMPLEMENTATION_PLAN.md) - Complete roadmap and evidence references
- [Firebase Setup](./FIREBASE_SETUP.md) - Step-by-step Firebase configuration
- [Deployment](./DEPLOYMENT.md) - How to push to GitHub and deploy to Netlify
- [Evidence-Based Framework](./EVIDENCE_BASED_JOURNALING_FRAMEWORK.md) - Research database
- [Database Schema](./DATABASE_SCHEMA.md) - Data model design
- [Technical Architecture](./TECHNICAL_ARCHITECTURE.md) - Architecture details
- [Progressive Evolution](./PROGRESSIVE_EVOLUTION_SYSTEM.md) - Adaptive learning system

## 🔒 Principles

- **Evidence-Based**: Every feature backed by research or traditional wisdom
- **Never Assume**: All information verified and sourced
- **Progressive Evolution**: System adapts to user's pace
- **Sustainable Foundation**: Built for long-term personal use
- **Free Forever**: Designed for free hosting tiers

## 📖 Current Status

✅ Next.js 16 with TypeScript and Tailwind CSS v4
✅ Core UI components (Button, Input, Card, Toggle, Select, Modal, ProgressBar, Typography)
✅ Storage abstraction layer with localStorage and Firestore adapters
✅ Firebase Auth and Firestore integration (env-driven)
✅ Complete TypeScript types based on database schema
✅ Framework and prompt data structures
✅ All pages (Home, Journal, Journal/New, Goals, Progress, Settings)
✅ Research and setup documentation complete
✅ Jest tests passing

## 🎯 Next Steps

1. Add data export (JSON/CSV)
2. Publish Firestore security rules in Firebase console
3. Conduct accessibility audit
4. Add E2E tests
5. Add push notifications for reminders

## 🙏 Acknowledgments

Built with evidence, wisdom, and a commitment to never making things up.
