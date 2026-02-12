// Auto-generated. Do not edit.
// RouterInputs["mounts"]["update"]

export type MountsUpdate = {
  mountId: string;
  serviceType?: undefined | "compose" | "mariadb" | "mongo" | "mysql" | "postgres" | "redis" | "application";
  type?: undefined | "bind" | "volume" | "file";
  filePath?: undefined | null | string;
  content?: undefined | null | string;
  applicationId?: undefined | null | string;
  composeId?: undefined | null | string;
  hostPath?: undefined | null | string;
  volumeName?: undefined | null | string;
  mountPath?: undefined | string;
  postgresId?: undefined | null | string;
  mariadbId?: undefined | null | string;
  mongoId?: undefined | null | string;
  mysqlId?: undefined | null | string;
  redisId?: undefined | null | string;
};
