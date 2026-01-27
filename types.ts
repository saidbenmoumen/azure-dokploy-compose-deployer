interface AzureUser {
	displayName: string;
	url: string;
	_links: {
		avatar: {
			href: string;
		};
	};
	id: string;
	uniqueName: string;
	imageUrl: string;
	descriptor: string;
}

interface AzureProject {
	id: string;
	name: string;
	description?: string;
	url: string;
	state: string;
	revision?: number;
	visibility: string;
	lastUpdateTime: string;
}

interface AzureRepository {
	id: string;
	name: string;
	url: string;
	project: AzureProject;
	defaultBranch: string;
	remoteUrl: string;
	sshUrl?: string;
	webUrl?: string;
	size?: number;
	isDisabled?: boolean;
	isInMaintenance?: boolean;
}

interface AzureResourceContainer {
	id: string;
	baseUrl: string;
}

interface AzureResourceContainers {
	collection: AzureResourceContainer;
	account: AzureResourceContainer;
	project: AzureResourceContainer;
}

interface RefUpdate {
	name: string;
	oldObjectId: string;
	newObjectId: string;
}

interface AzureCommit {
	commitId: string;
	url: string;
	author?: {
		name: string;
		email: string;
		date: string;
	};
	committer?: {
		name: string;
		email: string;
		date: string;
	};
	comment?: string;
	commentTruncated?: boolean;
}

export interface GitPushEvent {
	id: string;
	eventType: "git.push";
	publisherId: string;
	message: {
		text: string | null;
	};
	detailedMessage: {
		text: string | null;
	};
	resource: {
		refUpdates: RefUpdate[];
		repository: AzureRepository;
		pushedBy: AzureUser;
		pushId: number;
		date: string;
		url: string;
		_links: {
			self: { href: string };
			repository: { href: string };
			commits: { href: string };
			pusher: { href: string };
			refs: { href: string };
		};
	};
	resourceVersion: string;
	resourceContainers: AzureResourceContainers;
	createdDate: string;
}

export interface PullRequestMergedEvent {
	id: string;
	eventType: "git.pullrequest.merged";
	publisherId: string;
	message: null;
	detailedMessage: null;
	resource: {
		repository: AzureRepository;
		pullRequestId: number;
		codeReviewId: number;
		status: string;
		createdBy: AzureUser;
		creationDate: string;
		closedDate: string;
		title: string;
		description: string;
		sourceRefName: string;
		targetRefName: string;
		mergeStatus: string;
		isDraft: boolean;
		mergeId: string;
		lastMergeSourceCommit: AzureCommit;
		lastMergeTargetCommit: AzureCommit;
		lastMergeCommit: AzureCommit;
		reviewers: AzureUser[];
		url: string;
		_links: {
			web: { href: string };
			statuses: { href: string };
		};
		completionOptions: {
			mergeCommitMessage: string;
			deleteSourceBranch: boolean;
			mergeStrategy: string;
			transitionWorkItems: boolean;
			autoCompleteIgnoreConfigIds: string[];
		};
		supportsIterations: boolean;
		completionQueueTime: string;
		closedBy: AzureUser;
		artifactId: string;
	};
	resourceVersion: string;
	resourceContainers: AzureResourceContainers;
	createdDate: string;
}

export type AzureEvent = GitPushEvent | PullRequestMergedEvent;
