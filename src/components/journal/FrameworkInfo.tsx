'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Framework } from '@/types';

interface FrameworkInfoProps {
  framework: Framework | null;
}

export const FrameworkInfo: React.FC<FrameworkInfoProps> = ({ framework }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  if (!framework) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="ml-2 p-1 rounded-full hover:bg-primary-100 text-primary-700 transition-colors"
        aria-label={`${t.frameworkInfo.learnMore} ${framework.name}`}
        title={`${t.frameworkInfo.learnMore} ${framework.name}`}
      >
        <Info className="h-4 w-4" />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={framework.name}>
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">{framework.description}</p>

          {framework.evidenceBase && (
            <div className="p-4 bg-primary-50 rounded-xl">
              <p className="text-sm font-medium text-primary-800 mb-2">{t.frameworkInfo.evidenceBase}</p>
              <p className="text-sm text-primary-700 capitalize">{t.frameworkInfo.type}: {framework.evidenceBase.type}</p>
              {framework.evidenceBase.effectivenessRating && (
                <p className="text-sm text-primary-700">
                  {t.frameworkInfo.effectivenessRating}: {framework.evidenceBase.effectivenessRating}/10
                </p>
              )}
              <ul className="mt-2 space-y-2">
                {framework.evidenceBase.sources.map((source, index) => (
                  <li key={index} className="text-sm text-primary-700">
                    <span className="font-medium">{source.title}</span>
                    {source.author && <span>, {source.author}</span>}
                    {source.year && <span> ({source.year})</span>}
                    {source.description && (
                      <p className="text-xs text-primary-600 mt-1">{source.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {framework.protocol && (
            <div>
              <p className="text-sm font-medium text-card-foreground mb-2">{t.frameworkInfo.howToPractice}</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><span className="font-medium">{t.frameworkInfo.frequency}:</span> {framework.protocol.frequency}</p>
                <p><span className="font-medium">{t.frameworkInfo.duration}:</span> {framework.protocol.duration}</p>
                <ol className="list-decimal list-inside space-y-1 mt-2">
                  {framework.protocol.structure.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
              {t.frameworkInfo.gotIt}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
