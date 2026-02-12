// Auto-generated. Do not edit.
// RouterOutputs["organization"]["allInvitations"]

export type OrganizationAllInvitations = Array<{
    id: string;
    createdAt: Date;
    email: string;
    role: null | "member" | "owner" | "admin";
    expiresAt: Date;
    organizationId: string;
    teamId: null | string;
    status: string;
    inviterId: string;
  }>;
