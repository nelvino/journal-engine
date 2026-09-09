'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useOnboarding } from '@/context/OnboardingContext';
import { BookOpen, Target, Sparkles, Compass, ChevronRight, ChevronLeft } from 'lucide-react';

const onboardingSteps = [
  {
    title: 'Welcome to My Journals',
    description: 'A private, evidence-based journaling space that combines modern research with timeless wisdom traditions. There are no made-up claims here. Just clear prompts and honest reflection.',
    icon: <BookOpen className="h-8 w-8 text-primary-700" />,
    color: 'bg-primary-100',
  },
  {
    title: 'Choose Your Intention',
    description: 'Start with a quick journey: Morning Check-In, Process Something Difficult, Build Your Future Self, or Evening Review. You can always explore more later.',
    icon: <Compass className="h-8 w-8 text-accent-700" />,
    color: 'bg-accent-100',
  },
  {
    title: 'Track What Matters',
    description: 'Set SMART goals, rate your mood, and watch simple progress charts. The app suggests daily practices based on your mood, goals, and the time of day. It gets smarter as you use it more.',
    icon: <Target className="h-8 w-8 text-success-700" />,
    color: 'bg-success-100',
  },
  {
    title: 'A Few Minutes a Day',
    description: 'Journaling works best when it is small and consistent. Start with 5 to 10 minutes. Missing a day is normal. The app will never shame you for it.',
    icon: <Sparkles className="h-8 w-8 text-warning-700" />,
    color: 'bg-warning-100',
  },
];

export const OnboardingModal: React.FC = () => {
  const { showOnboarding, completeOnboarding } = useOnboarding();
  const [step, setStep] = useState(0);

  if (!showOnboarding) return null;

  const currentStep = onboardingSteps[step];
  const isLast = step === onboardingSteps.length - 1;

  const handleNext = () => {
    if (isLast) {
      completeOnboarding();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <Modal isOpen={showOnboarding} onClose={() => {}} title={currentStep.title}>
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className={`p-4 rounded-2xl ${currentStep.color}`}>
            {currentStep.icon}
          </div>
        </div>

        <p className="text-center text-muted-foreground leading-relaxed">
          {currentStep.description}
        </p>

        <div className="flex justify-center gap-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="ghost"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            icon={<ChevronLeft className="h-4 w-4" />}
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            icon={isLast ? undefined : <ChevronRight className="h-4 w-4" />}
          >
            {isLast ? 'Get Started' : 'Next'}
          </Button>
        </div>

        <button
          onClick={() => completeOnboarding()}
          className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip onboarding
        </button>
      </div>
    </Modal>
  );
};
