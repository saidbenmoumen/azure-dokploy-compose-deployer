import { Hono } from "hono";
import type { AzureEvent, GitPushEvent } from "../../types";
import type {
	Application,
	ApplicationLocation,
} from "../lib/application-inventory";
import { getApplicationInventory } from "../lib/application-inventory";
import { DatabaseManager } from "../lib/database";
import { DokployClient } from "../lib/dokploy-client";
import {
	extractBranchName,
	generateDbName,
	generateLegacyDbName,
	generateLegacyPreviewUrl,
	generatePreviewUrl,
	getDatabaseNameFromEnv,
	getEnvValue,
	hash,
	isAutoDeployEnabled,
	normalizeRepositoryUrl,
	setEnvValue,
} from "../lib/utils";

export const webhookRouter = new Hono();

const ZERO_OBJECT_ID = "0000000000000000000000000000000000000000";
const STAGING_BRANCH = "staging";
const PROTECTED_BRANCHES = new Set([
	STAGING_BRANCH,
	"production",
	"prod",
	"main",
	"master",
	"dev",
]);

const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
if (!DATABASE_HOST || !DATABASE_USER || !DATABASE_PASSWORD) {
	throw new Error(
		"Missing required DATABASE_HOST/DATABASE_USER/DATABASE_PASSWORD environment variables",
	);
}

const dbManager = new DatabaseManager(
	DATABASE_HOST,
	DATABASE_USER,
	DATABASE_PASSWORD,
);

function getRepositoryKeys(
	repository: GitPushEvent["resource"]["repository"],
): Set<string> {
	const repositoryUrls = [repository.remoteUrl, repository.sshUrl].filter(
		(url): url is string => Boolean(url),
	);
	return new Set(
		repositoryUrls
			.map(normalizeRepositoryUrl)
			.filter((url): url is string => Boolean(url)),
	);
}

function findRepositoryApplications(
	applications: ApplicationLocation[],
	repositoryKeys: Set<string>,
): ApplicationLocation[] {
	return applications.filter(({ application }) => {
		if (application.sourceType !== "git" || !application.customGitUrl) {
			return false;
		}

		const repositoryKey = normalizeRepositoryUrl(application.customGitUrl);
		return repositoryKey !== null && repositoryKeys.has(repositoryKey);
	});
}

function isProtectedBranch(branch: string, defaultBranch: string): boolean {
	return branch === defaultBranch || PROTECTED_BRANCHES.has(branch);
}

function isStagingTemplate(application: Application): boolean {
	return (
		application.customGitBranch === STAGING_BRANCH &&
		!application.name.endsWith(" (copy)")
	);
}

async function deployApplications(
	dokploy: DokployClient,
	applications: ApplicationLocation[],
	branch: string,
): Promise<{
	deployedApplicationIds: string[];
	skippedApplicationIds: string[];
}> {
	const enabledApplications = applications.filter(({ application }) =>
		isAutoDeployEnabled(application.autoDeploy),
	);
	const skippedApplications = applications.filter(
		({ application }) => !isAutoDeployEnabled(application.autoDeploy),
	);
	for (const { application } of skippedApplications) {
		console.log(
			`[webhook] skipping application=${application.applicationId} branch=${branch} because auto deploy is disabled`,
		);
	}

	const results = await Promise.allSettled(
		enabledApplications.map(async ({ application }) => {
			console.log(
				`[webhook] deploying application=${application.applicationId} for branch=${branch}`,
			);
			await dokploy.deployApplication({
				applicationId: application.applicationId,
			});
		}),
	);

	const failedApplicationIds = results.flatMap((result, index) =>
		result.status === "rejected"
			? [enabledApplications[index]!.application.applicationId]
			: [],
	);
	if (failedApplicationIds.length > 0) {
		throw new Error(
			`Failed to trigger deployment for applications: ${failedApplicationIds.join(", ")}`,
		);
	}

	return {
		deployedApplicationIds: enabledApplications.map(
			({ application }) => application.applicationId,
		),
		skippedApplicationIds: skippedApplications.map(
			({ application }) => application.applicationId,
		),
	};
}

webhookRouter.post("/azure", async (c) => {
	try {
		const event = await c.req.json<AzureEvent>();

		console.log(`[webhook] received event: ${event.eventType}`);

		const DOKPLOY_URL = process.env.DOKPLOY_URL;
		const DOKPLOY_API_TOKEN = process.env.DOKPLOY_API_TOKEN;
		const DOKPLOY_DEV_URL = process.env.DOKPLOY_DEV_URL;
		if (!DOKPLOY_DEV_URL || !DOKPLOY_URL || !DOKPLOY_API_TOKEN) {
			console.error("[webhook] missing required environment variables");
			return c.json({
				success: false,
				message: "Missing required environment variables",
			});
		}

		if (event.eventType !== "git.push") {
			console.log(`[webhook] unhandled event type: ${event.eventType}`);
			return c.json({
				success: false,
				message: `Event type ${event.eventType} not handled`,
			});
		}

		const resource = event.resource;
		const refUpdate = resource.refUpdates[0];
		if (!refUpdate) {
			console.log("[webhook] no ref updates in push event, skipping");
			return c.json({
				success: false,
				message: "No ref updates in push event",
			});
		}

		if (!refUpdate.name.startsWith("refs/heads/")) {
			console.log(`[webhook] unsupported ref=${refUpdate.name}, skipping`);
			return c.json({
				success: true,
				message: "Only branch refs are handled",
			});
		}

		const branch = extractBranchName(refUpdate.name);
		const defaultBranch = extractBranchName(resource.repository.defaultBranch);
		const action =
			refUpdate.newObjectId === ZERO_OBJECT_ID ? "delete" : "update";
		const repositoryKeys = getRepositoryKeys(resource.repository);
		if (repositoryKeys.size === 0) {
			throw new Error(
				`Unable to identify Azure repository ${resource.repository.name}`,
			);
		}

		const dokploy = new DokployClient(DOKPLOY_URL, DOKPLOY_API_TOKEN);
		const inventory = await getApplicationInventory(dokploy);
		const repositoryApplications = findRepositoryApplications(
			inventory,
			repositoryKeys,
		);
		const targetApplications = repositoryApplications.filter(
			({ application }) =>
				application.customGitBranch === branch &&
				(branch !== STAGING_BRANCH || isStagingTemplate(application)),
		);

		console.log(
			`[webhook] repository=${resource.repository.name} branch=${branch} action=${action} pushedBy=${resource.pushedBy.displayName} matchingApps=${targetApplications.length}`,
		);

		if (action === "delete") {
			if (isProtectedBranch(branch, defaultBranch)) {
				console.log(
					`[webhook] protected branch=${branch}, skipping deletion`,
				);
				return c.json({
					success: true,
					branch,
					message: "Protected branch applications are not removed",
				});
			}

			const previewApplications = targetApplications.filter(
				({ application }) => application.name === `@${branch}`,
			);
			if (previewApplications.length === 0) {
				console.log(
					`[webhook] no managed preview found for repository=${resource.repository.name} branch=${branch}`,
				);
				return c.json({
					success: true,
					message: "No preview deployment found to remove",
				});
			}

			const currentDbName = generateDbName(
				resource.repository.name,
				resource.repository.id,
				branch,
			);
			const legacyDbName = generateLegacyDbName(branch);
			const allowedDatabaseNames = new Set([currentDbName, legacyDbName]);
			const legacyPreviewHost = generateLegacyPreviewUrl(
				branch,
				DOKPLOY_DEV_URL,
			);
			const databaseNames = new Set<string>();
			for (const { application } of previewApplications) {
				const configuredDbName = getDatabaseNameFromEnv(application.env);
				if (
					configuredDbName &&
					allowedDatabaseNames.has(configuredDbName)
				) {
					databaseNames.add(configuredDbName);
					continue;
				}

				if (configuredDbName) {
					console.error(
						`[webhook] refusing to drop non-preview database=${configuredDbName} application=${application.applicationId}`,
					);
					continue;
				}

				const domains = await dokploy.getDomainsByApplication({
					applicationId: application.applicationId,
				});
				if (domains.some((domain) => domain.host === legacyPreviewHost)) {
					databaseNames.add(legacyDbName);
				} else {
					console.log(
						`[webhook] application=${application.applicationId} has no preview database, skipping database cleanup`,
					);
				}
			}
			for (const dbName of databaseNames) {
				try {
					console.log(`[webhook] dropping database=${dbName}`);
					await dbManager.dropDatabase(dbName);
					console.log(`[webhook] dropped database=${dbName}`);
				} catch (dbError) {
					console.error(
						`[webhook] failed to drop database=${dbName}:`,
						dbError,
					);
				}
			}

			const removalResults = await Promise.allSettled(
				previewApplications.map(async ({ application }) => {
					console.log(
						`[webhook] removing application=${application.applicationId}`,
					);
					await dokploy.removeApplication({
						applicationId: application.applicationId,
					});
				}),
			);
			const failedApplicationIds = removalResults.flatMap((result, index) =>
				result.status === "rejected"
					? [previewApplications[index]!.application.applicationId]
					: [],
			);
			if (failedApplicationIds.length > 0) {
				throw new Error(
					`Failed to remove preview applications: ${failedApplicationIds.join(", ")}`,
				);
			}

			return c.json({
				success: true,
				branch,
				applicationIds: previewApplications.map(
					({ application }) => application.applicationId,
				),
				message: "Preview deployment and database removed",
			});
		}

		if (targetApplications.length > 0) {
			const deploymentResult = await deployApplications(
				dokploy,
				targetApplications,
				branch,
			);
			return c.json({
				success: true,
				branch,
				applicationIds: deploymentResult.deployedApplicationIds,
				skippedApplicationIds: deploymentResult.skippedApplicationIds,
				message:
					deploymentResult.deployedApplicationIds.length === 0
						? "Auto deploy is disabled for all matching applications"
						: undefined,
			});
		}

		if (isProtectedBranch(branch, defaultBranch)) {
			console.log(
				`[webhook] no application found for protected branch=${branch}, skipping preview creation`,
			);
			return c.json({
				success: true,
				branch,
				message: "No matching protected branch application found",
			});
		}

		const stagingApplications = repositoryApplications.filter(
			({ application }) => isStagingTemplate(application),
		);
		if (stagingApplications.length === 0) {
			console.log(
				`[webhook] repository=${resource.repository.name} has no staging application, skipping preview creation`,
			);
			return c.json({
				success: true,
				branch,
				message: "Repository does not support preview deployments",
			});
		}
		if (stagingApplications.length > 1) {
			throw new Error(
				`Repository ${resource.repository.name} has multiple staging applications`,
			);
		}

		const stagingApplication = stagingApplications[0]!;
		if (!isAutoDeployEnabled(stagingApplication.application.autoDeploy)) {
			console.log(
				`[webhook] staging application=${stagingApplication.application.applicationId} has auto deploy disabled, skipping preview creation`,
			);
			return c.json({
				success: true,
				branch,
				message: "Staging application has auto deploy disabled",
			});
		}
		const lockName = `preview_${hash(
			`${resource.repository.id}:${stagingApplication.application.applicationId}`,
			40,
		)}`;

		return await dbManager.withLock(lockName, async () => {
			// recheck after locking so webhook retries cannot create duplicate previews
			const currentInventory = await getApplicationInventory(dokploy);
			const currentRepositoryApplications = findRepositoryApplications(
				currentInventory,
				repositoryKeys,
			);
			const existingApplications = currentRepositoryApplications.filter(
				({ application }) =>
					application.customGitBranch === branch &&
					(branch !== STAGING_BRANCH || isStagingTemplate(application)),
			);
			if (existingApplications.length > 0) {
				const deploymentResult = await deployApplications(
					dokploy,
					existingApplications,
					branch,
				);
				return c.json({
					success: true,
					branch,
					applicationIds: deploymentResult.deployedApplicationIds,
					skippedApplicationIds: deploymentResult.skippedApplicationIds,
					message:
						deploymentResult.deployedApplicationIds.length === 0
							? "Auto deploy is disabled for all matching applications"
							: undefined,
				});
			}

			const currentStagingApplication = currentRepositoryApplications.find(
				({ application }) =>
					application.applicationId ===
						stagingApplication.application.applicationId &&
					application.customGitBranch === STAGING_BRANCH,
			);
			if (!currentStagingApplication) {
				throw new Error("Staging application changed during preview creation");
			}
			if (
				!isAutoDeployEnabled(currentStagingApplication.application.autoDeploy)
			) {
				console.log(
					`[webhook] staging application=${currentStagingApplication.application.applicationId} has auto deploy disabled, skipping preview creation`,
				);
				return c.json({
					success: true,
					branch,
					message: "Staging application has auto deploy disabled",
				});
			}

			const projectBefore = await dokploy.getProjectById({
				projectId: currentStagingApplication.projectId,
			});
			const environmentBefore = projectBefore.environments.find(
				(environment) =>
					environment.environmentId === currentStagingApplication.environmentId,
			);
			if (!environmentBefore) throw new Error("Staging environment not found");

			const existingApplicationIds = new Set(
				environmentBefore.applications.map(
					(application) => application.applicationId,
				),
			);

			const previewUrl = `https://${generatePreviewUrl(
				resource.repository.name,
				resource.repository.id,
				branch,
				DOKPLOY_DEV_URL,
			)}`;
			const dbName = generateDbName(
				resource.repository.name,
				resource.repository.id,
				branch,
			);
			const usesDatabaseUrl =
				getEnvValue(
					currentStagingApplication.application.env,
					"DATABASE_URL",
				) !== null;
			const usesWpHome =
				getEnvValue(currentStagingApplication.application.env, "WP_HOME") !==
				null;
			let newApplication: Application | null = null;
			let databaseCreated = false;

			try {
				console.log(
					`[webhook] duplicating staging application=${currentStagingApplication.application.applicationId} for branch=${branch}`,
				);
				await dokploy.duplicateProject({
					name: branch,
					sourceEnvironmentId: currentStagingApplication.environmentId,
					selectedServices: [
						{
							id: currentStagingApplication.application.applicationId,
							type: "application",
						},
					],
					includeServices: true,
					duplicateInSameProject: true,
				});

				const projectAfter = await dokploy.getProjectById({
					projectId: currentStagingApplication.projectId,
				});
				const environmentAfter = projectAfter.environments.find(
					(environment) =>
						environment.environmentId ===
						currentStagingApplication.environmentId,
				);
				if (!environmentAfter) throw new Error("Staging environment not found");

				const addedApplications = await Promise.all(
					environmentAfter.applications
						.filter(({ applicationId }) =>
							!existingApplicationIds.has(applicationId),
						)
						.map(({ applicationId }) =>
							dokploy.getApplicationById({ applicationId }),
						),
				);
				const newApplications = addedApplications.filter(
					(application) =>
						application.sourceType === "git" &&
						application.customGitBranch === STAGING_BRANCH &&
						application.serverId ===
							currentStagingApplication.application.serverId &&
						Boolean(
							application.customGitUrl &&
								repositoryKeys.has(
									normalizeRepositoryUrl(application.customGitUrl) ?? "",
								),
						),
				);
				if (newApplications.length !== 1) {
					throw new Error(
						`Expected one duplicated application, found ${newApplications.length}`,
					);
				}
				newApplication = newApplications[0]!;

				let appEnv = newApplication.env ?? "";
				if (usesDatabaseUrl) {
					console.log(`[webhook] creating database=${dbName}`);
					const dbCredentials = await dbManager.createDatabase(dbName);
					databaseCreated = true;
					console.log(
						`[webhook] created database=${dbCredentials.database} user=${dbCredentials.username}`,
					);
					appEnv = setEnvValue(
						appEnv,
						"DATABASE_URL",
						dbCredentials.connectionUrl,
					);
				} else {
					console.log(
						"[webhook] staging application has no DATABASE_URL, skipping database creation",
					);
				}
				if (usesWpHome) {
					appEnv = setEnvValue(appEnv, "WP_HOME", previewUrl);
				} else {
					console.log(
						"[webhook] staging application has no WP_HOME, skipping WP_HOME update",
					);
				}

				console.log(
					`[webhook] updating application=${newApplication.applicationId} name=@${branch} gitBranch=${branch}`,
				);
				await dokploy.updateApplication({
					applicationId: newApplication.applicationId,
					name: `@${branch}`,
					description: resource.pushedBy.displayName,
					customGitBranch: branch,
					env: appEnv,
					createdAt: new Date().toISOString(),
				});

				const applicationDomains = await dokploy.getDomainsByApplication({
					applicationId: newApplication.applicationId,
				});
				await Promise.all(
					applicationDomains.map((domain) =>
						dokploy.deleteDomain(domain.domainId),
					),
				);

				const host = previewUrl.replace("https://", "");
				console.log(`[webhook] creating domain=${host}`);
				await dokploy.createDomain({
					applicationId: newApplication.applicationId,
					domainType: "application",
					host,
					port: 80,
					https: true,
					certificateType: "letsencrypt",
				});

				await deployApplications(
					dokploy,
					[
						{
							projectId: currentStagingApplication.projectId,
							environmentId: currentStagingApplication.environmentId,
							application: newApplication,
						},
					],
					branch,
				);

				console.log(
					`[webhook] preview deployment complete repository=${resource.repository.name} branch=${branch} url=${previewUrl} application=${newApplication.applicationId} database=${databaseCreated ? dbName : "none"}`,
				);
				return c.json({
					success: true,
					branch,
					applicationId: newApplication.applicationId,
					previewUrl,
				});
			} catch (error) {
				console.error(
					`[webhook] error during preview creation for repository=${resource.repository.name} branch=${branch}, cleaning up...`,
					error,
				);
				if (databaseCreated) {
					try {
						await dbManager.dropDatabase(dbName);
						console.log(`[webhook] cleanup: dropped database=${dbName}`);
					} catch (dbCleanupError) {
						console.error(
							`[webhook] cleanup: failed to drop database=${dbName}:`,
							dbCleanupError,
						);
					}
				}

				const cleanupApplications = new Map<string, Application>();
				if (newApplication) {
					cleanupApplications.set(
						newApplication.applicationId,
						newApplication,
					);
				}
				try {
					const cleanupProject = await dokploy.getProjectById({
						projectId: currentStagingApplication.projectId,
					});
					const cleanupEnvironment = cleanupProject.environments.find(
						(environment) =>
							environment.environmentId ===
							currentStagingApplication.environmentId,
					);
					for (const { applicationId } of cleanupEnvironment?.applications ?? []) {
						if (
							existingApplicationIds.has(applicationId) ||
							cleanupApplications.has(applicationId)
						) {
							continue;
						}
						let application: Application;
						try {
							application = await dokploy.getApplicationById({ applicationId });
						} catch (lookupError) {
							console.error(
								`[webhook] cleanup: failed to read application=${applicationId}:`,
								lookupError,
							);
							continue;
						}
						const repositoryKey = application.customGitUrl
							? normalizeRepositoryUrl(application.customGitUrl)
							: null;
						const isDuplicatedApplication =
							application.sourceType === "git" &&
							application.serverId ===
								currentStagingApplication.application.serverId &&
							repositoryKey !== null &&
							repositoryKeys.has(repositoryKey) &&
							(application.customGitBranch === STAGING_BRANCH ||
								application.customGitBranch === branch) &&
							(application.name ===
								`${currentStagingApplication.application.name} (copy)` ||
								application.name === `@${branch}`);
						if (isDuplicatedApplication) {
							cleanupApplications.set(application.applicationId, application);
						}
					}
				} catch (lookupError) {
					console.error(
						"[webhook] cleanup: failed to find duplicated applications:",
						lookupError,
					);
				}

				const cleanupResults = await Promise.allSettled(
					Array.from(cleanupApplications.values()).map(async (application) => {
						await dokploy.removeApplication({
							applicationId: application.applicationId,
						});
						console.log(
							`[webhook] cleanup: removed application=${application.applicationId}`,
						);
					}),
				);
				for (const cleanupResult of cleanupResults) {
					if (cleanupResult.status === "rejected") {
						console.error(
							"[webhook] cleanup: failed to remove duplicated application:",
							cleanupResult.reason,
						);
					}
				}
				throw error;
			}
		});
	} catch (error) {
		console.error("[webhook] unhandled error:", error);

		return c.json(
			{
				success: false,
				message:
					error instanceof Error ? error.message : "Internal server error",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			500,
		);
	}
});
