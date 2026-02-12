// Auto-generated. Do not edit.
// RouterInputs["backup"]["update"]

export type BackupUpdate = {
  databaseType: "mariadb" | "mongo" | "mysql" | "postgres" | "web-server";
  prefix: string;
  enabled: null | false | true;
  serviceName: null | string;
  backupId: string;
  database: string;
  schedule: string;
  destinationId: string;
  keepLatestCount: null | number;
  metadata?: any;
};
