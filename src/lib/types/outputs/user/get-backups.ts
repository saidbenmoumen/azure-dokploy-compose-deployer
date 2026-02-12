// Auto-generated. Do not edit.
// RouterOutputs["user"]["getBackups"]

export type UserGetBackups = undefined | {
    id: string;
    firstName: string;
    lastName: string;
    isRegistered: false | true;
    expirationDate: string;
    createdAt: null | Date;
    createdAt2: string;
    twoFactorEnabled: null | false | true;
    email: string;
    emailVerified: false | true;
    image: null | string;
    banned: null | false | true;
    banReason: null | string;
    banExpires: null | Date;
    updatedAt: Date;
    role: string;
    enablePaidFeatures: false | true;
    allowImpersonation: false | true;
    enableEnterpriseFeatures: false | true;
    licenseKey: null | string;
    isValidEnterpriseLicense: false | true;
    stripeCustomerId: null | string;
    stripeSubscriptionId: null | string;
    serversQuantity: number;
    trustedOrigins: null | string[];
    backups: Array<{
        userId: null | string;
        databaseType: "mariadb" | "mongo" | "mysql" | "postgres" | "web-server";
        backupType: "compose" | "database";
        metadata: undefined | null | {
            postgres?: undefined | {
                databaseUser: string;
              };
            mariadb?: undefined | {
                databaseUser: string;
                databasePassword: string;
              };
            mongo?: undefined | {
                databaseUser: string;
                databasePassword: string;
              };
            mysql?: undefined | {
                databaseRootPassword: string;
              };
          };
        appName: string;
        prefix: string;
        enabled: null | false | true;
        serviceName: null | string;
        composeId: null | string;
        backupId: string;
        postgresId: null | string;
        mariadbId: null | string;
        mongoId: null | string;
        mysqlId: null | string;
        database: string;
        schedule: string;
        destinationId: string;
        keepLatestCount: null | number;
        deployments: Array<{
            createdAt: string;
            description: null | string;
            serverId: null | string;
            status: null | "running" | "done" | "error" | "cancelled";
            applicationId: null | string;
            title: string;
            buildServerId: null | string;
            deploymentId: string;
            logPath: string;
            pid: null | string;
            composeId: null | string;
            isPreviewDeployment: null | false | true;
            previewDeploymentId: null | string;
            startedAt: null | string;
            finishedAt: null | string;
            errorMessage: null | string;
            scheduleId: null | string;
            backupId: null | string;
            rollbackId: null | string;
            volumeBackupId: null | string;
          }>;
        destination: {
          name: string;
          createdAt: Date;
          endpoint: string;
          organizationId: string;
          destinationId: string;
          provider: null | string;
          accessKey: string;
          secretAccessKey: string;
          bucket: string;
          region: string;
        };
      }>;
    apiKeys: Array<{
        id: string;
        name: null | string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: null | Date;
        metadata: null | string;
        start: null | string;
        prefix: null | string;
        key: string;
        refillInterval: null | number;
        refillAmount: null | number;
        lastRefillAt: null | Date;
        enabled: null | false | true;
        rateLimitEnabled: null | false | true;
        rateLimitTimeWindow: null | number;
        rateLimitMax: null | number;
        requestCount: null | number;
        remaining: null | number;
        lastRequest: null | Date;
        permissions: null | string;
      }>;
  };
