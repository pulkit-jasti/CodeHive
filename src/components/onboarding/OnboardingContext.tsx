import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface OnboardingAnswers {
  skillLevel?: string;
  projectDomain?: string;
  instructionStyle?: string;
  feedbackStyle?: string;
  learningMotivation?: string;
}

interface OnboardingContextType {
  answers: OnboardingAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<OnboardingAnswers>>;
  isComplete: boolean;
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [isComplete, setIsComplete] = useState(false);

  return (
    <OnboardingContext.Provider value={{ answers, setAnswers, isComplete, setIsComplete }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}
