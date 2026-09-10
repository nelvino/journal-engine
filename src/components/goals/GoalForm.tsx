'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useLanguage } from '@/context/LanguageContext';
import type { Goal, GoalCategory, GoalTimeframe } from '@/types';
import { Plus } from 'lucide-react';

interface GoalFormProps {
  onSubmit: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const categories: { value: GoalCategory; label: string }[] = [
  { value: 'personal_growth', label: 'Personal Growth' },
  { value: 'health', label: 'Health' },
  { value: 'relationships', label: 'Relationships' },
  { value: 'career', label: 'Career' },
  { value: 'financial', label: 'Financial' },
  { value: 'spiritual', label: 'Spiritual' },
  { value: 'creative', label: 'Creative' },
  { value: 'educational', label: 'Educational' },
  { value: 'contribution', label: 'Contribution' },
];

const timeframes: { value: GoalTimeframe; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'long_term', label: 'Long Term' },
];

export const GoalForm: React.FC<GoalFormProps> = ({ onSubmit, onCancel }) => {
  const { t } = useLanguage();
  const today = new Date().toISOString().split('T')[0];
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<GoalCategory>('personal_growth');
  const [timeframe, setTimeframe] = useState<GoalTimeframe>('monthly');
  const [startDate, setStartDate] = useState(today);
  const [targetDate, setTargetDate] = useState('');
  const [target, setTarget] = useState(1);
  const [unit, setUnit] = useState('');
  const [specific, setSpecific] = useState('');
  const [measurable, setMeasurable] = useState('');
  const [achievable, setAchievable] = useState('');
  const [relevant, setRelevant] = useState('');
  const [timeBound, setTimeBound] = useState('');
  const [milestones, setMilestones] = useState<Array<{ id: string; title: string; targetDate: string; completed: boolean }>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !targetDate) return;

    onSubmit({
      userId: 'user-1',
      title: title.trim(),
      description: description.trim(),
      category,
      timeframe,
      startDate,
      targetDate,
      progress: {
        current: 0,
        target,
        unit: unit.trim() || 'units',
        percentage: 0,
      },
      milestones: milestones.map(m => ({ ...m, completed: false })),
      smartElements: {
        specific: specific.trim(),
        measurable: measurable.trim(),
        achievable: achievable.trim(),
        relevant: relevant.trim(),
        timeBound: timeBound.trim(),
      },
      status: 'active',
      valueIds: [],
      habit: undefined,
    });
  };

  const addMilestone = () => {
    setMilestones([...milestones, { id: Date.now().toString(), title: '', targetDate: '', completed: false }]);
  };

  const updateMilestone = (index: number, field: 'title' | 'targetDate', value: string) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    setMilestones(updated);
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>{t.goals.form.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label={t.goals.form.goalTitle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.goals.form.goalTitlePlaceholder}
            required
          />

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              {t.goals.form.description}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.goals.form.descriptionPlaceholder}
              className="w-full min-h-[80px] px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Select
              label={t.goals.form.category}
              value={category}
              onChange={(value) => setCategory(value as GoalCategory)}
              options={categories.map(c => ({ ...c, label: t.goals.categories[c.value] }))}
            />
            <Select
              label={t.goals.form.timeframe}
              value={timeframe}
              onChange={(value) => setTimeframe(value as GoalTimeframe)}
              options={timeframes.map(tf => ({ ...tf, label: t.goals.timeframes[tf.value] }))}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label={t.goals.form.startDate}
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <Input
              label={t.goals.form.targetDate}
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label={t.goals.form.targetValue}
              type="number"
              min={1}
              value={target}
              onChange={(e) => setTarget(parseInt(e.target.value) || 1)}
              required
            />
            <Input
              label={t.goals.form.unit}
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder={t.goals.form.unitPlaceholder}
            />
          </div>

          <Card variant="bordered" className="bg-muted">
            <CardHeader>
              <CardTitle className="text-base">{t.goals.form.smartElements}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t.goals.form.smartIntro}
              </p>
              <Input
                label={t.goals.form.specific}
                value={specific}
                onChange={(e) => setSpecific(e.target.value)}
                placeholder={t.goals.form.specificPlaceholder}
              />
              <Input
                label={t.goals.form.measurable}
                value={measurable}
                onChange={(e) => setMeasurable(e.target.value)}
                placeholder={t.goals.form.measurablePlaceholder}
              />
              <Input
                label={t.goals.form.achievable}
                value={achievable}
                onChange={(e) => setAchievable(e.target.value)}
                placeholder={t.goals.form.achievablePlaceholder}
              />
              <Input
                label={t.goals.form.relevant}
                value={relevant}
                onChange={(e) => setRelevant(e.target.value)}
                placeholder={t.goals.form.relevantPlaceholder}
              />
              <Input
                label={t.goals.form.timeBound}
                value={timeBound}
                onChange={(e) => setTimeBound(e.target.value)}
                placeholder={t.goals.form.timeBoundPlaceholder}
              />
            </CardContent>
          </Card>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-card-foreground">{t.goals.form.milestones}</label>
              <button
                type="button"
                onClick={addMilestone}
                className="text-sm text-primary-700 hover:text-primary-800 font-medium transition-colors flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> {t.goals.form.addMilestone}
              </button>
            </div>
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="flex gap-2">
                <input
                  type="text"
                  value={milestone.title}
                  onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                  placeholder={t.goals.form.milestonePlaceholder}
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <input
                  type="date"
                  value={milestone.targetDate}
                  onChange={(e) => updateMilestone(index, 'targetDate', e.target.value)}
                  className="px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => removeMilestone(index)}
                  className="px-3 py-2 text-error-600 hover:bg-error-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onCancel}>
              {t.goals.form.cancel}
            </Button>
            <Button variant="primary" type="submit" icon={<Plus className="h-4 w-4" />}>
              {t.goals.form.createGoal}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
