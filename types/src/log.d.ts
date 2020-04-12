declare class Log {
  /**
   * Send a objet to process.stdout
   */
  static out(obj: object | object[]): void;
  static printFailure(
    space: string,
    command: string,
    expectation: string,
    output: string,
    usingTrueStatement: boolean,
  ): void;
  static printSucess(
    space: string,
    command: string,
    expectation: string,
    output: string,
    usingTrueStatement: boolean,
  ): void;
  private static getNotWordIfTrue;
}
declare const log: typeof Log;
export default log;
