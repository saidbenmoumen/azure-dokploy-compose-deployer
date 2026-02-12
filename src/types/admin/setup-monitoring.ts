// Auto-generated. Do not edit.
// RouterOutputs["admin"]["setupMonitoring"]

export type AdminSetupMonitoring = undefined | {
    id: string;
    createdAt: null | Date;
    updatedAt: Date;
    certificateType: "custom" | "letsencrypt" | "none";
    enableDockerCleanup: false | true;
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
    host: null | string;
    https: false | true;
    serverIp: null | string;
    letsEncryptEmail: null | string;
    sshPrivateKey: null | string;
    logCleanupCron: null | string;
    cleanupCacheApplications: false | true;
    cleanupCacheOnPreviews: false | true;
    cleanupCacheOnCompose: false | true;
  };
