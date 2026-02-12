// Auto-generated. Do not edit.
// RouterInputs["ai"]["deploy"]

export type AiDeploy = {
  id: string;
  name: string;
  description: string;
  environmentId: string;
  dockerCompose: string;
  envVariables: string;
  domains?: undefined | Array<{
        port: number;
        host: string;
        serviceName: string;
      }>;
  serverId?: undefined | string;
  configFiles?: undefined | Array<{
        filePath: string;
        content: string;
      }>;
};
