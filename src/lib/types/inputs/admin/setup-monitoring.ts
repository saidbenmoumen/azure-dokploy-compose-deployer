// Auto-generated. Do not edit.
// RouterInputs["admin"]["setupMonitoring"]

export type AdminSetupMonitoring = {
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
