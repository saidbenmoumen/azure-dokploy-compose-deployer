// Auto-generated. Do not edit.
// RouterInputs["backup"]["restoreBackupWithLogs"]

export type BackupRestoreBackupWithLogs = {
  databaseType: "mariadb" | "mongo" | "mysql" | "postgres" | "web-server";
  backupType: "compose" | "database";
  databaseName: string;
  destinationId: string;
  databaseId: string;
  backupFile: string;
  metadata?: undefined | {
      mariadb?: undefined | {
          databaseUser: string;
          databasePassword: string;
        };
      mongo?: undefined | {
          databaseUser: string;
          databasePassword: string;
        };
      mysql?: undefined | {
          databaseRootPassword: string;
        };
      postgres?: undefined | {
          databaseUser: string;
        };
      serviceName?: undefined | string;
    };
};
