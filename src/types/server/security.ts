// Auto-generated. Do not edit.
// RouterOutputs["server"]["security"]

export type ServerSecurity = {
  ufw: {
    installed: false | true;
    active: false | true;
    defaultIncoming: string;
  };
  ssh: {
    enabled: false | true;
    keyAuth: false | true;
    permitRootLogin: string;
    passwordAuth: string;
    usePam: string;
  };
  nonRootUser: {
    hasValidSudoUser: false | true;
  };
  unattendedUpgrades: {
    installed: false | true;
    active: false | true;
    updateEnabled: number;
    upgradeEnabled: number;
  };
  fail2ban: {
    installed: false | true;
    enabled: false | true;
    active: false | true;
    sshEnabled: string;
    sshMode: string;
  };
};
