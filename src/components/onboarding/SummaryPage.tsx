import { motion } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { OnboardingAnswers } from './OnboardingContext';

interface SummaryPageProps {
  answers: OnboardingAnswers;
  onContinue: () => void;
}

const questionLabels = {
  skillLevel: 'Skill Level',
  projectDomain: 'Project Domain',
  instructionStyle: 'Instruction Style',
  feedbackStyle: 'Feedback Preference',
  learningMotivation: 'Learning Motivation',
};

const answerDetails: Record<string, { emoji: string; title: string }> = {
  // Skill Level
  beginner: { emoji: '🟢', title: 'Beginner' },
  intermediate: { emoji: '🟡', title: 'Intermediate' },
  advanced: { emoji: '🔵', title: 'Advanced' },
  
  // Project Domain
  web: { emoji: '🌐', title: 'Web Development' },
  datascience: { emoji: '🤖', title: 'Data Science / AI / ML' },
  backend: { emoji: '⚙️', title: 'APIs / Backend Services' },
  frontend: { emoji: '🎨', title: 'Frontend / UI Components' },
  tools: { emoji: '🧰', title: 'Tools & Automation' },
  
  // Instruction Style
  stepbystep: { emoji: '🧩', title: 'Step-by-step guidance' },
  conceptfirst: { emoji: '💡', title: 'Concept-first' },
  challenge: { emoji: '🔍', title: 'Challenge mode' },
  
  // Feedback Style
  detailed: { emoji: '🪄', title: 'Detailed explanations' },
  hints: { emoji: '💭', title: 'Small hints' },
  quick: { emoji: '⚡', title: 'Quick solutions' },
  
  // Learning Motivation
  realworld: { emoji: '🎯', title: 'Real-world projects' },
  fundamentals: { emoji: '🧠', title: 'Coding fundamentals' },
  building: { emoji: '🚀', title: 'Building useful projects' },
  progress: { emoji: '🌟', title: 'Measurable progress' },
};

export default function SummaryPage({ answers, onContinue }: SummaryPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Success Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6 shadow-lg"
        >
          <Check className="w-10 h-10 text-white" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-900 mb-3"
        >
          All Set! 🎉
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600"
        >
          We've personalized your learning experience based on your preferences
        </motion.p>
      </div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4 mb-8"
      >
        {Object.entries(answers).map(([key, value], index) => {
          const detail = value ? answerDetails[value] : null;
          if (!detail) return null;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Card className="p-5 bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">
                    {detail.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">
                      {questionLabels[key as keyof typeof questionLabels]}
                    </p>
                    <p className="text-gray-900">{detail.title}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Personalization Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mb-8"
      >
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-2">Your Personalized Learning Path</h3>
              <p className="text-sm text-gray-700">
                Based on your preferences, we'll tailor the content difficulty, provide guidance in your preferred style, 
                and focus on the project types you're most interested in. You can always update these settings later.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex justify-center"
      >
        <Button
          onClick={onContinue}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
        >
          Continue to Dashboard
        </Button>
      </motion.div>
    </motion.div>
  );
}
