import type { DokployClient } from "./dokploy-client";
import type { RouterOutputs } from "./types/outputs";

export type Application = RouterOutputs["application"]["one"];

export interface ApplicationLocation {
	projectId: string;
	environmentId: string;
	application: Application;
}

/**
 * Discover application IDs, then load the full configuration for each application.
 */
export async function getApplicationInventory(
	dokploy: DokployClient,
): Promise<ApplicationLocation[]> {
	const projects = await dokploy.getProjects();
	return Promise.all(
		projects.flatMap((project) =>
			project.environments.flatMap((environment) =>
				environment.applications.map(async ({ applicationId }) => ({
					projectId: project.projectId,
					environmentId: environment.environmentId,
					application: await dokploy.getApplicationById({ applicationId }),
				})),
			),
		),
	);
}
