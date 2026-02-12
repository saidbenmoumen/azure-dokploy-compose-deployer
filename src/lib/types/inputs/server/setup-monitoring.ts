// Auto-generated. Do not edit.
// RouterInputs["server"]["setupMonitoring"]

export type ServerSetupMonitoring = {
  serverId: string;
  metricsConfig: {
    server: {
      port: number;
      refreshRate: number;
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
        include?: undefined | string[];
        exclude?: undefined | string[];
      };
    };
  };
};
