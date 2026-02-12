// Auto-generated. Do not edit.
// RouterInputs["notification"]["createSlack"]

export type NotificationCreateSlack = {
  name: string;
  volumeBackup: false | true;
  appDeploy: false | true;
  appBuildError: false | true;
  databaseBackup: false | true;
  dokployRestart: false | true;
  dockerCleanup: false | true;
  serverThreshold: false | true;
  webhookUrl: string;
  channel: string;
};
