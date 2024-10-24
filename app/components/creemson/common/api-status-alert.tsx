//app/components/beta/common/api-status-alert.tsx

import React from 'react';
import { Icon } from '#app/components/ui/icon';

interface ApiStatusAlertProps {
  apiAccessible: boolean;
}

export function ApiStatusAlert({ apiAccessible }: ApiStatusAlertProps) {
  if (apiAccessible) return null;

  return (
    <div className="mt-8 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon name="exclamation-triangle" className="h-5 w-5 text-yellow-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm">
            <strong className="font-medium">Notice:</strong> The API is currently inaccessible. Some features may not work as expected. Please try again later or contact support if the issue persists.
          </p>
        </div>
      </div>
    </div>
  );
}