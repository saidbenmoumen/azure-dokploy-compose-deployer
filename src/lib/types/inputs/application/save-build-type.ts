// Auto-generated. Do not edit.
// RouterInputs["application"]["saveBuildType"]

export type ApplicationSaveBuildType = {
  buildType: "dockerfile" | "heroku_buildpacks" | "paketo_buildpacks" | "nixpacks" | "static" | "railpack";
  dockerfile: null | string;
  applicationId: string;
  dockerContextPath: null | string;
  dockerBuildStage: null | string;
  railpackVersion: null | string;
  herokuVersion: null | string;
  publishDirectory?: undefined | null | string;
  isStaticSpa?: undefined | null | false | true;
};
