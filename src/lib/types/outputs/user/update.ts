// Auto-generated. Do not edit.
// RouterOutputs["user"]["update"]

export type UserUpdate = undefined | {
    id: string;
    firstName: string;
    lastName: string;
    isRegistered: false | true;
    expirationDate: string;
    createdAt2: string;
    createdAt: null | Date;
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
