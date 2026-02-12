// Auto-generated. Do not edit.
// RouterInputs["schedule"]["create"]

export type ScheduleCreate = {
  name: string;
  command: string;
  cronExpression: string;
  createdAt?: undefined | string;
  userId?: undefined | null | string;
  scheduleType?: undefined | "compose" | "server" | "application" | "dokploy-server";
  serverId?: undefined | null | string;
  appName?: undefined | string;
  enabled?: undefined | false | true;
  serviceName?: undefined | null | string;
  applicationId?: undefined | null | string;
  composeId?: undefined | null | string;
  scheduleId?: undefined | string;
  shellType?: undefined | "bash" | "sh";
  script?: undefined | null | string;
  timezone?: undefined | null | string;
};
