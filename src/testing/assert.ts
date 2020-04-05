import Thread from './thread';
import { Group } from './models';
import log from '../log';

export class Assert {
  private commandName: string;

  constructor(input: string) {
    this.commandName = input;
  }

  public shouldReturn(expect: string) {
    Thread.isBuildRunning = true;
    if (Thread.hasTest || Thread.hasGroup) {
      Thread.assertions.push({
        expectation: expect,
        commandName: this.commandName,
      });
    } else {
      const group: Group = {
        tests: [
          {
            assertions: [
              {
                expectation: expect,
                commandName: this.commandName,
              },
            ],
          },
        ],
      };

      log.out(group);
    }
  }
}
