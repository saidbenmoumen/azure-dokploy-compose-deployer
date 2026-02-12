// Auto-generated. Do not edit.
// RouterOutputs["volumeBackups"]["create"]

export type VolumeBackupsCreate = undefined | {
    name: string;
    createdAt: string;
    serviceType: "compose" | "mariadb" | "mongo" | "mysql" | "postgres" | "redis" | "application";
    appName: string;
    prefix: string;
    enabled: null | false | true;
    serviceName: null | string;
    applicationId: null | string;
    composeId: null | string;
    volumeBackupId: string;
    volumeName: string;
    postgresId: null | string;
    mariadbId: null | string;
    mongoId: null | string;
    mysqlId: null | string;
    redisId: null | string;
    destinationId: string;
    keepLatestCount: null | number;
    cronExpression: string;
    turnOff: false | true;
  };
