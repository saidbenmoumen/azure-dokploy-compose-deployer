// Auto-generated. Do not edit.
// RouterOutputs["notification"]["remove"]

export type NotificationRemove = undefined | {
    name: string;
    createdAt: string;
    notificationType: "custom" | "email" | "slack" | "telegram" | "discord" | "resend" | "gotify" | "ntfy" | "lark" | "pushover";
    customId: null | string;
    emailId: null | string;
    organizationId: string;
    volumeBackup: false | true;
    notificationId: string;
    appDeploy: false | true;
    appBuildError: false | true;
    databaseBackup: false | true;
    dokployRestart: false | true;
    dockerCleanup: false | true;
    serverThreshold: false | true;
    slackId: null | string;
    telegramId: null | string;
    discordId: null | string;
    resendId: null | string;
    gotifyId: null | string;
    ntfyId: null | string;
    larkId: null | string;
    pushoverId: null | string;
  };
