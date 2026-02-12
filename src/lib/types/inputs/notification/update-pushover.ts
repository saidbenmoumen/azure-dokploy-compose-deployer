// Auto-generated. Do not edit.
// RouterInputs["notification"]["updatePushover"]

export type NotificationUpdatePushover = {
  notificationId: string;
  pushoverId: string;
  name?: undefined | string;
  organizationId?: undefined | string;
  apiToken?: undefined | string;
  volumeBackup?: undefined | false | true;
  appDeploy?: undefined | false | true;
  appBuildError?: undefined | false | true;
  databaseBackup?: undefined | false | true;
  dokployRestart?: undefined | false | true;
  dockerCleanup?: undefined | false | true;
  serverThreshold?: undefined | false | true;
  priority?: undefined | number;
  userKey?: undefined | string;
  retry?: undefined | null | number;
  expire?: undefined | null | number;
};
