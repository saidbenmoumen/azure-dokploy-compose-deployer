import type { RouterInputs } from "./types/inputs";
import type { RouterOutputs } from "./types/outputs";

// project endpoints expose service summaries in Dokploy 0.30.6
// narrow the older generated contracts to the index fields we actually use
type Project = RouterOutputs["project"]["one"];
type Environment = Project["environments"][number];
export type ProjectIndex = Pick<Project, "projectId"> & {
	environments: Array<
		Pick<Environment, "environmentId"> & {
			applications: Array<Pick<Environment["applications"][number], "applicationId">>;
		}
	>;
};

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
	async getProjects(): Promise<ProjectIndex[]> {
		return this.request<RouterOutputs["project"]["all"]>("/project.all");
	}

	async duplicateProject(data: RouterInputs["project"]["duplicate"]) {
		return this.request<RouterOutputs["project"]["duplicate"]>(
			"/project.duplicate",
			{
				method: "POST",
				body: JSON.stringify(data),
			},
		);
	}

	async getProjectById(
		data: RouterInputs["project"]["one"],
	): Promise<ProjectIndex> {
		return this.request<RouterOutputs["project"]["one"]>(
			`/project.one?projectId=${data.projectId}`,
		);
	}

	// APPLICATION
	async getApplicationById(data: RouterInputs["application"]["one"]) {
		const application = await this.request<RouterOutputs["application"]["one"]>(
			`/application.one?applicationId=${encodeURIComponent(data.applicationId)}`,
		);
		// validate the fields used for discovery and preview management
		if (
			!application ||
			application.applicationId !== data.applicationId ||
			typeof application.name !== "string" ||
			typeof application.environmentId !== "string" ||
			typeof application.sourceType !== "string" ||
			![
				application.customGitUrl,
				application.customGitBranch,
				application.env,
				application.serverId,
			].every((value) => value === null || typeof value === "string") ||
			(application.autoDeploy !== null &&
				typeof application.autoDeploy !== "boolean")
		) {
			throw new Error(
				`Incomplete Dokploy application.one response for application=${data.applicationId}`,
			);
		}
		return application;
	}

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
