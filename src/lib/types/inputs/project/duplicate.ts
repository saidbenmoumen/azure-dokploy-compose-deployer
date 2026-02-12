// Auto-generated. Do not edit.
// RouterInputs["project"]["duplicate"]

export type ProjectDuplicate = {
  name: string;
  sourceEnvironmentId: string;
  description?: undefined | string;
  includeServices?: undefined | false | true;
  selectedServices?: undefined | Array<{
        id: string;
        type: "compose" | "mariadb" | "mongo" | "mysql" | "postgres" | "redis" | "application";
      }>;
  duplicateInSameProject?: undefined | false | true;
};
