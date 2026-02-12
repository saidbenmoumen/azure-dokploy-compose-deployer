// Auto-generated. Do not edit.
// RouterOutputs["project"]["create"]

export type ProjectCreate = {
  project: {
    name: string;
    createdAt: string;
    description: null | string;
    organizationId: string;
    projectId: string;
    env: string;
  };
  environment: {
    name: string;
    createdAt: string;
    description: null | string;
    projectId: string;
    env: string;
    isDefault: false | true;
    environmentId: string;
  };
};
