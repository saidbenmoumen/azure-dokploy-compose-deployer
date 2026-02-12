// Auto-generated. Do not edit.
// RouterOutputs["gitProvider"]["getAll"]

export type GitProviderGetAll = Array<{
    name: string;
    createdAt: string;
    userId: string;
    organizationId: string;
    gitProviderId: string;
    providerType: "bitbucket" | "gitea" | "github" | "gitlab";
    bitbucket: {
      gitProviderId: string;
      bitbucketId: string;
      bitbucketUsername: null | string;
      bitbucketEmail: null | string;
      appPassword: null | string;
      apiToken: null | string;
      bitbucketWorkspaceName: null | string;
    };
    gitea: {
      accessToken: null | string;
      refreshToken: null | string;
      expiresAt: null | number;
      gitProviderId: string;
      redirectUri: null | string;
      giteaId: string;
      giteaUrl: string;
      giteaInternalUrl: null | string;
      clientId: null | string;
      clientSecret: null | string;
      scopes: null | string;
      lastAuthenticatedAt: null | number;
    };
    github: {
      githubId: string;
      githubAppName: null | string;
      githubAppId: null | number;
      githubClientId: null | string;
      githubClientSecret: null | string;
      githubInstallationId: null | string;
      githubPrivateKey: null | string;
      githubWebhookSecret: null | string;
      gitProviderId: string;
    };
    gitlab: {
      accessToken: null | string;
      refreshToken: null | string;
      expiresAt: null | number;
      secret: null | string;
      applicationId: null | string;
      gitProviderId: string;
      gitlabId: string;
      gitlabUrl: string;
      gitlabInternalUrl: null | string;
      redirectUri: null | string;
      groupName: null | string;
    };
  }>;
