// Auto-generated. Do not edit.
// RouterOutputs["application"]["create"]

export type ApplicationCreate = {
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
};
