// Auto-generated. Do not edit.
// RouterInputs["notification"]["createCustom"]

export type NotificationCreateCustom = {
  name: string;
  endpoint: string;
  headers?: undefined | { [key: string]: string };
  volumeBackup?: undefined | false | true;
  appDeploy?: undefined | false | true;
  appBuildError?: undefined | false | true;
  databaseBackup?: undefined | false | true;
  dokployRestart?: undefined | false | true;
  dockerCleanup?: undefined | false | true;
  serverThreshold?: undefined | false | true;
};
