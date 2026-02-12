// Auto-generated. Do not edit.
// RouterInputs["compose"]["update"]

export type ComposeUpdate = {
  composeId: string;
  name?: undefined | string;
  createdAt?: undefined | string;
  refreshToken?: undefined | null | string;
  sourceType?: undefined | "bitbucket" | "gitea" | "github" | "gitlab" | "raw" | "git";
  composeType?: undefined | "docker-compose" | "stack";
  triggerType?: undefined | null | "push" | "tag";
  description?: undefined | null | string;
  owner?: undefined | null | string;
  appName?: undefined | string;
  command?: undefined | string;
  env?: undefined | null | string;
  environmentId?: undefined | string;
  watchPaths?: undefined | null | string[];
  repository?: undefined | null | string;
  branch?: undefined | null | string;
  autoDeploy?: undefined | null | false | true;
  gitlabProjectId?: undefined | null | number;
  gitlabRepository?: undefined | null | string;
  gitlabOwner?: undefined | null | string;
  gitlabBranch?: undefined | null | string;
  gitlabPathNamespace?: undefined | null | string;
  giteaRepository?: undefined | null | string;
  giteaOwner?: undefined | null | string;
  giteaBranch?: undefined | null | string;
  bitbucketRepository?: undefined | null | string;
  bitbucketRepositorySlug?: undefined | null | string;
  bitbucketOwner?: undefined | null | string;
  bitbucketBranch?: undefined | null | string;
  customGitUrl?: undefined | null | string;
  customGitBranch?: undefined | null | string;
  customGitSSHKeyId?: undefined | null | string;
  enableSubmodules?: undefined | false | true;
  githubId?: undefined | null | string;
  gitlabId?: undefined | null | string;
  giteaId?: undefined | null | string;
  bitbucketId?: undefined | null | string;
  composeFile?: undefined | string;
  composePath?: undefined | string;
  suffix?: undefined | string;
  randomize?: undefined | false | true;
  isolatedDeployment?: undefined | false | true;
  isolatedDeploymentsVolume?: undefined | false | true;
  composeStatus?: undefined | "idle" | "running" | "done" | "error";
};
