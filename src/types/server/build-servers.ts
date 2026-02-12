// Auto-generated. Do not edit.
// RouterOutputs["server"]["buildServers"]

export type ServerBuildServers = Array<{
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
  }>;
