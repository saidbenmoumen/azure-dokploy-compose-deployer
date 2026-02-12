// Auto-generated. Do not edit.
// RouterOutputs["deployment"]["all"]

export type DeploymentAll = Array<{
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
