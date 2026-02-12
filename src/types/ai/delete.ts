// Auto-generated. Do not edit.
// RouterOutputs["ai"]["delete"]

export type AiDelete = never[] & {
    "__@iterator@273": () => {
        next: (__0: [] | [any]) => {
              done: true;
              value: any;
            } | {
              done?: undefined | false;
              value: never;
            };
        return?: undefined | ((value: any) => {
                done: true;
                value: any;
              } | {
                done?: undefined | false;
                value: never;
              });
        throw?: undefined | ((e: any) => {
                done: true;
                value: any;
              } | {
                done?: undefined | false;
                value: never;
              });
      };
  } & {
    columns: Array<{
        name: string;
        type: number;
        table: number;
        number: number;
        parser?: undefined | ((raw: string) => unknown);
      }>;
    count: number;
    command: string;
    statement: {
      name: string;
      string: string;
      types: number[];
      columns: Array<{
          name: string;
          type: number;
          table: number;
          number: number;
          parser?: undefined | ((raw: string) => unknown);
        }>;
    };
    state: {
      status: string;
      pid: number;
      secret: number;
    };
  };
