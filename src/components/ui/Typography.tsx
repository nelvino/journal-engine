'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

interface HeadingProps extends TypographyProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const H1: React.FC<HeadingProps> = ({ children, className = '', as = 'h1' }) => {
  const Tag = as;
  return (
    <Tag className={cn('text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground', className)}>
      {children}
    </Tag>
  );
};

export const H2: React.FC<HeadingProps> = ({ children, className = '', as = 'h2' }) => {
  const Tag = as;
  return (
    <Tag className={cn('text-3xl sm:text-4xl font-bold text-foreground', className)}>
      {children}
    </Tag>
  );
};

export const H3: React.FC<HeadingProps> = ({ children, className = '', as = 'h3' }) => {
  const Tag = as;
  return (
    <Tag className={cn('text-2xl sm:text-3xl font-semibold text-foreground', className)}>
      {children}
    </Tag>
  );
};

export const H4: React.FC<HeadingProps> = ({ children, className = '', as = 'h4' }) => {
  const Tag = as;
  return (
    <Tag className={cn('text-xl sm:text-2xl font-semibold text-foreground', className)}>
      {children}
    </Tag>
  );
};

export const H5: React.FC<HeadingProps> = ({ children, className = '', as = 'h5' }) => {
  const Tag = as;
  return (
    <Tag className={cn('text-lg sm:text-xl font-medium text-foreground', className)}>
      {children}
    </Tag>
  );
};

export const H6: React.FC<HeadingProps> = ({ children, className = '', as = 'h6' }) => {
  const Tag = as;
  return (
    <Tag className={cn('text-base sm:text-lg font-medium text-foreground', className)}>
      {children}
    </Tag>
  );
};

export const P: React.FC<TypographyProps & { size?: 'sm' | 'base' | 'lg' | 'xl' }> = ({ 
  children, 
  className = '', 
  size = 'base' 
}) => {
  const sizes = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };
  
  return (
    <p className={cn(sizes[size], 'text-foreground leading-relaxed', className)}>
      {children}
    </p>
  );
};

export const Text: React.FC<TypographyProps & { 
  variant?: 'default' | 'muted' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error',
  size?: 'sm' | 'base' | 'lg'
}> = ({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'base'
}) => {
  const sizes = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  };
  
  const variants = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary-700',
    secondary: 'text-secondary-700',
    accent: 'text-accent-700',
    success: 'text-success-700',
    warning: 'text-warning-700',
    error: 'text-error-700',
  };
  
  return (
    <span className={cn(sizes[size], variants[variant], className)}>
      {children}
    </span>
  );
};

export const Label: React.FC<TypographyProps> = ({ children, className = '' }) => {
  return (
    <label className={cn('text-sm font-medium text-card-foreground', className)}>
      {children}
    </label>
  );
};

export const Caption: React.FC<TypographyProps> = ({ children, className = '' }) => {
  return (
    <span className={cn('text-xs text-muted-foreground', className)}>
      {children}
    </span>
  );
};

export const Lead: React.FC<TypographyProps> = ({ children, className = '' }) => {
  return (
    <p className={cn('text-lg sm:text-xl text-muted-foreground leading-relaxed', className)}>
      {children}
    </p>
  );
};

export const GradientText: React.FC<TypographyProps & { from?: string; to?: string }> = ({ 
  children, 
  className = '',
  from = 'from-primary-700',
  to = 'to-accent-700'
}) => {
  return (
    <span className={cn(
      'bg-gradient-to-r bg-clip-text text-transparent',
      from,
      to,
      className
    )}>
      {children}
    </span>
  );
};
