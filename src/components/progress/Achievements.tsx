'use client';

import React from 'react';
import { Award, Flame, BookOpen, Calendar, Target } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt?: Date;
  icon: 'flame' | 'book' | 'calendar' | 'target' | 'award';
}

interface AchievementsProps {
  achievements: Achievement[];
  className?: string;
}

const iconMap = {
  flame: Flame,
  book: BookOpen,
  calendar: Calendar,
  target: Target,
  award: Award,
};

export const Achievements: React.FC<AchievementsProps> = ({ achievements, className = '' }) => {
  const { t } = useLanguage();
  return (
    <div className={`space-y-3 ${className}`}>
      <p className="text-sm text-muted-foreground">
        {t.progress.achievementsComponent.intro}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {achievements.map((achievement) => {
          const Icon = iconMap[achievement.icon];
          const isUnlocked = !!achievement.unlockedAt;

          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border transition-all ${
                isUnlocked
                  ? 'bg-success-50 border-success-200'
                  : 'bg-muted border-border opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isUnlocked ? 'bg-success-100' : 'bg-secondary-200'}`}>
                  <Icon className={`h-5 w-5 ${isUnlocked ? 'text-success-700' : 'text-secondary-600'}`} />
                </div>
                <div>
                  <h4 className={`font-medium ${isUnlocked ? 'text-success-900' : 'text-muted-foreground'}`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${isUnlocked ? 'text-success-800' : 'text-muted-foreground'}`}>
                    {achievement.description}
                  </p>
                  {achievement.unlockedAt && (
                    <p className="text-xs text-success-700 mt-1">
                      {t.progress.achievementsComponent.unlocked} {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
