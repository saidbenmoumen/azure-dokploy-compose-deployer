// Auto-generated. Do not edit.
// RouterOutputs["postgres"]["remove"]

export type PostgresRemove = {
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
  postgresId: string;
  databaseName: string;
  databaseUser: string;
  databasePassword: string;
  externalPort: null | number;
  backups: Array<{
      userId: null | string;
      databaseType: "mariadb" | "mongo" | "mysql" | "postgres" | "web-server";
      backupType: "compose" | "database";
      metadata: undefined | null | {
          postgres?: undefined | {
              databaseUser: string;
            };
          mariadb?: undefined | {
              databaseUser: string;
              databasePassword: string;
            };
          mongo?: undefined | {
              databaseUser: string;
              databasePassword: string;
            };
          mysql?: undefined | {
              databaseRootPassword: string;
            };
        };
      appName: string;
      prefix: string;
      enabled: null | false | true;
      serviceName: null | string;
      composeId: null | string;
      backupId: string;
      postgresId: null | string;
      mariadbId: null | string;
      mongoId: null | string;
      mysqlId: null | string;
      database: string;
      schedule: string;
      destinationId: string;
      keepLatestCount: null | number;
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
      destination: {
        name: string;
        createdAt: Date;
        endpoint: string;
        organizationId: string;
        destinationId: string;
        provider: null | string;
        accessKey: string;
        secretAccessKey: string;
        bucket: string;
        region: string;
      };
    }>;
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
