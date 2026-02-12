// Auto-generated. Do not edit.
// RouterOutputs["domain"]["create"]

export type DomainCreate = {
  createdAt: string;
  domainType: null | "compose" | "application" | "preview";
  certificateType: "custom" | "letsencrypt" | "none";
  port: null | number;
  path: null | string;
  host: string;
  serviceName: null | string;
  applicationId: null | string;
  composeId: null | string;
  previewDeploymentId: null | string;
  domainId: string;
  https: false | true;
  uniqueConfigKey: number;
  customCertResolver: null | string;
  internalPath: null | string;
  stripPath: false | true;
};
