import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface RuledFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  minHeight?: number;
}

function describedBy(...ids: (string | undefined)[]) {
  return ids.filter(Boolean).join(' ') || undefined;
}

export const RuledField: React.FC<RuledFieldProps> = ({
  label,
  hint,
  error,
  minHeight = 88,
  className = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const id = React.useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label htmlFor={id} className="block font-serif text-[17px] leading-[25px] text-ink mb-1">
          {label}
        </label>
      )}
      {hint && (
        <p id={hintId} className="font-sans text-[11.5px] leading-[19px] text-ink-caption mb-2">
          {hint}
        </p>
      )}
      <div
        className={cn(
          'relative border-b-2 transition-colors duration-[var(--dur)]',
          error ? 'border-danger' : focused ? 'border-accent' : 'border-transparent'
        )}
      >
        <textarea
          id={id}
          aria-invalid={!!error}
          aria-describedby={describedBy(hintId, errorId)}
          className="w-full resize-none bg-transparent font-serif text-[16px] text-ink placeholder:text-ink-decorative focus:outline-none"
          style={{
            minHeight: `${minHeight}px`,
            backgroundImage: 'linear-gradient(var(--paper) 0 27px, var(--rule) 27px 28px)',
            backgroundSize: '100% 28px',
            backgroundRepeat: 'repeat',
            lineHeight: '28px',
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </div>
      {error && (
        <p id={errorId} className="font-sans text-[11px] leading-4 text-danger mt-1">{error}</p>
      )}
    </div>
  );
};
