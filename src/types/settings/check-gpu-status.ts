// Auto-generated. Do not edit.
// RouterOutputs["settings"]["checkGPUStatus"]

export type SettingsCheckGPUStatus = {
    driverInstalled: false | true;
    driverVersion?: undefined | string;
    gpuModel?: undefined | string;
    runtimeInstalled: false | true;
    runtimeConfigured: false | true;
    cudaSupport: false | true;
    cudaVersion?: undefined | string;
    memoryInfo?: undefined | string;
    availableGPUs: number;
    swarmEnabled: false | true;
    gpuResources: number;
  } | {
    driverInstalled: false | true;
    driverVersion: undefined;
    gpuModel: undefined;
    runtimeInstalled: false | true;
    runtimeConfigured: false | true;
    cudaSupport: undefined;
    cudaVersion: undefined;
    memoryInfo: undefined;
    availableGPUs: number;
    swarmEnabled: false | true;
    gpuResources: number;
  };
