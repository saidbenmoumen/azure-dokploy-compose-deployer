// Auto-generated. Do not edit.
// RouterInputs["settings"]["updateTraefikPorts"]

export type SettingsUpdateTraefikPorts = {
  additionalPorts: Array<{
      publishedPort: number;
      targetPort: number;
      protocol: "tcp" | "udp" | "sctp";
    }>;
  serverId?: undefined | string;
};
