import { AlertCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
  retryText?: string;
}

function ErrorDisplay({
  message,
  onRetry = () => window.location.reload(),
  retryText = 'Try Again',
}: ErrorDisplayProps) {
  return (
    <div className="max-w-md mx-auto bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-md">
      <div className="flex items-start">
        <div className="shrink-0">
          <AlertCircleIcon />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
          </div>
          {onRetry && (
            <div className="mt-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={onRetry}
              >
                {retryText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorDisplay;
