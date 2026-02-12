// Auto-generated. Do not edit.
// RouterOutputs["domain"]["update"]

export type DomainUpdate = undefined | {
    domainId: string;
    host: string;
    https: false | true;
    port: null | number;
    path: null | string;
    serviceName: null | string;
    domainType: null | "compose" | "application" | "preview";
    uniqueConfigKey: number;
    createdAt: string;
    composeId: null | string;
    customCertResolver: null | string;
    applicationId: null | string;
    previewDeploymentId: null | string;
    certificateType: "custom" | "letsencrypt" | "none";
    internalPath: null | string;
    stripPath: false | true;
  };
