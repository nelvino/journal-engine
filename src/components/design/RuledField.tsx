import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface RuledFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  minHeight?: number;
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

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block font-serif text-[17px] leading-[25px] text-ink mb-1">
          {label}
        </label>
      )}
      {hint && (
        <p className="font-sans text-[11.5px] leading-[19px] text-ink-caption mb-2">
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
        <p className="font-sans text-[11px] leading-4 text-danger mt-1">{error}</p>
      )}
    </div>
  );
};
