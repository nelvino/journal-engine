'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';
import { Modal } from '@/components/ui/Modal';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useOnboarding } from '@/context/OnboardingContext';
import { useAuth } from '@/context/AuthContext';
import { useStorage } from '@/lib/useStorage';
import { Palette, Clock, Bell, Download, Trash2, Globe, HelpCircle, User, Mail, Shield } from 'lucide-react';

const USER_DATA_KEYS = [
  'journal_entries',
  'goals',
  'user_progress',
  'onboarding_completed',
  'recommendation_dismissed_date',
];

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { restartOnboarding } = useOnboarding();
  const { user } = useAuth();
  const storage = useStorage();
  const [showClearModal, setShowClearModal] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [cleared, setCleared] = useState(false);

  const handleClearData = async () => {
    setClearing(true);
    try {
      await Promise.all(USER_DATA_KEYS.map((key) => storage.delete(key)));
      setCleared(true);
    } catch (error) {
      console.error('Error clearing data:', error);
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-accent-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              {t.settings.title}
            </h1>
            <p className="text-muted-foreground">
              Customize your journaling experience
            </p>
          </div>

          {/* Profile Card */}
          {user && (
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt=""
                      className="h-16 w-16 rounded-full object-cover border-2 border-primary"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="h-8 w-8 text-primary-700" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground truncate">{user.displayName || 'Anonymous'}</p>
                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 shrink-0" />
                    <span>Provider: Google</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <User className="h-4 w-4 shrink-0" />
                    <span className="font-mono text-xs break-all">UID: {user.uid}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preferences Card */}
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded-xl">
                  <Palette className="h-6 w-6 text-primary-700" />
                </div>
                <CardTitle>{t.settings.preferences}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {t.settings.language}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      language === 'en'
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-muted text-secondary-700 hover:bg-secondary-100'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('es')}
                    className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      language === 'es'
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-muted text-secondary-700 hover:bg-secondary-100'
                    }`}
                  >
                    Español
                  </button>
                </div>
              </div>

              {/* Theme */}
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-3">
                  {t.settings.theme}
                </label>
                <Select
                  value={theme}
                  onChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
                  options={[
                    { value: 'light', label: t.settings.light },
                    { value: 'dark', label: t.settings.dark },
                    { value: 'system', label: t.settings.system },
                  ]}
                />
              </div>

              {/* Daily Reminder Time */}
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {t.settings.dailyReminderTime}
                </label>
                <Input type="time" className="w-full" />
              </div>

              {/* Enable Daily Reminders */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-card-foreground">{t.settings.enableDailyReminders}</span>
                </div>
                <Toggle checked={false} onChange={() => {}} />
              </div>
            </CardContent>
          </Card>

          {/* Journaling Preferences Card */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>{t.settings.journalingPreferences}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Default Session Duration */}
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-3">
                  {t.settings.defaultSessionDuration}
                </label>
                <Input type="number" defaultValue={10} className="w-full" />
              </div>

              {/* Morning Pages */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <span className="text-sm font-medium text-card-foreground">{t.settings.morningPages}</span>
                <Toggle checked={false} onChange={() => {}} />
              </div>

              {/* Evening Review */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <span className="text-sm font-medium text-card-foreground">{t.settings.eveningReview}</span>
                <Toggle checked={true} onChange={() => {}} />
              </div>
            </CardContent>
          </Card>

          {/* Data Card */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>{t.settings.data}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full" icon={<Download className="h-4 w-4" />}>
                {t.settings.exportData}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                icon={<HelpCircle className="h-4 w-4" />}
                onClick={restartOnboarding}
              >
                Replay Onboarding
              </Button>
              <Button
                variant="outline"
                className="w-full text-error-700 border-error-500 hover:bg-error-50"
                icon={<Trash2 className="h-4 w-4" />}
                onClick={() => setShowClearModal(true)}
              >
                {t.settings.clearAllData}
              </Button>
              <p className="text-xs text-muted-foreground">
                Clears journal entries, goals, and progress from this device and your cloud account if you are signed in. This cannot be undone.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Modal isOpen={showClearModal} onClose={() => setShowClearModal(false)} title="Clear all data?">
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            This will permanently delete all your journal entries, goals, and progress data.
          </p>
          {user && (
            <p className="text-sm text-warning-700 bg-warning-50 p-3 rounded-xl">
              You are signed in as {user.email}. This will also delete your cloud data from Firebase.
            </p>
          )}
          {!user && (
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-xl">
              You are not signed in. This will only clear data stored on this device.
            </p>
          )}
          {cleared ? (
            <p className="text-success-700 font-medium">Your data has been cleared.</p>
          ) : (
            <div className="flex gap-3 pt-2">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setShowClearModal(false)}
                disabled={clearing}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex-1 bg-error-600 hover:bg-error-700 text-white"
                onClick={handleClearData}
                loading={clearing}
                icon={<Trash2 className="h-4 w-4" />}
              >
                Clear Data
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
