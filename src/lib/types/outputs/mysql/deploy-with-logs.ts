// Auto-generated. Do not edit.
// RouterOutputs["mysql"]["deployWithLogs"]

export type MysqlDeployWithLogs = {
  pipe: () => {
      pipe: () => {
          pipe: () => {
              pipe: () => {
                  pipe: () => {
                      pipe: () => {
                          pipe: () => {
                              pipe: () => unknown /* max depth reached */;
                              subscribe: (observer: unknown /* max depth reached */) => unknown /* max depth reached */;
                            };
                          subscribe: (observer: {
                              next?: unknown /* max depth reached */ | (unknown /* max depth reached */);
                              error?: unknown /* max depth reached */ | (unknown /* max depth reached */);
                              complete?: unknown /* max depth reached */ | (unknown /* max depth reached */);
                            }) => {
                              unsubscribe: () => unknown /* max depth reached */;
                            };
                        };
                      subscribe: (observer: {
                          next?: undefined | ((value: string) => void);
                          error?: undefined | ((err: unknown) => void);
                          complete?: undefined | (() => void);
                        }) => {
                          unsubscribe: () => void;
                        };
                    };
                  subscribe: (observer: {
                      next?: undefined | ((value: string) => void);
                      error?: undefined | ((err: unknown) => void);
                      complete?: undefined | (() => void);
                    }) => {
                      unsubscribe: () => void;
                    };
                };
              subscribe: (observer: {
                  next?: undefined | ((value: string) => void);
                  error?: undefined | ((err: unknown) => void);
                  complete?: undefined | (() => void);
                }) => {
                  unsubscribe: () => void;
                };
            };
          subscribe: (observer: {
              next?: undefined | ((value: string) => void);
              error?: undefined | ((err: unknown) => void);
              complete?: undefined | (() => void);
            }) => {
              unsubscribe: () => void;
            };
        };
      subscribe: (observer: {
          next?: undefined | ((value: string) => void);
          error?: undefined | ((err: unknown) => void);
          complete?: undefined | (() => void);
        }) => {
          unsubscribe: () => void;
        };
    };
  subscribe: (observer: {
      next?: undefined | ((value: string) => void);
      error?: undefined | ((err: unknown) => void);
      complete?: undefined | (() => void);
    }) => {
      unsubscribe: () => void;
    };
};
