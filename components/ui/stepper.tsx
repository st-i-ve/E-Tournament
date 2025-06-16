
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className }) => {
  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all duration-200",
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isActive
                    ? "bg-green-500 text-white"
                    : "bg-gray-700 text-gray-400 border-2 border-gray-600"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  stepNumber
                )}
              </div>
              <div className="mt-2 text-center">
                <div
                  className={cn(
                    "text-xs font-medium",
                    isActive || isCompleted
                      ? "text-green-400"
                      : "text-gray-500"
                  )}
                >
                  {step.title}
                </div>
              </div>
            </div>
            
            {!isLast && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 transition-all duration-200",
                  isCompleted ? "bg-green-500" : "bg-gray-700"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export { Stepper };
export type { Step };
