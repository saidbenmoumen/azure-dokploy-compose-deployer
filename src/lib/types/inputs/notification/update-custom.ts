// Auto-generated. Do not edit.
// RouterInputs["notification"]["updateCustom"]

export type NotificationUpdateCustom = {
  customId: string;
  notificationId: string;
  name?: undefined | string;
  endpoint?: undefined | string;
  headers?: undefined | { [key: string]: string };
  organizationId?: undefined | string;
  volumeBackup?: undefined | false | true;
  appDeploy?: undefined | false | true;
  appBuildError?: undefined | false | true;
  databaseBackup?: undefined | false | true;
  dokployRestart?: undefined | false | true;
  dockerCleanup?: undefined | false | true;
  serverThreshold?: undefined | false | true;
};
