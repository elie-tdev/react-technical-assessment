import { AlertCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

type ErrorDisplayProps = {
  message: string;
  onRetry?: () => void;
  retryText?: string;
};

function ErrorDisplay({
  message,
  onRetry = () => window.location.reload(),
  retryText = 'Try Again',
}: ErrorDisplayProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="size-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircleIcon className="size-6 text-destructive" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Failed</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="mt-4">
          <Button onClick={onRetry}>{retryText}</Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorDisplay;
