import type { RouterInputs } from "./types/inputs";
import type { RouterOutputs } from "./types/outputs";

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
	async duplicateProject(data: RouterInputs["project"]["duplicate"]) {
		return this.request<RouterOutputs["project"]["duplicate"]>(
			"/project.duplicate",
			{
				method: "POST",
				body: JSON.stringify(data),
			},
		);
	}

	async getProjectById(data: RouterInputs["project"]["one"]) {
		return this.request<RouterOutputs["project"]["one"]>(
			`/project.one?projectId=${data.projectId}`,
		);
	}

	// APPLICATION
	async updateApplication(data: RouterInputs["application"]["update"]) {
		return this.request<RouterOutputs["application"]["update"]>(
			"/application.update",
			{
				method: "POST",
				body: JSON.stringify(data),
			},
		);
	}

	async deployApplication(data: RouterInputs["application"]["deploy"]) {
		return this.request<RouterOutputs["application"]["deploy"]>(
			"/application.deploy",
			{
				method: "POST",
				body: JSON.stringify(data),
			},
		);
	}

	async removeApplication(data: RouterInputs["application"]["delete"]) {
		return this.request<RouterOutputs["application"]["delete"]>(
			"/application.delete",
			{
				method: "POST",
				body: JSON.stringify(data),
			},
		);
	}

	// DOMAIN
	async createDomain(data: RouterInputs["domain"]["create"]) {
		return this.request<RouterOutputs["domain"]["create"]>("/domain.create", {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	async deleteDomain(domainId: string) {
		return this.request<void>("/domain.delete", {
			method: "POST",
			body: JSON.stringify({ domainId }),
		});
	}

	async getDomainsByApplication(
		data: RouterInputs["domain"]["byApplicationId"],
	) {
		return this.request<RouterOutputs["domain"]["byApplicationId"]>(
			`/domain.byApplicationId?applicationId=${data.applicationId}`,
		);
	}
}
