// Auto-generated. Do not edit.
// RouterOutputs["cluster"]["getNodes"]

export type ClusterGetNodes = Array<{
    ID: string;
    Version: {
      Index: number;
    };
    CreatedAt: string;
    UpdatedAt: string;
    Spec: {
      Name: string;
      Labels: { [key: string]: string };
      Role: "worker" | "manager";
      Availability: "active" | "drain" | "pause";
    };
    Description: {
      Hostname: string;
      Platform: {
        Architecture: string;
        OS: string;
      };
      Resources: {
        NanoCPUs: number;
        MemoryBytes: number;
      };
      Engine: {
        EngineVersion: string;
        Plugins: Array<{
            Type: string;
            Name: string;
          }>;
      };
    };
    Status: {
      State: "unknown" | "down" | "ready" | "disconnected";
      Message: string;
      Addr: string;
    };
    ManagerStatus?: undefined | {
        Leader: false | true;
        Addr: string;
      };
  }>;
