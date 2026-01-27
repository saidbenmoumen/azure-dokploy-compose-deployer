export interface DokployProject {
	projectId: string;
	name: string;
	description?: string;
	organizationId: string;
	env: string | null;
	adminId: string;
	createdAt: string;
	compose: DokployCompose[];
	project: DokployProject;
}

export interface DokployEnvironment {
	environmentId: string;
	name: string;
	description: string;
	createdAt: string;
	env: string;
	projectId: string;
	isDefault: true;
	compose: DokployCompose[];
	project: Pick<
		DokployProject,
		| "projectId"
		| "name"
		| "description"
		| "createdAt"
		| "organizationId"
		| "env"
	>;
}

export interface DokployCompose {
	composeId: string;
	name: string;
	appName: string;
	description?: string;
	projectId: string;
	composeFile: string;
	refreshToken?: string;
	sourceType: string;
	repository?: string;
	owner?: string;
	branch?: string;
	autoDeploy?: boolean;
	env?: string;
	createdAt: string;
}

export interface DokployDomain {
	domainId: string;
	host: string;
	path?: string;
	port?: number;
	https: boolean;
	certificateType?: string;
	composeId?: string;
	applicationId?: string;
}
