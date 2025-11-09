import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Progress Text */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-600">
          Question {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-blue-600">
          {Math.round(progress)}% complete
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between mt-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
              step < currentStep
                ? 'bg-green-500 border-green-500 text-white'
                : step === currentStep
                ? 'bg-blue-600 border-blue-600 text-white scale-110'
                : 'bg-white border-gray-300 text-gray-400'
            }`}
          >
            {step < currentStep ? (
              <Check className="w-4 h-4" />
            ) : (
              <span className="text-sm">{step}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
