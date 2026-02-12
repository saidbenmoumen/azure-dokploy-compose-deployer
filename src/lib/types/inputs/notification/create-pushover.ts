// Auto-generated. Do not edit.
// RouterInputs["notification"]["createPushover"]

export type NotificationCreatePushover = {
  name: string;
  apiToken: string;
  userKey: string;
  volumeBackup?: undefined | false | true;
  appDeploy?: undefined | false | true;
  appBuildError?: undefined | false | true;
  databaseBackup?: undefined | false | true;
  dokployRestart?: undefined | false | true;
  dockerCleanup?: undefined | false | true;
  serverThreshold?: undefined | false | true;
  priority?: undefined | number;
  retry?: undefined | null | number;
  expire?: undefined | null | number;
};
