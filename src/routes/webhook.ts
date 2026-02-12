import { Hono } from "hono";
import type { AzureEvent } from "../../types";
import { DatabaseManager } from "../lib/database";
import { DokployClient } from "../lib/dokploy-client";
import {
	extractBranchName,
	generateDbName,
	generatePreviewUrl,
	setEnvValue,
} from "../lib/utils";

export const webhookRouter = new Hono();

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

webhookRouter.post("/azure", async (c) => {
	try {
		const event = await c.req.json<AzureEvent>();

		console.log(`[webhook] received event: ${event.eventType}`);

		const PROJECT_ID = process.env.PROJECT_ID;
		const ENVIRONMENT_ID = process.env.ENVIRONMENT_ID;
		const APPLICATION_ID = process.env.APPLICATION_ID;
		const DOKPLOY_URL = process.env.DOKPLOY_URL;
		const DOKPLOY_API_TOKEN = process.env.DOKPLOY_API_TOKEN;
		const DOKPLOY_DEV_URL = process.env.DOKPLOY_DEV_URL;
		if (
			!DOKPLOY_DEV_URL ||
			!DOKPLOY_URL ||
			!DOKPLOY_API_TOKEN ||
			!PROJECT_ID ||
			!ENVIRONMENT_ID ||
			!APPLICATION_ID
		) {
			console.error("[webhook] missing required environment variables");
			return c.json({
				success: false,
				message: "Missing required environment variables",
			});
		}

		const dokploy = new DokployClient(DOKPLOY_URL, DOKPLOY_API_TOKEN);

		// check project
		const project = await dokploy.getProjectById({
			projectId: PROJECT_ID,
		});

		// check environment
		const environment =
			project.environments.find((e) => e.environmentId === ENVIRONMENT_ID) ??
			null;
		if (!environment) throw new Error("Environment not found");

		// default branch application (template)
		const defaultApplication = environment.applications.find(
			(a) => a.applicationId === APPLICATION_ID,
		);
		if (!defaultApplication) throw new Error("Default Application not found");

		if (event.eventType === "git.push") {
			// get resource
			const resource = event.resource;
			const refUpdate = resource.refUpdates[0];

			if (!refUpdate) {
				console.log("[webhook] no ref updates in push event, skipping");
				return c.json({
					success: false,
					message: "No ref updates in push event",
				});
			}

			// extract target branch & default branch
			const branch = extractBranchName(refUpdate.name);
			const defaultBranch = extractBranchName(
				resource.repository.defaultBranch,
			);

			// find target application if exists
			const targetApplication =
				branch === defaultBranch
					? defaultApplication
					: (environment.applications.find((a) => a.name === `@${branch}`) ??
						null);

			// 000.. means branch deleted
			const action =
				refUpdate.newObjectId === "0000000000000000000000000000000000000000"
					? "delete"
					: "update";

			console.log(
				`[webhook] branch=${branch} action=${action} pushedBy=${resource.pushedBy.displayName} existingApp=${targetApplication?.applicationId ?? "none"}`,
			);

			// DELETE BRANCH
			if (action === "delete") {
				if (!targetApplication) {
					console.log(
						`[webhook] no preview deployment found for branch=${branch}, nothing to remove`,
					);
					return c.json({
						success: true,
						message: "No preview deployment found to remove",
					});
				}

				// drop preview database and its dedicated user
				const dbName = generateDbName(branch);
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

				console.log(
					`[webhook] removing application=${targetApplication.applicationId}`,
				);
				await dokploy.removeApplication({
					applicationId: targetApplication.applicationId,
				});
				console.log(
					`[webhook] removed application=${targetApplication.applicationId} for branch=${branch}`,
				);

				return c.json({
					success: true,
					branch,
					applicationId: targetApplication.applicationId,
					message: "Preview deployment and database removed",
				});
			}

			// UPDATE BRANCH
			// if not exist create new preview deployment
			if (!targetApplication) {
				console.log(
					`[webhook] creating new preview deployment for branch=${branch}`,
				);

				// generate preview domain url
				const previewUrl = `https://${generatePreviewUrl(branch, DOKPLOY_DEV_URL)}`;

				// snapshot existing application IDs before duplication
				const existingApplicationIds = environment.applications.map(
					(a) => a.applicationId,
				);

				// duplicate default application
				console.log(
					`[webhook] duplicating template application=${APPLICATION_ID}`,
				);
				await dokploy.duplicateProject({
					name: `${branch}`,
					sourceEnvironmentId: environment.environmentId,
					selectedServices: [
						{
							id: defaultApplication.applicationId,
							type: "application",
						},
					],
					includeServices: true,
					duplicateInSameProject: true,
				});

				// get new application created by comparing against snapshot
				const { environments } = await dokploy.getProjectById({
					projectId: PROJECT_ID,
				});
				const newApplication = (
					environments.find(
						(e) => e.environmentId === environment.environmentId,
					)?.applications ?? []
				).filter((a) => !existingApplicationIds.includes(a.applicationId))[0];
				if (!newApplication) throw new Error("No application found");

				console.log(
					`[webhook] duplicated as application=${newApplication.applicationId}`,
				);

				const dbName = generateDbName(branch);
				try {
					// create preview database with dedicated user
					console.log(`[webhook] creating database=${dbName}`);
					const dbCredentials = await dbManager.createDatabase(dbName);
					console.log(
						`[webhook] created database=${dbCredentials.database} user=${dbCredentials.username}`,
					);

					let appEnv = newApplication.env ?? null;
					if (appEnv) {
						appEnv = setEnvValue(appEnv, "WP_HOME", previewUrl);
						appEnv = setEnvValue(
							appEnv,
							"DATABASE_URL",
							dbCredentials.connectionUrl,
						);
					}

					// update new application general details
					console.log(
						`[webhook] updating application config name=@${branch} gitBranch=${branch}`,
					);
					await dokploy.updateApplication({
						applicationId: newApplication.applicationId,
						name: `@${branch}`,
						description: resource.pushedBy.displayName,
						customGitBranch: branch,
						env: appEnv,
						createdAt: new Date().toISOString(),
					});

					// remove new application existing domains
					const applicationDomains = await dokploy.getDomainsByApplication({
						applicationId: newApplication.applicationId,
					});
					console.log(
						`[webhook] removing ${applicationDomains.length} existing domain(s)`,
					);
					await Promise.all(
						applicationDomains.map((d) => dokploy.deleteDomain(d.domainId)),
					);

					// create & assign new preview domain to application
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

					// trigger new deployment on new created application
					console.log(
						`[webhook] deploying application=${newApplication.applicationId}`,
					);
					await dokploy.deployApplication({
						applicationId: newApplication.applicationId,
					});

					console.log(
						`[webhook] preview deployment complete branch=${branch} url=${previewUrl} application=${newApplication.applicationId} database=${dbName}`,
					);

					return c.json({
						success: true,
						branch,
						applicationId: newApplication.applicationId,
						previewUrl,
					});
				} catch (error) {
					// error cleanup: remove application and database
					console.error(
						`[webhook] error during preview creation for branch=${branch}, cleaning up...`,
						error,
					);
					try {
						await dbManager.dropDatabase(dbName);
						console.log(`[webhook] cleanup: dropped database=${dbName}`);
					} catch (dbCleanupError) {
						console.error(
							`[webhook] cleanup: failed to drop database=${dbName}:`,
							dbCleanupError,
						);
					}
					try {
						await dokploy.removeApplication({
							applicationId: newApplication.applicationId,
						});
						console.log(
							`[webhook] cleanup: removed application=${newApplication.applicationId}`,
						);
					} catch (cleanupError) {
						console.error(
							`[webhook] cleanup: failed to remove application=${newApplication.applicationId}:`,
							cleanupError,
						);
					}
					throw error;
				}
			}

			// otherwise exists, trigger deploy on application
			console.log(
				`[webhook] redeploying existing application=${targetApplication.applicationId} for branch=${branch}`,
			);
			await dokploy.deployApplication({
				applicationId: targetApplication.applicationId,
			});
			console.log(
				`[webhook] redeploy triggered for application=${targetApplication.applicationId}`,
			);

			return c.json({
				success: true,
				branch,
				applicationId: targetApplication.applicationId,
			});
		} else {
			console.log(
				`[webhook] unhandled event type: ${(event as any).eventType}`,
			);
			return c.json({
				success: false,
				message: `Event type ${(event as any).eventType} not handled`,
			});
		}
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
