// Auto-generated. Do not edit.
// RouterOutputs["user"]["getMetricsToken"]

export type UserGetMetricsToken = {
  serverIp: undefined | null | string;
  enabledFeatures: false | true;
  metricsConfig: undefined | {
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
