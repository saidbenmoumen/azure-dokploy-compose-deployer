// Auto-generated. Do not edit.
// RouterInputs["postgres"]["update"]

export type PostgresUpdate = {
  postgresId: string;
  name?: undefined | string;
  createdAt?: undefined | string;
  applicationStatus?: undefined | "idle" | "running" | "done" | "error";
  description?: undefined | null | string;
  appName?: undefined | string;
  command?: undefined | null | string;
  env?: undefined | null | string;
  environmentId?: undefined | string;
  memoryReservation?: undefined | null | string;
  memoryLimit?: undefined | null | string;
  cpuReservation?: undefined | null | string;
  cpuLimit?: undefined | null | string;
  args?: undefined | null | string[];
  dockerImage?: undefined | string;
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
  databaseName?: undefined | string;
  databaseUser?: undefined | string;
  databasePassword?: undefined | string;
  externalPort?: undefined | null | number;
};
