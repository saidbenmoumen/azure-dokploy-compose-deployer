// Auto-generated. Do not edit.
// RouterOutputs["server"]["one"]

export type ServerOne = {
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
  sshKey: null | {
      name: string;
      createdAt: string;
      description: null | string;
      organizationId: string;
      sshKeyId: string;
      privateKey: string;
      publicKey: string;
      lastUsedAt: null | string;
    };
};
