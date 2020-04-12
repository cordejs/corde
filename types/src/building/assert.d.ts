export declare class Assert {
  private commandName;
  constructor(input: string);
  shouldReturn(expect: string): void;
  shouldNotReturn(notExpect: string): void;
  _return(expect: string, usingTrueStatement: boolean): void;
}
