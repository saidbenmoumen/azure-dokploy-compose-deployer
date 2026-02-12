// Auto-generated. Do not edit.
// RouterInputs["mounts"]["create"]

export type MountsCreate = {
  type: "bind" | "volume" | "file";
  mountPath: string;
  serviceId: string;
  serviceType?: undefined | "compose" | "mariadb" | "mongo" | "mysql" | "postgres" | "redis" | "application";
  filePath?: undefined | null | string;
  content?: undefined | null | string;
  hostPath?: undefined | null | string;
  volumeName?: undefined | null | string;
};
