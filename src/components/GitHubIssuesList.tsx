import { useState, useEffect } from 'react';
import {
	ArrowLeft,
	Search,
	X,
	ExternalLink,
	GitPullRequest,
	Calendar,
	MessageSquare,
	Star,
	Clock,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { LanguageType } from '../App';
import { useOnboarding } from './onboarding/OnboardingContext';
import axios from 'axios';

export interface GitHubIssue {
	id: number;
	number: number;
	title: string;
	body: string;
	url: string;
	repository_url: string;
	html_url: string;
	user: {
		login: string;
		id: number;
		avatar_url: string;
		html_url: string;
	};
	labels: Array<{
		id: number;
		name: string;
		color: string;
	}>;
	state: string;
	comments: number;
	created_at: string;
	updated_at: string;
	pull_request?: {
		url: string;
		html_url: string;
	};
}

interface GitHubIssuesListProps {
	language: LanguageType;
	onIssueSelect: (issue: GitHubIssue) => void;
	onBack: () => void;
}

const getRepositoryName = (url: string): string => {
	const parts = url.split('/');
	return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
};

const getTimeAgo = (dateString: string): string => {
	const date = new Date(dateString);
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffDays === 0) return 'today';
	if (diffDays === 1) return 'yesterday';
	if (diffDays < 7) return `${diffDays} days ago`;
	if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
	return `${Math.floor(diffDays / 30)} months ago`;
};

export default function GitHubIssuesList({
	language,
	onIssueSelect,
	onBack,
}: GitHubIssuesListProps) {
	const [searchTerm, setSearchTerm] = useState('');
	const [issues, setIssues] = useState<GitHubIssue[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { answers } = useOnboarding();

	// Map language to GitHub query language
	const getLanguageQuery = (lang: LanguageType): string => {
		const languageMap: Record<string, string> = {
			html: 'HTML',
			css: 'CSS',
			typescript: 'TypeScript',
			python: 'Python',
			javascript: 'JavaScript',
		};
		return languageMap[lang.id] || lang.name;
	};

	// Build GitHub API query based on language and onboarding answers
	const buildQuery = (): string => {
		const queryParts: string[] = [];

		// Language filter
		queryParts.push(`language:${getLanguageQuery(language)}`);

		// Only open issues
		queryParts.push('state:open');
		queryParts.push('type:issue');

		// Filter by skill level - add good first issue label for beginners
		if (answers.skillLevel === 'beginner') {
			queryParts.push('label:"good first issue"');
		} else if (answers.skillLevel === 'intermediate') {
			queryParts.push('label:"help wanted"');
		}

		// Filter by project domain if available
		// if (answers.projectDomain === 'web') {
		// 	queryParts.push('(label:web');
		// } else if (answers.projectDomain === 'data') {
		// 	queryParts.push('(label:ml)');
		// } else if (answers.projectDomain === 'tools') {
		// 	queryParts.push('(label:developer-tools)');
		// }

		return queryParts.join(' ');
	};

	// Fetch issues from GitHub API
	useEffect(() => {
		const fetchIssues = async () => {
			try {
				setLoading(true);
				setError(null);

				const query = buildQuery();
				const response = await axios.get(
					'https://api.github.com/search/issues',
					{
						params: {
							q: query,
							sort: 'updated',
							order: 'desc',
							per_page: 30,
						},
					}
				);

				setIssues(response.data.items);
			} catch (err) {
				console.error('Error fetching GitHub issues:', err);
				setError('Failed to load issues. Showing sample data instead.');
				// Fallback to mock data on error
				setIssues([]);
			} finally {
				setLoading(false);
			}
		};

		fetchIssues();
	}, [language, answers]);

	const filteredIssues = issues.filter(
		(issue) =>
			issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			getRepositoryName(issue.repository_url)
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			issue.labels.some((label) =>
				label.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
	);

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50'>
			{/* Header */}
			<div className='border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10'>
				<div className='max-w-7xl mx-auto px-6 py-4'>
					<div className='flex items-center gap-4'>
						<Button variant='ghost' size='icon' onClick={onBack}>
							<ArrowLeft className='w-5 h-5' />
						</Button>
						<div className='flex items-center gap-3'>
							<div className='text-3xl'>{language.icon}</div>
							<div>
								<h1 className='text-gray-900'>{language.name} Open Issues</h1>
								<p className='text-sm text-gray-500'>
									Choose an issue to contribute
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-5xl mx-auto px-6 py-12'>
				<div className='mb-8'>
					<h2 className='text-gray-900 mb-2'>Available Issues</h2>
					<p className='text-gray-600 mb-6'>
						Try searching for your favorite tools or products - you might be
						surprised which ones are open source!
					</p>

					{/* Search Bar */}
					<div className='relative'>
						<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
						<input
							type='text'
							placeholder='Search issues by title, repository, or labels...'
							className='w-full pl-12 pr-12 py-3 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						{searchTerm && (
							<button
								className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
								onClick={() => setSearchTerm('')}
								aria-label='Clear search'
							>
								<X className='w-5 h-5' />
							</button>
						)}
					</div>
				</div>

				{/* Error Message */}
				{error && (
					<div className='mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
						<p className='text-sm text-yellow-800'>{error}</p>
					</div>
				)}

				{/* Loading State */}
				{loading && (
					<div className='flex flex-col items-center justify-center py-16'>
						<div className='w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4'></div>
						<p className='text-gray-600'>Loading issues from GitHub...</p>
					</div>
				)}

				{/* Empty State */}
				{!loading && filteredIssues.length === 0 && (
					<div className='flex flex-col items-center justify-center py-16 text-center'>
						<Search className='w-16 h-16 text-gray-300 mb-4' />
						<h3 className='text-gray-900 mb-2'>No issues found</h3>
						<p className='text-gray-600 max-w-md'>
							{searchTerm
								? 'Try adjusting your search terms or clear the search to see all issues.'
								: 'No issues available for this language at the moment. Try selecting a different language.'}
						</p>
					</div>
				)}

				{/* Issues List */}
				{!loading && filteredIssues.length > 0 && (
					<div className='space-y-4'>
						{filteredIssues.map((issue) => (
							<Card
								key={issue.id}
								className='p-6 bg-white border border-gray-200 cursor-pointer transition-all hover:shadow-md hover:border-blue-300 group'
								onClick={() => onIssueSelect(issue)}
							>
								<div className='space-y-4'>
									{/* Header with Title and PR Badge */}
									<div className='flex items-start gap-3'>
										<div className='flex-1'>
											<div className='flex items-start gap-2 mb-2'>
												<h3 className='text-gray-900 flex-1 group-hover:text-blue-600 transition-colors'>
													{issue.title}
												</h3>
												{issue.pull_request && (
													<Badge className='bg-purple-100 text-purple-700 border-purple-300 border flex items-center gap-1'>
														<GitPullRequest className='w-3 h-3' />
														PR
													</Badge>
												)}
											</div>

											{/* Repository Name */}
											<div className='flex items-center gap-2 text-sm text-gray-500 mb-3'>
												<span className='font-mono'>
													{getRepositoryName(issue.repository_url)}
												</span>
											</div>

											{/* Labels */}
											<div className='flex items-center gap-2 flex-wrap mb-3'>
												<Badge className='bg-green-100 text-green-700 border-green-300 border'>
													{issue.state}
												</Badge>
												{issue.labels.map((label) => (
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

											{/* Issue Description Preview */}
											<p className='text-sm text-gray-600 line-clamp-2'>
												{issue.body}
											</p>
										</div>
									</div>

									{/* Footer with Author, Comments, and Updated Date */}
									<div className='flex items-center justify-between pt-3 border-t border-gray-100'>
										<div className='flex items-center gap-4'>
											{/* Author */}
											<div className='flex items-center gap-2'>
												<Avatar className='w-6 h-6'>
													<img
														src={issue.user.avatar_url}
														alt={issue.user.login}
													/>
												</Avatar>
												<span className='text-sm text-gray-600'>
													{issue.user.login}
												</span>
											</div>

											{/* Comments */}
											<div className='flex items-center gap-1 text-gray-500'>
												<MessageSquare className='w-4 h-4' />
												<span className='text-sm'>{issue.comments}</span>
											</div>
										</div>

										{/* Updated At */}
										<div className='flex items-center gap-1 text-gray-500'>
											<Clock className='w-4 h-4' />
											<span className='text-sm'>
												Updated {getTimeAgo(issue.updated_at)}
											</span>
										</div>
									</div>
								</div>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
