import { useState, useEffect, useRef } from 'react';
import {
	ArrowLeft,
	Send,
	ChevronLeft,
	ChevronRight,
	FileCode,
	MessageSquare,
	BookOpen,
	Code,
	Eye,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { IssueType, LanguageType } from '../App';
import sdk from '@stackblitz/sdk';

interface MainWorkingScreenProps {
	issue: IssueType;
	language: LanguageType;
	onSubmit: () => void;
	onNextIssue: () => void;
}

interface ChatMessage {
	id: number;
	sender: 'user' | 'ai';
	message: string;
	timestamp: string;
}

interface LessonStep {
	id: number;
	title: string;
	description: string;
	codeSnippet?: string;
}

const mockLessonSteps: LessonStep[] = [
	{
		id: 1,
		title: 'Step 1: Understanding the Issue',
		description:
			"Read through the GitHub issue carefully. Identify what needs to be fixed or implemented. Look for any specific requirements or constraints mentioned by the maintainers. Pay close attention to the issue description, any attached screenshots or error logs, and comments from other contributors. Understanding the problem thoroughly before starting to code will save you time and help you create a better solution. Look for related issues and pull requests to see if anyone has attempted to solve this before. Check the project's documentation and coding standards to ensure your solution will align with the project's conventions. Take notes on the key requirements and any edge cases that need to be handled. If anything is unclear, don't hesitate to ask questions in the issue comments before starting your work.",
		codeSnippet:
			'// Review the issue description\n// Check for related pull requests\n// Look at existing code structure\n// Read project documentation\n// Note key requirements and edge cases',
	},
	{
		id: 2,
		title: 'Step 2: Fork and Clone',
		description:
			'Fork the repository to your GitHub account. Then clone it to your local environment using StackBlitz. This creates your own copy where you can make changes safely.',
		codeSnippet:
			'git clone https://github.com/octocat/Spoon-Knife.git\ncd Spoon-Knife',
	},
	{
		id: 3,
		title: 'Step 3: Create a Branch',
		description:
			"Always work on a new branch instead of the main branch. Use a descriptive name that reflects what you're working on.",
		codeSnippet:
			'git checkout -b fix/improve-readme\n// or\ngit checkout -b feature/add-dark-mode',
	},
	{
		id: 4,
		title: 'Step 4: Make Your Changes',
		description:
			"Implement the required changes. Follow the project's coding style and conventions. Test your changes thoroughly to ensure they work as expected.",
		codeSnippet:
			'// Edit the relevant files\n// Add new features or fix bugs\n// Ensure code quality and readability',
	},
	{
		id: 5,
		title: 'Step 5: Commit and Push',
		description:
			'Commit your changes with a clear, descriptive message. Then push your branch to your forked repository on GitHub.',
		codeSnippet:
			'git add .\ngit commit -m "Fix: Update README with installation steps"\ngit push origin fix/improve-readme',
	},
	{
		id: 6,
		title: 'Step 6: Create Pull Request',
		description:
			'Go to GitHub and create a pull request from your branch to the original repository. Provide a clear description of what you changed and why.',
		codeSnippet:
			'// On GitHub:\n// 1. Navigate to original repo\n// 2. Click "New Pull Request"\n// 3. Select your fork and branch\n// 4. Add title and description',
	},
];

const mockChatMessages: ChatMessage[] = [
	{
		id: 1,
		sender: 'ai',
		message:
			"Hello! I'm your AI coding assistant. I'm here to help you work through this GitHub issue. Feel free to ask me questions about the code, best practices, or next steps!",
		timestamp: '10:30 AM',
	},
	{
		id: 2,
		sender: 'ai',
		message:
			"I've loaded the Spoon-Knife repository for you. This is a great starter project for learning Git and GitHub workflows. What would you like to work on first?",
		timestamp: '10:31 AM',
	},
];

export default function MainWorkingScreen({
	issue,
	language,
	onSubmit,
	onNextIssue,
}: MainWorkingScreenProps) {
	const [editorView, setEditorView] = useState<'editor' | 'preview'>('editor');
	const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
	const [inputMessage, setInputMessage] = useState('');
	const [currentStep, setCurrentStep] = useState(0);
	const chatEndRef = useRef<HTMLDivElement>(null);
	const editorRef = useRef(null);

	console.log('----', issue);

	// Get StackBlitz embed URL
	const stackblitzUrl =
		editorView === 'preview'
			? `https://stackblitz.com/github/${issue.repo}?embed=1&view=preview`
			: `https://stackblitz.com/github/${issue.repo}?embed=1&file=index.html`;

	console.log('hhh', stackblitzUrl);

	// Auto-scroll chat to bottom
	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleSendMessage = () => {
		if (inputMessage.trim()) {
			const newMessage: ChatMessage = {
				id: messages.length + 1,
				sender: 'user',
				message: inputMessage,
				timestamp: new Date().toLocaleTimeString('en-US', {
					hour: '2-digit',
					minute: '2-digit',
				}),
			};
			setMessages([...messages, newMessage]);
			setInputMessage('');

			// Simulate AI response
			setTimeout(() => {
				const aiResponse: ChatMessage = {
					id: messages.length + 2,
					sender: 'ai',
					message:
						"That's a great question! Let me help you with that. The best approach would be to start by understanding the existing code structure and then make incremental changes.",
					timestamp: new Date().toLocaleTimeString('en-US', {
						hour: '2-digit',
						minute: '2-digit',
					}),
				};
				setMessages((prev) => [...prev, aiResponse]);
			}, 1000);
		}
	};

	const handleNextStep = () => {
		if (currentStep < mockLessonSteps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const currentLessonStep = mockLessonSteps[currentStep];

	console.log('llllllllll', issue.repo);

	useEffect(() => {
		if (editorRef.current) {
			sdk.embedGithubProject(
				editorRef.current,
				issue.repo, // Replace with your repo (format: "username/repo-name")
				{
					height: '100%',
					openFile: 'README.md.html',
					theme: 'light',
					view: editorView,
				}
			);
		}
	}, []);

	return (
		<div className='h-screen flex flex-col bg-white'>
			{/* Header with Issue Title */}
			<div className='bg-white border-b border-gray-200 px-6 py-4'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<FileCode className='w-5 h-5 text-blue-600' />
						<div>
							<h1 className='text-gray-900'>{issue.title}</h1>
							<p className='text-sm text-gray-500'>{issue.concept}</p>
						</div>
					</div>
					<div className='flex items-center gap-2'>
						<Badge className='bg-blue-100 text-blue-700 border-blue-300 border'>
							{language.name}
						</Badge>
						<Button
							size='sm'
							className='bg-green-600 hover:bg-green-700 text-white gap-2'
							onClick={onSubmit}
						>
							<Send className='w-4 h-4' />
							Submit Solution
						</Button>
					</div>
				</div>
			</div>

			{/* Main Content Area */}
			<div className='flex-1 flex overflow-hidden'>
				{/* Left Pane - Code Editor (70%) */}
				<div className='flex-1 flex flex-col border-r border-gray-200'>
					{/* Editor Toggle */}
					<div className='bg-gray-50 border-b border-gray-200 px-4 py-2'>
						{/* <div className='flex items-center gap-2'>
							<Button
								variant='ghost'
								size='sm'
								onClick={() => setEditorView('editor')}
								className={
									editorView === 'editor'
										? 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm'
										: 'hover:bg-gray-100'
								}
							>
								<Code className='w-4 h-4 mr-2' />
								Code
							</Button>
							<Button
								variant='ghost'
								size='sm'
								onClick={() => setEditorView('preview')}
								className={
									editorView === 'preview'
										? 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm'
										: 'hover:bg-gray-100'
								}
							>
								<Eye className='w-4 h-4 mr-2' />
								Preview
							</Button>
						</div> */}
					</div>

					{/* StackBlitz Editor */}
					<div className='flex-1 overflow-hidden'>
						{/* <iframe
							src={stackblitzUrl}
							className='w-full h-full'
							frameBorder='0'
						/> */}
						<div
							ref={editorRef}
							style={{
								width: '100%',
								height: '100vh', // full screen height
								border: 'none',
							}}
						/>
					</div>
				</div>

				{/* Right Pane - AI Interaction (30%) */}
				<div className='w-[30%] min-w-[400px] bg-white flex flex-col'>
					<Tabs
						defaultValue='lesson'
						className='flex-1 flex flex-col overflow-hidden'
					>
						<TabsList className='grid w-full grid-cols-2 rounded-none border-b border-gray-200 bg-gray-50 flex-shrink-0'>
							<TabsTrigger
								value='lesson'
								className='gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm'
							>
								<BookOpen className='w-4 h-4' />
								Lesson Plan
							</TabsTrigger>
							<TabsTrigger
								value='chat'
								className='gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm'
							>
								<MessageSquare className='w-4 h-4' />
								Chat
							</TabsTrigger>
						</TabsList>

						{/* Lesson Plan Tab */}
						<TabsContent
							value='lesson'
							className='flex-1 flex flex-col m-0 overflow-hidden'
						>
							{/* Lesson Step Card - Full Height */}
							<div className='flex-1 flex flex-col p-4'>
								<Card className='bg-gradient-to-br from-blue-50 to-white border-blue-200 p-6 flex flex-col h-full overflow-hidden'>
									{/* Step Counter - No Animation */}
									<div className='flex items-center justify-between mb-4 flex-shrink-0'>
										<Badge className='bg-blue-600 text-white rounded-md'>
											Step {currentStep + 1} of {mockLessonSteps.length}
										</Badge>
									</div>

									{/* Animated Content Area */}
									<div className='flex-1 overflow-y-auto'>
										<div
											key={currentStep}
											className='transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-right-4'
										>
											<h3 className='text-gray-900 mb-3'>
												{currentLessonStep.title}
											</h3>
											<p className='text-gray-600 mb-4 text-sm leading-relaxed'>
												{currentLessonStep.description}
											</p>

											{currentLessonStep.codeSnippet && (
												<div className='bg-gray-900 rounded-md overflow-hidden'>
													<div className='bg-gray-800 px-3 py-2 border-b border-gray-700'>
														<span className='text-xs text-gray-400'>
															Code Example
														</span>
													</div>
													<pre className='p-4 text-xs text-gray-100 overflow-x-auto'>
														<code>{currentLessonStep.codeSnippet}</code>
													</pre>
												</div>
											)}
										</div>
									</div>
								</Card>
							</div>

							{/* Navigation Buttons - Fixed at Bottom */}
							<div className='border-t border-gray-200 p-4 bg-gray-50 flex-shrink-0'>
								<div className='flex gap-2'>
									<Button
										variant='outline'
										className='flex-1 rounded-md'
										onClick={handlePrevStep}
										disabled={currentStep === 0}
									>
										<ChevronLeft className='w-4 h-4 mr-2' />
										Previous
									</Button>
									<Button
										className='flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md'
										onClick={handleNextStep}
										disabled={currentStep === mockLessonSteps.length - 1}
									>
										Next
										<ChevronRight className='w-4 h-4 ml-2' />
									</Button>
								</div>
							</div>
						</TabsContent>

						{/* Chat Tab */}
						<TabsContent
							value='chat'
							className='flex-1 flex flex-col m-0 overflow-hidden'
						>
							{/* Chat Messages */}
							<div className='flex-1 overflow-y-auto p-4 space-y-4'>
								{messages.map((msg) => (
									<div
										key={msg.id}
										className={`flex ${
											msg.sender === 'user' ? 'justify-end' : 'justify-start'
										}`}
									>
										<div
											className={`max-w-[80%] rounded-lg px-4 py-3 ${
												msg.sender === 'user'
													? 'bg-blue-600 text-white'
													: 'bg-gray-100 text-gray-900'
											}`}
										>
											<p className='text-sm'>{msg.message}</p>
											<p
												className={`text-xs mt-1 ${
													msg.sender === 'user'
														? 'text-blue-100'
														: 'text-gray-500'
												}`}
											>
												{msg.timestamp}
											</p>
										</div>
									</div>
								))}
								<div ref={chatEndRef} />
							</div>

							{/* Chat Input */}
							<div className='border-t border-gray-200 p-4 bg-gray-50 flex-shrink-0'>
								<div className='flex gap-2'>
									<input
										type='text'
										value={inputMessage}
										onChange={(e) => setInputMessage(e.target.value)}
										onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
										placeholder='Ask me anything...'
										className='flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'
									/>
									<Button
										size='sm'
										className='bg-blue-600 hover:bg-blue-700 text-white'
										onClick={handleSendMessage}
									>
										<Send className='w-4 h-4' />
									</Button>
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
