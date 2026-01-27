import type {
	DokployCompose,
	DokployDomain,
	DokployEnvironment,
	DokployProject,
} from "../types/dokploy";

export class DokployClient {
	private baseUrl: string;
	private apiToken: string;

	constructor(baseUrl: string, apiToken: string) {
		this.baseUrl = baseUrl.replace(/\/$/, "");
		this.apiToken = apiToken;
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {},
	): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;
		const response = await fetch(url, {
			...options,
			headers: {
				"Content-Type": "application/json",
				"x-api-key": this.apiToken,
				...options.headers,
			},
		});

		if (!response.ok) {
			const error = await response.text();
			throw new Error(
				`Dokploy API error (${response.status}): ${error || response.statusText}`,
			);
		}

		return response.json() as T;
	}

	// PROJECT
	async duplicateProject(data: {
		name: string;
		composeId: string;
		environmentId: string;
	}) {
		return this.request<{
			environmentId: string;
			name: string;
			description: string;
			createdAt: string;
			env: string | null;
			projectId: string;
			isDefault: true;
			applications: [];
			mariadb: [];
			mongo: [];
			mysql: [];
			postgres: [];
			redis: [];
			compose: Array<{
				composeId: string;
				name: string;
				appName: string;
				description: string;
				env: string | null;
				composeFile: string;
				refreshToken: string;
				sourceType: string;
				composeType: "docker-compose";
				repository: null;
				owner: null;
				branch: string;
				autoDeploy: true;
				gitlabProjectId: null;
				gitlabRepository: null;
				gitlabOwner: null;
				gitlabBranch: null;
				gitlabPathNamespace: null;
				bitbucketRepository: null;
				bitbucketOwner: null;
				bitbucketBranch: null;
				giteaRepository: null;
				giteaOwner: null;
				giteaBranch: null;
				customGitUrl: null;
				customGitBranch: null;
				customGitSSHKeyId: null;
				command: "";
				enableSubmodules: false;
				composePath: string;
				suffix: "";
				randomize: false;
				isolatedDeployment: false;
				isolatedDeploymentsVolume: false;
				triggerType: "push";
				composeStatus: "error";
				environmentId: string;
				createdAt: string;
				watchPaths: null;
				githubId: null;
				gitlabId: null;
				bitbucketId: null;
				giteaId: null;
				serverId: null;
			}>;
		}>("/api/project.duplicate", {
			method: "POST",
			body: JSON.stringify({
				name: data.name,
				sourceEnvironmentId: data.environmentId,
				selectedServices: [
					{
						id: data.composeId,
						type: "compose",
					},
				],
				includeServices: true,
				duplicateInSameProject: true,
			}),
		});
	}

	async getProjectById(projectId: string) {
		return this.request<
			DokployProject & {
				environments: Pick<DokployEnvironment, "environmentId" | "compose">[];
			}
		>(`/api/project.one?projectId=${projectId}`);
	}

	// COMPOSE
	async updateCompose(data: {
		composeId: string;
		name?: string;
		appName?: string;
		description?: string;
		branch?: string;
		customGitBranch?: string;
		env?: string | null;
	}): Promise<DokployCompose> {
		return this.request<DokployCompose>("/api/compose.update", {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	async deployCompose(data: { composeId: string }) {
		return this.request<void>("/api/compose.deploy", {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	async removeCompose(composeId: string) {
		return this.request<void>("/api/compose.delete", {
			method: "POST",
			body: JSON.stringify({ composeId, deleteVolumes: true }),
		});
	}

	// DOMAIN
	async createDomain(data: {
		host: string;
		path?: string;
		port?: number;
		https?: boolean;
		certificateType?: "letsencrypt" | "none" | "custom";
		domainType?: "compose" | "application" | "preview";
		composeId?: string;
		serviceName?: string;
		applicationId?: string;
	}) {
		return this.request<DokployDomain>("/api/domain.create", {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	async deleteDomain(domainId: string) {
		return this.request<void>("/api/domain.delete", {
			method: "POST",
			body: JSON.stringify({ domainId }),
		});
	}

	async getDomainsByCompose(composeId: string) {
		return this.request<DokployDomain[]>(
			`/api/domain.byComposeId?composeId=${composeId}`,
		);
	}
}
