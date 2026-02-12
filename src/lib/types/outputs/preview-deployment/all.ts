// Auto-generated. Do not edit.
// RouterOutputs["previewDeployment"]["all"]

export type PreviewDeploymentAll = Array<{
    createdAt: string;
    expiresAt: null | string;
    appName: string;
    applicationId: string;
    branch: string;
    previewDeploymentId: string;
    domainId: null | string;
    pullRequestId: string;
    pullRequestNumber: string;
    pullRequestURL: string;
    pullRequestTitle: string;
    pullRequestCommentId: string;
    previewStatus: "idle" | "running" | "done" | "error";
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
    domain: null | {
        createdAt: string;
        domainType: null | "compose" | "application" | "preview";
        certificateType: "custom" | "letsencrypt" | "none";
        port: null | number;
        path: null | string;
        host: string;
        serviceName: null | string;
        applicationId: null | string;
        composeId: null | string;
        previewDeploymentId: null | string;
        domainId: string;
        https: false | true;
        uniqueConfigKey: number;
        customCertResolver: null | string;
        internalPath: null | string;
        stripPath: false | true;
      };
  }>;
