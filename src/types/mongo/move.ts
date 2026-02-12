// Auto-generated. Do not edit.
// RouterOutputs["mongo"]["move"]

export type MongoMove = {
  mongoId: string;
  name: string;
  appName: string;
  description: null | string;
  databaseUser: string;
  databasePassword: string;
  dockerImage: string;
  command: null | string;
  args: null | string[];
  env: null | string;
  memoryReservation: null | string;
  memoryLimit: null | string;
  cpuReservation: null | string;
  cpuLimit: null | string;
  externalPort: null | number;
  applicationStatus: "idle" | "running" | "done" | "error";
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
  createdAt: string;
  environmentId: string;
  serverId: null | string;
  replicaSets: null | false | true;
};
