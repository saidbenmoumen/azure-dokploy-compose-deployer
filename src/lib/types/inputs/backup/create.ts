// Auto-generated. Do not edit.
// RouterInputs["backup"]["create"]

export type BackupCreate = {
  databaseType: "mariadb" | "mongo" | "mysql" | "postgres" | "web-server";
  prefix: string;
  database: string;
  schedule: string;
  destinationId: string;
  userId?: undefined | null | string;
  backupType?: undefined | "compose" | "database";
  metadata?: any;
  enabled?: undefined | null | false | true;
  serviceName?: undefined | null | string;
  composeId?: undefined | null | string;
  postgresId?: undefined | null | string;
  mariadbId?: undefined | null | string;
  mongoId?: undefined | null | string;
  mysqlId?: undefined | null | string;
  keepLatestCount?: undefined | null | number;
};
