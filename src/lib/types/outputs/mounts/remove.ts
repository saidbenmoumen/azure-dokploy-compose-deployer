// Auto-generated. Do not edit.
// RouterOutputs["mounts"]["remove"]

export type MountsRemove = undefined | {
    serviceType: "compose" | "mariadb" | "mongo" | "mysql" | "postgres" | "redis" | "application";
    type: "bind" | "volume" | "file";
    filePath: null | string;
    content: null | string;
    applicationId: null | string;
    composeId: null | string;
    mountId: string;
    hostPath: null | string;
    volumeName: null | string;
    mountPath: string;
    postgresId: null | string;
    mariadbId: null | string;
    mongoId: null | string;
    mysqlId: null | string;
    redisId: null | string;
  };
