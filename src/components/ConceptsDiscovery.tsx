import { ArrowLeft, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { LanguageType, ConceptType } from '../App';

interface ConceptsDiscoveryProps {
  language: LanguageType;
  onConceptSelect: (concept: ConceptType) => void;
  onBack: () => void;
}

const concepts: ConceptType[] = [
  {
    id: 'variables',
    name: 'Variables & Data Types',
    description: 'Learn about storing and managing data in your programs',
    estimatedTime: '15 min'
  },
  {
    id: 'functions',
    name: 'Functions & Methods',
    description: 'Master creating reusable code blocks',
    estimatedTime: '20 min'
  },
  {
    id: 'loops',
    name: 'Loops & Iteration',
    description: 'Understand how to repeat operations efficiently',
    estimatedTime: '18 min'
  },
  {
    id: 'conditionals',
    name: 'Conditionals & Logic',
    description: 'Control program flow with if-else statements',
    estimatedTime: '12 min'
  },
  {
    id: 'arrays',
    name: 'Arrays & Collections',
    description: 'Work with groups of related data',
    estimatedTime: '25 min'
  },
  {
    id: 'objects',
    name: 'Objects & Classes',
    description: 'Structure your code with object-oriented programming',
    estimatedTime: '30 min'
  },
  {
    id: 'async',
    name: 'Async & Promises',
    description: 'Handle asynchronous operations and data fetching',
    estimatedTime: '22 min'
  },
  {
    id: 'algorithms',
    name: 'Common Algorithms',
    description: 'Practice sorting, searching, and problem-solving patterns',
    estimatedTime: '35 min'
  },
];

export default function ConceptsDiscovery({ language, onConceptSelect, onBack }: ConceptsDiscoveryProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="text-3xl">{language.icon}</div>
              <div>
                <h1 className="text-gray-900">{language.name} Concepts</h1>
                <p className="text-sm text-gray-500">Choose a topic to practice</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2">Explore Topics</h2>
          <p className="text-gray-600">Select a concept to start practicing with real coding challenges</p>
        </div>

        <div className="space-y-4">
          {concepts.map((concept) => (
            <Card
              key={concept.id}
              className="p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-md hover:border-blue-300"
              onClick={() => onConceptSelect(concept)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{concept.name}</h3>
                    <p className="text-gray-600 mb-3">{concept.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{concept.estimatedTime}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
