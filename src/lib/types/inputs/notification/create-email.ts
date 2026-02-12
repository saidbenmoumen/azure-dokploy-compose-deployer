// Auto-generated. Do not edit.
// RouterInputs["notification"]["createEmail"]

export type NotificationCreateEmail = {
  name: string;
  password: string;
  smtpServer: string;
  smtpPort: number;
  username: string;
  fromAddress: string;
  toAddresses: string[];
  volumeBackup: false | true;
  appDeploy: false | true;
  appBuildError: false | true;
  databaseBackup: false | true;
  dokployRestart: false | true;
  dockerCleanup: false | true;
  serverThreshold: false | true;
};
