import { Code2, ChevronRight, FileCode, LogOut } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { LanguageType } from '../App';

interface DashboardProps {
  onLanguageSelect: (language: LanguageType) => void;
}

interface ExtendedLanguageType extends LanguageType {
  IconComponent: React.ComponentType<{ className?: string }>;
  description: string;
  difficulty: string;
  problems: number;
}

const languages: ExtendedLanguageType[] = [
  { 
    id: 'html', 
    name: 'HTML', 
    icon: 'HTML', 
    color: 'bg-orange-100 border-orange-300',
    IconComponent: Code2,
    description: 'Structure web content',
    difficulty: 'Beginner',
    problems: 180
  },
  { 
    id: 'css', 
    name: 'CSS', 
    icon: 'CSS', 
    color: 'bg-purple-100 border-purple-300',
    IconComponent: FileCode,
    description: 'Style and layout',
    difficulty: 'Beginner',
    problems: 200
  },
  { 
    id: 'typescript', 
    name: 'TypeScript', 
    icon: 'TS', 
    color: 'bg-blue-100 border-blue-300',
    IconComponent: Code2,
    description: 'Type-safe JavaScript',
    difficulty: 'Intermediate',
    problems: 180
  },
  { 
    id: 'python', 
    name: 'Python', 
    icon: 'PY', 
    color: 'bg-green-100 border-green-300',
    IconComponent: FileCode,
    description: 'Data science & automation',
    difficulty: 'Beginner',
    problems: 280
  },
];

export default function Dashboard({ onLanguageSelect }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-gray-900">CodeHive</h1>
                <p className="text-xs text-gray-500">Learn by contributing to open source</p>
              </div>
            </div>

            {/* Sign Out Button */}
            <Button 
              variant="ghost" 
              className="text-gray-600 hover:bg-gray-100"
              onClick={() => window.location.href = '/'}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-16">
          <h1 className="text-5xl text-gray-900 mb-4">Welcome to CodeHive! 👋</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Master new programming concepts while contributing to real open-source projects. 
            Learn by doing, grow your skills, and make an impact on the developer community—all in one place.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-gray-900 mb-2">Choose Your Language</h2>
          <p className="text-gray-600">Select a programming language to start learning</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {languages.map((language) => {
            const Icon = language.IconComponent;

            return (
              <Card
                key={language.id}
                className={`${language.color} border-2 p-6 cursor-pointer transition-all hover:shadow-xl hover:scale-105 active:scale-100 group relative overflow-hidden`}
                onClick={() => onLanguageSelect(language)}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon className="w-32 h-32 -mr-8 -mt-8" />
                </div>

                {/* Icon Badge */}
                <div className="relative mb-4">
                  <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow">
                    <Icon className="w-7 h-7 text-gray-700" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-gray-900">{language.name}</h3>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-gray-600">{language.description}</p>
                </div>
              </Card>
            );
          })}
        </div>


      </div>
    </div>
  );
}