import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Code2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useOnboarding } from './OnboardingContext';
import QuestionCard, { QuestionOption } from './QuestionCard';
import ProgressBar from './ProgressBar';
import SummaryPage from './SummaryPage';

interface Question {
  id: string;
  key: keyof import('./OnboardingContext').OnboardingAnswers;
  title: string;
  subtitle?: string;
  options: QuestionOption[];
}

const questions: Question[] = [
  {
    id: '1',
    key: 'skillLevel',
    title: 'How would you describe your current coding experience?',
    options: [
      {
        emoji: '🟢',
        title: 'Beginner',
        description: "I'm still learning core concepts and syntax",
        value: 'beginner',
      },
      {
        emoji: '🟡',
        title: 'Intermediate',
        description: 'I can build projects but need help with larger systems',
        value: 'intermediate',
      },
      {
        emoji: '🔵',
        title: 'Advanced',
        description: 'I can explore and modify complex codebases confidently',
        value: 'advanced',
      },
    ],
  },
  {
    id: '2',
    key: 'projectDomain',
    title: 'What kind of projects do you want to learn from?',
    options: [
      {
        emoji: '🌐',
        title: 'Web Development',
        description: 'Building websites and web applications',
        value: 'web',
      },
      {
        emoji: '🤖',
        title: 'Data Science / AI / Machine Learning',
        description: 'Working with data, models, and algorithms',
        value: 'datascience',
      },
      {
        emoji: '⚙️',
        title: 'APIs / Backend Services',
        description: 'Server-side logic and data management',
        value: 'backend',
      },
      {
        emoji: '🎨',
        title: 'Frontend / UI Components',
        description: 'User interfaces and interactive experiences',
        value: 'frontend',
      },
      {
        emoji: '🧰',
        title: 'Tools, Libraries, or Automation Scripts',
        description: 'Building utilities and automation',
        value: 'tools',
      },
    ],
  },
  {
    id: '3',
    key: 'instructionStyle',
    title: 'How do you want the AI mentor to guide you while solving issues?',
    options: [
      {
        emoji: '🧩',
        title: 'Step-by-step guidance',
        description: 'Break problems into small clear tasks',
        value: 'stepbystep',
      },
      {
        emoji: '💡',
        title: 'Concept-first',
        description: 'Explain logic before implementation',
        value: 'conceptfirst',
      },
      {
        emoji: '🔍',
        title: 'Challenge mode',
        description: "Minimal hints; I'll explore and ask for help if needed",
        value: 'challenge',
      },
    ],
  },
  {
    id: '4',
    key: 'feedbackStyle',
    title: 'When you make a mistake or get stuck, what kind of feedback helps you most?',
    options: [
      {
        emoji: '🪄',
        title: 'Detailed explanations',
        description: "About why it didn't work",
        value: 'detailed',
      },
      {
        emoji: '💭',
        title: 'Small hints or guiding questions',
        description: 'Lead me to the answer',
        value: 'hints',
      },
      {
        emoji: '⚡',
        title: 'Show me the correct way quickly',
        description: 'So I can move faster',
        value: 'quick',
      },
    ],
  },
  {
    id: '5',
    key: 'learningMotivation',
    title: 'What motivates you the most while learning?',
    options: [
      {
        emoji: '🎯',
        title: 'Understanding how real-world projects are built',
        description: 'Practical, production-ready skills',
        value: 'realworld',
      },
      {
        emoji: '🧠',
        title: 'Improving my coding fundamentals',
        description: 'Strong foundation and best practices',
        value: 'fundamentals',
      },
      {
        emoji: '🚀',
        title: 'Building something useful that I can showcase',
        description: 'Portfolio-worthy projects',
        value: 'building',
      },
      {
        emoji: '🌟',
        title: 'Seeing measurable progress and achievements',
        description: 'Tracking growth and milestones',
        value: 'progress',
      },
    ],
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSummary, setShowSummary] = useState(false);
  const { answers, setAnswers } = useOnboarding();

  const totalSteps = questions.length;
  const currentQuestion = questions[currentStep - 1];

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.key]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentAnswer = answers[currentQuestion?.key];
  const canProceed = currentAnswer !== undefined;

  if (showSummary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
        <SummaryPage answers={answers} onContinue={onComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">CodeLearn</h1>
              <p className="text-xs text-gray-500">Personalize your learning journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        {/* Question */}
        <div className="mt-12 mb-12">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestion.id}
              title={currentQuestion.title}
              subtitle={currentQuestion.subtitle}
              options={currentQuestion.options}
              selectedValue={currentAnswer}
              onSelect={handleSelect}
            />
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between max-w-3xl mx-auto"
        >
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-6"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <Button
                variant="ghost"
                onClick={() => setShowSummary(true)}
                className="text-gray-500 hover:text-gray-700"
              >
                Skip to summary
              </Button>
            )}
          </div>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6"
          >
            {currentStep === totalSteps ? 'Finish' : 'Next'}
            {currentStep !== totalSteps && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
