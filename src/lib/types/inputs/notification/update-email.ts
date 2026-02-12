// Auto-generated. Do not edit.
// RouterInputs["notification"]["updateEmail"]

export type NotificationUpdateEmail = {
  emailId: string;
  notificationId: string;
  name?: undefined | string;
  password?: undefined | string;
  smtpServer?: undefined | string;
  smtpPort?: undefined | number;
  username?: undefined | string;
  fromAddress?: undefined | string;
  toAddresses?: undefined | string[];
  organizationId?: undefined | string;
  volumeBackup?: undefined | false | true;
  appDeploy?: undefined | false | true;
  appBuildError?: undefined | false | true;
  databaseBackup?: undefined | false | true;
  dokployRestart?: undefined | false | true;
  dockerCleanup?: undefined | false | true;
  serverThreshold?: undefined | false | true;
};
