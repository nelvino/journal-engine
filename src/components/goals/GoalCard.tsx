'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { Goal } from '@/types';
import { Target, Calendar, Check, Trash2, Edit3, ChevronDown, ChevronUp } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
  onUpdate: (updates: Partial<Goal>) => void;
  onDelete: () => void;
  onComplete: () => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onUpdate, onDelete, onComplete }) => {
  const [expanded, setExpanded] = useState(false);
  const [progressInput, setProgressInput] = useState(goal.progress.current.toString());

  const percentage = Math.min(100, Math.max(0, goal.progress.percentage));
  const isCompleted = goal.status === 'completed';
  const isOverdue = !isCompleted && new Date(goal.targetDate) < new Date();

  const handleProgressUpdate = () => {
    const current = parseFloat(progressInput) || 0;
    const target = goal.progress.target || 1;
    const percentage = Math.min(100, Math.max(0, (current / target) * 100));
    onUpdate({
      progress: {
        ...goal.progress,
        current,
        percentage,
      },
    });
  };

  const completedMilestones = goal.milestones.filter(m => m.completed).length;
  const totalMilestones = goal.milestones.length;

  return (
    <Card variant="elevated" className={isCompleted ? 'border-success-500 border-2' : ''}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-xl ${isCompleted ? 'bg-success-100' : 'bg-primary-100'}`}>
              <Target className={`h-5 w-5 ${isCompleted ? 'text-success-700' : 'text-primary-700'}`} />
            </div>
            <div>
              <CardTitle className={isCompleted ? 'line-through text-muted-foreground' : ''}>
                {goal.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{new Date(goal.targetDate).toLocaleDateString()}</span>
                {isOverdue && <span className="text-error-600 font-medium">Overdue</span>}
                {isCompleted && <span className="text-success-600 font-medium">Completed</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {!isCompleted && (
              <button
                onClick={onComplete}
                className="p-2 text-success-600 hover:bg-success-100 rounded-lg transition-colors"
                aria-label="Complete goal"
              >
                <Check className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onDelete}
              className="p-2 text-error-600 hover:bg-error-100 rounded-lg transition-colors"
              aria-label="Delete goal"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {goal.description && (
          <p className="text-muted-foreground text-sm">{goal.description}</p>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-card-foreground font-medium">
              {goal.progress.current} / {goal.progress.target} {goal.progress.unit}
            </span>
            <span className="text-muted-foreground">{Math.round(percentage)}%</span>
          </div>
          <ProgressBar value={percentage} variant={isCompleted ? 'success' : 'primary'} />
        </div>

        {totalMilestones > 0 && (
          <div className="text-sm text-muted-foreground">
            Milestones: {completedMilestones}/{totalMilestones} completed
          </div>
        )}

        {expanded && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Update Progress
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={progressInput}
                  onChange={(e) => setProgressInput(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <Button variant="outline" onClick={handleProgressUpdate}>
                  Update
                </Button>
              </div>
            </div>

            {goal.smartElements && (goal.smartElements.specific || goal.smartElements.measurable) && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-card-foreground">SMART Elements</h4>
                {goal.smartElements.specific && (
                  <p className="text-sm text-muted-foreground"><span className="font-medium">Specific:</span> {goal.smartElements.specific}</p>
                )}
                {goal.smartElements.measurable && (
                  <p className="text-sm text-muted-foreground"><span className="font-medium">Measurable:</span> {goal.smartElements.measurable}</p>
                )}
                {goal.smartElements.achievable && (
                  <p className="text-sm text-muted-foreground"><span className="font-medium">Achievable:</span> {goal.smartElements.achievable}</p>
                )}
                {goal.smartElements.relevant && (
                  <p className="text-sm text-muted-foreground"><span className="font-medium">Relevant:</span> {goal.smartElements.relevant}</p>
                )}
                {goal.smartElements.timeBound && (
                  <p className="text-sm text-muted-foreground"><span className="font-medium">Time-bound:</span> {goal.smartElements.timeBound}</p>
                )}
              </div>
            )}

            {goal.milestones.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-card-foreground">Milestones</h4>
                {goal.milestones.map((milestone) => (
                  <label key={milestone.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={milestone.completed}
                      onChange={(e) => {
                        const updatedMilestones = goal.milestones.map(m =>
                          m.id === milestone.id ? { ...m, completed: e.target.checked } : m
                        );
                        onUpdate({ milestones: updatedMilestones });
                      }}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <span className={`text-sm ${milestone.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}>
                        {milestone.title}
                      </span>
                      {milestone.targetDate && (
                        <span className="text-xs text-muted-foreground block">
                          {new Date(milestone.targetDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
