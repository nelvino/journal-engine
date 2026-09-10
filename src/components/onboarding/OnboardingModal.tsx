'use client';

import React, { useState } from 'react';
import { BookOpen, FileText, Target, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/design/Button';
import { useOnboarding } from '@/context/OnboardingContext';
import { useLanguage } from '@/context/LanguageContext';

const steps = [
  { icon: BookOpen, titleKey: 'step1Title', descKey: 'step1Description' },
  { icon: FileText, titleKey: 'step2Title', descKey: 'step2Description' },
  { icon: Target, titleKey: 'step3Title', descKey: 'step3Description' },
  { icon: ShieldCheck, titleKey: 'step4Title', descKey: 'step4Description' },
] as const;

export const OnboardingModal: React.FC = () => {
  const { t } = useLanguage();
  const { showOnboarding, completeOnboarding } = useOnboarding();
  const [step, setStep] = useState(0);
  const titleId = React.useId();
  const descId = React.useId();

  if (!showOnboarding) return null;

  const current = steps[step];
  const Icon = current.icon;
  const isFirst = step === 0;
  const isLast = step === steps.length - 1;
  const title = t.onboarding[current.titleKey];
  const description = t.onboarding[current.descKey];

  const handleNext = () => {
    if (isLast) {
      completeOnboarding();
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/60 p-4 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <div className="w-full max-w-[430px] bg-paper-raised border border-ink p-6 md:p-8">
        <div className="flex flex-col items-center">
          <div
            className="w-16 h-16 border border-ink bg-paper flex items-center justify-center mb-6"
            aria-hidden="true"
          >
            <Icon className="w-8 h-8 text-ink" strokeWidth={1.5} />
          </div>

          <h2
            id={titleId}
            className="font-serif text-[30px] leading-[34px] text-ink text-center mb-3"
          >
            {title}
          </h2>

          <p
            id={descId}
            className="font-serif text-[17px] leading-[27px] text-ink-secondary text-center mb-6"
          >
            {description}
          </p>

          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption mb-6">
            {t.onboarding.step
              .replace('{current}', String(step + 1))
              .replace('{total}', String(steps.length))}
          </p>

          <div className="flex gap-2 mb-8" aria-hidden="true">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 ${
                  i === step ? 'bg-accent' : 'bg-rule'
                }`}
              />
            ))}
          </div>

          <div className="w-full flex gap-3 mb-4">
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={handleBack}
              disabled={isFirst}
            >
              {t.onboarding.back}
            </Button>
            <Button
              variant="dark"
              size="lg"
              className="flex-1 h-12"
              onClick={handleNext}
            >
              {isLast ? t.onboarding.getStarted : t.onboarding.next}
            </Button>
          </div>

          <Button
            variant="text"
            onClick={completeOnboarding}
            className="h-11 text-ink-caption hover:text-ink"
          >
            {t.onboarding.skip}
          </Button>
        </div>
      </div>
    </div>
  );
};
