import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'light' | 'outline' | 'text' | 'night-text' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-sans font-medium rounded-none transition-[color,background-color,border-color] duration-[var(--dur)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent disabled:opacity-40 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-accent text-paper-raised hover:bg-accent-text',
    dark: 'bg-ink text-paper-raised hover:bg-ink-secondary',
    light: 'bg-paper-raised text-ink hover:bg-rule',
    outline: 'border border-ink text-ink bg-transparent hover:bg-rule/20',
    text: 'text-ink underline decoration-1 underline-offset-4 hover:text-accent',
    'night-text': 'text-night-accent underline decoration-1 underline-offset-4 hover:text-paper',
    danger: 'border border-danger text-danger bg-transparent hover:bg-danger/5',
  };

  const sizes = {
    sm: 'h-9 px-3 text-[13px] leading-5',
    md: 'h-11 px-4 text-[15px] leading-5',
    lg: 'h-12 px-5 text-[16px] leading-6',
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  );
};
