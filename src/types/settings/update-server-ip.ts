// Auto-generated. Do not edit.
// RouterOutputs["settings"]["updateServerIp"]

export type SettingsUpdateServerIp = undefined | true | {
    id: string;
    serverIp: null | string;
    certificateType: "custom" | "letsencrypt" | "none";
    https: false | true;
    host: null | string;
    letsEncryptEmail: null | string;
    sshPrivateKey: null | string;
    enableDockerCleanup: false | true;
    logCleanupCron: null | string;
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
    cleanupCacheApplications: false | true;
    cleanupCacheOnPreviews: false | true;
    cleanupCacheOnCompose: false | true;
    createdAt: null | Date;
    updatedAt: Date;
  };
