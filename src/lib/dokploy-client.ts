import type {
	ComposeDelete,
	ComposeDeploy,
	ComposeUpdate,
	DomainByComposeId,
	DomainCreate,
	ProjectDuplicate,
	ProjectOne,
} from "../types";

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
		return this.request<ProjectDuplicate>("/api/project.duplicate", {
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
		return this.request<ProjectOne>(`/api/project.one?projectId=${projectId}`);
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
	}) {
		return this.request<ComposeUpdate>("/api/compose.update", {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	async deployCompose(data: { composeId: string }) {
		return this.request<ComposeDeploy>("/api/compose.deploy", {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	async removeCompose(composeId: string) {
		return this.request<ComposeDelete>("/api/compose.delete", {
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
		return this.request<DomainCreate>("/api/domain.create", {
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
		return this.request<DomainByComposeId>(
			`/api/domain.byComposeId?composeId=${composeId}`,
		);
	}
}
