type DropFirst<T extends unknown[]> = T extends [any, ...infer U] ? U : never;

export type MatcherFn<T extends keyof corde.IExpectMatchers<any>> = (
  ...args: DropFirst<Parameters<corde.IExpectMatchers<any>["toBe"]>>
) => ReturnType<corde.IExpectMatchers<any>[T]>;
