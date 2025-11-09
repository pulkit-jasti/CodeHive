import {
	ArrowLeft,
	PlayCircle,
	MessageSquare,
	GitPullRequest,
	Clock,
	Calendar,
	Tag,
	ExternalLink,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { LanguageType, IssueType } from '../App';
import { GitHubIssue } from './GitHubIssuesList';
import Markdown from 'react-markdown';
import Anthropic from '@anthropic-ai/sdk';
import { useEffect, useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface IssueSummaryProps {
	language: LanguageType;
	githubIssue: GitHubIssue;
	onStartIssue: (issue: IssueType) => void;
	onBack: () => void;
}

const getRepositoryName = (url: string): string => {
	const parts = url.split('/');
	return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
};

const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
};

export default function IssueSummary({
	language,
	githubIssue,
	onStartIssue,
	onBack,
}: IssueSummaryProps) {
	// Create a mock issue object for the working screen

	const [desc, setDesc] = useState<string | undefined>('Loading....');

	const mockIssue: IssueType = {
		id: githubIssue.id.toString(),
		title: githubIssue.title,
		difficulty: githubIssue.labels.some((l) => l.name === 'good first issue')
			? 'Easy'
			: 'Medium',
		concept: getRepositoryName(githubIssue.repository_url),
		description: githubIssue.body,
		starterCode:
			language.name === 'JavaScript' || language.name === 'TypeScript'
				? `// ${githubIssue.title}\n// Repository: ${getRepositoryName(
						githubIssue.repository_url
				  )}\n\nfunction contribute() {\n  // Your code here\n  \n}\n\ncontribute();`
				: language.name === 'Python'
				? `# ${githubIssue.title}\n# Repository: ${getRepositoryName(
						githubIssue.repository_url
				  )}\n\ndef contribute():\n    # Your code here\n    pass\n\ncontribute()`
				: language.name === 'HTML'
				? `<!-- ${githubIssue.title} -->\n<!-- Repository: ${getRepositoryName(
						githubIssue.repository_url
				  )} -->\n\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Contribution</title>\n</head>\n<body>\n  <!-- Your code here -->\n</body>\n</html>`
				: `/* ${githubIssue.title} */\n/* Repository: ${getRepositoryName(
						githubIssue.repository_url
				  )} */\n\n/* Your code here */`,
		solution: '// Solution will be provided after submission',
		repo: getRepositoryName(githubIssue.repository_url),
	};

	console.log('repo nameeeeee', getRepositoryName(githubIssue.repository_url));

	const issueLink = `https://github.com/${getRepositoryName(
		githubIssue.repository_url
	)}/issues/${githubIssue.number}`;

	const ai = new GoogleGenAI({
		apiKey: '',
	});

	// const getMessage = async () => {
	// 	const message = await client.messages.create({
	// 		max_tokens: 1024,
	// 		messages: [
	// 			{
	// 				role: 'user',
	// 				content: `Here's a github issue make it very simple to nuderstand and summarize in proper order what is the issue, what is it related to and how to potentially solve it
	// 			Github issue link: ${issueLink}`,
	// 			},
	// 		],
	// 		model: 'claude-sonnet-4-5-20250929',
	// 	});
	// 	return message;
	// };

	async function geminiGetMessage() {
		const gemresponse = await ai.models.generateContent({
			model: 'gemini-2.5-flash',
			config: {
				systemInstruction:
					'Go through the contents of the request text carefully it will be the description of a github issue. You need to take that description and scan the github repo to which that description belongs based on the link provided and make a very simple to understand summary of it so that beginner developers will be able to easily understand the issue. Very important to visit the link and check the files. Also mention in the end what the user would learn if they try to fix this issue. The response should be in proper buller points decorated with emojis',
			},
			contents: `Here's the issue description {githubIssue.body} \n Here's the issue link ${issueLink}`,
		});

		const finalMessage = gemresponse.candidates[0].content?.parts[0].text;
		setDesc(finalMessage);
		console.log(finalMessage);
	}

	useEffect(() => {
		const messss = geminiGetMessage();
		console.log('=========== ', messss);
	}, []);

	console.log('-------', githubIssue);

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50'>
			{/* Header */}
			<div className='border-b bg-white/80 backdrop-blur-sm'>
				<div className='max-w-5xl mx-auto px-6 py-4'>
					<div className='flex items-center gap-4'>
						<Button variant='ghost' size='icon' onClick={onBack}>
							<ArrowLeft className='w-5 h-5' />
						</Button>
						<div className='flex items-center gap-3'>
							<div className='text-2xl'>{language.icon}</div>
							<div>
								<h1 className='text-gray-900'>Issue Summary</h1>
								<p className='text-sm text-gray-500'>
									{getRepositoryName(githubIssue.repository_url)}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-5xl mx-auto px-6 py-12'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Main Summary Card */}
					<div className='lg:col-span-2'>
						<Card className='bg-white border border-gray-200 p-8'>
							{/* Issue Title and Badges */}
							<div className='mb-6'>
								<div className='flex items-start gap-2 mb-4'>
									<h2 className='text-gray-900 flex-1'>{githubIssue.title}</h2>
									{githubIssue.pull_request && (
										<Badge className='bg-purple-100 text-purple-700 border-purple-300 border flex items-center gap-1'>
											<GitPullRequest className='w-3 h-3' />
											PR
										</Badge>
									)}
								</div>

								{/* Labels */}
								<div className='flex items-center gap-2 flex-wrap mb-4'>
									<Badge className='bg-green-100 text-green-700 border-green-300 border'>
										{githubIssue.state}
									</Badge>
									{githubIssue.labels.map((label) => (
										<Badge
											key={label.name}
											style={{
												backgroundColor: `#${label.color}20`,
												borderColor: `#${label.color}`,
												color: `#${label.color}`,
											}}
											className='border'
										>
											{label.name}
										</Badge>
									))}
								</div>

								{/* Repository Link */}
								<a
									href={issueLink}
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-4'
								>
									<span className='font-mono'>
										{getRepositoryName(githubIssue.repository_url)}
									</span>
									<ExternalLink className='w-3 h-3' />
								</a>
							</div>

							{/* AI-Generated Summary */}
							<div className='space-y-6'>
								<div>
									<h3 className='text-gray-900 mb-3'>📋 Issue Overview</h3>
									<div className='prose prose-sm max-w-none text-gray-600'>
										{/* <Markdown>{githubIssue.body}</Markdown> */}
										<Markdown>{desc}</Markdown>
									</div>
								</div>

								{/* Action Button */}
								<Button
									className='w-full bg-blue-600 hover:bg-blue-700 text-white'
									size='lg'
									onClick={() => onStartIssue(mockIssue)}
								>
									<PlayCircle className='w-5 h-5 mr-2' />
									Start Working on This Issue
								</Button>
							</div>
						</Card>
					</div>

					{/* Sidebar */}
					<div className='space-y-6'>
						{/* Issue Metadata Card */}
						<Card className='bg-white border border-gray-200 p-6'>
							<h3 className='text-gray-900 mb-4'>Issue Details</h3>
							<div className='space-y-4'>
								{/* Author */}
								<div>
									<div className='flex items-center gap-2 text-gray-600 mb-2'>
										<span className='text-sm'>Author</span>
									</div>
									<div className='flex items-center gap-2'>
										<Avatar className='w-6 h-6'>
											<img
												src={githubIssue.user.avatar_url}
												alt={githubIssue.user.login}
											/>
										</Avatar>
										<span className='text-sm text-gray-900'>
											{githubIssue.user.login}
										</span>
									</div>
								</div>

								{/* Comments Count */}
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-2 text-gray-600'>
										<MessageSquare className='w-4 h-4' />
										<span className='text-sm'>Comments</span>
									</div>
									<span className='text-sm text-gray-900'>
										{githubIssue.comments}
									</span>
								</div>

								{/* Created At */}
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-2 text-gray-600'>
										<Calendar className='w-4 h-4' />
										<span className='text-sm'>Created</span>
									</div>
									<span className='text-sm text-gray-900'>
										{formatDate(githubIssue.created_at)}
									</span>
								</div>

								{/* Updated At */}
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-2 text-gray-600'>
										<Clock className='w-4 h-4' />
										<span className='text-sm'>Updated</span>
									</div>
									<span className='text-sm text-gray-900'>
										{formatDate(githubIssue.updated_at)}
									</span>
								</div>
							</div>
						</Card>

						{/* Contributing Tips Card */}
						<Card className='bg-blue-50 border border-blue-200 p-6'>
							<h3 className='text-gray-900 mb-3'>💡 Contributing Tips</h3>
							<ul className='space-y-2 text-sm text-gray-700'>
								<li>• Read the issue description carefully</li>
								<li>• Ask questions if anything is unclear</li>
								<li>• Follow the project's coding standards</li>
								<li>• Be respectful and collaborative</li>
								<li>• Document your changes clearly</li>
							</ul>
						</Card>

						{/* Back to Issues Button */}
						<Button variant='outline' className='w-full' onClick={onBack}>
							← Back to Issues
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
