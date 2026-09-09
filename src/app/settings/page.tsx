'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useOnboarding } from '@/context/OnboardingContext';
import { Palette, Clock, Bell, Download, Trash2, Globe, HelpCircle } from 'lucide-react';

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { restartOnboarding } = useOnboarding();

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
              >
                {t.settings.clearAllData}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
