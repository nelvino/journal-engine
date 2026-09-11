import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading: React.FC<{ fullScreen?: boolean; label?: string }> = ({
  fullScreen = false,
  label = 'Loading…',
}) => (
  <div
    className={
      fullScreen
        ? 'min-h-screen flex items-center justify-center'
        : 'min-h-[50vh] flex items-center justify-center'
    }
    role="status"
    aria-live="polite"
  >
    <Loader2
      className="w-8 h-8 text-accent animate-spin"
      strokeWidth={1.5}
      aria-hidden="true"
    />
    <span className="sr-only">{label}</span>
  </div>
);
