'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextValue {
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  }, [removeToast]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-success-600" />,
    error: <XCircle className="h-5 w-5 text-error-600" />,
    info: <Info className="h-5 w-5 text-primary-600" />,
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-20 right-4 md:bottom-4 z-[60] flex flex-col gap-2 max-w-sm w-full p-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border bg-card',
              toast.type === 'success' && 'border-success-200 bg-success-50',
              toast.type === 'error' && 'border-error-200 bg-error-50',
              toast.type === 'info' && 'border-primary-200 bg-primary-50'
            )}
          >
            {icons[toast.type]}
            <p className={cn(
              'text-sm font-medium flex-1',
              toast.type === 'success' && 'text-success-800',
              toast.type === 'error' && 'text-error-800',
              toast.type === 'info' && 'text-primary-800'
            )}>
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
