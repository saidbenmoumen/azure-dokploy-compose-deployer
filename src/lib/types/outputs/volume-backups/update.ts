// Auto-generated. Do not edit.
// RouterOutputs["volumeBackups"]["update"]

export type VolumeBackupsUpdate = {
  volumeBackupId: string;
  name: string;
  volumeName: string;
  prefix: string;
  serviceType: "compose" | "mariadb" | "mongo" | "mysql" | "postgres" | "redis" | "application";
  appName: string;
  serviceName: null | string;
  turnOff: false | true;
  cronExpression: string;
  keepLatestCount: null | number;
  enabled: null | false | true;
  applicationId: null | string;
  postgresId: null | string;
  mariadbId: null | string;
  mongoId: null | string;
  mysqlId: null | string;
  redisId: null | string;
  composeId: null | string;
  createdAt: string;
  destinationId: string;
};
