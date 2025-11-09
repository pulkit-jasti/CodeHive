import { useState } from 'react';
import { Code2, Mail, Lock, Github, Chrome, Eye, EyeOff } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

interface SignInProps {
  onSignIn: () => void;
}

// Dummy user data for authentication
const DUMMY_USERS = [
  { email: 'demo@codehive.com', password: 'demo123' },
  { email: 'student@example.com', password: 'student123' },
  { email: 'test@test.com', password: 'test123' },
];

export default function SignIn({ onSignIn }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const user = DUMMY_USERS.find(
        u => u.email === email && u.password === password
      );

      if (user) {
        onSignIn();
      } else {
        setError('Invalid email or password. Try demo@codehive.com / demo123');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleDemoLogin = () => {
    setEmail('demo@codehive.com');
    setPassword('demo123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                <Code2 className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">CodeHive</h1>
                <p className="text-gray-600">Learn by contributing to open source</p>
              </div>
            </div>

            <div className="space-y-4 mt-12">
              <Card className="p-6 bg-white border border-blue-200 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">1,540+ Practice Problems</h3>
                    <p className="text-sm text-gray-600">Comprehensive coding challenges across 8 languages</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border border-green-200 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">Personalized Learning</h3>
                    <p className="text-sm text-gray-600">AI-powered hints and guidance tailored to your progress</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border border-purple-200 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">Track Your Progress</h3>
                    <p className="text-sm text-gray-600">Monitor achievements and skill improvements over time</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Code2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">CodeHive</h1>
              <p className="text-sm text-gray-500">Learn by contributing</p>
            </div>
          </div>

          <Card className="p-8 bg-white border border-gray-200 shadow-xl">
            <div className="mb-6">
              <h2 className="text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to continue your learning journey</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                onClick={handleDemoLogin}
              >
                Use Demo Account
              </Button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="border-gray-200 hover:bg-gray-50"
                onClick={() => setError('OAuth sign-in is not available in demo mode')}
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-gray-200 hover:bg-gray-50"
                onClick={() => setError('OAuth sign-in is not available in demo mode')}
              >
                <Chrome className="w-4 h-4 mr-2" />
                Google
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700"
                  onClick={() => setError('Registration is not available in demo mode. Use demo account instead.')}
                >
                  Sign up
                </button>
              </p>
            </div>
          </Card>

          {/* Demo Credentials Info */}
          <Card className="mt-4 p-4 bg-blue-50 border border-blue-200">
            <p className="text-xs text-blue-700 mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-blue-600">
              <p>• demo@codehive.com / demo123</p>
              <p>• student@example.com / student123</p>
              <p>• test@test.com / test123</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}