// Auto-generated. Do not edit.
// RouterOutputs["ai"]["suggest"]

export type AiSuggest = Array<{
    domains: Array<{
        port: number;
        host: string;
        serviceName: string;
      }>;
    dockerCompose: string;
    envVariables: Array<{
        name: string;
        value: string;
      }>;
    configFiles?: undefined | Array<{
          filePath: string;
          content: string;
        }>;
    id: string;
    name: string;
    description: string;
    shortDescription: string;
  }>;
