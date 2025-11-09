import { Trophy, RotateCcw, ArrowRight, Home, Star, Award, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { IssueType } from '../App';

interface CompletionScreenProps {
  issue: IssueType;
  onTryAgain: () => void;
  onNextIssue: () => void;
  onBackToDashboard: () => void;
}

export default function CompletionScreen({ 
  issue, 
  onTryAgain, 
  onNextIssue, 
  onBackToDashboard 
}: CompletionScreenProps) {
  const score = 95; // Mock score
  const xpEarned = issue.difficulty === 'Easy' ? 15 : issue.difficulty === 'Medium' ? 40 : 75;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-block relative">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 relative">
              <Trophy className="w-12 h-12 text-green-600" />
              <div className="absolute inset-0 w-24 h-24 bg-green-400 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          <h1 className="text-green-600 mb-2">Challenge Complete! 🎉</h1>
          <p className="text-gray-600">
            Great job solving "{issue.title}"
          </p>
        </div>

        {/* Score Card */}
        <Card className="bg-white border border-gray-200 p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-4xl mb-2 text-green-600">{score}%</div>
              <p className="text-sm text-gray-600">Accuracy Score</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-4xl mb-2 text-blue-600">+{xpEarned}</div>
              <p className="text-sm text-gray-600">XP Earned</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-4xl mb-2 text-purple-600">⭐⭐⭐</div>
              <p className="text-sm text-gray-600">Performance</p>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="bg-white border border-gray-200 p-6 mb-6">
          <h2 className="text-gray-900 mb-4">Achievements Unlocked</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Star className="w-8 h-8 text-yellow-600" />
              <div>
                <h3 className="text-gray-900">First Try Success</h3>
                <p className="text-sm text-gray-600">Solved on first attempt</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <Award className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="text-gray-900">Clean Code</h3>
                <p className="text-sm text-gray-600">Efficient solution</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Feedback */}
        <Card className="bg-white border border-gray-200 p-6 mb-8">
          <h2 className="text-gray-900 mb-4">What You Mastered</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="text-gray-900">Function Syntax</h3>
                <p className="text-sm text-gray-600">You demonstrated strong understanding of function declarations and parameters</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="text-gray-900">Return Values</h3>
                <p className="text-sm text-gray-600">Correctly used return statements to output results</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="text-gray-900">Code Quality</h3>
                <p className="text-sm text-gray-600">Your solution was clean, concise, and easy to understand</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={onTryAgain}
            className="flex-1 gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </Button>
          <Button
            size="lg"
            onClick={onNextIssue}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            Next Challenge
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onBackToDashboard}
            className="flex-1 gap-2"
          >
            <Home className="w-5 h-5" />
            Dashboard
          </Button>
        </div>

        {/* Next Steps Suggestion */}
        <Card className="bg-blue-50 border border-blue-200 p-6 mt-6">
          <h3 className="text-gray-900 mb-3">📚 Recommended Next Steps</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Try a Medium difficulty challenge to level up your skills</li>
            <li>• Explore related concepts like conditionals and loops</li>
            <li>• Review the solution approach to see alternative methods</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
