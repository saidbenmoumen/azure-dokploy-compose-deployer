// Auto-generated. Do not edit.
// RouterInputs["domain"]["update"]

export type DomainUpdate = {
  host: string;
  domainId: string;
  domainType?: undefined | null | "compose" | "application" | "preview";
  certificateType?: undefined | "custom" | "letsencrypt" | "none";
  port?: undefined | null | number;
  path?: undefined | null | string;
  serviceName?: undefined | null | string;
  https?: undefined | false | true;
  customCertResolver?: undefined | null | string;
  internalPath?: undefined | null | string;
  stripPath?: undefined | false | true;
};
