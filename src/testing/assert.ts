import Thread from './thread';
import { Group } from './models';

export class Assert {
  private commandName: string;
  private testName: string;

  constructor(input: string, testName: string) {
    this.commandName = input;
    this.testName = testName;
  }

  public shouldReturn(expect: string) {
    Thread.isBuildRunning = true;
    if (Thread.hasTest || Thread.hasGroup) {
      Thread.assertions.push({
        expectation: expect,
        commandName: this.commandName,
      });
    } else {
      const log: Group = {
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

      process.stdout.write(JSON.stringify(log));
    }
  }
}
