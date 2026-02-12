// Auto-generated. Do not edit.
// RouterOutputs["redis"]["deploy"]

export type RedisDeploy = {
  name: string;
  createdAt: string;
  applicationStatus: "idle" | "running" | "done" | "error";
  description: null | string;
  serverId: null | string;
  appName: string;
  command: null | string;
  env: null | string;
  environmentId: string;
  memoryReservation: null | string;
  memoryLimit: null | string;
  cpuReservation: null | string;
  cpuLimit: null | string;
  args: null | string[];
  dockerImage: string;
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
  databasePassword: string;
  externalPort: null | number;
  redisId: string;
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
};
