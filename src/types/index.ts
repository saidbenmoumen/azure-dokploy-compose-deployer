// Auto-generated. Do not edit.
// Run: npx tsx apps/dokploy/scripts/emit-router-outputs.ts

export * from "./admin";
export * from "./ai";
export * from "./application";
export * from "./backup";
export * from "./bitbucket";
export * from "./certificates";
export * from "./cluster";
export * from "./compose";
export * from "./deployment";
export * from "./destination";
export * from "./docker";
export * from "./domain";
export * from "./environment";
export * from "./git-provider";
export * from "./gitea";
export * from "./github";
export * from "./gitlab";
export * from "./license-key";
export * from "./mariadb";
export * from "./mongo";
export * from "./mounts";
export * from "./mysql";
export * from "./notification";
export * from "./organization";
export * from "./port";
export * from "./postgres";
export * from "./preview-deployment";
export * from "./project";
export * from "./redirects";
export * from "./redis";
export * from "./registry";
export * from "./rollback";
export * from "./schedule";
export * from "./security";
export * from "./server";
export * from "./settings";
export * from "./ssh-key";
export * from "./sso";
export * from "./stripe";
export * from "./swarm";
export * from "./user";
export * from "./volume-backups";

import type { AdminSetupMonitoring } from "./admin";
import type {
	AiCreate,
	AiDelete,
	AiDeploy,
	AiGet,
	AiGetAll,
	AiGetModels,
	AiOne,
	AiSuggest,
	AiUpdate,
} from "./ai";
import type {
	ApplicationCancelDeployment,
	ApplicationCleanQueues,
	ApplicationCreate,
	ApplicationDelete,
	ApplicationDeploy,
	ApplicationDisconnectGitProvider,
	ApplicationDropDeployment,
	ApplicationKillBuild,
	ApplicationMarkRunning,
	ApplicationMove,
	ApplicationOne,
	ApplicationReadAppMonitoring,
	ApplicationReadTraefikConfig,
	ApplicationRedeploy,
	ApplicationRefreshToken,
	ApplicationReload,
	ApplicationSaveBitbucketProvider,
	ApplicationSaveBuildType,
	ApplicationSaveDockerProvider,
	ApplicationSaveEnvironment,
	ApplicationSaveGiteaProvider,
	ApplicationSaveGithubProvider,
	ApplicationSaveGitlabProvider,
	ApplicationSaveGitProvider,
	ApplicationStart,
	ApplicationStop,
	ApplicationUpdate,
	ApplicationUpdateTraefikConfig,
} from "./application";
import type {
	BackupCreate,
	BackupListBackupFiles,
	BackupManualBackupCompose,
	BackupManualBackupMariadb,
	BackupManualBackupMongo,
	BackupManualBackupMySql,
	BackupManualBackupPostgres,
	BackupManualBackupWebServer,
	BackupOne,
	BackupRemove,
	BackupRestoreBackupWithLogs,
	BackupUpdate,
} from "./backup";
import type {
	BitbucketBitbucketProviders,
	BitbucketCreate,
	BitbucketGetBitbucketBranches,
	BitbucketGetBitbucketRepositories,
	BitbucketOne,
	BitbucketTestConnection,
	BitbucketUpdate,
} from "./bitbucket";
import type {
	CertificatesAll,
	CertificatesCreate,
	CertificatesOne,
	CertificatesRemove,
} from "./certificates";
import type {
	ClusterAddManager,
	ClusterAddWorker,
	ClusterGetNodes,
	ClusterRemoveWorker,
} from "./cluster";
import type {
	ComposeCancelDeployment,
	ComposeCleanQueues,
	ComposeCreate,
	ComposeDelete,
	ComposeDeploy,
	ComposeDeployTemplate,
	ComposeDisconnectGitProvider,
	ComposeFetchSourceType,
	ComposeGetConvertedCompose,
	ComposeGetDefaultCommand,
	ComposeGetTags,
	ComposeImport,
	ComposeIsolatedDeployment,
	ComposeKillBuild,
	ComposeLoadMountsByService,
	ComposeLoadServices,
	ComposeMove,
	ComposeOne,
	ComposeProcessTemplate,
	ComposeRandomizeCompose,
	ComposeRedeploy,
	ComposeRefreshToken,
	ComposeStart,
	ComposeStop,
	ComposeTemplates,
	ComposeUpdate,
} from "./compose";
import type {
	DeploymentAll,
	DeploymentAllByCompose,
	DeploymentAllByServer,
	DeploymentAllByType,
	DeploymentKillProcess,
} from "./deployment";
import type {
	DestinationAll,
	DestinationCreate,
	DestinationOne,
	DestinationRemove,
	DestinationTestConnection,
	DestinationUpdate,
} from "./destination";
import type {
	DockerGetConfig,
	DockerGetContainers,
	DockerGetContainersByAppLabel,
	DockerGetContainersByAppNameMatch,
	DockerGetServiceContainersByAppName,
	DockerGetStackContainersByAppName,
	DockerRestartContainer,
} from "./docker";
import type {
	DomainByApplicationId,
	DomainByComposeId,
	DomainCanGenerateTraefikMeDomains,
	DomainCreate,
	DomainDelete,
	DomainGenerateDomain,
	DomainOne,
	DomainUpdate,
	DomainValidateDomain,
} from "./domain";
import type {
	EnvironmentByProjectId,
	EnvironmentCreate,
	EnvironmentDuplicate,
	EnvironmentOne,
	EnvironmentRemove,
	EnvironmentUpdate,
} from "./environment";
import type { GitProviderGetAll, GitProviderRemove } from "./git-provider";
import type {
	GiteaCreate,
	GiteaGetGiteaBranches,
	GiteaGetGiteaRepositories,
	GiteaGetGiteaUrl,
	GiteaGiteaProviders,
	GiteaOne,
	GiteaTestConnection,
	GiteaUpdate,
} from "./gitea";
import type {
	GithubGetGithubBranches,
	GithubGetGithubRepositories,
	GithubGithubProviders,
	GithubOne,
	GithubTestConnection,
	GithubUpdate,
} from "./github";
import type {
	GitlabCreate,
	GitlabGetGitlabBranches,
	GitlabGetGitlabRepositories,
	GitlabGitlabProviders,
	GitlabOne,
	GitlabTestConnection,
	GitlabUpdate,
} from "./gitlab";
import type {
	LicenseKeyActivate,
	LicenseKeyDeactivate,
	LicenseKeyGetEnterpriseSettings,
	LicenseKeyHaveValidLicenseKey,
	LicenseKeyUpdateEnterpriseSettings,
	LicenseKeyValidate,
} from "./license-key";
import type {
	MariadbChangeStatus,
	MariadbCreate,
	MariadbDeploy,
	MariadbDeployWithLogs,
	MariadbMove,
	MariadbOne,
	MariadbRebuild,
	MariadbReload,
	MariadbRemove,
	MariadbSaveEnvironment,
	MariadbSaveExternalPort,
	MariadbStart,
	MariadbStop,
	MariadbUpdate,
} from "./mariadb";
import type {
	MongoChangeStatus,
	MongoCreate,
	MongoDeploy,
	MongoDeployWithLogs,
	MongoMove,
	MongoOne,
	MongoRebuild,
	MongoReload,
	MongoRemove,
	MongoSaveEnvironment,
	MongoSaveExternalPort,
	MongoStart,
	MongoStop,
	MongoUpdate,
} from "./mongo";
import type {
	MountsAllNamedByApplicationId,
	MountsCreate,
	MountsOne,
	MountsRemove,
	MountsUpdate,
} from "./mounts";
import type {
	MysqlChangeStatus,
	MysqlCreate,
	MysqlDeploy,
	MysqlDeployWithLogs,
	MysqlMove,
	MysqlOne,
	MysqlRebuild,
	MysqlReload,
	MysqlRemove,
	MysqlSaveEnvironment,
	MysqlSaveExternalPort,
	MysqlStart,
	MysqlStop,
	MysqlUpdate,
} from "./mysql";
import type {
	NotificationAll,
	NotificationCreateCustom,
	NotificationCreateDiscord,
	NotificationCreateEmail,
	NotificationCreateGotify,
	NotificationCreateLark,
	NotificationCreateNtfy,
	NotificationCreatePushover,
	NotificationCreateResend,
	NotificationCreateSlack,
	NotificationCreateTelegram,
	NotificationGetEmailProviders,
	NotificationOne,
	NotificationReceiveNotification,
	NotificationRemove,
	NotificationTestCustomConnection,
	NotificationTestDiscordConnection,
	NotificationTestEmailConnection,
	NotificationTestGotifyConnection,
	NotificationTestLarkConnection,
	NotificationTestNtfyConnection,
	NotificationTestPushoverConnection,
	NotificationTestResendConnection,
	NotificationTestSlackConnection,
	NotificationTestTelegramConnection,
	NotificationUpdateCustom,
	NotificationUpdateDiscord,
	NotificationUpdateEmail,
	NotificationUpdateGotify,
	NotificationUpdateLark,
	NotificationUpdateNtfy,
	NotificationUpdatePushover,
	NotificationUpdateResend,
	NotificationUpdateSlack,
	NotificationUpdateTelegram,
} from "./notification";
import type {
	OrganizationAll,
	OrganizationAllInvitations,
	OrganizationCreate,
	OrganizationDelete,
	OrganizationOne,
	OrganizationRemoveInvitation,
	OrganizationSetDefault,
	OrganizationUpdate,
	OrganizationUpdateMemberRole,
} from "./organization";
import type { PortCreate, PortDelete, PortOne, PortUpdate } from "./port";
import type {
	PostgresChangeStatus,
	PostgresCreate,
	PostgresDeploy,
	PostgresDeployWithLogs,
	PostgresMove,
	PostgresOne,
	PostgresRebuild,
	PostgresReload,
	PostgresRemove,
	PostgresSaveEnvironment,
	PostgresSaveExternalPort,
	PostgresStart,
	PostgresStop,
	PostgresUpdate,
} from "./postgres";
import type {
	PreviewDeploymentAll,
	PreviewDeploymentDelete,
	PreviewDeploymentOne,
	PreviewDeploymentRedeploy,
} from "./preview-deployment";
import type {
	ProjectAll,
	ProjectCreate,
	ProjectDuplicate,
	ProjectOne,
	ProjectRemove,
	ProjectUpdate,
} from "./project";
import type {
	RedirectsCreate,
	RedirectsDelete,
	RedirectsOne,
	RedirectsUpdate,
} from "./redirects";
import type {
	RedisChangeStatus,
	RedisCreate,
	RedisDeploy,
	RedisDeployWithLogs,
	RedisMove,
	RedisOne,
	RedisRebuild,
	RedisReload,
	RedisRemove,
	RedisSaveEnvironment,
	RedisSaveExternalPort,
	RedisStart,
	RedisStop,
	RedisUpdate,
} from "./redis";
import type {
	RegistryAll,
	RegistryCreate,
	RegistryOne,
	RegistryRemove,
	RegistryTestRegistry,
	RegistryTestRegistryById,
	RegistryUpdate,
} from "./registry";
import type { RollbackDelete, RollbackRollback } from "./rollback";
import type {
	ScheduleCreate,
	ScheduleDelete,
	ScheduleList,
	ScheduleOne,
	ScheduleRunManually,
	ScheduleUpdate,
} from "./schedule";
import type {
	SecurityCreate,
	SecurityDelete,
	SecurityOne,
	SecurityUpdate,
} from "./security";
import type {
	ServerAll,
	ServerBuildServers,
	ServerCount,
	ServerCreate,
	ServerGetDefaultCommand,
	ServerGetServerMetrics,
	ServerGetServerTime,
	ServerOne,
	ServerPublicIp,
	ServerRemove,
	ServerSecurity,
	ServerSetup,
	ServerSetupMonitoring,
	ServerSetupWithLogs,
	ServerUpdate,
	ServerValidate,
	ServerWithSSHKey,
} from "./server";
import type {
	SettingsAssignDomainServer,
	SettingsCheckGPUStatus,
	SettingsCleanAll,
	SettingsCleanAllDeploymentQueue,
	SettingsCleanDockerBuilder,
	SettingsCleanDockerPrune,
	SettingsCleanMonitoring,
	SettingsCleanRedis,
	SettingsCleanSSHPrivateKey,
	SettingsCleanStoppedContainers,
	SettingsCleanUnusedImages,
	SettingsCleanUnusedVolumes,
	SettingsGetDokployCloudIps,
	SettingsGetDokployVersion,
	SettingsGetIp,
	SettingsGetLogCleanupStatus,
	SettingsGetOpenApiDocument,
	SettingsGetReleaseTag,
	SettingsGetTraefikPorts,
	SettingsGetUpdateData,
	SettingsGetWebServerSettings,
	SettingsHaveActivateRequests,
	SettingsHaveTraefikDashboardPortEnabled,
	SettingsHealth,
	SettingsIsCloud,
	SettingsIsUserSubscribed,
	SettingsReadDirectories,
	SettingsReadMiddlewareTraefikConfig,
	SettingsReadStats,
	SettingsReadStatsLogs,
	SettingsReadTraefikConfig,
	SettingsReadTraefikEnv,
	SettingsReadTraefikFile,
	SettingsReadWebServerTraefikConfig,
	SettingsReloadRedis,
	SettingsReloadServer,
	SettingsReloadTraefik,
	SettingsSaveSSHPrivateKey,
	SettingsSetupGPU,
	SettingsToggleDashboard,
	SettingsToggleRequests,
	SettingsUpdateDockerCleanup,
	SettingsUpdateLogCleanup,
	SettingsUpdateMiddlewareTraefikConfig,
	SettingsUpdateServer,
	SettingsUpdateServerIp,
	SettingsUpdateTraefikConfig,
	SettingsUpdateTraefikFile,
	SettingsUpdateTraefikPorts,
	SettingsUpdateWebServerTraefikConfig,
	SettingsWriteTraefikEnv,
} from "./settings";
import type {
	SshKeyAll,
	SshKeyCreate,
	SshKeyGenerate,
	SshKeyOne,
	SshKeyRemove,
	SshKeyUpdate,
} from "./ssh-key";
import type {
	SsoDeleteProvider,
	SsoListProviders,
	SsoRegister,
	SsoShowSignInWithSSO,
} from "./sso";
import type {
	StripeCanCreateMoreServers,
	StripeCreateCheckoutSession,
	StripeCreateCustomerPortalSession,
	StripeGetInvoices,
	StripeGetProducts,
} from "./stripe";
import type {
	SwarmGetAppInfos,
	SwarmGetNodeApps,
	SwarmGetNodeInfo,
	SwarmGetNodes,
} from "./swarm";
import type {
	UserAll,
	UserAssignPermissions,
	UserCheckUserOrganizations,
	UserCreateApiKey,
	UserDeleteApiKey,
	UserGenerateToken,
	UserGet,
	UserGetBackups,
	UserGetContainerMetrics,
	UserGetInvitations,
	UserGetMetricsToken,
	UserGetServerMetrics,
	UserGetUserByToken,
	UserHaveRootAccess,
	UserOne,
	UserRemove,
	UserSendInvitation,
	UserUpdate,
} from "./user";
import type {
	VolumeBackupsCreate,
	VolumeBackupsDelete,
	VolumeBackupsList,
	VolumeBackupsOne,
	VolumeBackupsRestoreVolumeBackupWithLogs,
	VolumeBackupsRunManually,
	VolumeBackupsUpdate,
} from "./volume-backups";

export type RouterOutputs = {
	admin: {
		setupMonitoring: AdminSetupMonitoring;
	};
	docker: {
		getContainers: DockerGetContainers;
		restartContainer: DockerRestartContainer;
		getConfig: DockerGetConfig;
		getContainersByAppNameMatch: DockerGetContainersByAppNameMatch;
		getContainersByAppLabel: DockerGetContainersByAppLabel;
		getStackContainersByAppName: DockerGetStackContainersByAppName;
		getServiceContainersByAppName: DockerGetServiceContainersByAppName;
	};
	project: {
		create: ProjectCreate;
		one: ProjectOne;
		all: ProjectAll;
		remove: ProjectRemove;
		update: ProjectUpdate;
		duplicate: ProjectDuplicate;
	};
	application: {
		create: ApplicationCreate;
		one: ApplicationOne;
		reload: ApplicationReload;
		delete: ApplicationDelete;
		stop: ApplicationStop;
		start: ApplicationStart;
		redeploy: ApplicationRedeploy;
		saveEnvironment: ApplicationSaveEnvironment;
		saveBuildType: ApplicationSaveBuildType;
		saveGithubProvider: ApplicationSaveGithubProvider;
		saveGitlabProvider: ApplicationSaveGitlabProvider;
		saveBitbucketProvider: ApplicationSaveBitbucketProvider;
		saveGiteaProvider: ApplicationSaveGiteaProvider;
		saveDockerProvider: ApplicationSaveDockerProvider;
		saveGitProvider: ApplicationSaveGitProvider;
		disconnectGitProvider: ApplicationDisconnectGitProvider;
		markRunning: ApplicationMarkRunning;
		update: ApplicationUpdate;
		refreshToken: ApplicationRefreshToken;
		deploy: ApplicationDeploy;
		cleanQueues: ApplicationCleanQueues;
		killBuild: ApplicationKillBuild;
		readTraefikConfig: ApplicationReadTraefikConfig;
		dropDeployment: ApplicationDropDeployment;
		updateTraefikConfig: ApplicationUpdateTraefikConfig;
		readAppMonitoring: ApplicationReadAppMonitoring;
		move: ApplicationMove;
		cancelDeployment: ApplicationCancelDeployment;
	};
	mysql: {
		create: MysqlCreate;
		one: MysqlOne;
		start: MysqlStart;
		stop: MysqlStop;
		saveExternalPort: MysqlSaveExternalPort;
		deploy: MysqlDeploy;
		deployWithLogs: MysqlDeployWithLogs;
		changeStatus: MysqlChangeStatus;
		reload: MysqlReload;
		remove: MysqlRemove;
		saveEnvironment: MysqlSaveEnvironment;
		update: MysqlUpdate;
		move: MysqlMove;
		rebuild: MysqlRebuild;
	};
	postgres: {
		create: PostgresCreate;
		one: PostgresOne;
		start: PostgresStart;
		stop: PostgresStop;
		saveExternalPort: PostgresSaveExternalPort;
		deploy: PostgresDeploy;
		deployWithLogs: PostgresDeployWithLogs;
		changeStatus: PostgresChangeStatus;
		remove: PostgresRemove;
		saveEnvironment: PostgresSaveEnvironment;
		reload: PostgresReload;
		update: PostgresUpdate;
		move: PostgresMove;
		rebuild: PostgresRebuild;
	};
	redis: {
		create: RedisCreate;
		one: RedisOne;
		start: RedisStart;
		reload: RedisReload;
		stop: RedisStop;
		saveExternalPort: RedisSaveExternalPort;
		deploy: RedisDeploy;
		deployWithLogs: RedisDeployWithLogs;
		changeStatus: RedisChangeStatus;
		remove: RedisRemove;
		saveEnvironment: RedisSaveEnvironment;
		update: RedisUpdate;
		move: RedisMove;
		rebuild: RedisRebuild;
	};
	mongo: {
		create: MongoCreate;
		one: MongoOne;
		start: MongoStart;
		stop: MongoStop;
		saveExternalPort: MongoSaveExternalPort;
		deploy: MongoDeploy;
		deployWithLogs: MongoDeployWithLogs;
		changeStatus: MongoChangeStatus;
		reload: MongoReload;
		remove: MongoRemove;
		saveEnvironment: MongoSaveEnvironment;
		update: MongoUpdate;
		move: MongoMove;
		rebuild: MongoRebuild;
	};
	mariadb: {
		create: MariadbCreate;
		one: MariadbOne;
		start: MariadbStart;
		stop: MariadbStop;
		saveExternalPort: MariadbSaveExternalPort;
		deploy: MariadbDeploy;
		deployWithLogs: MariadbDeployWithLogs;
		changeStatus: MariadbChangeStatus;
		remove: MariadbRemove;
		saveEnvironment: MariadbSaveEnvironment;
		reload: MariadbReload;
		update: MariadbUpdate;
		move: MariadbMove;
		rebuild: MariadbRebuild;
	};
	compose: {
		create: ComposeCreate;
		one: ComposeOne;
		update: ComposeUpdate;
		delete: ComposeDelete;
		cleanQueues: ComposeCleanQueues;
		killBuild: ComposeKillBuild;
		loadServices: ComposeLoadServices;
		loadMountsByService: ComposeLoadMountsByService;
		fetchSourceType: ComposeFetchSourceType;
		randomizeCompose: ComposeRandomizeCompose;
		isolatedDeployment: ComposeIsolatedDeployment;
		getConvertedCompose: ComposeGetConvertedCompose;
		deploy: ComposeDeploy;
		redeploy: ComposeRedeploy;
		stop: ComposeStop;
		start: ComposeStart;
		getDefaultCommand: ComposeGetDefaultCommand;
		refreshToken: ComposeRefreshToken;
		deployTemplate: ComposeDeployTemplate;
		templates: ComposeTemplates;
		getTags: ComposeGetTags;
		disconnectGitProvider: ComposeDisconnectGitProvider;
		move: ComposeMove;
		processTemplate: ComposeProcessTemplate;
		import: ComposeImport;
		cancelDeployment: ComposeCancelDeployment;
	};
	user: {
		all: UserAll;
		one: UserOne;
		get: UserGet;
		haveRootAccess: UserHaveRootAccess;
		getBackups: UserGetBackups;
		getServerMetrics: UserGetServerMetrics;
		update: UserUpdate;
		getUserByToken: UserGetUserByToken;
		getMetricsToken: UserGetMetricsToken;
		remove: UserRemove;
		assignPermissions: UserAssignPermissions;
		getInvitations: UserGetInvitations;
		getContainerMetrics: UserGetContainerMetrics;
		generateToken: UserGenerateToken;
		deleteApiKey: UserDeleteApiKey;
		createApiKey: UserCreateApiKey;
		checkUserOrganizations: UserCheckUserOrganizations;
		sendInvitation: UserSendInvitation;
	};
	domain: {
		create: DomainCreate;
		byApplicationId: DomainByApplicationId;
		byComposeId: DomainByComposeId;
		generateDomain: DomainGenerateDomain;
		canGenerateTraefikMeDomains: DomainCanGenerateTraefikMeDomains;
		update: DomainUpdate;
		one: DomainOne;
		delete: DomainDelete;
		validateDomain: DomainValidateDomain;
	};
	destination: {
		create: DestinationCreate;
		testConnection: DestinationTestConnection;
		one: DestinationOne;
		all: DestinationAll;
		remove: DestinationRemove;
		update: DestinationUpdate;
	};
	backup: {
		create: BackupCreate;
		one: BackupOne;
		update: BackupUpdate;
		remove: BackupRemove;
		manualBackupPostgres: BackupManualBackupPostgres;
		manualBackupMySql: BackupManualBackupMySql;
		manualBackupMariadb: BackupManualBackupMariadb;
		manualBackupCompose: BackupManualBackupCompose;
		manualBackupMongo: BackupManualBackupMongo;
		manualBackupWebServer: BackupManualBackupWebServer;
		listBackupFiles: BackupListBackupFiles;
		restoreBackupWithLogs: BackupRestoreBackupWithLogs;
	};
	deployment: {
		all: DeploymentAll;
		allByCompose: DeploymentAllByCompose;
		allByServer: DeploymentAllByServer;
		allByType: DeploymentAllByType;
		killProcess: DeploymentKillProcess;
	};
	previewDeployment: {
		all: PreviewDeploymentAll;
		delete: PreviewDeploymentDelete;
		one: PreviewDeploymentOne;
		redeploy: PreviewDeploymentRedeploy;
	};
	mounts: {
		create: MountsCreate;
		remove: MountsRemove;
		one: MountsOne;
		update: MountsUpdate;
		allNamedByApplicationId: MountsAllNamedByApplicationId;
	};
	certificates: {
		create: CertificatesCreate;
		one: CertificatesOne;
		remove: CertificatesRemove;
		all: CertificatesAll;
	};
	settings: {
		getWebServerSettings: SettingsGetWebServerSettings;
		reloadServer: SettingsReloadServer;
		cleanRedis: SettingsCleanRedis;
		reloadRedis: SettingsReloadRedis;
		cleanAllDeploymentQueue: SettingsCleanAllDeploymentQueue;
		reloadTraefik: SettingsReloadTraefik;
		toggleDashboard: SettingsToggleDashboard;
		cleanUnusedImages: SettingsCleanUnusedImages;
		cleanUnusedVolumes: SettingsCleanUnusedVolumes;
		cleanStoppedContainers: SettingsCleanStoppedContainers;
		cleanDockerBuilder: SettingsCleanDockerBuilder;
		cleanDockerPrune: SettingsCleanDockerPrune;
		cleanAll: SettingsCleanAll;
		cleanMonitoring: SettingsCleanMonitoring;
		saveSSHPrivateKey: SettingsSaveSSHPrivateKey;
		assignDomainServer: SettingsAssignDomainServer;
		cleanSSHPrivateKey: SettingsCleanSSHPrivateKey;
		updateDockerCleanup: SettingsUpdateDockerCleanup;
		readTraefikConfig: SettingsReadTraefikConfig;
		updateTraefikConfig: SettingsUpdateTraefikConfig;
		readWebServerTraefikConfig: SettingsReadWebServerTraefikConfig;
		updateWebServerTraefikConfig: SettingsUpdateWebServerTraefikConfig;
		readMiddlewareTraefikConfig: SettingsReadMiddlewareTraefikConfig;
		updateMiddlewareTraefikConfig: SettingsUpdateMiddlewareTraefikConfig;
		getUpdateData: SettingsGetUpdateData;
		updateServer: SettingsUpdateServer;
		getDokployVersion: SettingsGetDokployVersion;
		getReleaseTag: SettingsGetReleaseTag;
		readDirectories: SettingsReadDirectories;
		updateTraefikFile: SettingsUpdateTraefikFile;
		readTraefikFile: SettingsReadTraefikFile;
		getIp: SettingsGetIp;
		updateServerIp: SettingsUpdateServerIp;
		getOpenApiDocument: SettingsGetOpenApiDocument;
		readTraefikEnv: SettingsReadTraefikEnv;
		writeTraefikEnv: SettingsWriteTraefikEnv;
		haveTraefikDashboardPortEnabled: SettingsHaveTraefikDashboardPortEnabled;
		readStatsLogs: SettingsReadStatsLogs;
		readStats: SettingsReadStats;
		haveActivateRequests: SettingsHaveActivateRequests;
		toggleRequests: SettingsToggleRequests;
		isCloud: SettingsIsCloud;
		isUserSubscribed: SettingsIsUserSubscribed;
		health: SettingsHealth;
		setupGPU: SettingsSetupGPU;
		checkGPUStatus: SettingsCheckGPUStatus;
		updateTraefikPorts: SettingsUpdateTraefikPorts;
		getTraefikPorts: SettingsGetTraefikPorts;
		updateLogCleanup: SettingsUpdateLogCleanup;
		getLogCleanupStatus: SettingsGetLogCleanupStatus;
		getDokployCloudIps: SettingsGetDokployCloudIps;
	};
	security: {
		create: SecurityCreate;
		one: SecurityOne;
		delete: SecurityDelete;
		update: SecurityUpdate;
	};
	redirects: {
		create: RedirectsCreate;
		one: RedirectsOne;
		delete: RedirectsDelete;
		update: RedirectsUpdate;
	};
	port: {
		create: PortCreate;
		one: PortOne;
		delete: PortDelete;
		update: PortUpdate;
	};
	registry: {
		create: RegistryCreate;
		remove: RegistryRemove;
		update: RegistryUpdate;
		all: RegistryAll;
		one: RegistryOne;
		testRegistry: RegistryTestRegistry;
		testRegistryById: RegistryTestRegistryById;
	};
	cluster: {
		getNodes: ClusterGetNodes;
		removeWorker: ClusterRemoveWorker;
		addWorker: ClusterAddWorker;
		addManager: ClusterAddManager;
	};
	notification: {
		createSlack: NotificationCreateSlack;
		updateSlack: NotificationUpdateSlack;
		testSlackConnection: NotificationTestSlackConnection;
		createTelegram: NotificationCreateTelegram;
		updateTelegram: NotificationUpdateTelegram;
		testTelegramConnection: NotificationTestTelegramConnection;
		createDiscord: NotificationCreateDiscord;
		updateDiscord: NotificationUpdateDiscord;
		testDiscordConnection: NotificationTestDiscordConnection;
		createEmail: NotificationCreateEmail;
		updateEmail: NotificationUpdateEmail;
		testEmailConnection: NotificationTestEmailConnection;
		createResend: NotificationCreateResend;
		updateResend: NotificationUpdateResend;
		testResendConnection: NotificationTestResendConnection;
		remove: NotificationRemove;
		one: NotificationOne;
		all: NotificationAll;
		receiveNotification: NotificationReceiveNotification;
		createGotify: NotificationCreateGotify;
		updateGotify: NotificationUpdateGotify;
		testGotifyConnection: NotificationTestGotifyConnection;
		createNtfy: NotificationCreateNtfy;
		updateNtfy: NotificationUpdateNtfy;
		testNtfyConnection: NotificationTestNtfyConnection;
		createCustom: NotificationCreateCustom;
		updateCustom: NotificationUpdateCustom;
		testCustomConnection: NotificationTestCustomConnection;
		createLark: NotificationCreateLark;
		updateLark: NotificationUpdateLark;
		testLarkConnection: NotificationTestLarkConnection;
		createPushover: NotificationCreatePushover;
		updatePushover: NotificationUpdatePushover;
		testPushoverConnection: NotificationTestPushoverConnection;
		getEmailProviders: NotificationGetEmailProviders;
	};
	sshKey: {
		create: SshKeyCreate;
		remove: SshKeyRemove;
		one: SshKeyOne;
		all: SshKeyAll;
		generate: SshKeyGenerate;
		update: SshKeyUpdate;
	};
	gitProvider: {
		getAll: GitProviderGetAll;
		remove: GitProviderRemove;
	};
	gitea: {
		create: GiteaCreate;
		one: GiteaOne;
		giteaProviders: GiteaGiteaProviders;
		getGiteaRepositories: GiteaGetGiteaRepositories;
		getGiteaBranches: GiteaGetGiteaBranches;
		testConnection: GiteaTestConnection;
		update: GiteaUpdate;
		getGiteaUrl: GiteaGetGiteaUrl;
	};
	bitbucket: {
		create: BitbucketCreate;
		one: BitbucketOne;
		bitbucketProviders: BitbucketBitbucketProviders;
		getBitbucketRepositories: BitbucketGetBitbucketRepositories;
		getBitbucketBranches: BitbucketGetBitbucketBranches;
		testConnection: BitbucketTestConnection;
		update: BitbucketUpdate;
	};
	gitlab: {
		create: GitlabCreate;
		one: GitlabOne;
		gitlabProviders: GitlabGitlabProviders;
		getGitlabRepositories: GitlabGetGitlabRepositories;
		getGitlabBranches: GitlabGetGitlabBranches;
		testConnection: GitlabTestConnection;
		update: GitlabUpdate;
	};
	github: {
		one: GithubOne;
		getGithubRepositories: GithubGetGithubRepositories;
		getGithubBranches: GithubGetGithubBranches;
		githubProviders: GithubGithubProviders;
		testConnection: GithubTestConnection;
		update: GithubUpdate;
	};
	server: {
		create: ServerCreate;
		one: ServerOne;
		getDefaultCommand: ServerGetDefaultCommand;
		all: ServerAll;
		count: ServerCount;
		withSSHKey: ServerWithSSHKey;
		buildServers: ServerBuildServers;
		setup: ServerSetup;
		setupWithLogs: ServerSetupWithLogs;
		validate: ServerValidate;
		security: ServerSecurity;
		setupMonitoring: ServerSetupMonitoring;
		remove: ServerRemove;
		update: ServerUpdate;
		publicIp: ServerPublicIp;
		getServerTime: ServerGetServerTime;
		getServerMetrics: ServerGetServerMetrics;
	};
	stripe: {
		getProducts: StripeGetProducts;
		createCheckoutSession: StripeCreateCheckoutSession;
		createCustomerPortalSession: StripeCreateCustomerPortalSession;
		canCreateMoreServers: StripeCanCreateMoreServers;
		getInvoices: StripeGetInvoices;
	};
	swarm: {
		getNodes: SwarmGetNodes;
		getNodeInfo: SwarmGetNodeInfo;
		getNodeApps: SwarmGetNodeApps;
		getAppInfos: SwarmGetAppInfos;
	};
	ai: {
		one: AiOne;
		getModels: AiGetModels;
		create: AiCreate;
		update: AiUpdate;
		getAll: AiGetAll;
		get: AiGet;
		delete: AiDelete;
		suggest: AiSuggest;
		deploy: AiDeploy;
	};
	organization: {
		create: OrganizationCreate;
		all: OrganizationAll;
		one: OrganizationOne;
		update: OrganizationUpdate;
		delete: OrganizationDelete;
		allInvitations: OrganizationAllInvitations;
		removeInvitation: OrganizationRemoveInvitation;
		updateMemberRole: OrganizationUpdateMemberRole;
		setDefault: OrganizationSetDefault;
	};
	licenseKey: {
		activate: LicenseKeyActivate;
		validate: LicenseKeyValidate;
		deactivate: LicenseKeyDeactivate;
		getEnterpriseSettings: LicenseKeyGetEnterpriseSettings;
		haveValidLicenseKey: LicenseKeyHaveValidLicenseKey;
		updateEnterpriseSettings: LicenseKeyUpdateEnterpriseSettings;
	};
	sso: {
		showSignInWithSSO: SsoShowSignInWithSSO;
		listProviders: SsoListProviders;
		deleteProvider: SsoDeleteProvider;
		register: SsoRegister;
	};
	schedule: {
		create: ScheduleCreate;
		update: ScheduleUpdate;
		delete: ScheduleDelete;
		list: ScheduleList;
		one: ScheduleOne;
		runManually: ScheduleRunManually;
	};
	rollback: {
		delete: RollbackDelete;
		rollback: RollbackRollback;
	};
	volumeBackups: {
		list: VolumeBackupsList;
		create: VolumeBackupsCreate;
		one: VolumeBackupsOne;
		delete: VolumeBackupsDelete;
		update: VolumeBackupsUpdate;
		runManually: VolumeBackupsRunManually;
		restoreVolumeBackupWithLogs: VolumeBackupsRestoreVolumeBackupWithLogs;
	};
	environment: {
		create: EnvironmentCreate;
		one: EnvironmentOne;
		byProjectId: EnvironmentByProjectId;
		remove: EnvironmentRemove;
		update: EnvironmentUpdate;
		duplicate: EnvironmentDuplicate;
	};
};
