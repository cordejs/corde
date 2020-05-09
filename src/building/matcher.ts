import Thread from './thread';
import { Group } from './models';
import log from '../utils/log';

export class Matcher {
  private commandName: string;

  constructor(input: string) {
    this.commandName = input;
  }

  public shouldReturn(expect: string) {
    this._return(expect, true);
  }

  public shouldNotReturn(notExpect: string) {
    this._return(notExpect, false);
  }

  private _return(expect: string, usingTrueStatement: boolean) {
    Thread.isBuildRunning = true;
    if (Thread.hasTest || Thread.hasGroup) {
      Thread.assertions.push({
        expectation: expect,
        commandName: this.commandName,
        usingTrueStatement: usingTrueStatement,
      });
    } else {
      const group: Group = {
        tests: [
          {
            assertions: [
              {
                expectation: expect,
                commandName: this.commandName,
                usingTrueStatement: usingTrueStatement,
              },
            ],
          },
        ],
      };

      log.out(group);
    }
  }
}
