// Auto-generated. Do not edit.
// RouterInputs["notification"]["updateSlack"]

export type NotificationUpdateSlack = {
  notificationId: string;
  slackId: string;
  name?: undefined | string;
  organizationId?: undefined | string;
  volumeBackup?: undefined | false | true;
  appDeploy?: undefined | false | true;
  appBuildError?: undefined | false | true;
  databaseBackup?: undefined | false | true;
  dokployRestart?: undefined | false | true;
  dockerCleanup?: undefined | false | true;
  serverThreshold?: undefined | false | true;
  webhookUrl?: undefined | string;
  channel?: undefined | string;
};
