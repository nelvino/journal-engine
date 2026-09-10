import React from 'react';
import { Button } from './Button';

function useDialogIds() {
  const titleId = React.useId();
  const messageId = React.useId();
  return { titleId, messageId };
}

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;
  const { titleId, messageId } = useDialogIds();

  return (
    <div className="fixed inset-0 z-[70] p-4 flex items-center justify-center bg-ink/60">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={messageId}
        className="w-full max-w-[320px] bg-paper-raised border border-ink p-6"
      >
        <h2 id={titleId} className="font-serif text-[25px] leading-[30px] text-ink mb-3">
          {title}
        </h2>
        <p id={messageId} className="font-sans text-[15px] leading-[23px] text-ink-secondary">
          {message}
        </p>
        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="dark" size="lg" className="flex-1" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
