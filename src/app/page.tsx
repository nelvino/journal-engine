'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { DailyPrompt } from '@/components/guidance/DailyPrompt';
import { Sparkles, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-accent-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-2xl mb-4">
              <Sparkles className="h-8 w-8 text-primary-700" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              {t.home.welcome}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.home.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/journal">
                <Button size="lg" variant="primary" icon={<BookOpen className="h-5 w-5" />}>
                  {t.home.startJournaling}
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                {t.home.learnMore}
              </Button>
            </div>
          </div>

          {/* Daily Prompt */}
          <DailyPrompt />

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <Card variant="elevated" className="group hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="inline-flex items-center justify-center p-2 bg-primary-100 rounded-xl mb-3 group-hover:bg-primary-200 transition-colors">
                  <Lightbulb className="h-6 w-6 text-primary-700" />
                </div>
                <CardTitle>{t.home.scienceBased.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {t.home.scienceBased.description}
                </CardDescription>
              </CardContent>
            </Card>

            <Card variant="elevated" className="group hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="inline-flex items-center justify-center p-2 bg-accent-100 rounded-xl mb-3 group-hover:bg-accent-200 transition-colors">
                  <BookOpen className="h-6 w-6 text-accent-700" />
                </div>
                <CardTitle>{t.home.ancientWisdom.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {t.home.ancientWisdom.description}
                </CardDescription>
              </CardContent>
            </Card>

            <Card variant="elevated" className="group hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="inline-flex items-center justify-center p-2 bg-success-100 rounded-xl mb-3 group-hover:bg-success-200 transition-colors">
                  <TrendingUp className="h-6 w-6 text-success-700" />
                </div>
                <CardTitle>{t.home.adaptiveSystem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {t.home.adaptiveSystem.description}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
