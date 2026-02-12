// Auto-generated. Do not edit.
// RouterOutputs["schedule"]["create"]

export type ScheduleCreate = undefined | {
    name: string;
    createdAt: string;
    userId: null | string;
    scheduleType: "compose" | "server" | "application" | "dokploy-server";
    serverId: null | string;
    appName: string;
    command: string;
    enabled: false | true;
    serviceName: null | string;
    applicationId: null | string;
    composeId: null | string;
    scheduleId: string;
    cronExpression: string;
    shellType: "bash" | "sh";
    script: null | string;
    timezone: null | string;
  };
