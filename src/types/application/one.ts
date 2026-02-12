// Auto-generated. Do not edit.
// RouterOutputs["application"]["one"]

export type ApplicationOne = {
  hasGitProviderAccess: false | true;
  unauthorizedProvider: null | string;
  name: string;
  createdAt: string;
  refreshToken: null | string;
  password: null | string;
  sourceType: "bitbucket" | "gitea" | "github" | "gitlab" | "docker" | "git" | "drop";
  buildType: "dockerfile" | "heroku_buildpacks" | "paketo_buildpacks" | "nixpacks" | "static" | "railpack";
  applicationStatus: "idle" | "running" | "done" | "error";
  triggerType: null | "push" | "tag";
  username: null | string;
  description: null | string;
  owner: null | string;
  serverId: null | string;
  appName: string;
  command: null | string;
  env: null | string;
  enabled: null | false | true;
  environmentId: string;
  dockerfile: null | string;
  applicationId: string;
  previewEnv: null | string;
  watchPaths: null | string[];
  previewBuildArgs: null | string;
  previewBuildSecrets: null | string;
  previewLabels: null | string[];
  previewWildcard: null | string;
  previewPort: null | number;
  previewHttps: false | true;
  previewPath: null | string;
  previewCertificateType: "custom" | "letsencrypt" | "none";
  previewCustomCertResolver: null | string;
  previewLimit: null | number;
  isPreviewDeploymentsActive: null | false | true;
  previewRequireCollaboratorPermissions: null | false | true;
  rollbackActive: null | false | true;
  buildArgs: null | string;
  buildSecrets: null | string;
  memoryReservation: null | string;
  memoryLimit: null | string;
  cpuReservation: null | string;
  cpuLimit: null | string;
  title: null | string;
  subtitle: null | string;
  args: null | string[];
  cleanCache: null | false | true;
  repository: null | string;
  branch: null | string;
  buildPath: null | string;
  autoDeploy: null | false | true;
  gitlabProjectId: null | number;
  gitlabRepository: null | string;
  gitlabOwner: null | string;
  gitlabBranch: null | string;
  gitlabBuildPath: null | string;
  gitlabPathNamespace: null | string;
  giteaRepository: null | string;
  giteaOwner: null | string;
  giteaBranch: null | string;
  giteaBuildPath: null | string;
  bitbucketRepository: null | string;
  bitbucketRepositorySlug: null | string;
  bitbucketOwner: null | string;
  bitbucketBranch: null | string;
  bitbucketBuildPath: null | string;
  dockerImage: null | string;
  registryUrl: null | string;
  customGitUrl: null | string;
  customGitBranch: null | string;
  customGitBuildPath: null | string;
  customGitSSHKeyId: null | string;
  enableSubmodules: false | true;
  dockerContextPath: null | string;
  dockerBuildStage: null | string;
  dropBuildPath: null | string;
  healthCheckSwarm: null | {
      Test?: undefined | string[];
      Interval?: undefined | number;
      Timeout?: undefined | number;
      StartPeriod?: undefined | number;
      Retries?: undefined | number;
    };
  restartPolicySwarm: null | {
      Condition?: undefined | string;
      Delay?: undefined | number;
      MaxAttempts?: undefined | number;
      Window?: undefined | number;
    };
  placementSwarm: null | {
      Constraints?: undefined | string[];
      Preferences?: undefined | Array<{
            Spread: {
              SpreadDescriptor: string;
            };
          }>;
      MaxReplicas?: undefined | number;
      Platforms?: undefined | Array<{
            Architecture: string;
            OS: string;
          }>;
    };
  updateConfigSwarm: null | {
      Parallelism: number;
      Delay?: undefined | number;
      FailureAction?: undefined | string;
      Monitor?: undefined | number;
      MaxFailureRatio?: undefined | number;
      Order: string;
    };
  rollbackConfigSwarm: null | {
      Parallelism: number;
      Delay?: undefined | number;
      FailureAction?: undefined | string;
      Monitor?: undefined | number;
      MaxFailureRatio?: undefined | number;
      Order: string;
    };
  modeSwarm: null | {
      Replicated?: undefined | {
          Replicas?: undefined | number;
        };
      Global?: undefined | {};
      ReplicatedJob?: undefined | {
          MaxConcurrent?: undefined | number;
          TotalCompletions?: undefined | number;
        };
      GlobalJob?: undefined | {};
    };
  labelsSwarm: null | { [key: string]: string };
  networkSwarm: null | Array<{
        Target?: undefined | string;
        Aliases?: undefined | string[];
        DriverOpts?: undefined | { [key: string]: string };
      }>;
  stopGracePeriodSwarm: null | bigint;
  endpointSpecSwarm: null | {
      Mode?: undefined | string;
      Ports?: undefined | Array<{
            Protocol?: undefined | string;
            TargetPort?: undefined | number;
            PublishedPort?: undefined | number;
            PublishMode?: undefined | string;
          }>;
    };
  ulimitsSwarm: null | Array<{
        Name: string;
        Soft: number;
        Hard: number;
      }>;
  replicas: number;
  railpackVersion: null | string;
  herokuVersion: null | string;
  publishDirectory: null | string;
  isStaticSpa: null | false | true;
  createEnvFile: false | true;
  registryId: null | string;
  rollbackRegistryId: null | string;
  githubId: null | string;
  gitlabId: null | string;
  giteaId: null | string;
  bitbucketId: null | string;
  buildServerId: null | string;
  buildRegistryId: null | string;
  bitbucket: null | {
      gitProviderId: string;
      bitbucketId: string;
      bitbucketUsername: null | string;
      bitbucketEmail: null | string;
      appPassword: null | string;
      apiToken: null | string;
      bitbucketWorkspaceName: null | string;
    };
  deployments: Array<{
      createdAt: string;
      description: null | string;
      serverId: null | string;
      status: null | "running" | "done" | "error" | "cancelled";
      applicationId: null | string;
      title: string;
      buildServerId: null | string;
      deploymentId: string;
      logPath: string;
      pid: null | string;
      composeId: null | string;
      isPreviewDeployment: null | false | true;
      previewDeploymentId: null | string;
      startedAt: null | string;
      finishedAt: null | string;
      errorMessage: null | string;
      scheduleId: null | string;
      backupId: null | string;
      rollbackId: null | string;
      volumeBackupId: null | string;
    }>;
  domains: Array<{
      createdAt: string;
      domainType: null | "compose" | "application" | "preview";
      certificateType: "custom" | "letsencrypt" | "none";
      port: null | number;
      path: null | string;
      host: string;
      serviceName: null | string;
      applicationId: null | string;
      composeId: null | string;
      previewDeploymentId: null | string;
      domainId: string;
      https: false | true;
      uniqueConfigKey: number;
      customCertResolver: null | string;
      internalPath: null | string;
      stripPath: false | true;
    }>;
  gitea: null | {
      accessToken: null | string;
      refreshToken: null | string;
      expiresAt: null | number;
      gitProviderId: string;
      redirectUri: null | string;
      giteaId: string;
      giteaUrl: string;
      giteaInternalUrl: null | string;
      clientId: null | string;
      clientSecret: null | string;
      scopes: null | string;
      lastAuthenticatedAt: null | number;
    };
  github: null | {
      githubId: string;
      githubAppName: null | string;
      githubAppId: null | number;
      githubClientId: null | string;
      githubClientSecret: null | string;
      githubInstallationId: null | string;
      githubPrivateKey: null | string;
      githubWebhookSecret: null | string;
      gitProviderId: string;
    };
  gitlab: null | {
      accessToken: null | string;
      refreshToken: null | string;
      expiresAt: null | number;
      secret: null | string;
      applicationId: null | string;
      gitProviderId: string;
      gitlabId: string;
      gitlabUrl: string;
      gitlabInternalUrl: null | string;
      redirectUri: null | string;
      groupName: null | string;
    };
  mounts: Array<{
      serviceType: "compose" | "mariadb" | "mongo" | "mysql" | "postgres" | "redis" | "application";
      type: "bind" | "volume" | "file";
      filePath: null | string;
      content: null | string;
      applicationId: null | string;
      composeId: null | string;
      mountId: string;
      hostPath: null | string;
      volumeName: null | string;
      mountPath: string;
      postgresId: null | string;
      mariadbId: null | string;
      mongoId: null | string;
      mysqlId: null | string;
      redisId: null | string;
    }>;
  ports: Array<{
      applicationId: string;
      portId: string;
      publishedPort: number;
      publishMode: "host" | "ingress";
      targetPort: number;
      protocol: "tcp" | "udp";
    }>;
  previewDeployments: Array<{
      createdAt: string;
      expiresAt: null | string;
      appName: string;
      applicationId: string;
      branch: string;
      previewDeploymentId: string;
      domainId: null | string;
      pullRequestId: string;
      pullRequestNumber: string;
      pullRequestURL: string;
      pullRequestTitle: string;
      pullRequestCommentId: string;
      previewStatus: "idle" | "running" | "done" | "error";
    }>;
  redirects: Array<{
      createdAt: string;
      applicationId: string;
      uniqueConfigKey: number;
      redirectId: string;
      regex: string;
      replacement: string;
      permanent: false | true;
    }>;
  registry: null | {
      createdAt: string;
      password: string;
      registryType: "selfHosted" | "cloud";
      username: string;
      organizationId: string;
      registryUrl: string;
      registryId: string;
      registryName: string;
      imagePrefix: null | string;
    };
  security: Array<{
      createdAt: string;
      password: string;
      username: string;
      applicationId: string;
      securityId: string;
    }>;
  server: null | {
      name: string;
      createdAt: string;
      serverStatus: "active" | "inactive";
      serverType: "deploy" | "build";
      username: string;
      description: null | string;
      serverId: string;
      ipAddress: string;
      port: number;
      appName: string;
      enableDockerCleanup: false | true;
      organizationId: string;
      command: string;
      sshKeyId: null | string;
      metricsConfig: {
        server: {
          type: "Dokploy" | "Remote";
          refreshRate: number;
          port: number;
          token: string;
          urlCallback: string;
          retentionDays: number;
          cronJob: string;
          thresholds: {
            cpu: number;
            memory: number;
          };
        };
        containers: {
          refreshRate: number;
          services: {
            include: string[];
            exclude: string[];
          };
        };
      };
    };
  environment: {
    name: string;
    createdAt: string;
    description: null | string;
    projectId: string;
    env: string;
    isDefault: false | true;
    environmentId: string;
    project: {
      name: string;
      createdAt: string;
      description: null | string;
      organizationId: string;
      projectId: string;
      env: string;
    };
  };
  buildRegistry: null | {
      createdAt: string;
      password: string;
      registryType: "selfHosted" | "cloud";
      username: string;
      organizationId: string;
      registryUrl: string;
      registryId: string;
      registryName: string;
      imagePrefix: null | string;
    };
  rollbackRegistry: null | {
      createdAt: string;
      password: string;
      registryType: "selfHosted" | "cloud";
      username: string;
      organizationId: string;
      registryUrl: string;
      registryId: string;
      registryName: string;
      imagePrefix: null | string;
    };
};
