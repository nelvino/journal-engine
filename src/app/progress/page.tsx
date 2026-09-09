'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useLanguage } from '@/context/LanguageContext';
import { useProgress } from '@/context/ProgressContext';
import { MoodChart } from '@/components/progress/MoodChart';
import { FrameworkUsage } from '@/components/progress/FrameworkUsage';
import { Achievements } from '@/components/progress/Achievements';
import { Flame, BookOpen, TrendingUp, Award, Target, Clock, Sparkles } from 'lucide-react';

export default function ProgressPage() {
  const { t } = useLanguage();
  const { progress, loading } = useProgress();

  const stats = progress?.overallStats;
  const goalStats = progress?.goalProgress;

  const formatMinutes = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const hrs = Math.floor(mins / 60);
    if (hrs > 0) return `${hrs}h ${mins % 60}m`;
    return `${mins}m`;
  };

  const moodChartData = progress?.moodTrends.map(trend => ({
    date: trend.date,
    overall: trend.mood.overall,
    energy: trend.mood.energy,
    stress: trend.mood.stress,
    focus: trend.mood.focus,
  })) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-accent-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              {t.progress.title}
            </h1>
            <p className="text-muted-foreground">
              Track your growth and celebrate your achievements
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card variant="elevated" className="group hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6 text-center">
                <div className="p-3 bg-warning-100 rounded-xl w-fit mx-auto mb-3 group-hover:bg-warning-200 transition-colors">
                  <Flame className="h-6 w-6 text-warning-700" />
                </div>
                <p className="text-3xl font-bold text-warning-700">
                  {loading ? '...' : stats?.currentStreak || 0}
                </p>
                <p className="text-sm text-muted-foreground">{t.progress.currentStreak}</p>
              </CardContent>
            </Card>

            <Card variant="elevated" className="group hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6 text-center">
                <div className="p-3 bg-primary-100 rounded-xl w-fit mx-auto mb-3 group-hover:bg-primary-200 transition-colors">
                  <BookOpen className="h-6 w-6 text-primary-700" />
                </div>
                <p className="text-3xl font-bold text-primary-700">
                  {loading ? '...' : stats?.totalEntries || 0}
                </p>
                <p className="text-sm text-muted-foreground">{t.progress.totalEntries}</p>
              </CardContent>
            </Card>

            <Card variant="elevated" className="group hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6 text-center">
                <div className="p-3 bg-accent-100 rounded-xl w-fit mx-auto mb-3 group-hover:bg-accent-200 transition-colors">
                  <Clock className="h-6 w-6 text-accent-700" />
                </div>
                <p className="text-3xl font-bold text-accent-700">
                  {loading ? '...' : formatMinutes(stats?.totalMinutes || 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Time</p>
              </CardContent>
            </Card>

            <Card variant="elevated" className="group hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6 text-center">
                <div className="p-3 bg-success-100 rounded-xl w-fit mx-auto mb-3 group-hover:bg-success-200 transition-colors">
                  <Target className="h-6 w-6 text-success-700" />
                </div>
                <p className="text-3xl font-bold text-success-700">
                  {loading ? '...' : goalStats?.completedGoals || 0}
                </p>
                <p className="text-sm text-muted-foreground">Goals Done</p>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Stats */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary-700" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-foreground">{progress?.periodicStats.weekly.entriesThisWeek || 0}</p>
                  <p className="text-sm text-muted-foreground">Entries</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{progress?.periodicStats.weekly.wordsThisWeek || 0}</p>
                  <p className="text-sm text-muted-foreground">Words</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{formatMinutes(progress?.periodicStats.weekly.minutesThisWeek || 0)}</p>
                  <p className="text-sm text-muted-foreground">Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mood Chart */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary-700" />
                Mood Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MoodChart data={moodChartData} />
            </CardContent>
          </Card>

          {/* Framework Usage */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary-700" />
                Framework Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FrameworkUsage
                usage={progress?.frameworkUsage || []}
                totalEntries={stats?.totalEntries || 0}
              />
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary-700" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Achievements achievements={progress?.achievements || []} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
