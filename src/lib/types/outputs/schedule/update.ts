// Auto-generated. Do not edit.
// RouterOutputs["schedule"]["update"]

export type ScheduleUpdate = {
  scheduleId: string;
  name: string;
  cronExpression: string;
  appName: string;
  serviceName: null | string;
  shellType: "bash" | "sh";
  scheduleType: "compose" | "server" | "application" | "dokploy-server";
  command: string;
  script: null | string;
  applicationId: null | string;
  composeId: null | string;
  serverId: null | string;
  userId: null | string;
  enabled: false | true;
  timezone: null | string;
  createdAt: string;
};
