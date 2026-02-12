// Auto-generated. Do not edit.
// RouterInputs["sso"]["register"]

export type SsoRegister = {
  providerId: string;
  domains: string[];
  issuer: string;
  organizationId?: undefined | string;
  oidcConfig?: undefined | {
      clientId: string;
      clientSecret: string;
      scopes?: undefined | string[];
      authorizationEndpoint?: undefined | string;
      tokenEndpoint?: undefined | string;
      userInfoEndpoint?: undefined | string;
      tokenEndpointAuthentication?: undefined | "client_secret_post" | "client_secret_basic";
      jwksEndpoint?: undefined | string;
      discoveryEndpoint?: undefined | string;
      skipDiscovery?: undefined | false | true;
      pkce?: undefined | false | true;
      mapping?: undefined | {
          id: string;
          name: string;
          email: string;
          emailVerified?: undefined | string;
          image?: undefined | string;
          extraFields?: undefined | { [key: string]: any };
        };
    };
  samlConfig?: undefined | {
      entryPoint: string;
      cert: string;
      callbackUrl: string;
      spMetadata: {
        metadata?: undefined | string;
        privateKey?: undefined | string;
        entityID?: undefined | string;
        privateKeyPass?: undefined | string;
        isAssertionEncrypted?: undefined | false | true;
        encPrivateKey?: undefined | string;
        encPrivateKeyPass?: undefined | string;
        binding?: undefined | string;
      };
      privateKey?: undefined | string;
      mapping?: undefined | {
          id: string;
          name: string;
          email: string;
          firstName?: undefined | string;
          lastName?: undefined | string;
          emailVerified?: undefined | string;
          extraFields?: undefined | { [key: string]: any };
        };
      audience?: undefined | string;
      idpMetadata?: undefined | {
          metadata?: undefined | string;
          privateKey?: undefined | string;
          cert?: undefined | string;
          entityID?: undefined | string;
          privateKeyPass?: undefined | string;
          isAssertionEncrypted?: undefined | false | true;
          encPrivateKey?: undefined | string;
          encPrivateKeyPass?: undefined | string;
          singleSignOnService?: undefined | Array<{
                Binding: string;
                Location: string;
              }>;
        };
      wantAssertionsSigned?: undefined | false | true;
      authnRequestsSigned?: undefined | false | true;
      signatureAlgorithm?: undefined | string;
      digestAlgorithm?: undefined | string;
      identifierFormat?: undefined | string;
      decryptionPvk?: undefined | string;
      additionalParams?: undefined | { [key: string]: any };
    };
  overrideUserInfo?: undefined | false | true;
};
