// Auto-generated. Do not edit.
// RouterOutputs["organization"]["all"]

export type OrganizationAll = Array<{
    id: string;
    name: string;
    createdAt: Date;
    slug: null | string;
    logo: null | string;
    metadata: null | string;
    ownerId: string;
    members: Array<{
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
      }>;
  }>;
