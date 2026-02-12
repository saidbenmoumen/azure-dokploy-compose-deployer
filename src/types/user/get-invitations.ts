// Auto-generated. Do not edit.
// RouterOutputs["user"]["getInvitations"]

export type UserGetInvitations = Array<{
    id: string;
    createdAt: Date;
    email: string;
    role: null | "member" | "owner" | "admin";
    expiresAt: Date;
    organizationId: string;
    teamId: null | string;
    status: string;
    inviterId: string;
    organization: {
      id: string;
      name: string;
      createdAt: Date;
      slug: null | string;
      logo: null | string;
      metadata: null | string;
      ownerId: string;
    };
  }>;
