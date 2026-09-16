import {
	afterAll,
	beforeAll,
	beforeEach,
	describe,
	expect,
	spyOn,
	test,
} from "bun:test";
import type { RouterInputs } from "../lib/types/inputs";
import type { RouterOutputs } from "../lib/types/outputs";
import { DatabaseManager } from "../lib/database";
import { generateDbName, generatePreviewUrl } from "../lib/utils";

type ApplicationFixture = Pick<
	RouterOutputs["application"]["one"],
	| "applicationId"
	| "name"
	| "sourceType"
	| "customGitUrl"
	| "customGitBranch"
	| "autoDeploy"
	| "env"
	| "serverId"
	| "environmentId"
>;

const repositoryUrl = "https://dev.azure.com/example/project/_git/website";
const envKeys = [
	"DATABASE_HOST",
	"DATABASE_USER",
	"DATABASE_PASSWORD",
	"DOKPLOY_URL",
	"DOKPLOY_API_TOKEN",
	"DOKPLOY_DEV_URL",
] as const;
const originalEnv = Object.fromEntries(
	envKeys.map((key) => [key, process.env[key]]),
);
let server: ReturnType<typeof Bun.serve>;
let webhookRouter: typeof import("./webhook")["webhookRouter"];
let applications: ApplicationFixture[];
let deployedIds: string[];
let readIds: string[];
let removedIds: string[];
let domains: Array<
	{ domainId: string; host: string; applicationId: string } &
	Partial<RouterInputs["domain"]["create"]>
>;
let duplicateCount: number;
let failDuplicate: boolean;
let failDomain: boolean;
let failReadId: string | null;
let returnIncompleteApplicationDetails: boolean;
const lock = spyOn(DatabaseManager.prototype, "withLock");
const createDatabase = spyOn(DatabaseManager.prototype, "createDatabase");
const dropDatabase = spyOn(DatabaseManager.prototype, "dropDatabase");

function application(
	applicationId: string,
	branch: string,
	overrides: Partial<ApplicationFixture> = {},
): ApplicationFixture {
	return {
		applicationId,
		name: applicationId,
		sourceType: "git",
		customGitUrl: repositoryUrl,
		customGitBranch: branch,
		autoDeploy: true,
		env: "APP_ENV=production",
		serverId: null,
		environmentId: "environment-1",
		...overrides,
	};
}

function project() {
	return {
		projectId: "project-1",
		environments: [
			{
				environmentId: "environment-1",
				applications: applications.map((app) => ({
					applicationId: app.applicationId,
					name: app.name,
					applicationStatus: "done",
					serverId: app.serverId,
				})),
			},
		],
	};
}

async function push(branch: string, deleted = false) {
	return webhookRouter.request("/azure", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			eventType: "git.push",
			resource: {
				refUpdates: [
					{
						name: `refs/heads/${branch}`,
						newObjectId: (deleted ? "0" : "1").repeat(40),
					},
				],
				repository: {
					id: "repository-1",
					name: "website",
					remoteUrl: repositoryUrl,
					defaultBranch: "refs/heads/main",
				},
				pushedBy: { displayName: "Test user" },
			},
		}),
	});
}

beforeAll(async () => {
	server = Bun.serve({
		port: 0,
		hostname: "127.0.0.1",
		fetch: async (request) => {
			const url = new URL(request.url);
			switch (url.pathname) {
				case "/project.all":
					return Response.json([project()]);
				case "/project.one":
					return Response.json(project());
				case "/application.one": {
					const id = url.searchParams.get("applicationId")!;
					readIds.push(id);
					if (id === failReadId) {
						return Response.json(
							{ message: "Application read failed" },
							{ status: 503 },
						);
					}
					if (returnIncompleteApplicationDetails) {
						return Response.json({ applicationId: id, name: id });
					}
					return Response.json(
						applications.find((app) => app.applicationId === id),
					);
				}
				case "/application.deploy": {
					const body = (await request.json()) as { applicationId: string };
					deployedIds.push(body.applicationId);
					return Response.json(true);
				}
				case "/project.duplicate": {
					const body = (await request.json()) as {
						selectedServices: Array<{ id: string }>;
					};
					const source = applications.find(
						(app) => app.applicationId === body.selectedServices[0]!.id,
					)!;
					duplicateCount++;
					applications.push({
						...source,
						applicationId: "preview",
						name: `${source.name} (copy)`,
					});
					domains.push({
						domainId: "copied-domain",
						host: "staging.example.com",
						applicationId: "preview",
					});
					if (failDuplicate) {
						applications.push(application("unrelated-new-app", "main"));
						return Response.json(
							{ message: "Duplication partially failed" },
							{ status: 500 },
						);
					}
					return Response.json({ environmentId: "environment-1" });
				}
				case "/application.update": {
					const body = (await request.json()) as Partial<ApplicationFixture>;
					Object.assign(
						applications.find((app) => app.applicationId === body.applicationId)!,
						body,
					);
					return Response.json(true);
				}
				case "/application.delete": {
					const body = (await request.json()) as { applicationId: string };
					removedIds.push(body.applicationId);
					applications = applications.filter(
						(app) => app.applicationId !== body.applicationId,
					);
					return Response.json(true);
				}
				case "/domain.byApplicationId":
					return Response.json(
						domains.filter((domain) =>
							domain.applicationId === url.searchParams.get("applicationId"),
						),
					);
				case "/domain.delete": {
					const body = (await request.json()) as { domainId: string };
					domains = domains.filter((domain) => domain.domainId !== body.domainId);
					return Response.json(true);
				}
				case "/domain.create": {
					if (failDomain) {
						return Response.json(
							{ message: "Domain creation failed" },
							{ status: 500 },
						);
					}
					const body = (await request.json()) as {
						applicationId: string;
						host: string;
					};
					domains.push({ ...body, domainId: "preview-domain" });
					return Response.json(true);
				}
				default:
					return Response.json(
						{ message: "Unexpected test API request" },
						{ status: 500 },
					);
			}
		},
	});
	process.env.DATABASE_HOST = "127.0.0.1";
	process.env.DATABASE_USER = "test";
	process.env.DATABASE_PASSWORD = "test";
	process.env.DOKPLOY_URL = server.url.toString().replace(/\/$/, "");
	process.env.DOKPLOY_API_TOKEN = "test-token";
	process.env.DOKPLOY_DEV_URL = "preview.example.com";
	({ webhookRouter } = await import("./webhook"));
});

beforeEach(() => {
	applications = [];
	deployedIds = [];
	readIds = [];
	removedIds = [];
	domains = [];
	duplicateCount = 0;
	failDuplicate = false;
	failDomain = false;
	failReadId = null;
	returnIncompleteApplicationDetails = false;
	lock.mockClear();
	lock.mockImplementation(async (_name, operation) => operation());
	createDatabase.mockClear();
	createDatabase.mockImplementation(async (database) => ({
		database,
		username: "preview-user",
		password: "preview-password",
		connectionUrl: `mariadb://preview-user:preview-password@database:3306/${database}`,
	}));
	dropDatabase.mockClear();
	dropDatabase.mockResolvedValue(undefined);
});

afterAll(() => {
	server?.stop(true);
	lock.mockRestore();
	createDatabase.mockRestore();
	dropDatabase.mockRestore();
	for (const key of envKeys) {
		if (originalEnv[key] === undefined) delete process.env[key];
		else process.env[key] = originalEnv[key];
	}
});

describe("webhooks with summary-only Dokploy project responses", () => {
	test("deploys every enabled repository and branch match using application details", async () => {
		applications = [
			application("live", "main"),
			application("failover", "main", { serverId: "remote-server" }),
			application("disabled", "main", { autoDeploy: false }),
			application("staging", "staging"),
			application("other-repository", "main", {
				customGitUrl: "https://dev.azure.com/example/other/_git/website",
			}),
		];
		const response = await push("main");
		expect(response.status).toBe(200);
		expect(deployedIds.sort()).toEqual(["failover", "live"]);
		expect(await response.json()).toMatchObject({
			success: true,
			skippedApplicationIds: ["disabled"],
		});
		expect(readIds.sort()).toEqual([
			"disabled", "failover", "live", "other-repository", "staging",
		]);
	});

	test("creates a preview using the duplicated application's full configuration", async () => {
		applications = [
			application("staging", "staging", {
				env: "KEEP=value\nDATABASE_URL=\nWP_HOME=https://staging.example.com",
				serverId: "remote-server",
			}),
		];
		const response = await push("feature/login");
		expect(response.status).toBe(200);
		expect(duplicateCount).toBe(1);
		expect(deployedIds).toEqual(["preview"]);
		const preview = applications.find((app) => app.applicationId === "preview")!;
		const host = generatePreviewUrl(
			"website", "repository-1", "feature/login", "preview.example.com",
		);
		expect(preview).toMatchObject({
			name: "@feature/login",
			customGitBranch: "feature/login",
			serverId: "remote-server",
		});
		expect(preview.env).toContain("KEEP=value");
		expect(preview.env).toContain(`WP_HOME=https://${host}`);
		expect(preview.env).toContain("DATABASE_URL=mariadb://preview-user:");
		expect(createDatabase).toHaveBeenCalledTimes(1);
		expect(domains).toEqual([
			{
				applicationId: "preview",
				host,
				domainId: "preview-domain",
				domainType: "application",
				port: 80,
				https: true,
				certificateType: "letsencrypt",
			},
		]);
		expect(removedIds).toEqual([]);
	});

	test("rejects incomplete application details instead of reporting no matches", async () => {
		applications = [application("live", "main")];
		returnIncompleteApplicationDetails = true;
		const response = await push("main");
		expect(response.status).toBe(500);
		expect(await response.json()).toMatchObject({
			success: false,
			message: "Incomplete Dokploy application.one response for application=live",
		});
		expect(deployedIds).toEqual([]);
	});

	test("cleans up a duplicate after a partially failed duplication response", async () => {
		applications = [application("staging", "staging")];
		failDuplicate = true;
		const response = await push("feature/login");
		expect(response.status).toBe(500);
		expect(removedIds).toEqual(["preview"]);
		expect(applications.map((app) => app.applicationId)).toEqual([
			"staging", "unrelated-new-app",
		]);
		expect(deployedIds).toEqual([]);
		expect(createDatabase).not.toHaveBeenCalled();
	});

	test("removes the database and app after preview domain creation fails", async () => {
		applications = [application("staging", "staging", { env: "DATABASE_URL=" })];
		failDomain = true;
		const response = await push("feature/login");
		expect(response.status).toBe(500);
		expect(removedIds).toEqual(["preview"]);
		expect(dropDatabase).toHaveBeenCalledWith(
			generateDbName("website", "repository-1", "feature/login"),
		);
		expect(deployedIds).toEqual([]);
	});

	test("fails the request when detail retrieval fails rather than creating a replacement preview", async () => {
		applications = [
			application("staging", "staging"),
			application("existing", "feature/login"),
		];
		failReadId = "existing";
		const response = await push("feature/login");
		expect(response.status).toBe(500);
		expect(duplicateCount).toBe(0);
		expect(deployedIds).toEqual([]);
	});

	test("deploys staging directly and uses fresh auto-deploy values on subsequent pushes", async () => {
		applications = [application("staging", "staging")];
		expect((await push("staging")).status).toBe(200);
		expect(deployedIds).toEqual(["staging"]);
		applications[0]!.autoDeploy = false;
		expect((await push("feature/login")).status).toBe(200);
		expect(duplicateCount).toBe(0);
		expect(lock).not.toHaveBeenCalled();
	});

	test("does not duplicate an existing preview with auto deploy disabled", async () => {
		applications = [
			application("staging", "staging"),
			application("existing", "feature/login", {
				name: "@feature/login",
				autoDeploy: null,
			}),
		];
		const response = await push("feature/login");
		expect(response.status).toBe(200);
		expect(await response.json()).toMatchObject({
			skippedApplicationIds: ["existing"],
		});
		expect(duplicateCount).toBe(0);
		expect(deployedIds).toEqual([]);
	});

	test("finds an existing preview during the post-lock inventory refresh", async () => {
		applications = [application("staging", "staging")];
		lock.mockImplementation(async (_name, operation) => {
			applications.push(
				application("existing", "feature/login", { name: "@feature/login" }),
			);
			return operation();
		});
		expect((await push("feature/login")).status).toBe(200);
		expect(deployedIds).toEqual(["existing"]);
		expect(duplicateCount).toBe(0);
	});

	test("removes a disabled preview and its database using the full environment", async () => {
		const database = generateDbName("website", "repository-1", "feature/login");
		applications = [
			application("existing", "feature/login", {
				name: "@feature/login",
				autoDeploy: false,
				env: `DATABASE_URL=mariadb://user:password@database:3306/${database}`,
			}),
		];
		expect((await push("feature/login", true)).status).toBe(200);
		expect(removedIds).toEqual(["existing"]);
		expect(dropDatabase).toHaveBeenCalledWith(database);
	});

	test("creates previews without database or home URL overrides when staging has neither key", async () => {
		applications = [application("staging", "staging", { env: "KEEP=value" })];
		expect((await push("feature/login")).status).toBe(200);
		const preview = applications.find((app) => app.applicationId === "preview")!;
		expect(preview.env).toBe("KEEP=value");
		expect(createDatabase).not.toHaveBeenCalled();
		expect(deployedIds).toEqual(["preview"]);
	});
});
