import { Hono } from "hono";
import type { AzureEvent } from "../../types";
import { DokployClient } from "../lib/dokploy-client";
import { extractBranchName, generatePreviewUrl } from "../lib/utils";

export const webhookRouter = new Hono();

webhookRouter.post("/azure", async (c) => {
	try {
		const event = await c.req.json<AzureEvent>();

		console.log("Received Azure webhook event:", {
			eventType: event.eventType,
			event,
		});

		const PROJECT_ID = process.env.PROJECT_ID;
		const ENVIRONMENT_ID = process.env.ENVIRONMENT_ID;
		const COMPOSE_ID = process.env.COMPOSE_ID;
		const DOKPLOY_URL = process.env.DOKPLOY_URL;
		const DOKPLOY_API_TOKEN = process.env.DOKPLOY_API_TOKEN;
		const DOKPLOY_DEV_URL = process.env.DOKPLOY_DEV_URL;
		if (
			!DOKPLOY_DEV_URL ||
			!DOKPLOY_URL ||
			!DOKPLOY_API_TOKEN ||
			!PROJECT_ID ||
			!ENVIRONMENT_ID ||
			!COMPOSE_ID
		) {
			return c.json({
				success: false,
				message: "Missing required environment variables",
			});
		}

		const dokploy = new DokployClient(DOKPLOY_URL, DOKPLOY_API_TOKEN);

		// check project
		const project = await dokploy.getProjectById(PROJECT_ID);

		// check environment
		const environment =
			project.environments.find((e) => e.environmentId === ENVIRONMENT_ID) ??
			null;
		if (!environment) throw new Error("Environment not found");

		// default branch compose
		const defaultCompose = environment.compose.find(
			(c) => c.composeId === COMPOSE_ID,
		);
		if (!defaultCompose) throw new Error("Default Compose not found");

		if (event.eventType === "git.push") {
			// get resource
			const resource = event.resource;
			const refUpdate = resource.refUpdates[0];

			if (!refUpdate) {
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

			// find target compose if exists
			const targetCompose =
				branch === defaultBranch
					? defaultCompose
					: (environment.compose.find((c) => c.name === `@${branch}`) ?? null);

			// 000.. means branch deleted
			const action =
				refUpdate.newObjectId === "0000000000000000000000000000000000000000"
					? "delete"
					: "update";

			// DELETE BRANCH
			if (action === "delete") {
				if (!targetCompose)
					return c.json({
						success: true,
						message: "No preview deployment found to remove",
					});

				await dokploy.removeCompose(targetCompose.composeId);

				return c.json({
					success: true,
					branch,
					composeId: targetCompose.composeId,
					message: "Preview deployment removed",
				});
			}

			// UPDATE BRANCH
			// if not exist create new preview deployment
			if (!targetCompose) {
				// generate preview domain url
				const previewUrl = `https://${generatePreviewUrl(branch, DOKPLOY_DEV_URL)}`;

				// duplicate default compose
				const { compose: composes, projectId } = await dokploy.duplicateProject(
					{
						name: `@${branch}`,
						environmentId: environment.environmentId,
						composeId: defaultCompose.composeId,
					},
				);

				//  get new compose created
				const exsitingComposeIds = composes.map((c) => c.composeId);
				const { environments } = await dokploy.getProjectById(projectId);
				const newCompose = (
					environments.find(
						(e) => e.environmentId === environment.environmentId,
					)?.compose ?? []
				).filter((f) => !exsitingComposeIds.includes(f.composeId))[0];
				if (!newCompose) throw new Error("No compose found");

				try {
					// update new compose general details
					await dokploy.updateCompose({
						composeId: newCompose.composeId,
						name: `@${branch}`,
						description: resource.pushedBy.displayName,
						customGitBranch: branch,
						env:
							newCompose.env?.replace("${{project.WP_HOME}}", previewUrl) ??
							null,
					});

					// remove new compose existing domains
					const composeDomains = await dokploy.getDomainsByCompose(
						newCompose.composeId,
					);
					await Promise.all(
						composeDomains.map((d) => dokploy.deleteDomain(d.domainId)),
					);

					// create & assign new preview domain to nginx:80
					await dokploy.createDomain({
						composeId: newCompose.composeId,
						serviceName: "nginx",
						domainType: "compose",
						host: previewUrl.replace("https://", ""),
						port: 80,
						https: true,
						certificateType: "letsencrypt",
					});

					// trigger new deployment on new created compose
					await dokploy.deployCompose({
						composeId: newCompose.composeId,
					});

					return c.json({
						success: true,
						branch,
						composeId: newCompose.composeId,
						previewUrl,
					});
				} catch (error) {
					// error cleanup new compose created
					console.error(
						"Error during preview deployment, cleaning up...",
						error,
					);
					try {
						await dokploy.removeCompose(newCompose.composeId);
					} catch (cleanupError) {
						console.error("Failed to cleanup project:", cleanupError);
					}
					throw error;
				}
			}

			// otherwise exists, trigger deploy commit on compose
			await dokploy.deployCompose({
				composeId: targetCompose.composeId,
			});

			return c.json({
				success: true,
				branch,
				composeId: targetCompose.composeId,
			});
		} else {
			console.log("Unhandled Event", JSON.stringify(event, null, 2));
			return c.json({
				success: false,
				message: `Event type ${(event as any).eventType} not handled`,
			});
		}
	} catch (error) {
		console.error("Webhook handler error:", error);

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
