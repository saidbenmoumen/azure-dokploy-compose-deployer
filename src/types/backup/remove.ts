// Auto-generated. Do not edit.
// RouterOutputs["backup"]["remove"]

export type BackupRemove = undefined | {
    userId: null | string;
    databaseType: "mariadb" | "mongo" | "mysql" | "postgres" | "web-server";
    backupType: "compose" | "database";
    metadata: undefined | null | {
        postgres?: undefined | {
            databaseUser: string;
          };
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
      };
    appName: string;
    prefix: string;
    enabled: null | false | true;
    serviceName: null | string;
    composeId: null | string;
    backupId: string;
    postgresId: null | string;
    mariadbId: null | string;
    mongoId: null | string;
    mysqlId: null | string;
    database: string;
    schedule: string;
    destinationId: string;
    keepLatestCount: null | number;
  };
