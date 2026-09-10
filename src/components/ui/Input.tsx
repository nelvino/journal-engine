'use client';

import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { Modal } from './Modal';

interface InputHintProps {
  hint: string;
  visible: boolean;
}

const InputHint: React.FC<InputHintProps> = ({ hint, visible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  if (!visible || !hint) return null;
  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="ml-2 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Show hint"
      >
        <Info className="h-4 w-4" />
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={t.common.hint} className="max-w-sm">
        <p className="text-sm text-muted-foreground">{hint}</p>
      </Modal>
    </>
  );
};

interface FieldLabelProps {
  label: string;
  hint?: string;
  hasValue: boolean;
}

export const FieldLabel: React.FC<FieldLabelProps> = ({ label, hint, hasValue }) => (
  <label className="block text-sm font-medium text-card-foreground mb-2">
    <span className="flex items-center">
      {label}
      {hint && <InputHint hint={hint} visible={hasValue} />}
    </span>
  </label>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  placeholder,
  ...props
}) => {
  const value = typeof props.value === 'string' ? props.value : '';
  const hasValue = value.trim().length > 0;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-card-foreground mb-2">
          <span className="flex items-center">
            {label}
            <InputHint hint={placeholder || ''} visible={hasValue} />
          </span>
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'transition-all duration-300 placeholder:text-muted-foreground',
            icon && 'pl-10',
            error && 'border-error-500 focus:ring-error-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          placeholder={placeholder}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-error-600">{error}</p>
      )}
    </div>
  );
};

export { InputHint };
