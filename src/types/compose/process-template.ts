// Auto-generated. Do not edit.
// RouterOutputs["compose"]["processTemplate"]

export type ComposeProcessTemplate = {
  compose: any;
  template: {
    domains: Array<{
        serviceName: string;
        port: number;
        path?: undefined | string;
        host?: undefined | string;
      }>;
    envs: string[];
    mounts: Array<{
        filePath: string;
        content: string;
      }>;
  };
};
