// Auto-generated. Do not edit.
// RouterInputs["application"]["update"]

export type ApplicationUpdate = {
  applicationId: string;
  name?: undefined | string;
  createdAt?: undefined | string;
  refreshToken?: undefined | null | string;
  password?: undefined | null | string;
  sourceType?: undefined | "bitbucket" | "gitea" | "github" | "gitlab" | "docker" | "git" | "drop";
  buildType?: undefined | "dockerfile" | "heroku_buildpacks" | "paketo_buildpacks" | "nixpacks" | "static" | "railpack";
  applicationStatus?: undefined | "idle" | "running" | "done" | "error";
  triggerType?: undefined | null | "push" | "tag";
  username?: undefined | null | string;
  description?: undefined | null | string;
  owner?: undefined | null | string;
  appName?: undefined | string;
  command?: undefined | null | string;
  env?: undefined | null | string;
  enabled?: undefined | null | false | true;
  environmentId?: undefined | string;
  dockerfile?: undefined | null | string;
  previewEnv?: undefined | null | string;
  watchPaths?: undefined | null | string[];
  previewBuildArgs?: undefined | null | string;
  previewBuildSecrets?: undefined | null | string;
  previewLabels?: undefined | null | string[];
  previewWildcard?: undefined | null | string;
  previewPort?: undefined | null | number;
  previewHttps?: undefined | false | true;
  previewPath?: undefined | null | string;
  previewCertificateType?: undefined | "custom" | "letsencrypt" | "none";
  previewCustomCertResolver?: undefined | null | string;
  previewLimit?: undefined | null | number;
  isPreviewDeploymentsActive?: undefined | null | false | true;
  previewRequireCollaboratorPermissions?: undefined | null | false | true;
  rollbackActive?: undefined | null | false | true;
  buildArgs?: undefined | null | string;
  buildSecrets?: undefined | null | string;
  memoryReservation?: undefined | null | string;
  memoryLimit?: undefined | null | string;
  cpuReservation?: undefined | null | string;
  cpuLimit?: undefined | null | string;
  title?: undefined | null | string;
  subtitle?: undefined | null | string;
  args?: undefined | null | string[];
  cleanCache?: undefined | null | false | true;
  repository?: undefined | null | string;
  branch?: undefined | null | string;
  buildPath?: undefined | null | string;
  autoDeploy?: undefined | null | false | true;
  gitlabProjectId?: undefined | null | number;
  gitlabRepository?: undefined | null | string;
  gitlabOwner?: undefined | null | string;
  gitlabBranch?: undefined | null | string;
  gitlabBuildPath?: undefined | null | string;
  gitlabPathNamespace?: undefined | null | string;
  giteaRepository?: undefined | null | string;
  giteaOwner?: undefined | null | string;
  giteaBranch?: undefined | null | string;
  giteaBuildPath?: undefined | null | string;
  bitbucketRepository?: undefined | null | string;
  bitbucketRepositorySlug?: undefined | null | string;
  bitbucketOwner?: undefined | null | string;
  bitbucketBranch?: undefined | null | string;
  bitbucketBuildPath?: undefined | null | string;
  dockerImage?: undefined | null | string;
  registryUrl?: undefined | null | string;
  customGitUrl?: undefined | null | string;
  customGitBranch?: undefined | null | string;
  customGitBuildPath?: undefined | null | string;
  customGitSSHKeyId?: undefined | null | string;
  enableSubmodules?: undefined | false | true;
  dockerContextPath?: undefined | null | string;
  dockerBuildStage?: undefined | null | string;
  dropBuildPath?: undefined | null | string;
  healthCheckSwarm?: undefined | null | {
      Test?: undefined | string[];
      Interval?: undefined | number;
      Timeout?: undefined | number;
      StartPeriod?: undefined | number;
      Retries?: undefined | number;
    };
  restartPolicySwarm?: undefined | null | {
      Condition?: undefined | string;
      Delay?: undefined | number;
      MaxAttempts?: undefined | number;
      Window?: undefined | number;
    };
  placementSwarm?: undefined | null | {
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
  updateConfigSwarm?: undefined | null | {
      Parallelism: number;
      Order: string;
      Delay?: undefined | number;
      FailureAction?: undefined | string;
      Monitor?: undefined | number;
      MaxFailureRatio?: undefined | number;
    };
  rollbackConfigSwarm?: undefined | null | {
      Parallelism: number;
      Order: string;
      Delay?: undefined | number;
      FailureAction?: undefined | string;
      Monitor?: undefined | number;
      MaxFailureRatio?: undefined | number;
    };
  modeSwarm?: undefined | null | {
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
  labelsSwarm?: undefined | null | { [key: string]: string };
  networkSwarm?: undefined | null | Array<{
        Target?: undefined | string;
        Aliases?: undefined | string[];
        DriverOpts?: undefined | { [key: string]: string };
      }>;
  stopGracePeriodSwarm?: undefined | null | bigint;
  endpointSpecSwarm?: undefined | null | {
      Mode?: undefined | string;
      Ports?: undefined | Array<{
            Protocol?: undefined | string;
            TargetPort?: undefined | number;
            PublishedPort?: undefined | number;
            PublishMode?: undefined | string;
          }>;
    };
  ulimitsSwarm?: undefined | null | Array<{
        Name: string;
        Soft: number;
        Hard: number;
      }>;
  replicas?: undefined | number;
  railpackVersion?: undefined | null | string;
  herokuVersion?: undefined | null | string;
  publishDirectory?: undefined | null | string;
  isStaticSpa?: undefined | null | false | true;
  createEnvFile?: undefined | false | true;
  registryId?: undefined | null | string;
  rollbackRegistryId?: undefined | null | string;
  githubId?: undefined | null | string;
  gitlabId?: undefined | null | string;
  giteaId?: undefined | null | string;
  bitbucketId?: undefined | null | string;
  buildServerId?: undefined | null | string;
  buildRegistryId?: undefined | null | string;
};
