// Auto-generated. Do not edit.
// RouterOutputs["server"]["all"]

export type ServerAll = Array<{
    totalSum: number;
    serverId: string;
    name: string;
    description: null | string;
    ipAddress: string;
    port: number;
    username: string;
    appName: string;
    enableDockerCleanup: false | true;
    createdAt: string;
    organizationId: string;
    serverStatus: "active" | "inactive";
    serverType: "deploy" | "build";
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
