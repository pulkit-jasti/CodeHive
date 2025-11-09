import { ArrowLeft, PlayCircle, Clock, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { LanguageType, ConceptType, IssueType } from '../App';

interface LessonPageProps {
  language: LanguageType;
  concept: ConceptType;
  difficulty: 'Easy' | 'Medium' | 'Difficult';
  onStartIssue: (issue: IssueType) => void;
  onBack: () => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-700 border-green-300';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    case 'Difficult':
      return 'bg-red-100 text-red-700 border-red-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

export default function LessonPage({ language, concept, difficulty, onStartIssue, onBack }: LessonPageProps) {
  const mockIssue: IssueType = {
    id: '1',
    title: difficulty === 'Easy' 
      ? 'Create a Function to Add Two Numbers'
      : difficulty === 'Medium'
      ? 'Implement Array Filtering Logic'
      : 'Build a Recursive Fibonacci Function',
    difficulty,
    concept: concept.name,
    description: difficulty === 'Easy'
      ? 'Write a function that takes two numbers as parameters and returns their sum. This will help you understand function syntax and return values.'
      : difficulty === 'Medium'
      ? 'Create a function that filters an array based on a condition. You\'ll learn about array methods and callback functions.'
      : 'Implement a recursive function to calculate Fibonacci numbers. This challenge covers recursion, base cases, and optimization.',
    starterCode: language.name === 'JavaScript' || language.name === 'TypeScript'
      ? `function solve(a, b) {\n  // Your code here\n  \n}\n\nsolve(5, 3);`
      : language.name === 'Python'
      ? `def solve(a, b):\n    # Your code here\n    pass\n\nsolve(5, 3)`
      : `// Your code here`,
    solution: 'return a + b;'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="text-2xl">{language.icon}</div>
              <div>
                <h1 className="text-gray-900">Lesson Plan Ready</h1>
                <p className="text-sm text-gray-500">{concept.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Lesson Card */}
          <div className="lg:col-span-2">
            <Card className="bg-white border border-gray-200 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <Badge className={`${getDifficultyColor(difficulty)} border mb-4`}>
                    {difficulty}
                  </Badge>
                  <h2 className="text-gray-900 mb-3">{mockIssue.title}</h2>
                  <p className="text-gray-600">{mockIssue.description}</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Lesson Overview */}
                <div>
                  <h3 className="text-gray-900 mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <span>Understanding function parameters and return values</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <span>Practicing {language.name} syntax and conventions</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                      <span>Debugging and testing your solution</span>
                    </li>
                  </ul>
                </div>

                {/* Code Preview */}
                <div>
                  <h3 className="text-gray-900 mb-3">Starter Code</h3>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-100">
                      <code>{mockIssue.starterCode}</code>
                    </pre>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                  onClick={() => onStartIssue(mockIssue)}
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Start Coding Challenge
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card className="bg-white border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Challenge Info</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Est. Time</span>
                  </div>
                  <span className="text-sm text-gray-900">10-15 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">Points</span>
                  </div>
                  <span className="text-sm text-gray-900">
                    {difficulty === 'Easy' ? '15' : difficulty === 'Medium' ? '40' : '75'} XP
                  </span>
                </div>
              </div>
            </Card>

            {/* Tips Card */}
            <Card className="bg-blue-50 border border-blue-200 p-6">
              <h3 className="text-gray-900 mb-3">💡 Pro Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Read the problem carefully before coding</li>
                <li>• Use console.log() to debug your code</li>
                <li>• Test with different inputs</li>
                <li>• Don't hesitate to use hints if stuck</li>
              </ul>
            </Card>

            {/* Try Next Issue Button */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onStartIssue(mockIssue)}
            >
              Try Next Issue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
