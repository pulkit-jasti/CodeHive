import { ArrowLeft, Zap, Target, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ConceptType } from '../App';

interface IssueRandomizerProps {
  concept: ConceptType;
  onDifficultySelect: (difficulty: 'Easy' | 'Medium' | 'Difficult') => void;
  onBack: () => void;
}

const difficultyOptions = [
  {
    level: 'Easy' as const,
    icon: Zap,
    color: 'bg-green-50 border-green-300 hover:border-green-400',
    badgeColor: 'bg-green-100 text-green-700',
    iconColor: 'text-green-600',
    description: 'Perfect for beginners and warming up',
    points: '10-20 points',
  },
  {
    level: 'Medium' as const,
    icon: Target,
    color: 'bg-yellow-50 border-yellow-300 hover:border-yellow-400',
    badgeColor: 'bg-yellow-100 text-yellow-700',
    iconColor: 'text-yellow-600',
    description: 'Good challenge for intermediate learners',
    points: '30-50 points',
  },
  {
    level: 'Difficult' as const,
    icon: Trophy,
    color: 'bg-red-50 border-red-300 hover:border-red-400',
    badgeColor: 'bg-red-100 text-red-700',
    iconColor: 'text-red-600',
    description: 'Advanced problems for experienced coders',
    points: '60-100 points',
  },
];

export default function IssueRandomizer({ concept, onDifficultySelect, onBack }: IssueRandomizerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-gray-900">{concept.name}</h1>
              <p className="text-sm text-gray-500">Select difficulty level</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-gray-900 mb-3">Choose Your Challenge</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a difficulty level and we'll generate a custom coding challenge for you. 
            Each problem is designed to help you master {concept.name.toLowerCase()}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {difficultyOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.level}
                className={`${option.color} border-2 p-8 cursor-pointer transition-all hover:shadow-lg hover:scale-105 active:scale-100`}
                onClick={() => onDifficultySelect(option.level)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <Icon className={`w-8 h-8 ${option.iconColor}`} />
                  </div>
                  <Badge className={`${option.badgeColor} mb-3 px-3 py-1`}>
                    {option.level}
                  </Badge>
                  <h3 className="text-gray-900 mb-3">{option.level} Level</h3>
                  <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                  <div className="text-sm text-gray-500">{option.points}</div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-gray-900 mb-3">What to Expect</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-blue-600 mb-2">📝 Real Problems</div>
              <p className="text-sm text-gray-600">Practice with scenarios you'll encounter in real development</p>
            </div>
            <div>
              <div className="text-blue-600 mb-2">💡 Smart Hints</div>
              <p className="text-sm text-gray-600">Get guidance when you need it without spoiling the solution</p>
            </div>
            <div>
              <div className="text-blue-600 mb-2">✅ Instant Feedback</div>
              <p className="text-sm text-gray-600">See how you're doing with immediate validation and tips</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
