// app/components/engine/progres.tsx

import React from 'react';

interface ProgressStepperProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export function ProgressStepper({ currentStep, setCurrentStep }: ProgressStepperProps) {
  return (
    <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
        style={{width: `${(currentStep / 3) * 100}%`}}
      />
    </div>
  );
}