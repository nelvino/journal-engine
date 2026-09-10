'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { useGoals } from '@/context/GoalContext';
import { GoalForm } from '@/components/goals/GoalForm';
import { GoalCard } from '@/components/goals/GoalCard';
import { Target, Plus, TrendingUp } from 'lucide-react';

export default function GoalsPage() {
  const { t } = useLanguage();
  const { goals, loading, addGoal, updateGoal, deleteGoal, completeGoal } = useGoals();
  const [showForm, setShowForm] = useState(false);

  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-accent-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              {t.goals.title}
            </h1>
            <p className="text-muted-foreground">
              {t.goals.subtitle}
            </p>
          </div>

          {/* Stats Card */}
          <Card variant="elevated">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary-700">{activeGoals.length}</div>
                  <div className="text-sm text-muted-foreground">{t.goals.stats.active}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-success-700">{completedGoals.length}</div>
                  <div className="text-sm text-muted-foreground">{t.goals.stats.completed}</div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="text-3xl font-bold text-warning-700">
                    {goals.length > 0 ? Math.round(goals.reduce((sum, g) => sum + g.progress.percentage, 0) / goals.length) : 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">{t.goals.stats.avgProgress}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Create Goal Button */}
          {!showForm && (
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full" 
              icon={<Plus className="h-5 w-5" />}
              onClick={() => setShowForm(true)}
            >
              {t.goals.createNewGoal}
            </Button>
          )}

          {/* Goal Form */}
          {showForm && (
            <GoalForm
              onSubmit={async (goalData) => {
                await addGoal(goalData);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          )}

          {/* Active Goals */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              <Target className="h-6 w-6 text-primary-700" />
              {t.goals.activeGoalsTitle}
            </h2>
            {loading ? (
              <p className="text-muted-foreground">{t.goals.loading}</p>
            ) : activeGoals.length === 0 ? (
              <Card variant="elevated">
                <CardContent className="text-center py-8">
                  <div className="inline-flex items-center justify-center p-4 bg-muted rounded-2xl mb-4">
                    <Target className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {t.goals.empty.title}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>{t.goals.empty.hint}</span>
                  </div>
                </CardContent>
              </Card>
            ) : (
              activeGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onUpdate={(updates) => updateGoal(goal.id, updates)}
                  onDelete={() => deleteGoal(goal.id)}
                  onComplete={() => completeGoal(goal.id)}
                />
              ))
            )}
          </div>

          {/* Completed Goals */}
          {completedGoals.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-success-700" />
                {t.goals.completedGoalsTitle}
              </h2>
              {completedGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onUpdate={(updates) => updateGoal(goal.id, updates)}
                  onDelete={() => deleteGoal(goal.id)}
                  onComplete={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
