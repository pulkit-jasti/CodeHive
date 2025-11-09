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
import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

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
	// codeSnippet?: string;
}

const stepsSchema = z.array(
	z.object({
		id: z.number(),
		title: z.string(),
		description: z.string(),
	})
);

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

	const [mockLessonSteps, setMockLessonSteps] = useState<Array<LessonStep>>([
		{ description: 'loading', id: 0, title: 'loading' },
	]);

	console.log(';;;;;;;;;;', issue);

	const genAI = new GoogleGenAI({
		apiKey: '  ',
	});

	const getChapters = async () => {
		const prompt = `
			You are an AI tutor helping a student understand and solve a GitHub issue.

			- Analyze the repository at: ${issue.repoLink}
			- Analyze the issue at: ${issue.issueLink}

			Your goal:
			Generate a conceptual, easy-to-follow set of steps that explain how to understand and approach solving this issue.

			Guidelines:
			- Focus on reasoning and learning, not on providing actual code.
			- Each step should have a short, descriptive title and a detailed explanation in the body.
			- Include steps like understanding the repo, identifying the problem, and planning a solution.
			- Output ONLY valid JSON matching the required format.

			Example output:
			[
				{
					"id": 1,
					"title": "Getting Started",
					"description": "Describe what the project is about, and where the relevant files live."
				},
				{
					"id": 2,
					"title": "Understanding the Repository",
					"description": "Explain key folders, dependencies, and how they connect to the issue."
				}
			]
			`;

		const response = await genAI.models.generateContent({
			model: 'gemini-2.5-flash',
			contents: prompt,
			config: {
				responseMimeType: 'application/json',
				responseJsonSchema: zodToJsonSchema(stepsSchema),
			},
		});

		const ggg = stepsSchema.parse(JSON.parse(response.text));

		setMockLessonSteps(ggg);

		console.log('----kkkkkk', ggg);
	};

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

	useEffect(() => {
		getChapters();
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

											{/* {currentLessonStep.codeSnippet && (
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
											)} */}
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
