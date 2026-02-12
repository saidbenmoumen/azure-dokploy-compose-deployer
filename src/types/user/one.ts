// Auto-generated. Do not edit.
// RouterOutputs["user"]["one"]

export type UserOne = {
  id: string;
  createdAt: Date;
  role: "member" | "owner" | "admin";
  userId: string;
  organizationId: string;
  teamId: null | string;
  isDefault: false | true;
  canCreateProjects: false | true;
  canAccessToSSHKeys: false | true;
  canCreateServices: false | true;
  canDeleteProjects: false | true;
  canDeleteServices: false | true;
  canAccessToDocker: false | true;
  canAccessToAPI: false | true;
  canAccessToGitProviders: false | true;
  canAccessToTraefikFiles: false | true;
  canDeleteEnvironments: false | true;
  canCreateEnvironments: false | true;
  accessedProjects: string[];
  accessedEnvironments: string[];
  accessedServices: string[];
  user: {
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
  };
};
