import { useState } from 'react';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import GitHubIssuesList from './components/GitHubIssuesList';
import { GitHubIssue } from './components/GitHubIssuesList';
import IssueSummary from './components/IssueSummary';
import LoadingScreen from './components/LoadingScreen';
import MainWorkingScreen from './components/MainWorkingScreen';
import CompletionScreen from './components/CompletionScreen';
import Onboarding from './components/onboarding/Onboarding';
import { OnboardingProvider } from './components/onboarding/OnboardingContext';
import dotenv from 'dotenv';

// dotenv.config();

export type Screen =
	| 'signin'
	| 'onboarding'
	| 'dashboard'
	| 'issues'
	| 'loading-summary'
	| 'summary'
	| 'loading-workspace'
	| 'working'
	| 'completion';

export interface LanguageType {
	id: string;
	name: string;
	icon: string;
	color: string;
}

export interface ConceptType {
	id: string;
	name: string;
	description: string;
	estimatedTime: string;
}

export interface IssueType {
	id: string;
	title: string;
	difficulty: 'Easy' | 'Medium' | 'Difficult';
	concept: string;
	description: string;
	starterCode: string;
	solution: string;
	repo: string;
}

export default function App() {
	const [currentScreen, setCurrentScreen] = useState<Screen>('signin');
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState<LanguageType | null>(
		null
	);
	const [selectedGitHubIssue, setSelectedGitHubIssue] =
		useState<GitHubIssue | null>(null);
	const [currentIssue, setCurrentIssue] = useState<IssueType | null>(null);

	const handleSignIn = () => {
		setIsAuthenticated(true);
		setCurrentScreen('onboarding');
	};

	const handleOnboardingComplete = () => {
		setHasCompletedOnboarding(true);
		setCurrentScreen('dashboard');
	};

	const handleLanguageSelect = (language: LanguageType) => {
		setSelectedLanguage(language);
		setCurrentScreen('issues');
	};

	const handleGitHubIssueSelect = (issue: GitHubIssue) => {
		setSelectedGitHubIssue(issue);
		setCurrentScreen('loading-summary');

		// Simulate loading AI summary
		setTimeout(() => {
			setCurrentScreen('summary');
		}, 2500);
	};

	const handleStartIssue = (issue: IssueType) => {
		setCurrentIssue(issue);
		setCurrentScreen('loading-workspace');

		// Simulate loading workspace
		setTimeout(() => {
			setCurrentScreen('working');
		}, 2500);
	};

	const handleSubmit = () => {
		setCurrentScreen('completion');
	};

	const handleTryAgain = () => {
		setCurrentScreen('working');
	};

	const handleNextIssue = () => {
		setCurrentScreen('summary');
	};

	const handleBackToDashboard = () => {
		setCurrentScreen('dashboard');
		setSelectedLanguage(null);
		setSelectedGitHubIssue(null);
		setCurrentIssue(null);
	};

	return (
		<OnboardingProvider>
			<div className='min-h-screen bg-gray-50'>
				{currentScreen === 'signin' && <SignIn onSignIn={handleSignIn} />}
				{currentScreen === 'onboarding' && (
					<Onboarding onComplete={handleOnboardingComplete} />
				)}
				{currentScreen === 'dashboard' && (
					<Dashboard onLanguageSelect={handleLanguageSelect} />
				)}
				{currentScreen === 'issues' && (
					<GitHubIssuesList
						language={selectedLanguage!}
						onIssueSelect={handleGitHubIssueSelect}
						onBack={() => setCurrentScreen('dashboard')}
					/>
				)}
				{currentScreen === 'loading-summary' && selectedGitHubIssue && (
					<LoadingScreen type='issue-summary' issue={selectedGitHubIssue} />
				)}
				{currentScreen === 'summary' && selectedGitHubIssue && (
					<IssueSummary
						language={selectedLanguage!}
						githubIssue={selectedGitHubIssue}
						onStartIssue={handleStartIssue}
						onBack={() => setCurrentScreen('issues')}
					/>
				)}
				{currentScreen === 'loading-workspace' && currentIssue && (
					<LoadingScreen type='workspace' issue={currentIssue} />
				)}
				{currentScreen === 'working' && currentIssue && (
					<MainWorkingScreen
						issue={currentIssue}
						language={selectedLanguage!}
						onSubmit={handleSubmit}
						onNextIssue={handleNextIssue}
					/>
				)}
				{currentScreen === 'completion' && currentIssue && (
					<CompletionScreen
						issue={currentIssue}
						onTryAgain={handleTryAgain}
						onNextIssue={handleNextIssue}
						onBackToDashboard={handleBackToDashboard}
					/>
				)}
			</div>
		</OnboardingProvider>
	);
}
