import Thread from './thread';
import { Group } from './models';
import log from '../utils/log';
import { MessageEmbed } from 'discord.js';

export class Matcher {
  private commandName: string;

  constructor(input: string) {
    this.commandName = input;
  }

  public shouldReturn(expect: string | MessageEmbed) {
    if (typeof expect === 'string') {
      this.return(expect, true);
    } else {
      const messageObejct = expect.toJSON();
      return this.return(JSON.stringify(messageObejct), true, true);
    }
  }

  public shouldNotReturn(notExpect: string) {
    this.return(notExpect, false);
  }

  private return(expect: string, usingTrueStatement: boolean, isMessageEmbed?: boolean) {
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
                isEmbbedMessage: isMessageEmbed,
              },
            ],
          },
        ],
      };

      log.out(group);
    }
  }
}
