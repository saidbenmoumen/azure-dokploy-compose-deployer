// Auto-generated. Do not edit.
// RouterOutputs["notification"]["all"]

export type NotificationAll = Array<{
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
    custom: null | {
        customId: string;
        endpoint: string;
        headers: null | { [key: string]: string };
      };
    email: null | {
        password: string;
        emailId: string;
        smtpServer: string;
        smtpPort: number;
        username: string;
        fromAddress: string;
        toAddresses: string[];
      };
    slack: null | {
        slackId: string;
        webhookUrl: string;
        channel: null | string;
      };
    telegram: null | {
        telegramId: string;
        botToken: string;
        chatId: string;
        messageThreadId: null | string;
      };
    discord: null | {
        webhookUrl: string;
        discordId: string;
        decoration: null | false | true;
      };
    resend: null | {
        fromAddress: string;
        toAddresses: string[];
        apiKey: string;
        resendId: string;
      };
    gotify: null | {
        decoration: null | false | true;
        gotifyId: string;
        serverUrl: string;
        appToken: string;
        priority: number;
      };
    ntfy: null | {
        accessToken: null | string;
        serverUrl: string;
        priority: number;
        ntfyId: string;
        topic: string;
      };
    lark: null | {
        webhookUrl: string;
        larkId: string;
      };
    pushover: null | {
        apiToken: string;
        priority: number;
        pushoverId: string;
        userKey: string;
        retry: null | number;
        expire: null | number;
      };
  }>;
