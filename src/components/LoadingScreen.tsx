import { useEffect, useState } from 'react';
import { Sparkles, Code, FileCode, CheckCircle2, Github, Wand2, Laptop } from 'lucide-react';
import { Progress } from './ui/progress';
import { ConceptType, IssueType } from '../App';
import { GitHubIssue } from './GitHubIssuesList';

interface LoadingScreenProps {
  type?: 'lesson' | 'issue-summary' | 'workspace';
  concept?: ConceptType;
  difficulty?: 'Easy' | 'Medium' | 'Difficult';
  issue?: GitHubIssue | IssueType;
}

const lessonSteps = [
  { icon: Sparkles, text: 'Selecting concept...', delay: 0 },
  { icon: Code, text: 'Generating challenge...', delay: 800 },
  { icon: FileCode, text: 'Creating lesson plan...', delay: 1600 },
  { icon: CheckCircle2, text: 'Ready!', delay: 2400 },
];

const issueSummarySteps = [
  { icon: Github, text: 'Fetching GitHub issue...', delay: 0 },
  { icon: Code, text: 'Analyzing code requirements...', delay: 800 },
  { icon: Wand2, text: 'Generating AI summary...', delay: 1600 },
  { icon: CheckCircle2, text: 'Ready!', delay: 2400 },
];

const workspaceSteps = [
  { icon: Github, text: 'Cloning repository...', delay: 0 },
  { icon: Laptop, text: 'Setting up coding workspace...', delay: 800 },
  { icon: Wand2, text: 'Preparing AI assistant...', delay: 1600 },
  { icon: CheckCircle2, text: 'Ready to code!', delay: 2400 },
];

export default function LoadingScreen({ type = 'lesson', concept, difficulty, issue }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = type === 'issue-summary' 
    ? issueSummarySteps 
    : type === 'workspace'
    ? workspaceSteps
    : lessonSteps;
  
  const title = type === 'issue-summary' 
    ? 'Preparing Issue Summary' 
    : type === 'workspace'
    ? 'Initializing Workspace'
    : 'Creating Your Lesson';
  
  const subtitle = type === 'issue-summary' 
    ? issue?.title || 'Loading...'
    : type === 'workspace'
    ? 'Setting up your coding environment...'
    : concept && difficulty ? `${concept.name} • ${difficulty}` : 'Loading...';

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
      }, step.delay);
    });

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center">
      <div className="max-w-lg w-full px-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-lg">
          {/* Animated Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                {steps[currentStep] && (() => {
                  const CurrentIcon = steps[currentStep].icon;
                  return <CurrentIcon className="w-10 h-10 text-blue-600" />;
                })()}
              </div>
              <div className="absolute inset-0 w-20 h-20 bg-blue-400 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-gray-900 mb-2">{title}</h2>
          <p className="text-center text-gray-600 mb-8 line-clamp-2">
            {subtitle}
          </p>

          {/* Progress Bar */}
          <Progress value={progress} className="mb-6 h-2" />

          {/* Steps */}
          <div className="space-y-3">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isComplete = index < currentStep;
              const isCurrent = index === currentStep;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 transition-all ${
                    isCurrent ? 'text-blue-600' : isComplete ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  <StepIcon className="w-5 h-5" />
                  <span className="text-sm">{step.text}</span>
                  {isComplete && <CheckCircle2 className="w-4 h-4 ml-auto" />}
                </div>
              );
            })}
          </div>

          {/* Fun Fact */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center italic">
              {type === 'issue-summary' 
                ? '"Contributing to open source is the best way to learn and grow."'
                : type === 'workspace'
                ? '"The best code is written one step at a time."'
                : '"The best way to learn is by doing. Let\'s code!"'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}