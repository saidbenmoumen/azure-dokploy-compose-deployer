// Auto-generated. Do not edit.
// RouterInputs["volumeBackups"]["update"]

export type VolumeBackupsUpdate = {
  name: string;
  prefix: string;
  volumeBackupId: string;
  volumeName: string;
  destinationId: string;
  cronExpression: string;
  createdAt?: undefined | string;
  serviceType?: undefined | "compose" | "mariadb" | "mongo" | "mysql" | "postgres" | "redis" | "application";
  appName?: undefined | string;
  enabled?: undefined | null | false | true;
  serviceName?: undefined | null | string;
  applicationId?: undefined | null | string;
  composeId?: undefined | null | string;
  postgresId?: undefined | null | string;
  mariadbId?: undefined | null | string;
  mongoId?: undefined | null | string;
  mysqlId?: undefined | null | string;
  redisId?: undefined | null | string;
  keepLatestCount?: undefined | null | number;
  turnOff?: undefined | false | true;
};
