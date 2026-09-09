'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useGuidance } from '@/context/GuidanceContext';
import { Sparkles, X, Clock } from 'lucide-react';

export const DailyPrompt: React.FC = () => {
  const { recommendation, loading, dismissRecommendation } = useGuidance();

  if (loading) return null;
  if (!recommendation) return null;

  return (
    <Card variant="elevated" className="border-primary/30 bg-gradient-to-br from-primary-50 to-background">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-primary-100 rounded-lg">
                <Sparkles className="h-4 w-4 text-primary-700" />
              </div>
              <span className="text-xs font-medium text-primary-700 uppercase tracking-wide">Today&apos;s Suggestion</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{recommendation.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{recommendation.subtitle}</p>
            <p className="text-sm text-card-foreground leading-relaxed mb-4">{recommendation.prompt}</p>
            <div className="flex items-center gap-3">
              <Link href={`/journal/new?type=${recommendation.entryType}`}>
                <Button variant="primary" size="sm" icon={<Sparkles className="h-4 w-4" />}>
                  Start This Prompt
                </Button>
              </Link>
              <button
                onClick={dismissRecommendation}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <X className="h-3 w-3" /> Not now
              </button>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-border/50">
          <span className="font-medium">Why this suggestion?</span> {recommendation.reason}
        </p>
      </CardContent>
    </Card>
  );
};
