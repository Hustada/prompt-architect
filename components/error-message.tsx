'use client';

import { XCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

interface ErrorMessageProps {
  message: string;
  details?: string;
  onDismiss?: () => void;
  autoHideDuration?: number;
}

const ErrorMessage = ({
  message,
  details,
  onDismiss,
  autoHideDuration = 8000,
}: ErrorMessageProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoHideDuration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onDismiss) onDismiss();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [autoHideDuration, onDismiss]);

  if (!isVisible) return null;

  return (
    <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4 mb-4 animate-fadeIn">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400 dark:text-red-500" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-300">{message}</h3>
          {details && (
            <div className="mt-2 text-sm text-red-700 dark:text-red-400">
              <p>{details}</p>
            </div>
          )}
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={() => {
                  setIsVisible(false);
                  onDismiss();
                }}
                className="inline-flex rounded-md bg-red-50 dark:bg-red-900/50 p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/80 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
              >
                <span className="sr-only">Dismiss</span>
                <XCircleIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
